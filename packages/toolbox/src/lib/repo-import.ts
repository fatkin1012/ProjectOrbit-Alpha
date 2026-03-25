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
  nativeScaffoldMode?: "native" | "iframe" | "static";
  nativeScaffoldReason?: string;
  nativeRiskScore?: number;
  nativeRiskBand?: "low" | "medium" | "high";
  lastSyncedCommit?: string;
  lastCheckedAt?: string;
  lastUpdatedAt?: string;
  previewHealth?: PreviewHealthCheckResult;
};

export type PreviewHealthCheckResult = {
  checkedAt: string;
  passed: boolean;
  score: number;
  summary: string;
  checks: Array<{
    id: string;
    passed: boolean;
    detail: string;
  }>;
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

  const installPreviewDependencies = async (): Promise<void> => {
    const hasLockFile = await exists(path.join(repoPath, "package-lock.json"));
    if (hasLockFile) {
      try {
        await runCommand(
          resolveCommandBinary("npm"),
          ["ci", "--include=dev", "--no-audit", "--no-fund"],
          repoPath,
          360_000,
        );
      } catch {
        await runCommand(
          resolveCommandBinary("npm"),
          ["install", "--include=dev", "--no-audit", "--no-fund"],
          repoPath,
          360_000,
        );
      }
      return;
    }

    await runCommand(
      resolveCommandBinary("npm"),
      ["install", "--include=dev", "--no-audit", "--no-fund"],
      repoPath,
      360_000,
    );
  };

  try {
    if (!(await exists(path.join(repoPath, "node_modules")))) {
      // First-time install for imported repository.
      await installPreviewDependencies();
    }

    try {
      await runCommand(resolveCommandBinary("npm"), ["run", "build"], repoPath, 360_000);
    } catch {
      // node_modules can exist but still be incomplete/stale; force reinstall and retry once.
      await installPreviewDependencies();
      await runCommand(resolveCommandBinary("npm"), ["run", "build"], repoPath, 360_000);
    }

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
    path.join(repoPath, "dist"),
    path.join(repoPath, "build"),
    path.join(repoPath, "out"),
    path.join(repoPath, "public"),
    repoPath,
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

  const previewId = path.basename(previewPath);
  const previewBasePath = `/imported/${previewId}`;

  let html = await readFile(indexPath, "utf8");

  // Replace all root-relative paths (/_next/, /assets/, /favicon.ico, etc.) 
  // with relative paths (./_next/, ./assets/, ./favicon.ico, etc.)
  // to work correctly when hosted under /imported/<id>/
  // Matches: ["|']/<word-char> and replaces with ["|']./<word-char>
  html = html.replace(/(['"])\/([a-zA-Z_-])/g, "$1./$2");

  // Ensure runtime chunk loading stays under /imported/<id>/ rather than app root.
  html = html.replace(/(["'])\/_next\//g, `$1${previewBasePath}/_next/`);

  const localStorageGuard = `<script id="toolbox-localstorage-guard">(function(){try{var key="sap-wiki-cases";var raw=window.localStorage.getItem(key);if(!raw){return;}var parsed=JSON.parse(raw);if(!Array.isArray(parsed)){window.localStorage.removeItem(key);}}catch(_error){try{window.localStorage.removeItem("sap-wiki-cases");}catch(_ignore){}}})();</script>`;
  const earlyProbeScript = `<script id="toolbox-early-probe">(function(){if(window.__toolboxEarlyProbeInstalled){return;}window.__toolboxEarlyProbeInstalled=true;window.__toolboxEarlyLogs=window.__toolboxEarlyLogs||[];window.__toolboxEarlyLog=function(msg){try{window.__toolboxEarlyLogs.push("[EARLY] "+msg);}catch(_e){}};window.__toolboxEarlyLog("probe-installed");window.addEventListener("error",function(e){window.__toolboxEarlyLog("error:"+(e.message||"unknown")+" @ "+(e.filename||"unknown")+":"+(e.lineno||0)+":"+(e.colno||0));},true);window.addEventListener("unhandledrejection",function(e){var reason=e.reason instanceof Error?(e.reason.stack||e.reason.message):String(e.reason);window.__toolboxEarlyLog("rejection:"+reason);},true);var originalAdd=EventTarget.prototype.addEventListener;EventTarget.prototype.addEventListener=function(type,listener,options){if(type==="click"&&(this===document||this===window||this===document.body||this===document.documentElement)){window.__toolboxEarlyLog("addEventListener(click) on "+(this===document?"document":this===window?"window":this===document.body?"body":"documentElement"));}return originalAdd.call(this,type,listener,options);};document.addEventListener("DOMContentLoaded",function(){window.__toolboxEarlyLog("DOMContentLoaded");});window.addEventListener("load",function(){window.__toolboxEarlyLog("window-load");});})();</script>`;
  if (html.includes("<head>")) {
    if (!html.includes("id=\"toolbox-early-probe\"")) {
      html = html.replace("<head>", `<head>${earlyProbeScript}`);
    }
    if (!html.includes("id=\"toolbox-localstorage-guard\"")) {
      html = html.replace("<head>", `<head>${localStorageGuard}`);
    }
  } else {
    if (!html.includes("id=\"toolbox-early-probe\"")) {
      html = earlyProbeScript + html;
    }
    if (!html.includes("id=\"toolbox-localstorage-guard\"")) {
      html = localStorageGuard + html;
    }
  }

  // Inject floating back button to Toolbox home
  const floatingButtonCode = `
<style>
#toolbox-back-button {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999999;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9));
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
#toolbox-back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105));
}
#toolbox-back-button:active {
  transform: translateY(0);
}
</style>
<button id="toolbox-back-button">← Back to Toolbox</button>
<script>
document.getElementById("toolbox-back-button").addEventListener("click", function() {
  window.location.href = "/";
});
</script>
`;

  // Inject before closing body tag once only.
  if (!html.includes("id=\"toolbox-back-button\"")) {
    if (html.includes("</body>")) {
      html = html.replace("</body>", floatingButtonCode + "</body>");
    } else if (html.includes("</html>")) {
      html = html.replace("</html>", floatingButtonCode + "</html>");
    } else {
      // Fallback: append to end of document
      html += floatingButtonCode;
    }
  }

  const debugConsoleCode = `
<style>
#toolbox-debug-toggle {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 999999;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 0.9rem;
  background: #0f172a;
  color: #f8fafc;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.35);
}
#toolbox-debug-panel {
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 3.5rem;
  height: 42vh;
  max-height: 360px;
  z-index: 999999;
  border-radius: 10px;
  background: rgba(2, 6, 23, 0.96);
  color: #e2e8f0;
  border: 1px solid rgba(148, 163, 184, 0.4);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.5);
  display: none;
  overflow: hidden;
}
#toolbox-debug-panel.toolbox-open {
  display: flex;
  flex-direction: column;
}
#toolbox-debug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.35);
  font-size: 12px;
}
#toolbox-debug-list {
  margin: 0;
  padding: 0.5rem 0.75rem;
  list-style: none;
  overflow: auto;
  font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  white-space: pre-wrap;
}
#toolbox-debug-list li {
  border-bottom: 1px dashed rgba(148, 163, 184, 0.25);
  padding: 0.35rem 0;
}
#toolbox-debug-list .err { color: #fda4af; }
#toolbox-debug-list .warn { color: #fde68a; }
#toolbox-debug-list .ok { color: #86efac; }
#toolbox-debug-actions { display: flex; gap: 0.4rem; }
#toolbox-debug-actions button {
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: transparent;
  color: #e2e8f0;
  border-radius: 6px;
  padding: 0.2rem 0.45rem;
  font-size: 11px;
  cursor: pointer;
}
</style>
<button id="toolbox-debug-toggle" type="button">Debug Console</button>
<section id="toolbox-debug-panel" aria-label="Toolbox preview debug console">
  <div id="toolbox-debug-header">
    <strong>Preview Runtime Debug</strong>
    <div id="toolbox-debug-actions">
      <button id="toolbox-debug-copy" type="button">Copy</button>
      <button id="toolbox-debug-clear" type="button">Clear</button>
      <button id="toolbox-debug-close" type="button">Close</button>
    </div>
  </div>
  <ul id="toolbox-debug-list"></ul>
</section>
<script id="toolbox-debug-script">
(function () {
  if (window.__toolboxDebugInstalled) {
    return;
  }
  window.__toolboxDebugInstalled = true;

  var toggle = document.getElementById("toolbox-debug-toggle");
  var panel = document.getElementById("toolbox-debug-panel");
  var list = document.getElementById("toolbox-debug-list");
  var closeBtn = document.getElementById("toolbox-debug-close");
  var clearBtn = document.getElementById("toolbox-debug-clear");
  var copyBtn = document.getElementById("toolbox-debug-copy");
  var maxRows = 200;

  function addLine(level, text) {
    if (!list) {
      return;
    }
    var li = document.createElement("li");
    var time = new Date().toISOString().slice(11, 23);
    li.className = level;
    li.textContent = "[" + time + "] [" + level.toUpperCase() + "] " + text;
    list.appendChild(li);
    while (list.childElementCount > maxRows) {
      list.removeChild(list.firstChild);
    }
    list.scrollTop = list.scrollHeight;
  }

  function toText(args) {
    return Array.prototype.map.call(args, function (item) {
      if (item instanceof Error) {
        return item.stack || item.message || String(item);
      }
      if (typeof item === "string") {
        return item;
      }
      try {
        return JSON.stringify(item);
      } catch (_err) {
        return String(item);
      }
    }).join(" ");
  }

  function openPanel() {
    if (!panel) {
      return;
    }
    panel.classList.add("toolbox-open");
  }

  function closePanel() {
    if (!panel) {
      return;
    }
    panel.classList.remove("toolbox-open");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (!panel) {
        return;
      }
      if (panel.classList.contains("toolbox-open")) {
        closePanel();
      } else {
        openPanel();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closePanel);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (list) {
        list.innerHTML = "";
      }
      addLine("ok", "Debug log cleared");
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async function () {
      if (!list) {
        return;
      }
      var rows = Array.prototype.map.call(list.querySelectorAll("li"), function (node) { return node.textContent || ""; });
      try {
        await navigator.clipboard.writeText(rows.join("\n"));
        addLine("ok", "Copied debug log to clipboard");
      } catch (_copyErr) {
        addLine("warn", "Clipboard copy failed");
      }
    });
  }

  var originalError = console.error;
  var originalWarn = console.warn;
  var originalLog = console.log;
  console.error = function () {
    addLine("err", toText(arguments));
    originalError.apply(console, arguments);
  };
  console.warn = function () {
    addLine("warn", toText(arguments));
    originalWarn.apply(console, arguments);
  };
  console.log = function () {
    addLine("ok", toText(arguments));
    originalLog.apply(console, arguments);
  };

  window.addEventListener("error", function (event) {
    var msg = (event.message || "Unhandled error") + " @ " + (event.filename || "unknown") + ":" + (event.lineno || 0) + ":" + (event.colno || 0);
    addLine("err", msg);
  });

  window.addEventListener("unhandledrejection", function (event) {
    var reason = event.reason instanceof Error ? (event.reason.stack || event.reason.message) : String(event.reason);
    addLine("err", "Unhandled promise rejection: " + reason);
  });

  document.addEventListener("click", function (event) {
    var el = event.target;
    if (!(el instanceof Element)) {
      return;
    }
    var tag = el.tagName.toLowerCase();
    var id = el.id ? "#" + el.id : "";
    var cls = el.className && typeof el.className === "string" ? ("." + el.className.split(/\s+/).filter(Boolean).slice(0, 2).join(".")) : "";
    addLine("ok", "click " + tag + id + cls);
  }, true);

  var earlyCount = Array.isArray(window.__toolboxEarlyLogs) ? window.__toolboxEarlyLogs.length : 0;
  addLine("warn", "[EARLY] log-count=" + earlyCount);
  if (earlyCount > 0) {
    for (var i = 0; i < window.__toolboxEarlyLogs.length; i += 1) {
      addLine("warn", window.__toolboxEarlyLogs[i]);
    }
  }

  function hasReactFiberMarkers() {
    var root = document.body;
    if (!root) {
      return false;
    }
    var stack = [root];
    while (stack.length > 0) {
      var node = stack.pop();
      if (!(node instanceof Element)) {
        continue;
      }
      var keys = Object.keys(node);
      for (var k = 0; k < keys.length; k += 1) {
        if (keys[k].indexOf("__reactFiber$") === 0 || keys[k].indexOf("__reactProps$") === 0) {
          return true;
        }
      }
      for (var c = 0; c < node.children.length; c += 1) {
        stack.push(node.children[c]);
      }
    }
    return false;
  }

  function installFallbackRuntime() {
    if (window.__toolboxFallbackInstalled) {
      return;
    }
    window.__toolboxFallbackInstalled = true;
    addLine("warn", "Installing fallback runtime for non-hydrated preview");

    function getText(el) {
      return el && typeof el.textContent === "string" ? el.textContent.trim() : "";
    }

    function findButtonByText(label) {
      var buttons = Array.prototype.slice.call(document.querySelectorAll("button"));
      for (var i = 0; i < buttons.length; i += 1) {
        if (getText(buttons[i]) === label) {
          return buttons[i];
        }
      }
      return null;
    }

    function getStatusNode() {
      return document.querySelector('p[role="status"]');
    }

    function setStatus(message) {
      var node = getStatusNode();
      if (node) {
        node.textContent = message;
      }
      addLine("ok", "status: " + message);
    }

    function loadCases() {
      try {
        var raw = window.localStorage.getItem("sap-wiki-cases");
        if (!raw) {
          return [];
        }
        var parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch (_loadErr) {
        return [];
      }
    }

    function saveCases(cases) {
      window.localStorage.setItem("sap-wiki-cases", JSON.stringify(cases));
    }

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function getCaseTCodes(item) {
      if (Array.isArray(item?.tCodes) && item.tCodes.length > 0) {
        return item.tCodes;
      }
      if (item?.tCode) {
        return [item.tCode];
      }
      return [];
    }

    function getCaseScreenshots(item) {
      if (Array.isArray(item?.screenshots) && item.screenshots.length > 0) {
        return item.screenshots.filter(Boolean);
      }
      if (item?.screenshot) {
        return [item.screenshot];
      }
      return [];
    }

    function setMetric(label, value) {
      var labels = Array.prototype.slice.call(document.querySelectorAll("article p"));
      for (var i = 0; i < labels.length; i += 1) {
        var node = labels[i];
        if (getText(node) !== label) {
          continue;
        }
        var parent = node.parentElement;
        if (!parent) {
          continue;
        }
        var paragraphs = parent.querySelectorAll("p");
        if (paragraphs.length > 1) {
          paragraphs[1].textContent = String(value);
        }
        return;
      }
    }

    var fallbackEditor = {
      modal: null,
      canvas: null,
      image: null,
      color: null,
      size: null,
      eraser: null,
      undo: null,
      save: null,
      close: null,
      caseId: null,
      imageIndex: 0,
      history: [],
      drawing: false,
      lastPoint: null,
    };

    function ensureFallbackEditor() {
      if (fallbackEditor.modal) {
        return;
      }

      var host = document.createElement("div");
      host.id = "toolbox-fallback-image-editor";
      host.style.cssText = "position:fixed;inset:0;z-index:1000000;background:rgba(2,6,23,.8);display:none;align-items:center;justify-content:center;padding:12px;";
      host.innerHTML = '<div style="width:min(980px,96vw);height:min(760px,92vh);background:#fff;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;">'
        + '<div style="display:flex;align-items:center;gap:8px;padding:8px;border-bottom:1px solid #e2e8f0;flex-wrap:wrap;">'
        + '<strong style="font-size:13px;color:#0f172a;">Fallback Image Editor</strong>'
        + '<label style="font-size:12px;color:#334155;">Color <input id="tb-fallback-color" type="color" value="#ff3344" /></label>'
        + '<label style="font-size:12px;color:#334155;">Size <input id="tb-fallback-size" type="range" min="1" max="24" value="4" /></label>'
        + '<button id="tb-fallback-eraser" type="button" style="padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;">Eraser</button>'
        + '<button id="tb-fallback-undo" type="button" style="padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;">Undo</button>'
        + '<button id="tb-fallback-save" type="button" style="padding:4px 8px;border:1px solid #16a34a;border-radius:6px;background:#16a34a;color:#fff;">Save Edited Copy</button>'
        + '<button id="tb-fallback-close" type="button" style="margin-left:auto;padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;">Close</button>'
        + '</div>'
        + '<div style="position:relative;flex:1;background:#f8fafc;display:flex;align-items:center;justify-content:center;overflow:auto;">'
        + '<img id="tb-fallback-image" alt="Editable screenshot" style="max-width:100%;max-height:100%;display:block;" />'
        + '<canvas id="tb-fallback-canvas" style="position:absolute;inset:0;margin:auto;touch-action:none;"></canvas>'
        + '</div>'
        + '</div>';
      document.body.appendChild(host);

      fallbackEditor.modal = host;
      fallbackEditor.canvas = host.querySelector("#tb-fallback-canvas");
      fallbackEditor.image = host.querySelector("#tb-fallback-image");
      fallbackEditor.color = host.querySelector("#tb-fallback-color");
      fallbackEditor.size = host.querySelector("#tb-fallback-size");
      fallbackEditor.eraser = host.querySelector("#tb-fallback-eraser");
      fallbackEditor.undo = host.querySelector("#tb-fallback-undo");
      fallbackEditor.save = host.querySelector("#tb-fallback-save");
      fallbackEditor.close = host.querySelector("#tb-fallback-close");

      var eraserEnabled = false;

      function canvasPoint(event) {
        var rect = fallbackEditor.canvas.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }

      function pushHistory() {
        fallbackEditor.history.push(fallbackEditor.canvas.toDataURL("image/png"));
      }

      function drawLine(from, to) {
        var ctx = fallbackEditor.canvas.getContext("2d");
        ctx.globalCompositeOperation = eraserEnabled ? "destination-out" : "source-over";
        ctx.strokeStyle = eraserEnabled ? "rgba(0,0,0,1)" : fallbackEditor.color.value;
        ctx.lineWidth = Number(fallbackEditor.size.value || 4);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      fallbackEditor.canvas.addEventListener("pointerdown", function (event) {
        fallbackEditor.drawing = true;
        fallbackEditor.lastPoint = canvasPoint(event);
      });

      fallbackEditor.canvas.addEventListener("pointermove", function (event) {
        if (!fallbackEditor.drawing || !fallbackEditor.lastPoint) {
          return;
        }
        var point = canvasPoint(event);
        drawLine(fallbackEditor.lastPoint, point);
        fallbackEditor.lastPoint = point;
      });

      fallbackEditor.canvas.addEventListener("pointerup", function () {
        if (fallbackEditor.drawing) {
          pushHistory();
        }
        fallbackEditor.drawing = false;
        fallbackEditor.lastPoint = null;
      });

      fallbackEditor.canvas.addEventListener("pointerleave", function () {
        fallbackEditor.drawing = false;
        fallbackEditor.lastPoint = null;
      });

      fallbackEditor.eraser.addEventListener("click", function () {
        eraserEnabled = !eraserEnabled;
        fallbackEditor.eraser.textContent = eraserEnabled ? "Eraser ON" : "Eraser";
      });

      fallbackEditor.undo.addEventListener("click", function () {
        if (fallbackEditor.history.length <= 1) {
          return;
        }
        fallbackEditor.history.pop();
        var prev = fallbackEditor.history[fallbackEditor.history.length - 1];
        var img = new Image();
        img.onload = function () {
          var ctx = fallbackEditor.canvas.getContext("2d");
          ctx.clearRect(0, 0, fallbackEditor.canvas.width, fallbackEditor.canvas.height);
          ctx.drawImage(img, 0, 0, fallbackEditor.canvas.width, fallbackEditor.canvas.height);
        };
        img.src = prev;
      });

      fallbackEditor.close.addEventListener("click", function () {
        fallbackEditor.modal.style.display = "none";
      });

      fallbackEditor.save.addEventListener("click", function () {
        var cases = loadCases();
        var caseIndex = cases.findIndex(function (item) { return String(item?.id) === String(fallbackEditor.caseId); });
        if (caseIndex < 0) {
          setStatus("Could not save edited image.");
          return;
        }

        var baseImage = new Image();
        baseImage.onload = function () {
          var merged = document.createElement("canvas");
          merged.width = baseImage.naturalWidth;
          merged.height = baseImage.naturalHeight;
          var mergedCtx = merged.getContext("2d");
          mergedCtx.drawImage(baseImage, 0, 0, merged.width, merged.height);
          mergedCtx.drawImage(fallbackEditor.canvas, 0, 0, merged.width, merged.height);
          var edited = merged.toDataURL("image/png");

          var targetCase = cases[caseIndex] || {};
          var screenshots = getCaseScreenshots(targetCase);
          screenshots.push(edited);
          targetCase.screenshots = screenshots;
          targetCase.screenshot = screenshots[0] || targetCase.screenshot;
          cases[caseIndex] = targetCase;

          saveCases(cases);
          renderFallbackCases(cases);
          fallbackEditor.modal.style.display = "none";
          setStatus("Edited image saved as a new copy.");
        };
        baseImage.src = fallbackEditor.image.src;
      });
    }

    function openFallbackEditor(caseId, imageIndex, imageSrc) {
      ensureFallbackEditor();
      fallbackEditor.caseId = caseId;
      fallbackEditor.imageIndex = imageIndex;
      fallbackEditor.modal.style.display = "flex";
      fallbackEditor.image.onload = function () {
        var rect = fallbackEditor.image.getBoundingClientRect();
        fallbackEditor.canvas.width = Math.max(1, Math.round(rect.width));
        fallbackEditor.canvas.height = Math.max(1, Math.round(rect.height));
        var ctx = fallbackEditor.canvas.getContext("2d");
        ctx.clearRect(0, 0, fallbackEditor.canvas.width, fallbackEditor.canvas.height);
        fallbackEditor.history = [fallbackEditor.canvas.toDataURL("image/png")];
      };
      fallbackEditor.image.src = imageSrc;
    }

    function renderFallbackCases(cases) {
      setMetric("TOTAL CASES", cases.length);
      setMetric("VISIBLE NOW", cases.length);
      var latest = cases.length > 0 ? getCaseTCodes(cases[0]).join(", ") || "N/A" : "No cases yet";
      setMetric("LATEST HOTSPOT", latest);

      var placeholder = Array.prototype.find.call(
        document.querySelectorAll("article"),
        function (node) {
          return getText(node).indexOf("No matching cases yet") !== -1;
        },
      );

      var targetContainer = placeholder?.parentElement;
      if (!targetContainer) {
        return;
      }

      if (!cases.length) {
        targetContainer.innerHTML = '<article class="glass-card rounded-2xl p-6 text-sm text-slate-700">No matching cases yet. Add one on the right and it will appear here instantly.</article>';
        return;
      }

      var cards = cases
        .slice(0, 20)
        .map(function (item, caseIndex) {
          var tCodes = getCaseTCodes(item).join(", ") || "N/A";
          var title = escapeHtml(item?.title || "Untitled case");
          var requirement = escapeHtml(item?.requirement || "");
          var steps = escapeHtml(item?.steps || "");
          var screenshots = getCaseScreenshots(item);
          var imagesHtml = screenshots
            .slice(0, 6)
            .map(function (img, idx) {
              return '<div style="display:flex;flex-direction:column;gap:4px;">'
                + '<img src="' + escapeHtml(img) + '" alt="case screenshot" style="width:140px;height:90px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1;" />'
                + '<button type="button" class="toolbox-fallback-edit-image" data-case-id="' + escapeHtml(String(item?.id ?? caseIndex)) + '" data-image-index="' + idx + '" data-image-src="' + escapeHtml(img) + '" style="padding:4px 6px;border:1px solid #94a3b8;border-radius:6px;background:#fff;font-size:11px;">Edit Image</button>'
                + '</div>';
            })
            .join("");
          return '<article class="glass-card rounded-2xl p-4 text-sm text-slate-700">'
            + '<p class="text-xs font-semibold tracking-wider text-slate-600">' + escapeHtml(tCodes) + '</p>'
            + '<h4 class="mt-1 text-base font-semibold text-slate-900">' + title + '</h4>'
            + (requirement ? '<p class="mt-2 text-xs text-slate-600"><strong>Requirement:</strong> ' + requirement + '</p>' : '')
            + (steps ? '<p class="mt-2 text-xs text-slate-600"><strong>Steps:</strong> ' + steps + '</p>' : '')
            + (imagesHtml ? '<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">' + imagesHtml + '</div>' : '')
            + '</article>';
        })
        .join("");

      targetContainer.innerHTML = cards;

      var editButtons = targetContainer.querySelectorAll(".toolbox-fallback-edit-image");
      Array.prototype.forEach.call(editButtons, function (button) {
        button.addEventListener("click", function () {
          var caseId = button.getAttribute("data-case-id");
          var imageIndex = Number(button.getAttribute("data-image-index") || "0");
          var imageSrc = button.getAttribute("data-image-src") || "";
          if (!imageSrc) {
            return;
          }
          openFallbackEditor(caseId, imageIndex, imageSrc);
        });
      });
    }

    var exportBtn = findButtonByText("Export Backup");
    var importBtn = findButtonByText("Import Backup");
    var saveBtn = findButtonByText("Save To Wiki");
    var importInput = document.querySelector('input[type="file"][accept*="json"]');

    if (exportBtn) {
      exportBtn.addEventListener("click", function () {
        try {
          var cases = loadCases();
          var blob = new Blob([JSON.stringify(cases, null, 2)], { type: "application/json" });
          var url = URL.createObjectURL(blob);
          var link = document.createElement("a");
          link.href = url;
          link.download = "sap-wiki-backup.json";
          document.body.appendChild(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(url);
          setStatus("Backup downloaded as JSON.");
        } catch (err) {
          setStatus("Export failed. Try again.");
          addLine("err", "fallback export failed: " + (err instanceof Error ? err.message : String(err)));
        }
      });
    }

    if (importBtn && importInput) {
      importBtn.addEventListener("click", function () {
        importInput.click();
      });

      importInput.addEventListener("change", function (event) {
        var target = event.target;
        if (!(target instanceof HTMLInputElement) || !target.files || target.files.length === 0) {
          return;
        }
        var file = target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
          try {
            var text = typeof reader.result === "string" ? reader.result : "";
            var parsed = JSON.parse(text);
            if (!Array.isArray(parsed)) {
              throw new Error("Backup must be an array");
            }
            saveCases(parsed);
            renderFallbackCases(parsed);
            setStatus("Imported " + parsed.length + " case(s) into local wiki.");
          } catch (err) {
            setStatus("Import failed. Use a valid backup JSON file.");
            addLine("err", "fallback import failed: " + (err instanceof Error ? err.message : String(err)));
          }
          target.value = "";
        };
        reader.onerror = function () {
          setStatus("Import failed. Use a valid backup JSON file.");
          target.value = "";
        };
        reader.readAsText(file);
      });
    }

    function getInputValue(selector) {
      var input = document.querySelector(selector);
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        return input.value.trim();
      }
      return "";
    }

    function updateSaveButtonState() {
      if (!saveBtn) {
        return;
      }
      var canSave = Boolean(getInputValue("#tcode") && getInputValue("#title") && getInputValue("#requirement") && getInputValue("#steps"));
      saveBtn.disabled = !canSave;
    }

    ["#tcode", "#title", "#requirement", "#steps"].forEach(function (selector) {
      var node = document.querySelector(selector);
      if (node) {
        node.addEventListener("input", updateSaveButtonState);
      }
    });

    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        var tCodesRaw = getInputValue("#tcode");
        var title = getInputValue("#title");
        var requirement = getInputValue("#requirement");
        var steps = getInputValue("#steps");
        var tCodes = tCodesRaw.split(/[\s,]+/).map(function (code) { return code.trim().toUpperCase(); }).filter(Boolean);
        if (!tCodes.length || !title || !requirement || !steps) {
          setStatus("Please fill all required fields before saving.");
          return;
        }

        var cases = loadCases();
        cases.unshift({
          id: String(Date.now()),
          tCode: tCodes[0],
          tCodes: tCodes,
          title: title,
          requirement: requirement,
          steps: steps,
          screenshots: [],
          createdAt: Date.now(),
        });
        saveCases(cases);
        renderFallbackCases(cases);
        setStatus("Saved to local wiki using fallback runtime.");
      });
      updateSaveButtonState();
    }

    renderFallbackCases(loadCases());
  }

  window.setTimeout(function () {
    if (hasReactFiberMarkers()) {
      addLine("ok", "React hydration markers detected");
      return;
    }
    addLine("warn", "React hydration markers not detected");
    installFallbackRuntime();
  }, 1400);

  addLine("ok", "Debug console installed");
  addLine("ok", "URL: " + window.location.href);
})();
</script>
`;

  if (!html.includes("id=\"toolbox-debug-toggle\"")) {
    if (html.includes("</body>")) {
      html = html.replace("</body>", debugConsoleCode + "</body>");
    } else if (html.includes("</html>")) {
      html = html.replace("</html>", debugConsoleCode + "</html>");
    } else {
      html += debugConsoleCode;
    }
  }

  await writeFile(indexPath, html, "utf8");

  const chunksRoot = path.join(previewPath, "_next", "static", "chunks");
  if (!(await exists(chunksRoot))) {
    return;
  }

  const rewriteChunkPrefixes = async (directory: string): Promise<void> => {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await rewriteChunkPrefixes(entryPath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith(".js")) {
        continue;
      }

      const source = await readFile(entryPath, "utf8");
      const rewritten = source
        .replace(/(["'])\/_next\//g, `$1${previewBasePath}/_next/`)
        .replace(/(["'])\/sw\.js(["'])/g, "$1./sw.js$2");

      if (rewritten !== source) {
        await writeFile(entryPath, rewritten, "utf8");
      }
    }
  };

  await rewriteChunkPrefixes(chunksRoot);
}

async function runPreviewHealthCheck(previewPath: string): Promise<PreviewHealthCheckResult> {
  const checkedAt = new Date().toISOString();
  const checks: PreviewHealthCheckResult["checks"] = [];

  const indexPath = path.join(previewPath, "index.html");
  const hasIndex = await exists(indexPath);
  checks.push({
    id: "index-html",
    passed: hasIndex,
    detail: hasIndex ? "index.html exists" : "index.html missing",
  });

  let indexHtml = "";
  if (hasIndex) {
    indexHtml = await readFile(indexPath, "utf8");
  }

  const hasDebugConsole = indexHtml.includes("id=\"toolbox-debug-toggle\"");
  checks.push({
    id: "debug-console",
    passed: hasDebugConsole,
    detail: hasDebugConsole ? "Debug console injected" : "Debug console missing",
  });

  const hasFallbackRuntime = indexHtml.includes("Installing fallback runtime for non-hydrated preview");
  checks.push({
    id: "fallback-runtime",
    passed: hasFallbackRuntime,
    detail: hasFallbackRuntime ? "Fallback runtime injected" : "Fallback runtime missing",
  });

  const hasLocalStorageGuard = indexHtml.includes("id=\"toolbox-localstorage-guard\"");
  checks.push({
    id: "localstorage-guard",
    passed: hasLocalStorageGuard,
    detail: hasLocalStorageGuard ? "localStorage guard injected" : "localStorage guard missing",
  });

  const chunksRoot = path.join(previewPath, "_next", "static", "chunks");
  const hasChunksRoot = await exists(chunksRoot);
  checks.push({
    id: "chunks-root",
    passed: hasChunksRoot,
    detail: hasChunksRoot ? "_next/static/chunks exists" : "_next/static/chunks missing",
  });

  let chunkFileCount = 0;
  let chunkHasRootPrefix = false;

  if (hasChunksRoot) {
    const inspectChunks = async (directory: string): Promise<void> => {
      const entries = await readdir(directory, { withFileTypes: true });
      for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
          await inspectChunks(entryPath);
          continue;
        }
        if (!entry.isFile() || !entry.name.endsWith(".js")) {
          continue;
        }

        chunkFileCount += 1;
        const source = await readFile(entryPath, "utf8");
        if (/(["'])\/_next\//.test(source)) {
          chunkHasRootPrefix = true;
        }
      }
    };

    await inspectChunks(chunksRoot);
  }

  checks.push({
    id: "chunk-files",
    passed: chunkFileCount > 0,
    detail: chunkFileCount > 0 ? `${chunkFileCount} chunk files found` : "No chunk files found",
  });

  checks.push({
    id: "chunk-prefix-rewrite",
    passed: !chunkHasRootPrefix,
    detail: chunkHasRootPrefix ? "Found root /_next/ prefix in chunks" : "Chunk prefixes rewritten",
  });

  const passedCount = checks.filter((check) => check.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);
  const passed = checks.every((check) => check.passed);
  const summary = passed
    ? "Preview health check passed"
    : `Preview health check: ${passedCount}/${checks.length} checks passed`;

  return {
    checkedAt,
    passed,
    score,
    summary,
    checks,
  };
}

async function neutralizePreviewServiceWorker(previewPath: string): Promise<void> {
  const swPath = path.join(previewPath, "sw.js");
  const noOpSw = `self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.clients.claim();
      await self.registration.unregister();
    })(),
  );
});

self.addEventListener("fetch", () => {
  // Intentionally no-op to avoid stale offline caches in imported previews.
});
`;

  await writeFile(swPath, noOpSw, "utf8");

  const chunksRoot = path.join(previewPath, "_next", "static", "chunks");
  if (!(await exists(chunksRoot))) {
    return;
  }

  const rewriteChunkFiles = async (directory: string): Promise<void> => {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await rewriteChunkFiles(entryPath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith(".js")) {
        continue;
      }

      let script = await readFile(entryPath, "utf8");
      const original = script;

      script = script
        .replaceAll('navigator.serviceWorker.register("/sw.js")', 'navigator.serviceWorker.register("./sw.js")')
        .replaceAll("navigator.serviceWorker.register('/sw.js')", "navigator.serviceWorker.register('./sw.js')");

      if (script !== original) {
        await writeFile(entryPath, script, "utf8");
      }
    }
  };

  await rewriteChunkFiles(chunksRoot);
}

async function resolvePublishedPreviewUrl(repoId: string): Promise<string | null> {
  const previewPath = path.join(PUBLIC_ROOT, repoId, "index.html");
  if (await exists(previewPath)) {
    return `/imported/${repoId}/index.html`;
  }

  return null;
}

async function publishPreviewRoot(repoId: string, previewRoot: string): Promise<string> {
  const previewPath = path.join(PUBLIC_ROOT, repoId);
  await rm(previewPath, { recursive: true, force: true });
  await copyDirectory(previewRoot, previewPath);
  await normalizeCopiedPreviewIndex(previewPath);
  await neutralizePreviewServiceWorker(previewPath);
  return `/imported/${repoId}/index.html`;
}

async function recoverPreviewUrlForRepo(record: ImportedRepoRecord): Promise<string | null> {
  if (record.previewUrl) {
    return record.previewUrl;
  }

  const alreadyPublished = await resolvePublishedPreviewUrl(record.id);
  if (alreadyPublished) {
    return alreadyPublished;
  }

  const sourcePath = path.join(SOURCE_ROOT, record.id);
  if (!(await exists(sourcePath))) {
    return null;
  }

  let previewRoot = await findPreviewRoot(sourcePath);
  if (previewRoot && !(await isStaticPreviewCompatible(previewRoot))) {
    previewRoot = null;
  }

  if (!previewRoot) {
    previewRoot = await tryBuildPreviewRoot(sourcePath);
  }

  if (!previewRoot) {
    return null;
  }

  return await publishPreviewRoot(record.id, previewRoot);
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
  if (!Array.isArray(parsed)) {
    return [];
  }

  let changed = false;
  const normalized: ImportedRepoRecord[] = [];

  for (const record of parsed) {
    const publishedPreviewPath = path.join(PUBLIC_ROOT, record.id);
    let previewHealth = record.previewHealth;
    if (!previewHealth && (record.previewUrl || (await exists(path.join(publishedPreviewPath, "index.html"))))) {
      previewHealth = await runPreviewHealthCheck(publishedPreviewPath);
      changed = true;
    }

    if (record?.previewUrl) {
      normalized.push({
        ...record,
        previewHealth,
      });
      continue;
    }

    const recoveredPreviewUrl = await resolvePublishedPreviewUrl(record.id);
    if (recoveredPreviewUrl) {
      normalized.push({
        ...record,
        previewUrl: recoveredPreviewUrl,
        previewHealth,
      });
      changed = true;
      continue;
    }

    normalized.push({
      ...record,
      previewHealth,
    });
  }

  if (changed) {
    await saveImportedRepos(normalized);
  }

  return normalized;
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

  const previewVersion = encodeURIComponent(record.lastUpdatedAt ?? record.importedAt);
  const previewUrlLiteral = JSON.stringify(record.previewUrl ? `${record.previewUrl}?v=${previewVersion}` : null);
  const repoUrlLiteral = JSON.stringify(record.repoUrl);
  const sourcePathLiteral = JSON.stringify(record.sourcePath);
  const titleLiteral = JSON.stringify(featureTitle);
  const readmeLiteral = JSON.stringify(record.readmeExcerpt);
  const moduleLabelsLiteral = JSON.stringify(nativePlan.moduleLabels);
  const nativeReasonLiteral = JSON.stringify(nativePlan.reason);

  const generatedModulesSource = `export const detectedModules = ${moduleLabelsLiteral} as const;\nexport const nativeScaffoldReason = ${nativeReasonLiteral};\n`;

  const appImportPath = nativePlan.appEntryImportPath ?? "./App";

  const nativeFeatureRoot = `"use client";\n\nimport { useEffect, useRef } from "react";\nimport { createRoot } from "react-dom/client";\nimport App from ${JSON.stringify(appImportPath)};\nimport { detectedModules, nativeScaffoldReason } from "./GeneratedFeatureModules";\n${nativePlan.hasAppProviders ? "import { AppProviders } from \"./app/providers\";\n" : ""}${nativePlan.hasGlobalStyles ? "import \"./styles/globals.css\";\n" : ""}export default function GeneratedFeatureRoot() {\n  const mountRef = useRef<HTMLDivElement | null>(null);\n  const isolatedRootRef = useRef<ReturnType<typeof createRoot> | null>(null);\n  const mountGenerationRef = useRef(0);\n\n  useEffect(() => {\n    if (!mountRef.current) {\n      return;\n    }\n\n    mountGenerationRef.current += 1;\n    const generation = mountGenerationRef.current;\n\n    if (!isolatedRootRef.current) {\n      isolatedRootRef.current = createRoot(mountRef.current);\n    }\n\n    const root = isolatedRootRef.current;\n    root.render(\n      ${nativePlan.hasAppProviders ? "<AppProviders><App /></AppProviders>" : "<App />"}\n    );\n\n    return () => {\n      window.setTimeout(() => {\n        if (mountGenerationRef.current === generation && isolatedRootRef.current) {\n          isolatedRootRef.current.unmount();\n          isolatedRootRef.current = null;\n        }\n      }, 0);\n    };\n  }, []);\n\n  return (\n    <div className=\"-m-6 flex min-h-[calc(100dvh-4.25rem)] flex-col p-6\">\n      <p className=\"mb-3 text-xs text-slate-600\">{nativeScaffoldReason}</p>\n      {detectedModules.length > 0 ? (\n        <div className=\"mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white/80 p-3 text-xs text-slate-700\">\n          <span className=\"font-semibold text-slate-900\">Detected modules:</span>\n          {detectedModules.map((moduleLabel) => (\n            <span key={moduleLabel} className=\"rounded-full border border-slate-300 bg-white px-2 py-1\">\n              {moduleLabel}\n            </span>\n          ))}\n        </div>\n      ) : null}\n      <div ref={mountRef} className=\"min-h-0 flex-1\" />\n    </div>\n  );\n}\n`;

  const featureRoot = `"use client";\n\nimport { useEffect } from "react";\n\nconst previewUrl: string | null = ${previewUrlLiteral};\nconst repoUrl = ${repoUrlLiteral};\nconst sourcePath = ${sourcePathLiteral};\nconst title = ${titleLiteral};\nconst readmeExcerpt: string | null = ${readmeLiteral};\n\nexport default function GeneratedFeatureRoot() {\n  useEffect(() => {\n    if (previewUrl) {\n      window.location.assign(previewUrl);\n    }\n  }, []);\n\n  return (\n    <div className=\"-m-6 flex h-[calc(100dvh-4.25rem)] min-h-[calc(100dvh-4.25rem)] w-[calc(100%+3rem)] flex-col bg-white\">\n      <main className=\"flex h-full min-h-0 w-full flex-1 flex-col\">\n        {previewUrl ? (\n          <section className=\"flex h-full w-full flex-1 flex-col items-center justify-center gap-3 bg-white p-6 text-center\">\n            <p className=\"text-sm text-slate-700\">Opening interactive preview...</p>\n            <a\n              href={previewUrl}\n              className=\"rounded-lg border-2 border-emerald-500 bg-emerald-600 px-4 py-2 text-xs font-semibold text-white\"\n            >\n              Open Interactive Preview\n            </a>\n          </section>\n        ) : (\n          <section className=\"h-full w-full overflow-auto bg-white p-4\">\n            <p className=\"text-sm text-slate-700\">\n              No static index.html preview was detected for this repository. You can still use its code from the local folder and adapt it to a native React feature package.\n            </p>\n            {readmeExcerpt ? (\n              <pre className=\"mt-3 max-h-80 overflow-auto rounded-xl bg-white/85 p-3 text-xs leading-6 text-slate-700\">\n                {readmeExcerpt}\n              </pre>\n            ) : null}\n          </section>\n        )}\n      </main>\n    </div>\n  );\n}\n`;

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
    let previewHealth: PreviewHealthCheckResult | undefined;
    if (previewRoot) {
      previewUrl = await publishPreviewRoot(id, previewRoot);
      const previewPath = path.join(PUBLIC_ROOT, id);
      previewHealth = await runPreviewHealthCheck(previewPath);
    }

    const readmeExcerpt = await readReadme(tempRepoPath);
    const lastSyncedCommit = (await runGitRevParseHead(tempRepoPath)) ?? undefined;

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
      previewHealth,
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
    const recoveredPreviewUrl = await recoverPreviewUrlForRepo(repo);
    const unchanged: ImportedRepoRecord = {
      ...repo,
      previewUrl: recoveredPreviewUrl,
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
    let previewHealth = repo.previewHealth;
    if (previewRoot) {
      previewUrl = await publishPreviewRoot(repo.id, previewRoot);
      const previewPath = path.join(PUBLIC_ROOT, repo.id);
      previewHealth = await runPreviewHealthCheck(previewPath);
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
      previewHealth,
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

  if (repo.activatedRoute) {
    throw new Error(`Repository already activated at ${repo.activatedRoute}.`);
  }

  const transformLevel = normalizeNativeTransformLevel(requestedTransformLevel);
  const routePath = `/repo-${repo.id}`;

  const updatedRepo: ImportedRepoRecord = {
    ...repo,
    activatedFeaturePackage: undefined,
    activatedRoute: routePath,
    activatedAt: new Date().toISOString(),
    nativeTransformLevel: transformLevel,
    nativeScaffoldMode: "static",
    nativeScaffoldReason: "Decoupled static mode: route is generated from imported repo metadata.",
    nativeRiskScore: 0,
    nativeRiskBand: "low",
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
    const featurePackageDir = path.resolve(process.cwd(), "..", repo.activatedFeaturePackage);
    await rm(featurePackageDir, { recursive: true, force: true });
  }

  const nextRecords = records.filter((record) => record.id !== repo.id);
  await saveImportedRepos(nextRecords);

  return { deletedId: repo.id };
}



