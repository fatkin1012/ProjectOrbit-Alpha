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
  nativeTransformLevel?: NativeTransformLevel;
  nativeScaffoldMode?: "native" | "iframe";
  nativeScaffoldReason?: string;
  nativeRiskScore?: number;
  nativeRiskBand?: "low" | "medium" | "high";
  lastSyncedCommit?: string;
  lastCheckedAt?: string;
  lastUpdatedAt?: string;
};

export type UpdateImportedRepoResult = {
  repo: ImportedRepoRecord;
  checkedAt: string;
  remoteHead: string | null;
  upToDate: boolean;
  updated: boolean;
};

export type NativeTransformLevel = "strict" | "balanced" | "safe";

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

async function runGitLsRemoteHead(repoUrl: string): Promise<string | null> {
  return await new Promise<string | null>((resolve, reject) => {
    const probe = spawn("git", ["ls-remote", repoUrl, "HEAD"], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    probe.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });

    probe.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });

    probe.on("error", () => {
      reject(new Error("Git executable not found. Please install Git and retry."));
    });

    probe.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr.trim() || "Failed to query remote repository HEAD."));
        return;
      }

      const line = stdout
        .split(/\r?\n/)
        .map((entry) => entry.trim())
        .find(Boolean);

      if (!line) {
        resolve(null);
        return;
      }

      const hash = line.split(/\s+/)[0]?.trim() ?? "";
      resolve(hash || null);
    });
  });
}

async function runGitRevParseHead(repoPath: string): Promise<string | null> {
  return await new Promise<string | null>((resolve, reject) => {
    const revParse = spawn("git", ["rev-parse", "HEAD"], {
      cwd: repoPath,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    revParse.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });

    revParse.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });

    revParse.on("error", () => {
      reject(new Error("Git executable not found. Please install Git and retry."));
    });

    revParse.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr.trim() || "Failed to read repository HEAD commit."));
        return;
      }

      const commit = stdout.trim();
      resolve(commit || null);
    });
  });
}

