import { mkdtemp, readFile, rm, stat, writeFile, mkdir, readdir, copyFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

export type ImportedRepoRecord = {
  id: string;
  name: string;
  owner: string;
  repoUrl: string;
  importedAt: string;
  sourcePath: string;
  previewUrl: string | null;
  readmeExcerpt: string | null;
  activatedFeaturePackage?: string;
  activatedRoute?: string;
  activatedAt?: string;
};

const STORE_FILE = path.join(process.cwd(), ".toolbox-imports.json");
const SOURCE_ROOT = path.resolve(process.cwd(), "..", "imported-repos");
const PUBLIC_ROOT = path.join(process.cwd(), "public", "imported");
const GENERATED_PLUGINS_FILE = path.join(process.cwd(), "src", "plugins", "generated-imports.ts");
const NEXT_CONFIG_FILE = path.join(process.cwd(), "next.config.ts");

function sanitizeSegment(value: string): string {
  return value
    .toLowerCase()
    .replace(/\.git$/i, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toPascalCase(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toLabelCase(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseGitHubRepo(url: string): { owner: string; repo: string } {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    throw new Error("Invalid URL. Please paste a full repository URL.");
  }

  if (!parsed.hostname.endsWith("github.com")) {
    throw new Error("Only github.com repository URLs are supported right now.");
  }

  const parts = parsed.pathname.split("/").filter(Boolean);
  if (parts.length < 2) {
    throw new Error("Repository URL should look like https://github.com/owner/repo");
  }

  return {
    owner: sanitizeSegment(parts[0]),
    repo: sanitizeSegment(parts[1]),
  };
}

async function exists(targetPath: string): Promise<boolean> {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function copyDirectory(source: string, destination: string): Promise<void> {
  await mkdir(destination, { recursive: true });
  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    if ([".git", "node_modules", ".next", ".turbo", "dist-ssr"].includes(entry.name)) {
      continue;
    }

    const sourceEntry = path.join(source, entry.name);
    const destinationEntry = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourceEntry, destinationEntry);
      continue;
    }

    if (entry.isFile()) {
      await copyFile(sourceEntry, destinationEntry);
    }
  }
}

async function runGitClone(repoUrl: string, destination: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const clone = spawn("git", ["clone", "--depth", "1", repoUrl, destination], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stderr = "";
    clone.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });

    clone.on("error", () => {
      reject(new Error("Git executable not found. Please install Git and retry."));
    });

    clone.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr.trim() || "Failed to clone repository."));
        return;
      }
      resolve();
    });
  });
}

type PackageManifest = {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

function resolveCommandBinary(command: string): string {
  return process.platform === "win32" ? `${command}.cmd` : command;
}

function hasDependency(manifest: PackageManifest, dependencyName: string): boolean {
  return Boolean(manifest.dependencies?.[dependencyName] || manifest.devDependencies?.[dependencyName]);
}

async function runCommand(
  command: string,
  args: string[],
  cwd: string,
  timeoutMs: number,
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: {
        ...process.env,
        CI: "1",
        NEXT_TELEMETRY_DISABLED: "1",
      },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });

    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error(`Command timed out: ${command} ${args.join(" ")}`));
    }, timeoutMs);

    child.on("error", () => {
      clearTimeout(timeout);
      reject(new Error(`Failed to run command: ${command}`));
    });

    child.on("close", (code) => {
      clearTimeout(timeout);
      if (code !== 0) {
        reject(new Error(stderr.trim() || `Command failed with exit code ${code}`));
        return;
      }
      resolve();
    });
  });
}

async function readPackageManifest(repoPath: string): Promise<PackageManifest | null> {
  const packageJsonPath = path.join(repoPath, "package.json");
  if (!(await exists(packageJsonPath))) {
    return null;
  }

  try {
    const raw = await readFile(packageJsonPath, "utf8");
    return JSON.parse(raw) as PackageManifest;
  } catch {
    return null;
  }
}

