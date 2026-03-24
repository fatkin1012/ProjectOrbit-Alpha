module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:child_process [external] (node:child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:child_process", () => require("node:child_process"));

module.exports = mod;
}),
"[project]/packages/toolbox/src/lib/repo-import.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activateImportedRepository",
    ()=>activateImportedRepository,
    "deleteImportedRepository",
    ()=>deleteImportedRepository,
    "importRepository",
    ()=>importRepository,
    "loadImportedRepos",
    ()=>loadImportedRepos
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:os [external] (node:os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$child_process__$5b$external$5d$__$28$node$3a$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:child_process [external] (node:child_process, cjs)");
;
;
;
;
const STORE_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), ".toolbox-imports.json");
const SOURCE_ROOT = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(process.cwd(), "..", "imported-repos");
const PUBLIC_ROOT = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "imported");
const GENERATED_PLUGINS_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "src", "plugins", "generated-imports.ts");
const NEXT_CONFIG_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "next.config.ts");
function sanitizeSegment(value) {
    return value.toLowerCase().replace(/\.git$/i, "").replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function toPascalCase(value) {
    return value.split("-").filter(Boolean).map((part)=>part.charAt(0).toUpperCase() + part.slice(1)).join("");
}
function toLabelCase(value) {
    return value.split("-").filter(Boolean).map((part)=>part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function parseGitHubRepo(url) {
    let parsed;
    try {
        parsed = new URL(url.trim());
    } catch  {
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
        repo: sanitizeSegment(parts[1])
    };
}
async function exists(targetPath) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["stat"])(targetPath);
        return true;
    } catch  {
        return false;
    }
}
async function copyDirectory(source, destination) {
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])(destination, {
        recursive: true
    });
    const entries = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readdir"])(source, {
        withFileTypes: true
    });
    for (const entry of entries){
        if ([
            ".git",
            "node_modules",
            ".next",
            ".turbo",
            "dist-ssr"
        ].includes(entry.name)) {
            continue;
        }
        const sourceEntry = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(source, entry.name);
        const destinationEntry = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(destination, entry.name);
        if (entry.isDirectory()) {
            await copyDirectory(sourceEntry, destinationEntry);
            continue;
        }
        if (entry.isFile()) {
            await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["copyFile"])(sourceEntry, destinationEntry);
        }
    }
}
async function runGitClone(repoUrl, destination) {
    await new Promise((resolve, reject)=>{
        const clone = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$child_process__$5b$external$5d$__$28$node$3a$child_process$2c$__cjs$29$__["spawn"])("git", [
            "clone",
            "--depth",
            "1",
            repoUrl,
            destination
        ], {
            stdio: [
                "ignore",
                "pipe",
                "pipe"
            ]
        });
        let stderr = "";
        clone.stderr.on("data", (chunk)=>{
            stderr += String(chunk);
        });
        clone.on("error", ()=>{
            reject(new Error("Git executable not found. Please install Git and retry."));
        });
        clone.on("close", (code)=>{
            if (code !== 0) {
                reject(new Error(stderr.trim() || "Failed to clone repository."));
                return;
            }
            resolve();
        });
    });
}
function resolveCommandBinary(command) {
    return ("TURBOPACK compile-time truthy", 1) ? `${command}.cmd` : "TURBOPACK unreachable";
}
function hasDependency(manifest, dependencyName) {
    return Boolean(manifest.dependencies?.[dependencyName] || manifest.devDependencies?.[dependencyName]);
}
async function runCommand(command, args, cwd, timeoutMs) {
    await new Promise((resolve, reject)=>{
        const child = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$child_process__$5b$external$5d$__$28$node$3a$child_process$2c$__cjs$29$__["spawn"])(command, args, {
            cwd,
            env: {
                ...process.env,
                CI: "1",
                NEXT_TELEMETRY_DISABLED: "1"
            },
            stdio: [
                "ignore",
                "pipe",
                "pipe"
            ]
        });
        let stderr = "";
        child.stderr.on("data", (chunk)=>{
            stderr += String(chunk);
        });
        const timeout = setTimeout(()=>{
            child.kill();
            reject(new Error(`Command timed out: ${command} ${args.join(" ")}`));
        }, timeoutMs);
        child.on("error", ()=>{
            clearTimeout(timeout);
            reject(new Error(`Failed to run command: ${command}`));
        });
        child.on("close", (code)=>{
            clearTimeout(timeout);
            if (code !== 0) {
                reject(new Error(stderr.trim() || `Command failed with exit code ${code}`));
                return;
            }
            resolve();
        });
    });
}
async function readPackageManifest(repoPath) {
    const packageJsonPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(repoPath, "package.json");
    if (!await exists(packageJsonPath)) {
        return null;
    }
    try {
        const raw = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(packageJsonPath, "utf8");
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
async function ensureNextStaticExportConfig(repoPath) {
    const configCandidates = [
        "next.config.ts",
        "next.config.mjs",
        "next.config.js"
    ];
    for (const fileName of configCandidates){
        const configPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(repoPath, fileName);
        if (!await exists(configPath)) {
            continue;
        }
        const content = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(configPath, "utf8");
        if (/\boutput\s*:\s*["']export["']/m.test(content)) {
            return true;
        }
        const patterns = [
            /const\s+nextConfig\s*:\s*NextConfig\s*=\s*\{/m,
            /const\s+nextConfig\s*=\s*\{/m,
            /module\.exports\s*=\s*\{/m,
            /export\s+default\s*\{/m
        ];
        for (const pattern of patterns){
            if (!pattern.test(content)) {
                continue;
            }
            const updated = content.replace(pattern, (match)=>`${match}\n  output: "export",`);
            await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(configPath, updated, "utf8");
            return true;
        }
    }
    return false;
}
async function disableUnsupportedNextExportRoutes(repoPath) {
    const roots = [
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(repoPath, "src", "app"),
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(repoPath, "app")
    ];
    const fileNames = [
        "manifest.ts",
        "manifest.js",
        "manifest.mjs",
        "manifest.tsx",
        "manifest.jsx"
    ];
    for (const root of roots){
        for (const fileName of fileNames){
            const candidate = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(root, fileName);
            if (await exists(candidate)) {
                await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rm"])(candidate, {
                    force: true
                });
            }
        }
    }
}
async function tryBuildPreviewRoot(repoPath) {
    const manifest = await readPackageManifest(repoPath);
    if (!manifest?.scripts?.build) {
        return null;
    }
    try {
        if (!await exists(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(repoPath, "node_modules"))) {
            await runCommand(resolveCommandBinary("npm"), [
                "install",
                "--no-audit",
                "--no-fund"
            ], repoPath, 360_000);
        }
        await runCommand(resolveCommandBinary("npm"), [
            "run",
            "build"
        ], repoPath, 360_000);
        let previewRoot = await findPreviewRoot(repoPath);
        if (previewRoot && await isStaticPreviewCompatible(previewRoot)) {
            return previewRoot;
        }
        if (hasDependency(manifest, "next")) {
            if (await ensureNextStaticExportConfig(repoPath)) {
                await disableUnsupportedNextExportRoutes(repoPath);
                try {
                    await runCommand(resolveCommandBinary("npm"), [
                        "run",
                        "build"
                    ], repoPath, 360_000);
                } catch  {
                // Build can still fail after forcing static export; fallback to other checks.
                }
                previewRoot = await findPreviewRoot(repoPath);
                if (previewRoot && await isStaticPreviewCompatible(previewRoot)) {
                    return previewRoot;
                }
            }
            try {
                await runCommand(resolveCommandBinary("npx"), [
                    "next",
                    "export"
                ], repoPath, 180_000);
            } catch  {
            // Ignore export errors and continue falling back to no-preview mode.
            }
            previewRoot = await findPreviewRoot(repoPath);
            if (previewRoot && await isStaticPreviewCompatible(previewRoot)) {
                return previewRoot;
            }
        }
    } catch  {
        return null;
    }
    return null;
}
async function findPreviewRoot(repoPath) {
    const candidates = [
        repoPath,
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(repoPath, "dist"),
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(repoPath, "build"),
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(repoPath, "out"),
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(repoPath, "public")
    ];
    for (const candidate of candidates){
        if (await exists(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(candidate, "index.html"))) {
            return candidate;
        }
    }
    return null;
}
async function isStaticPreviewCompatible(previewRoot) {
    const indexPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(previewRoot, "index.html");
    if (!await exists(indexPath)) {
        return false;
    }
    const html = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(indexPath, "utf8");
    return !/<script[^>]+src=["']\/?src\//i.test(html);
}
async function normalizeCopiedPreviewIndex(previewPath) {
    const indexPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(previewPath, "index.html");
    if (!await exists(indexPath)) {
        return;
    }
    let html = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(indexPath, "utf8");
    // Vite build output often uses /assets/* which breaks when hosted under /imported/<id>/.
    html = html.replace(/(["'])\/assets\//g, "$1./assets/");
    if (await exists(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(previewPath, "favicon.svg"))) {
        html = html.replace(/(["'])\/favicon\.svg(["'])/g, "$1./favicon.svg$2");
    }
    if (await exists(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(previewPath, "icons.svg"))) {
        html = html.replace(/(["'])\/icons\.svg(["'])/g, "$1./icons.svg$2");
    }
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(indexPath, html, "utf8");
}
async function readReadme(repoPath) {
    const candidates = [
        "README.md",
        "readme.md",
        "README.MD"
    ];
    for (const fileName of candidates){
        const candidate = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(repoPath, fileName);
        if (await exists(candidate)) {
            const content = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(candidate, "utf8");
            return content.slice(0, 1600);
        }
    }
    return null;
}
async function loadImportedRepos() {
    if (!await exists(STORE_FILE)) {
        return [];
    }
    const raw = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(STORE_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
}
async function saveImportedRepos(records) {
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(STORE_FILE, JSON.stringify(records, null, 2), "utf8");
}
async function ensureGeneratedPluginsFile() {
    if (await exists(GENERATED_PLUGINS_FILE)) {
        return;
    }
    const fallback = `import type { ToolboxPlugin } from "../plugin-types";\n\n// AUTO-GENERATED IMPORTS - do not edit manually.\n// __AUTO_IMPORTS_START__\n// __AUTO_IMPORTS_END__\n\nexport const generatedPlugins: ToolboxPlugin[] = [\n  // __AUTO_PLUGINS_START__\n  // __AUTO_PLUGINS_END__\n];\n`;
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(GENERATED_PLUGINS_FILE, fallback, "utf8");
}
async function registerGeneratedPlugin(packageName, pluginIdentifier) {
    await ensureGeneratedPluginsFile();
    const current = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(GENERATED_PLUGINS_FILE, "utf8");
    if (current.includes(`from "${packageName}"`)) {
        return;
    }
    const importLine = `import ${pluginIdentifier} from "${packageName}";`;
    const importInserted = current.replace("// __AUTO_IMPORTS_END__", `${importLine}\n// __AUTO_IMPORTS_END__`);
    const pluginInserted = importInserted.replace("// __AUTO_PLUGINS_END__", `  ${pluginIdentifier},\n  // __AUTO_PLUGINS_END__`);
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(GENERATED_PLUGINS_FILE, pluginInserted, "utf8");
}
async function unregisterGeneratedPlugin(packageName, pluginIdentifier) {
    if (!await exists(GENERATED_PLUGINS_FILE)) {
        return;
    }
    const current = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(GENERATED_PLUGINS_FILE, "utf8");
    const withoutImport = current.replace(`import ${pluginIdentifier} from "${packageName}";\n`, "");
    const withoutPlugin = withoutImport.replace(`  ${pluginIdentifier},\n`, "");
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(GENERATED_PLUGINS_FILE, withoutPlugin, "utf8");
}
async function updateTranspilePackages(transform) {
    if (!await exists(NEXT_CONFIG_FILE)) {
        return;
    }
    const content = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(NEXT_CONFIG_FILE, "utf8");
    const match = content.match(/transpilePackages:\s*\[([\s\S]*?)\]/m);
    if (!match) {
        return;
    }
    const currentPackages = Array.from(match[1].matchAll(/"([^"]+)"/g)).map((item)=>item[1]);
    const nextPackages = transform(currentPackages);
    const uniquePackages = Array.from(new Set(nextPackages));
    const nextInner = uniquePackages.map((item)=>`\n    "${item}"`).join(",").concat(uniquePackages.length > 0 ? "\n  " : "");
    const nextBlock = `transpilePackages: [${nextInner}]`;
    const nextContent = content.replace(match[0], nextBlock);
    if (nextContent === content) {
        return;
    }
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(NEXT_CONFIG_FILE, nextContent, "utf8");
}
async function ensureTranspilePackage(packageName) {
    await updateTranspilePackages((packages)=>{
        if (packages.includes(packageName)) {
            return packages;
        }
        return [
            ...packages,
            packageName
        ];
    });
}
async function removeTranspilePackage(packageName) {
    await updateTranspilePackages((packages)=>{
        return packages.filter((item)=>item !== packageName);
    });
}
async function scaffoldFeaturePackage(record) {
    const packageName = `features-${record.id}`;
    const packageDir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(process.cwd(), "..", packageName);
    const routeSlug = `repo-${record.id}`;
    const routePath = `/${routeSlug}`;
    const featureTitle = toLabelCase(record.name);
    const pluginSymbol = `feature${toPascalCase(record.id)}Plugin`;
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(packageDir, "src"), {
        recursive: true
    });
    const packageJson = {
        name: packageName,
        version: "0.1.0",
        private: true,
        description: `Generated feature package for imported repo ${record.repoUrl}`,
        main: "src/index.tsx",
        exports: {
            ".": "./src/index.tsx"
        },
        dependencies: {
            react: "^19.2.3",
            "react-dom": "^19.2.3"
        },
        devDependencies: {
            "@types/react": "^19",
            "@types/react-dom": "^19",
            typescript: "^5"
        }
    };
    const tsconfig = {
        extends: "../../tsconfig.base.json",
        compilerOptions: {
            noEmit: true
        },
        include: [
            "src/**/*"
        ]
    };
    const previewUrlLiteral = JSON.stringify(record.previewUrl);
    const repoUrlLiteral = JSON.stringify(record.repoUrl);
    const sourcePathLiteral = JSON.stringify(record.sourcePath);
    const titleLiteral = JSON.stringify(featureTitle);
    const readmeLiteral = JSON.stringify(record.readmeExcerpt);
    const featureRoot = `"use client";\n\nconst previewUrl: string | null = ${previewUrlLiteral};\nconst repoUrl = ${repoUrlLiteral};\nconst sourcePath = ${sourcePathLiteral};\nconst title = ${titleLiteral};\nconst readmeExcerpt: string | null = ${readmeLiteral};\n\nexport default function GeneratedFeatureRoot() {\n  return (\n    <div className=\"-m-6 flex h-[calc(100dvh-4.25rem)] min-h-[calc(100dvh-4.25rem)] w-[calc(100%+3rem)] flex-col bg-white\">\n      <main className=\"flex h-full min-h-0 w-full flex-1 flex-col\">\n        {previewUrl ? (\n          <div className=\"flex min-h-0 flex-1 overflow-hidden bg-white\">\n            <iframe\n              src={previewUrl}\n              title={title + " preview"}\n              style={{ width: \"100%\", height: \"100%\", border: 0, backgroundColor: \"#fff\" }}\n              loading=\"lazy\"\n              sandbox=\"allow-scripts allow-same-origin allow-forms allow-popups\"\n            />\n          </div>\n        ) : (\n          <section className=\"h-full w-full overflow-auto bg-white p-4\">\n            <p className=\"text-sm text-slate-700\">\n              No static index.html preview was detected for this repository. You can still use its code from the local folder and adapt it to a native React feature package.\n            </p>\n            {readmeExcerpt ? (\n              <pre className=\"mt-3 max-h-80 overflow-auto rounded-xl bg-white/85 p-3 text-xs leading-6 text-slate-700\">\n                {readmeExcerpt}\n              </pre>\n            ) : null}\n          </section>\n        )}\n      </main>\n    </div>\n  );\n}\n`;
    const indexSource = `import type { ToolboxPlugin } from "@toolbox/plugin-types";\nimport GeneratedFeatureRoot from "./GeneratedFeatureRoot";\n\nconst ${pluginSymbol}: ToolboxPlugin = {\n  id: ${JSON.stringify(`imported-${record.id}`)},\n  name: ${titleLiteral},\n  version: "0.1.0",\n  routes: [\n    {\n      path: ${JSON.stringify(`${routePath}/*`)},\n      element: <GeneratedFeatureRoot />,\n    },\n  ],\n  menu: [\n    {\n      label: ${titleLiteral},\n      to: ${JSON.stringify(routePath)},\n      icon: "Repo",\n    },\n  ],\n};\n\nexport default ${pluginSymbol};\n`;
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(packageDir, "package.json"), JSON.stringify(packageJson, null, 2), "utf8");
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(packageDir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2), "utf8");
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(packageDir, "src", "GeneratedFeatureRoot.tsx"), featureRoot, "utf8");
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(packageDir, "src", "index.tsx"), indexSource, "utf8");
    await registerGeneratedPlugin(packageName, pluginSymbol);
    return {
        packageName,
        routePath
    };
}
async function importRepository(repoUrl) {
    const { owner, repo } = parseGitHubRepo(repoUrl);
    const id = `${owner}-${repo}`;
    const records = await loadImportedRepos();
    const alreadyImported = records.find((record)=>record.id === id || record.repoUrl === repoUrl);
    if (alreadyImported) {
        throw new Error(`Repository already imported as ${alreadyImported.id}.`);
    }
    const tempBase = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdtemp"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].tmpdir(), "toolbox-import-"));
    const tempRepoPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(tempBase, "repo");
    try {
        await runGitClone(repoUrl, tempRepoPath);
        const sourcePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(SOURCE_ROOT, id);
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rm"])(sourcePath, {
            recursive: true,
            force: true
        });
        await copyDirectory(tempRepoPath, sourcePath);
        let previewRoot = await findPreviewRoot(tempRepoPath);
        if (previewRoot && !await isStaticPreviewCompatible(previewRoot)) {
            previewRoot = null;
        }
        if (!previewRoot) {
            previewRoot = await tryBuildPreviewRoot(tempRepoPath);
        }
        let previewUrl = null;
        if (previewRoot) {
            const previewPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(PUBLIC_ROOT, id);
            await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rm"])(previewPath, {
                recursive: true,
                force: true
            });
            await copyDirectory(previewRoot, previewPath);
            await normalizeCopiedPreviewIndex(previewPath);
            previewUrl = `/imported/${id}/index.html`;
        }
        const readmeExcerpt = await readReadme(tempRepoPath);
        const record = {
            id,
            name: repo,
            owner,
            repoUrl,
            importedAt: new Date().toISOString(),
            sourcePath: `packages/imported-repos/${id}`,
            previewUrl,
            readmeExcerpt
        };
        records.unshift(record);
        await saveImportedRepos(records);
        return record;
    } finally{
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rm"])(tempBase, {
            recursive: true,
            force: true
        });
    }
}
async function activateImportedRepository(repoId) {
    const records = await loadImportedRepos();
    const repo = records.find((record)=>record.id === sanitizeSegment(repoId));
    if (!repo) {
        throw new Error("Imported repository not found.");
    }
    if (repo.activatedFeaturePackage) {
        throw new Error(`Repository already activated as ${repo.activatedFeaturePackage}.`);
    }
    const { packageName, routePath } = await scaffoldFeaturePackage(repo);
    const updatedRepo = {
        ...repo,
        activatedFeaturePackage: packageName,
        activatedRoute: routePath,
        activatedAt: new Date().toISOString()
    };
    const nextRecords = records.map((record)=>record.id === repo.id ? updatedRepo : record);
    await saveImportedRepos(nextRecords);
    return updatedRepo;
}
async function deleteImportedRepository(repoId) {
    const sanitizedId = sanitizeSegment(repoId);
    const records = await loadImportedRepos();
    const repo = records.find((record)=>record.id === sanitizedId);
    if (!repo) {
        throw new Error("Imported repository not found.");
    }
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rm"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(SOURCE_ROOT, repo.id), {
        recursive: true,
        force: true
    });
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rm"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(PUBLIC_ROOT, repo.id), {
        recursive: true,
        force: true
    });
    if (repo.activatedFeaturePackage) {
        const pluginSymbol = `feature${toPascalCase(repo.id)}Plugin`;
        const featurePackageDir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(process.cwd(), "..", repo.activatedFeaturePackage);
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rm"])(featurePackageDir, {
            recursive: true,
            force: true
        });
        await unregisterGeneratedPlugin(repo.activatedFeaturePackage, pluginSymbol);
    }
    const nextRecords = records.filter((record)=>record.id !== repo.id);
    await saveImportedRepos(nextRecords);
    return {
        deletedId: repo.id
    };
}
}),
"[project]/packages/toolbox/src/app/api/repo-import/activate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$lib$2f$repo$2d$import$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/lib/repo-import.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
async function POST(request) {
    try {
        const body = await request.json();
        const repoId = body.repoId?.trim();
        if (!repoId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "repoId is required."
            }, {
                status: 400
            });
        }
        const activated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$lib$2f$repo$2d$import$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activateImportedRepository"])(repoId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            activated
        }, {
            status: 201
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to activate repository.";
        const status = message.includes("already activated") || message.includes("already exists") ? 409 : 400;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__52672f22._.js.map