type PackageManifest = {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type NativeScaffoldPlan = {
  shouldUseNative: boolean;
  reason: string;
  routeFileRelativePath: string | null;
  moduleLabels: string[];
  sourceManifest: PackageManifest | null;
  hasAppProviders: boolean;
  hasGlobalStyles: boolean;
  appEntryImportPath: string | null;
  riskScore: number;
  riskBand: "low" | "medium" | "high";
  transformLevel: NativeTransformLevel;
};

function normalizeNativeTransformLevel(value?: string | null): NativeTransformLevel {
  const normalized = (value ?? "").trim().toLowerCase();
  if (normalized === "strict" || normalized === "safe" || normalized === "balanced") {
    return normalized;
  }

  const fromEnv = (process.env.TOOLBOX_NATIVE_TRANSFORM_LEVEL ?? "").trim().toLowerCase();
  if (fromEnv === "strict" || fromEnv === "safe" || fromEnv === "balanced") {
    return fromEnv;
  }

  return "balanced";
}

function toRiskBand(score: number): "low" | "medium" | "high" {
  if (score <= 3) {
    return "low";
  }

  if (score <= 6) {
    return "medium";
  }

  return "high";
}

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

function mergePackageMap(
  base: Record<string, string>,
  incoming: Record<string, string> | undefined,
): Record<string, string> {
  if (!incoming) {
    return base;
  }

  const next = { ...base };
  for (const [name, version] of Object.entries(incoming)) {
    next[name] = version;
  }

  return next;
}

async function detectReactRouterRouteFile(repoPath: string): Promise<string | null> {
  const candidates = [
    path.join(repoPath, "src", "pages", "routes.tsx"),
    path.join(repoPath, "src", "pages", "routes.ts"),
    path.join(repoPath, "src", "routes.tsx"),
    path.join(repoPath, "src", "routes.ts"),
  ];

  for (const candidate of candidates) {
    if (!(await exists(candidate))) {
      continue;
    }

    const content = await readFile(candidate, "utf8");
    if (/createBrowserRouter|BrowserRouter/.test(content)) {
      return path.relative(repoPath, candidate).replace(/\\/g, "/");
    }
  }

  return null;
}

async function detectAppEntryImportPath(repoPath: string): Promise<string | null> {
  const candidates: Array<{ filePath: string; importPath: string }> = [
    { filePath: path.join(repoPath, "src", "App.tsx"), importPath: "./App" },
    { filePath: path.join(repoPath, "src", "App.ts"), importPath: "./App" },
    { filePath: path.join(repoPath, "src", "app", "App.tsx"), importPath: "./app/App" },
    { filePath: path.join(repoPath, "src", "app", "App.ts"), importPath: "./app/App" },
  ];

  for (const candidate of candidates) {
    if (await exists(candidate.filePath)) {
      return candidate.importPath;
    }
  }

  return null;
}

async function extractFeatureModuleLabels(repoPath: string, routeFileRelativePath: string | null): Promise<string[]> {
  const moduleLabels = new Set<string>();
  const moduleFileCandidates = [
    path.join(repoPath, "src", "app", "modules.ts"),
    path.join(repoPath, "src", "modules.ts"),
    path.join(repoPath, "src", "config", "modules.ts"),
  ];

  for (const moduleFile of moduleFileCandidates) {
    if (!(await exists(moduleFile))) {
      continue;
    }

    const content = await readFile(moduleFile, "utf8");
    const titleMatches = content.matchAll(/title\s*:\s*["'`]([^"'`]+)["'`]/g);
    for (const match of titleMatches) {
      if (match[1]) {
        moduleLabels.add(match[1].trim());
      }
    }
  }

  if (routeFileRelativePath) {
    const routeFilePath = path.join(repoPath, routeFileRelativePath);
    if (await exists(routeFilePath)) {
      const routeContent = await readFile(routeFilePath, "utf8");
      const routeMatches = routeContent.matchAll(/path\s*:\s*["'`]([^"'`]+)["'`]/g);
      for (const match of routeMatches) {
        const routePath = (match[1] || "").trim();
        if (!routePath || routePath === "*" || routePath === "/") {
          continue;
        }

        const routeLabel = routePath
          .replace(/^\//, "")
          .split("/")
          .filter(Boolean)
          .slice(-1)[0]
          ?.replace(/[-_]/g, " ")
          .replace(/\b\w/g, (value) => value.toUpperCase());

        if (routeLabel) {
          moduleLabels.add(routeLabel);
        }
      }
    }
  }

  return Array.from(moduleLabels).slice(0, 24);
}

async function analyzeNativeScaffoldPlan(
  repoPath: string,
  transformLevel: NativeTransformLevel,
): Promise<NativeScaffoldPlan> {
  const sourceManifest = await readPackageManifest(repoPath);
  const hasReact = hasDependency(sourceManifest ?? {}, "react");
  const hasReactRouter = hasDependency(sourceManifest ?? {}, "react-router-dom");
  const hasNext = hasDependency(sourceManifest ?? {}, "next");
  const hasVite = hasDependency(sourceManifest ?? {}, "vite");
  const routeFileRelativePath = await detectReactRouterRouteFile(repoPath);
  const moduleLabels = await extractFeatureModuleLabels(repoPath, routeFileRelativePath);
  const appEntryImportPath = await detectAppEntryImportPath(repoPath);

  const hasAppProviders = await exists(path.join(repoPath, "src", "app", "providers.tsx"));
  const hasGlobalStyles = await exists(path.join(repoPath, "src", "styles", "globals.css"));

  let riskScore = 0;
  if (!hasReact) {
    riskScore += 10;
  }

  if (!hasReactRouter) {
    riskScore += 3;
  }

  if (!routeFileRelativePath) {
    riskScore += 3;
  }

  if (!appEntryImportPath) {
    riskScore += 2;
  }

  if (hasNext) {
    riskScore += 3;
  }

  if (!hasGlobalStyles) {
    riskScore += 1;
  }

  if (hasVite) {
    riskScore = Math.max(0, riskScore - 1);
  }

  const riskBand = toRiskBand(riskScore);

  if (!hasReact) {
    return {
      shouldUseNative: false,
      reason: "No React dependency detected.",
      routeFileRelativePath: null,
      moduleLabels,
      sourceManifest,
      hasAppProviders,
      hasGlobalStyles,
      appEntryImportPath,
      riskScore,
      riskBand,
      transformLevel,
    };
  }

  if (!appEntryImportPath) {
    return {
      shouldUseNative: false,
      reason: "App entry file was not detected (expected src/App.tsx or src/app/App.tsx).",
      routeFileRelativePath,
      moduleLabels,
      sourceManifest,
      hasAppProviders,
      hasGlobalStyles,
      appEntryImportPath,
      riskScore,
      riskBand,
      transformLevel,
    };
  }

  const routeReady = Boolean(hasReactRouter && routeFileRelativePath);
  let shouldUseNative = false;
  let reason = "";

  if (transformLevel === "strict") {
    shouldUseNative = routeReady || hasReact;
    reason = shouldUseNative
      ? `Strict mode enabled native scaffold (risk: ${riskBand}, score: ${riskScore}).`
      : "Strict mode fallback to iframe due to missing React entry signals.";
  } else if (transformLevel === "safe") {
    shouldUseNative = routeReady && !hasNext && riskScore <= 3;
    reason = shouldUseNative
      ? `Safe mode approved native scaffold (risk: ${riskBand}, score: ${riskScore}).`
      : `Safe mode fallback to iframe (risk: ${riskBand}, score: ${riskScore}).`;
  } else {
    shouldUseNative = routeReady && riskScore <= 6;
    reason = shouldUseNative
      ? `Balanced mode approved native scaffold (risk: ${riskBand}, score: ${riskScore}).`
      : `Balanced mode fallback to iframe (risk: ${riskBand}, score: ${riskScore}).`;
  }

  return {
    shouldUseNative,
    reason,
    routeFileRelativePath,
    moduleLabels,
    sourceManifest,
    hasAppProviders,
    hasGlobalStyles,
    appEntryImportPath,
    riskScore,
    riskBand,
    transformLevel,
  };
}

async function convertRouteFileToMemoryRouter(packageDir: string, routeFileRelativePath: string): Promise<void> {
  const routeFilePath = path.join(packageDir, routeFileRelativePath);
  if (!(await exists(routeFilePath))) {
    return;
  }

  let routeSource = await readFile(routeFilePath, "utf8");
  const original = routeSource;

  routeSource = routeSource.replace(/\bcreateBrowserRouter\b/g, "createMemoryRouter");

  if (routeSource !== original) {
    await writeFile(routeFilePath, routeSource, "utf8");
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

  // Replace all root-relative paths (/_next/, /assets/, /favicon.ico, etc.) 
  // with relative paths (./_next/, ./assets/, ./favicon.ico, etc.)
  // to work correctly when hosted under /imported/<id>/
  // Matches: ["|']/<word-char> and replaces with ["|']./<word-char>
  html = html.replace(/(['"])\/([a-zA-Z_-])/g, "$1./$2");

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

async function scaffoldFeaturePackage(
  record: ImportedRepoRecord,
  transformLevel: NativeTransformLevel,
): Promise<{
  packageName: string;
  routePath: string;
  nativePlan: NativeScaffoldPlan;
}> {
  const packageName = `features-${record.id}`;
  const packageDir = path.resolve(process.cwd(), "..", packageName);
  const routeSlug = `repo-${record.id}`;
  const routePath = `/${routeSlug}`;
  const featureTitle = toLabelCase(record.name);
  const pluginSymbol = `feature${toPascalCase(record.id)}Plugin`;
  const sourceRepoPath = path.join(SOURCE_ROOT, record.id);
  const nativePlan = await analyzeNativeScaffoldPlan(sourceRepoPath, transformLevel);
  await mkdir(path.join(packageDir, "src"), { recursive: true });

  if (nativePlan.shouldUseNative) {
    await copyDirectory(path.join(sourceRepoPath, "src"), path.join(packageDir, "src"));

    if (nativePlan.routeFileRelativePath) {
      await convertRouteFileToMemoryRouter(packageDir, nativePlan.routeFileRelativePath);
    }
  }

  const packageJson = {
    name: packageName,
    version: "0.1.0",
    private: true,
    description: `Generated feature package for imported repo ${record.repoUrl}`,
    main: "src/index.tsx",
    exports: {
      ".": "./src/index.tsx",
    },
    dependencies: mergePackageMap(
      {
        react: "^19.2.3",
        "react-dom": "^19.2.3",
      },
      nativePlan.shouldUseNative ? nativePlan.sourceManifest?.dependencies : undefined,
    ),
    devDependencies: mergePackageMap(
      {
        "@types/react": "^19",
        "@types/react-dom": "^19",
        typescript: "^5",
      },
      nativePlan.shouldUseNative ? nativePlan.sourceManifest?.devDependencies : undefined,
    ),
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
  const moduleLabelsLiteral = JSON.stringify(nativePlan.moduleLabels);
  const nativeReasonLiteral = JSON.stringify(nativePlan.reason);

  const generatedModulesSource = `export const detectedModules = ${moduleLabelsLiteral} as const;\nexport const nativeScaffoldReason = ${nativeReasonLiteral};\n`;

  const appImportPath = nativePlan.appEntryImportPath ?? "./App";

  const nativeFeatureRoot = `"use client";\n\nimport { useEffect, useRef } from "react";\nimport { createRoot } from "react-dom/client";\nimport App from ${JSON.stringify(appImportPath)};\nimport { detectedModules, nativeScaffoldReason } from "./GeneratedFeatureModules";\n${nativePlan.hasAppProviders ? "import { AppProviders } from \"./app/providers\";\n" : ""}${nativePlan.hasGlobalStyles ? "import \"./styles/globals.css\";\n" : ""}export default function GeneratedFeatureRoot() {\n  const mountRef = useRef<HTMLDivElement | null>(null);\n  const isolatedRootRef = useRef<ReturnType<typeof createRoot> | null>(null);\n  const mountGenerationRef = useRef(0);\n\n  useEffect(() => {\n    if (!mountRef.current) {\n      return;\n    }\n\n    mountGenerationRef.current += 1;\n    const generation = mountGenerationRef.current;\n\n    if (!isolatedRootRef.current) {\n      isolatedRootRef.current = createRoot(mountRef.current);\n    }\n\n    const root = isolatedRootRef.current;\n    root.render(\n      ${nativePlan.hasAppProviders ? "<AppProviders><App /></AppProviders>" : "<App />"}\n    );\n\n    return () => {\n      window.setTimeout(() => {\n        if (mountGenerationRef.current === generation && isolatedRootRef.current) {\n          isolatedRootRef.current.unmount();\n          isolatedRootRef.current = null;\n        }\n      }, 0);\n    };\n  }, []);\n\n  return (\n    <div className=\"-m-6 flex min-h-[calc(100dvh-4.25rem)] flex-col p-6\">\n      <p className=\"mb-3 text-xs text-slate-600\">{nativeScaffoldReason}</p>\n      {detectedModules.length > 0 ? (\n        <div className=\"mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white/80 p-3 text-xs text-slate-700\">\n          <span className=\"font-semibold text-slate-900\">Detected modules:</span>\n          {detectedModules.map((moduleLabel) => (\n            <span key={moduleLabel} className=\"rounded-full border border-slate-300 bg-white px-2 py-1\">\n              {moduleLabel}\n            </span>\n          ))}\n        </div>\n      ) : null}\n      <div ref={mountRef} className=\"min-h-0 flex-1\" />\n    </div>\n  );\n}\n`;

  const featureRoot = `"use client";\n\nconst previewUrl: string | null = ${previewUrlLiteral};\nconst repoUrl = ${repoUrlLiteral};\nconst sourcePath = ${sourcePathLiteral};\nconst title = ${titleLiteral};\nconst readmeExcerpt: string | null = ${readmeLiteral};\n\nexport default function GeneratedFeatureRoot() {\n  return (\n    <div className=\"-m-6 flex h-[calc(100dvh-4.25rem)] min-h-[calc(100dvh-4.25rem)] w-[calc(100%+3rem)] flex-col bg-white\">\n      <main className=\"flex h-full min-h-0 w-full flex-1 flex-col\">\n        {previewUrl ? (\n          <div className=\"flex min-h-0 flex-1 overflow-hidden bg-white\">\n            <iframe\n              src={previewUrl}\n              title={title + " preview"}\n              style={{ width: \"100%\", height: \"100%\", border: 0, backgroundColor: \"#fff\" }}\n              loading=\"lazy\"\n              sandbox=\"allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads allow-presentation\"\n            />\n          </div>\n        ) : (\n          <section className=\"h-full w-full overflow-auto bg-white p-4\">\n            <p className=\"text-sm text-slate-700\">\n              No static index.html preview was detected for this repository. You can still use its code from the local folder and adapt it to a native React feature package.\n            </p>\n            {readmeExcerpt ? (\n              <pre className=\"mt-3 max-h-80 overflow-auto rounded-xl bg-white/85 p-3 text-xs leading-6 text-slate-700\">\n                {readmeExcerpt}\n              </pre>\n            ) : null}\n          </section>\n        )}\n      </main>\n    </div>\n  );\n}\n`;

  const indexSource = `import type { ToolboxPlugin } from "@toolbox/plugin-types";\nimport GeneratedFeatureRoot from "./GeneratedFeatureRoot";\n\nconst ${pluginSymbol}: ToolboxPlugin = {\n  id: ${JSON.stringify(`imported-${record.id}`)},\n  name: ${titleLiteral},\n  version: "0.1.0",\n  routes: [\n    {\n      path: ${JSON.stringify(`${routePath}/*`)},\n      element: <GeneratedFeatureRoot />,\n    },\n  ],\n  menu: [\n    {\n      label: ${titleLiteral},\n      to: ${JSON.stringify(routePath)},\n    },\n  ],\n};\n\nexport default ${pluginSymbol};\n`;

  await writeFile(path.join(packageDir, "package.json"), JSON.stringify(packageJson, null, 2), "utf8");
  await writeFile(path.join(packageDir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2), "utf8");
  await writeFile(path.join(packageDir, "src", "GeneratedFeatureModules.ts"), generatedModulesSource, "utf8");
  await writeFile(
    path.join(packageDir, "src", "GeneratedFeatureRoot.tsx"),
    nativePlan.shouldUseNative ? nativeFeatureRoot : featureRoot,
    "utf8",
  );
  await writeFile(path.join(packageDir, "src", "index.tsx"), indexSource, "utf8");

  await registerGeneratedPlugin(packageName, pluginSymbol);
  return { packageName, routePath, nativePlan };
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
    const lastSyncedCommit = await runGitRevParseHead(tempRepoPath);

    const record: ImportedRepoRecord = {
      id,
      name: repo,
      owner,
      repoUrl,
      importedAt: new Date().toISOString(),
      sourcePath: `packages/imported-repos/${id}`,
      previewUrl,
      readmeExcerpt,
      lastSyncedCommit,
      lastCheckedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    };

    records.unshift(record);
    await saveImportedRepos(records);

    return record;
  } finally {
    await rm(tempBase, { recursive: true, force: true });
  }
}

export async function checkAndUpdateImportedRepository(repoId: string): Promise<UpdateImportedRepoResult> {
  const sanitizedId = sanitizeSegment(repoId);
  const records = await loadImportedRepos();
  const repo = records.find((record) => record.id === sanitizedId);

  if (!repo) {
    throw new Error("Imported repository not found.");
  }

  const checkedAt = new Date().toISOString();
  const remoteHead = await runGitLsRemoteHead(repo.repoUrl);

  if (!remoteHead) {
    const unchanged: ImportedRepoRecord = {
      ...repo,
      lastCheckedAt: checkedAt,
    };
    await saveImportedRepos(records.map((record) => (record.id === repo.id ? unchanged : record)));
    return {
      repo: unchanged,
      checkedAt,
      remoteHead: null,
      upToDate: true,
      updated: false,
    };
  }

  if (repo.lastSyncedCommit && repo.lastSyncedCommit === remoteHead) {
    const unchanged: ImportedRepoRecord = {
      ...repo,
      lastCheckedAt: checkedAt,
    };
    await saveImportedRepos(records.map((record) => (record.id === repo.id ? unchanged : record)));
    return {
      repo: unchanged,
      checkedAt,
      remoteHead,
      upToDate: true,
      updated: false,
    };
  }

  const tempBase = await mkdtemp(path.join(os.tmpdir(), "toolbox-update-"));
  const tempRepoPath = path.join(tempBase, "repo");

  try {
    await runGitClone(repo.repoUrl, tempRepoPath);

    const sourcePath = path.join(SOURCE_ROOT, repo.id);
    await mkdir(sourcePath, { recursive: true });

    // Sync incoming files into the existing folder without deleting extras,
    // so user-added local files remain available.
    await copyDirectory(tempRepoPath, sourcePath);

    let previewRoot = await findPreviewRoot(tempRepoPath);
    if (previewRoot && !(await isStaticPreviewCompatible(previewRoot))) {
      previewRoot = null;
    }

    if (!previewRoot) {
      previewRoot = await tryBuildPreviewRoot(tempRepoPath);
    }

    let previewUrl = repo.previewUrl;
    if (previewRoot) {
      const previewPath = path.join(PUBLIC_ROOT, repo.id);
      await rm(previewPath, { recursive: true, force: true });
      await copyDirectory(previewRoot, previewPath);
      await normalizeCopiedPreviewIndex(previewPath);
      previewUrl = `/imported/${repo.id}/index.html`;
    }

    const readmeExcerpt = (await readReadme(tempRepoPath)) ?? repo.readmeExcerpt;
    const lastSyncedCommit = (await runGitRevParseHead(tempRepoPath)) ?? remoteHead;

    const updatedRepo: ImportedRepoRecord = {
      ...repo,
      previewUrl,
      readmeExcerpt,
      lastSyncedCommit,
      lastCheckedAt: checkedAt,
      lastUpdatedAt: checkedAt,
    };

    await saveImportedRepos(records.map((record) => (record.id === repo.id ? updatedRepo : record)));
    return {
      repo: updatedRepo,
      checkedAt,
      remoteHead,
      upToDate: false,
      updated: true,
    };
  } finally {
    await rm(tempBase, { recursive: true, force: true });
  }
}

export async function activateImportedRepository(
  repoId: string,
  requestedTransformLevel?: string,
): Promise<ImportedRepoRecord> {
  const records = await loadImportedRepos();
  const repo = records.find((record) => record.id === sanitizeSegment(repoId));
  if (!repo) {
    throw new Error("Imported repository not found.");
  }

  if (repo.activatedFeaturePackage) {
    throw new Error(`Repository already activated as ${repo.activatedFeaturePackage}.`);
  }

  const transformLevel = normalizeNativeTransformLevel(requestedTransformLevel);
  const { packageName, routePath, nativePlan } = await scaffoldFeaturePackage(repo, transformLevel);

  const updatedRepo: ImportedRepoRecord = {
    ...repo,
    activatedFeaturePackage: packageName,
    activatedRoute: routePath,
    activatedAt: new Date().toISOString(),
    nativeTransformLevel: transformLevel,
    nativeScaffoldMode: nativePlan.shouldUseNative ? "native" : "iframe",
    nativeScaffoldReason: nativePlan.reason,
    nativeRiskScore: nativePlan.riskScore,
    nativeRiskBand: nativePlan.riskBand,
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