async function ensureNextStaticExportConfig(repoPath: string): Promise<boolean> {
  const configCandidates = ["next.config.ts", "next.config.mjs", "next.config.js"];

  for (const fileName of configCandidates) {
    const configPath = path.join(repoPath, fileName);
    if (!(await exists(configPath))) {
      continue;
    }

    const content = await readFile(configPath, "utf8");
    if (/\boutput\s*:\s*["']export["']/m.test(content)) {
      return true;
    }

    const patterns = [
      /const\s+nextConfig\s*:\s*NextConfig\s*=\s*\{/m,
      /const\s+nextConfig\s*=\s*\{/m,
      /module\.exports\s*=\s*\{/m,
      /export\s+default\s*\{/m,
    ];

    for (const pattern of patterns) {
      if (!pattern.test(content)) {
        continue;
      }

      const updated = content.replace(pattern, (match) => `${match}\n  output: "export",`);
      await writeFile(configPath, updated, "utf8");
      return true;
    }
  }

  return false;
}

async function disableUnsupportedNextExportRoutes(repoPath: string): Promise<void> {
  const roots = [path.join(repoPath, "src", "app"), path.join(repoPath, "app")];
  const fileNames = ["manifest.ts", "manifest.js", "manifest.mjs", "manifest.tsx", "manifest.jsx"];

  for (const root of roots) {
    for (const fileName of fileNames) {
      const candidate = path.join(root, fileName);
      if (await exists(candidate)) {
        await rm(candidate, { force: true });
      }
    }
  }
}

async function tryBuildPreviewRoot(repoPath: string): Promise<string | null> {
  const manifest = await readPackageManifest(repoPath);
  if (!manifest?.scripts?.build) {
    return null;
  }

  try {
    if (!(await exists(path.join(repoPath, "node_modules")))) {
      await runCommand(resolveCommandBinary("npm"), ["install", "--no-audit", "--no-fund"], repoPath, 360_000);
    }

    await runCommand(resolveCommandBinary("npm"), ["run", "build"], repoPath, 360_000);

    let previewRoot = await findPreviewRoot(repoPath);
    if (previewRoot && (await isStaticPreviewCompatible(previewRoot))) {
      return previewRoot;
    }

    if (hasDependency(manifest, "next")) {
      if (await ensureNextStaticExportConfig(repoPath)) {
        await disableUnsupportedNextExportRoutes(repoPath);

        try {
          await runCommand(resolveCommandBinary("npm"), ["run", "build"], repoPath, 360_000);
        } catch {
          // Build can still fail after forcing static export; fallback to other checks.
        }

        previewRoot = await findPreviewRoot(repoPath);
        if (previewRoot && (await isStaticPreviewCompatible(previewRoot))) {
          return previewRoot;
        }
      }

      try {
        await runCommand(resolveCommandBinary("npx"), ["next", "export"], repoPath, 180_000);
      } catch {
        // Ignore export errors and continue falling back to no-preview mode.
      }

      previewRoot = await findPreviewRoot(repoPath);
      if (previewRoot && (await isStaticPreviewCompatible(previewRoot))) {
        return previewRoot;
      }
    }
  } catch {
    return null;
  }

  return null;
}

async function findPreviewRoot(repoPath: string): Promise<string | null> {
  const candidates = [
    repoPath,
    path.join(repoPath, "dist"),
    path.join(repoPath, "build"),
    path.join(repoPath, "out"),
    path.join(repoPath, "public"),
  ];
  for (const candidate of candidates) {
    if (await exists(path.join(candidate, "index.html"))) {
      return candidate;
    }
  }
  return null;
}

async function isStaticPreviewCompatible(previewRoot: string): Promise<boolean> {
  const indexPath = path.join(previewRoot, "index.html");
  if (!(await exists(indexPath))) {
    return false;
  }

  const html = await readFile(indexPath, "utf8");
  return !/<script[^>]+src=["']\/?src\//i.test(html);
}

async function normalizeCopiedPreviewIndex(previewPath: string): Promise<void> {
  const indexPath = path.join(previewPath, "index.html");
  if (!(await exists(indexPath))) {
    return;
  }

  let html = await readFile(indexPath, "utf8");

  // Vite build output often uses /assets/* which breaks when hosted under /imported/<id>/.
  html = html.replace(/(["'])\/assets\//g, "$1./assets/");

  if (await exists(path.join(previewPath, "favicon.svg"))) {
    html = html.replace(/(["'])\/favicon\.svg(["'])/g, "$1./favicon.svg$2");
  }
  if (await exists(path.join(previewPath, "icons.svg"))) {
    html = html.replace(/(["'])\/icons\.svg(["'])/g, "$1./icons.svg$2");
  }

  await writeFile(indexPath, html, "utf8");
}

async function readReadme(repoPath: string): Promise<string | null> {
  const candidates = ["README.md", "readme.md", "README.MD"];
  for (const fileName of candidates) {
    const candidate = path.join(repoPath, fileName);
    if (await exists(candidate)) {
      const content = await readFile(candidate, "utf8");
      return content.slice(0, 1600);
    }
  }
  return null;
}

export async function loadImportedRepos(): Promise<ImportedRepoRecord[]> {
  if (!(await exists(STORE_FILE))) {
    return [];
  }

  const raw = await readFile(STORE_FILE, "utf8");
  const parsed = JSON.parse(raw) as ImportedRepoRecord[];
  return Array.isArray(parsed) ? parsed : [];
}

async function saveImportedRepos(records: ImportedRepoRecord[]): Promise<void> {
  await writeFile(STORE_FILE, JSON.stringify(records, null, 2), "utf8");
}

async function ensureGeneratedPluginsFile(): Promise<void> {
  if (await exists(GENERATED_PLUGINS_FILE)) {
    return;
  }

  const fallback = `import type { ToolboxPlugin } from "../plugin-types";\n\n// AUTO-GENERATED IMPORTS - do not edit manually.\n// __AUTO_IMPORTS_START__\n// __AUTO_IMPORTS_END__\n\nexport const generatedPlugins: ToolboxPlugin[] = [\n  // __AUTO_PLUGINS_START__\n  // __AUTO_PLUGINS_END__\n];\n`;
  await writeFile(GENERATED_PLUGINS_FILE, fallback, "utf8");
}

async function registerGeneratedPlugin(packageName: string, pluginIdentifier: string): Promise<void> {
  await ensureGeneratedPluginsFile();

  const current = await readFile(GENERATED_PLUGINS_FILE, "utf8");
  if (current.includes(`from "${packageName}"`)) {
    return;
  }

  const importLine = `import ${pluginIdentifier} from "${packageName}";`;
  const importInserted = current.replace("// __AUTO_IMPORTS_END__", `${importLine}\n// __AUTO_IMPORTS_END__`);
  const pluginInserted = importInserted.replace("// __AUTO_PLUGINS_END__", `  ${pluginIdentifier},\n  // __AUTO_PLUGINS_END__`);

  await writeFile(GENERATED_PLUGINS_FILE, pluginInserted, "utf8");
}

async function unregisterGeneratedPlugin(packageName: string, pluginIdentifier: string): Promise<void> {
  if (!(await exists(GENERATED_PLUGINS_FILE))) {
    return;
  }

  const current = await readFile(GENERATED_PLUGINS_FILE, "utf8");
  const withoutImport = current.replace(`import ${pluginIdentifier} from "${packageName}";\n`, "");
  const withoutPlugin = withoutImport.replace(`  ${pluginIdentifier},\n`, "");
  await writeFile(GENERATED_PLUGINS_FILE, withoutPlugin, "utf8");
}

async function updateTranspilePackages(
  transform: (packages: string[]) => string[],
): Promise<void> {
  if (!(await exists(NEXT_CONFIG_FILE))) {
    return;
  }

  const content = await readFile(NEXT_CONFIG_FILE, "utf8");
  const match = content.match(/transpilePackages:\s*\[([\s\S]*?)\]/m);
  if (!match) {
    return;
  }

  const currentPackages = Array.from(match[1].matchAll(/"([^"]+)"/g)).map((item) => item[1]);
  const nextPackages = transform(currentPackages);
  const uniquePackages = Array.from(new Set(nextPackages));

  const nextInner = uniquePackages
    .map((item) => `\n    "${item}"`)
    .join(",")
    .concat(uniquePackages.length > 0 ? "\n  " : "");

  const nextBlock = `transpilePackages: [${nextInner}]`;
  const nextContent = content.replace(match[0], nextBlock);

  if (nextContent === content) {
    return;
  }

  await writeFile(NEXT_CONFIG_FILE, nextContent, "utf8");
}

async function ensureTranspilePackage(packageName: string): Promise<void> {
  await updateTranspilePackages((packages) => {
    if (packages.includes(packageName)) {
      return packages;
    }

    return [...packages, packageName];
  });
}

async function removeTranspilePackage(packageName: string): Promise<void> {
  await updateTranspilePackages((packages) => {
    return packages.filter((item) => item !== packageName);
  });
}

async function scaffoldFeaturePackage(record: ImportedRepoRecord): Promise<{ packageName: string; routePath: string }> {
  const packageName = `features-${record.id}`;
  const packageDir = path.resolve(process.cwd(), "..", packageName);
  const routeSlug = `repo-${record.id}`;
  const routePath = `/${routeSlug}`;
  const featureTitle = toLabelCase(record.name);
  const pluginSymbol = `feature${toPascalCase(record.id)}Plugin`;
  await mkdir(path.join(packageDir, "src"), { recursive: true });

  const packageJson = {
    name: packageName,
    version: "0.1.0",
    private: true,
    description: `Generated feature package for imported repo ${record.repoUrl}`,
    main: "src/index.tsx",
    exports: {
      ".": "./src/index.tsx",
    },
    dependencies: {
      react: "^19.2.3",
      "react-dom": "^19.2.3",
    },
    devDependencies: {
      "@types/react": "^19",
      "@types/react-dom": "^19",
      typescript: "^5",
    },
  };

  const tsconfig = {
    extends: "../../tsconfig.base.json",
    compilerOptions: {
      noEmit: true,
    },
    include: ["src/**/*"],
  };

  const previewUrlLiteral = JSON.stringify(record.previewUrl);
  const repoUrlLiteral = JSON.stringify(record.repoUrl);
  const sourcePathLiteral = JSON.stringify(record.sourcePath);
  const titleLiteral = JSON.stringify(featureTitle);
  const readmeLiteral = JSON.stringify(record.readmeExcerpt);

  const featureRoot = `"use client";\n\nconst previewUrl: string | null = ${previewUrlLiteral};\nconst repoUrl = ${repoUrlLiteral};\nconst sourcePath = ${sourcePathLiteral};\nconst title = ${titleLiteral};\nconst readmeExcerpt: string | null = ${readmeLiteral};\n\nexport default function GeneratedFeatureRoot() {\n  return (\n    <div className=\"-m-6 flex h-[calc(100dvh-4.25rem)] min-h-[calc(100dvh-4.25rem)] w-[calc(100%+3rem)] flex-col bg-white\">\n      <main className=\"flex h-full min-h-0 w-full flex-1 flex-col\">\n        {previewUrl ? (\n          <div className=\"flex min-h-0 flex-1 overflow-hidden bg-white\">\n            <iframe\n              src={previewUrl}\n              title={title + " preview"}\n              style={{ width: \"100%\", height: \"100%\", border: 0, backgroundColor: \"#fff\" }}\n              loading=\"lazy\"\n              sandbox=\"allow-scripts allow-same-origin allow-forms allow-popups\"\n            />\n          </div>\n        ) : (\n          <section className=\"h-full w-full overflow-auto bg-white p-4\">\n            <p className=\"text-sm text-slate-700\">\n              No static index.html preview was detected for this repository. You can still use its code from the local folder and adapt it to a native React feature package.\n            </p>\n            {readmeExcerpt ? (\n              <pre className=\"mt-3 max-h-80 overflow-auto rounded-xl bg-white/85 p-3 text-xs leading-6 text-slate-700\">\n                {readmeExcerpt}\n              </pre>\n            ) : null}\n          </section>\n        )}\n      </main>\n    </div>\n  );\n}\n`;

  const indexSource = `import type { ToolboxPlugin } from "@toolbox/plugin-types";\nimport GeneratedFeatureRoot from "./GeneratedFeatureRoot";\n\nconst ${pluginSymbol}: ToolboxPlugin = {\n  id: ${JSON.stringify(`imported-${record.id}`)},\n  name: ${titleLiteral},\n  version: "0.1.0",\n  routes: [\n    {\n      path: ${JSON.stringify(`${routePath}/*`)},\n      element: <GeneratedFeatureRoot />,\n    },\n  ],\n  menu: [\n    {\n      label: ${titleLiteral},\n      to: ${JSON.stringify(routePath)},\n      icon: "Repo",\n    },\n  ],\n};\n\nexport default ${pluginSymbol};\n`;

  await writeFile(path.join(packageDir, "package.json"), JSON.stringify(packageJson, null, 2), "utf8");
  await writeFile(path.join(packageDir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2), "utf8");
  await writeFile(path.join(packageDir, "src", "GeneratedFeatureRoot.tsx"), featureRoot, "utf8");
  await writeFile(path.join(packageDir, "src", "index.tsx"), indexSource, "utf8");

  await registerGeneratedPlugin(packageName, pluginSymbol);
  return { packageName, routePath };
}

export async function importRepository(repoUrl: string): Promise<ImportedRepoRecord> {
  const { owner, repo } = parseGitHubRepo(repoUrl);
  const id = `${owner}-${repo}`;

  const records = await loadImportedRepos();
  const alreadyImported = records.find((record) => record.id === id || record.repoUrl === repoUrl);
  if (alreadyImported) {
    throw new Error(`Repository already imported as ${alreadyImported.id}.`);
  }

  const tempBase = await mkdtemp(path.join(os.tmpdir(), "toolbox-import-"));
  const tempRepoPath = path.join(tempBase, "repo");

  try {
    await runGitClone(repoUrl, tempRepoPath);

    const sourcePath = path.join(SOURCE_ROOT, id);
    await rm(sourcePath, { recursive: true, force: true });
    await copyDirectory(tempRepoPath, sourcePath);

    let previewRoot = await findPreviewRoot(tempRepoPath);
    if (previewRoot && !(await isStaticPreviewCompatible(previewRoot))) {
      previewRoot = null;
    }

    if (!previewRoot) {
      previewRoot = await tryBuildPreviewRoot(tempRepoPath);
    }

    let previewUrl: string | null = null;
    if (previewRoot) {
      const previewPath = path.join(PUBLIC_ROOT, id);
      await rm(previewPath, { recursive: true, force: true });
      await copyDirectory(previewRoot, previewPath);
      await normalizeCopiedPreviewIndex(previewPath);
      previewUrl = `/imported/${id}/index.html`;
    }

    const readmeExcerpt = await readReadme(tempRepoPath);

    const record: ImportedRepoRecord = {
      id,
      name: repo,
      owner,
      repoUrl,
      importedAt: new Date().toISOString(),
      sourcePath: `packages/imported-repos/${id}`,
      previewUrl,
      readmeExcerpt,
    };

    records.unshift(record);
    await saveImportedRepos(records);

    return record;
  } finally {
    await rm(tempBase, { recursive: true, force: true });
  }
}

export async function activateImportedRepository(repoId: string): Promise<ImportedRepoRecord> {
  const records = await loadImportedRepos();
  const repo = records.find((record) => record.id === sanitizeSegment(repoId));
  if (!repo) {
    throw new Error("Imported repository not found.");
  }

  if (repo.activatedFeaturePackage) {
    throw new Error(`Repository already activated as ${repo.activatedFeaturePackage}.`);
  }

  const { packageName, routePath } = await scaffoldFeaturePackage(repo);

  const updatedRepo: ImportedRepoRecord = {
    ...repo,
    activatedFeaturePackage: packageName,
    activatedRoute: routePath,
    activatedAt: new Date().toISOString(),
  };

  const nextRecords = records.map((record) => (record.id === repo.id ? updatedRepo : record));
  await saveImportedRepos(nextRecords);
  return updatedRepo;
}

export async function deleteImportedRepository(repoId: string): Promise<{ deletedId: string }> {
  const sanitizedId = sanitizeSegment(repoId);
  const records = await loadImportedRepos();
  const repo = records.find((record) => record.id === sanitizedId);

  if (!repo) {
    throw new Error("Imported repository not found.");
  }

  await rm(path.join(SOURCE_ROOT, repo.id), { recursive: true, force: true });
  await rm(path.join(PUBLIC_ROOT, repo.id), { recursive: true, force: true });

  if (repo.activatedFeaturePackage) {
    const pluginSymbol = `feature${toPascalCase(repo.id)}Plugin`;
    const featurePackageDir = path.resolve(process.cwd(), "..", repo.activatedFeaturePackage);

    await rm(featurePackageDir, { recursive: true, force: true });
    await unregisterGeneratedPlugin(repo.activatedFeaturePackage, pluginSymbol);
  }

  const nextRecords = records.filter((record) => record.id !== repo.id);
  await saveImportedRepos(nextRecords);

  return { deletedId: repo.id };
}
