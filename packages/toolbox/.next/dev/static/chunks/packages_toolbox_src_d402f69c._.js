(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImportedRepoViewer",
    ()=>ImportedRepoViewer,
    "RepoImporterRoot",
    ()=>RepoImporterRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString();
}
function logImportDebug(event, payload) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (payload) {
        console.log(`[RepoImportDebug] ${event}`, payload);
        return;
    }
    console.log(`[RepoImportDebug] ${event}`);
}
function useImportedRepos() {
    _s();
    const [repos, setRepos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const refresh = async ()=>{
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("/api/repo-import", {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Cache-Control": "no-cache"
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to load imports.");
            }
            setRepos(Array.isArray(data.repos) ? data.repos : []);
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Failed to load imports.");
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useImportedRepos.useEffect": ()=>{
            refresh();
        }
    }["useImportedRepos.useEffect"], []);
    return {
        repos,
        loading,
        error,
        refresh
    };
}
_s(useImportedRepos, "GrRmcS6GicdEfCpu0UeykVXPVLY=");
function RepoImporterRoot() {
    _s1();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNavigate"])();
    const { repos, loading, error, refresh } = useImportedRepos();
    const [repoUrl, setRepoUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [importing, setImporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transformLevel, setTransformLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("balanced");
    const [activatingRepoId, setActivatingRepoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletingRepoId, setDeletingRepoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleImport = async (event)=>{
        event.preventDefault();
        setStatus(null);
        setSubmitError(null);
        const trimmed = repoUrl.trim();
        if (!trimmed) {
            setSubmitError("Please paste a repository URL.");
            return;
        }
        try {
            setImporting(true);
            const response = await fetch("/api/repo-import", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    repoUrl: trimmed
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Import failed.");
            }
            setStatus(`Imported ${data.imported?.id ?? "repository"} successfully.`);
            setRepoUrl("");
            await refresh();
        } catch (importError) {
            setSubmitError(importError instanceof Error ? importError.message : "Import failed.");
        } finally{
            setImporting(false);
        }
    };
    const handleActivate = async (repoId)=>{
        setStatus(null);
        setSubmitError(null);
        try {
            setActivatingRepoId(repoId);
            const response_0 = await fetch("/api/repo-import/activate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    repoId,
                    transformLevel
                })
            });
            const data_0 = await response_0.json();
            if (!response_0.ok) {
                throw new Error(data_0.error || "Feature activation failed.");
            }
            setStatus(`Activated ${data_0.activated?.name ?? repoId} as ${data_0.activated?.activatedFeaturePackage ?? "feature package"} using ${transformLevel} mode. Restart dev server to load it.`);
            await refresh();
            if (data_0.activated?.activatedRoute) {
                navigate(data_0.activated.activatedRoute);
            }
        } catch (activationError) {
            try {
                const fallbackResponse = await fetch("/api/repo-import", {
                    method: "GET",
                    cache: "no-store",
                    headers: {
                        "Cache-Control": "no-cache"
                    }
                });
                const fallbackData = await fallbackResponse.json();
                const activatedRepo = fallbackData.repos?.find((repo)=>repo.id === repoId && repo.activatedRoute);
                if (activatedRepo?.activatedRoute) {
                    setStatus(`Activated ${activatedRepo.name}. Opening native feature...`);
                    await refresh();
                    navigate(activatedRepo.activatedRoute);
                    return;
                }
            } catch  {
            // Fallback check is best-effort only.
            }
            setSubmitError(activationError instanceof Error ? activationError.message : "Feature activation failed.");
        } finally{
            setActivatingRepoId(null);
        }
    };
    const handleDelete = async (repo_0)=>{
        const confirmed = window.confirm(`Delete ${repo_0.name}? This removes downloaded files and generated feature package (if activated).`);
        if (!confirmed) {
            return;
        }
        setStatus(null);
        setSubmitError(null);
        try {
            setDeletingRepoId(repo_0.id);
            const response_1 = await fetch("/api/repo-import", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    repoId: repo_0.id
                })
            });
            const data_1 = await response_1.json();
            if (!response_1.ok) {
                throw new Error(data_1.error || "Delete failed.");
            }
            setStatus(`Deleted ${data_1.deleted?.deletedId ?? repo_0.id}.`);
            await refresh();
        } catch (deleteError) {
            setSubmitError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
        } finally{
            setDeletingRepoId(null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "playful-bg min-h-dvh px-4 py-6 md:px-8 md:py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto w-full max-w-6xl space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "glass-card rounded-3xl p-5 md:p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700",
                            children: "REPOSITORY IMPORT WIZARD"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-3 text-2xl font-semibold text-slate-900 md:text-4xl",
                            children: "Import A New Project"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 max-w-3xl text-sm leading-7 text-slate-700 md:text-base",
                            children: "Paste a GitHub repository URL. Toolbox will clone it into your local workspace under packages/imported-repos and create a new in-app page."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "glass-card rounded-2xl p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleImport,
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "repo-url",
                                    className: "text-sm font-semibold text-slate-700",
                                    children: "GitHub Repository URL"
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "repo-url",
                                    value: repoUrl,
                                    onChange: (event_0)=>setRepoUrl(event_0.target.value),
                                    placeholder: "https://github.com/owner/repository",
                                    className: "h-12 w-full rounded-xl border-2 border-emerald-200 bg-white/90 px-3 text-sm outline-none transition focus:border-emerald-500"
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-semibold text-slate-700",
                                            htmlFor: "transform-level",
                                            children: "Native Transform Level"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 238,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: "transform-level",
                                            value: transformLevel,
                                            onChange: (event_1)=>setTransformLevel(event_1.target.value),
                                            className: "h-11 rounded-xl border-2 border-slate-300 bg-white/90 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "safe",
                                                    children: "safe (low risk only)"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "balanced",
                                                    children: "balanced (recommended)"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "strict",
                                                    children: "strict (prefer native)"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 241,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: importing,
                                            className: "h-11 rounded-xl border-2 border-emerald-500 bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60",
                                            children: importing ? "Importing..." : "Import Repository"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 246,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-600",
                                            children: "Requires Git installed on this machine."
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this),
                        status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-semibold text-emerald-700",
                            children: status
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 253,
                            columnNumber: 21
                        }, this) : null,
                        submitError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-semibold text-rose-700",
                            children: submitError
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 254,
                            columnNumber: 26
                        }, this) : null,
                        error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-semibold text-rose-700",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 255,
                            columnNumber: 20
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 231,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold text-slate-900",
                            children: "Imported Projects"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this),
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-card rounded-2xl p-4 text-sm text-slate-700",
                            children: "Loading imported repositories..."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 261,
                            columnNumber: 22
                        }, this) : null,
                        !loading && repos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-card rounded-2xl p-4 text-sm text-slate-700",
                            children: "No repositories imported yet."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 263,
                            columnNumber: 45
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-3 md:grid-cols-2",
                            children: repos.map((repo_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "glass-card rounded-2xl p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold tracking-wider text-slate-500",
                                            children: repo_1.owner
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 269,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mt-1 text-lg font-semibold text-slate-900",
                                            children: repo_1.name
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 270,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-slate-600",
                                            children: [
                                                "Imported: ",
                                                formatDate(repo_1.importedAt)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 271,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-slate-600",
                                            children: [
                                                "Stored at: ",
                                                repo_1.sourcePath
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this),
                                        repo_1.activatedFeaturePackage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs font-semibold text-emerald-700",
                                            children: [
                                                "Active native feature: ",
                                                repo_1.activatedFeaturePackage
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 273,
                                            columnNumber: 51
                                        }, this) : null,
                                        repo_1.nativeScaffoldMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-slate-700",
                                            children: [
                                                "Scaffold mode: ",
                                                repo_1.nativeScaffoldMode,
                                                " (",
                                                repo_1.nativeTransformLevel ?? "balanced",
                                                ")",
                                                repo_1.nativeRiskBand ? ` • risk ${repo_1.nativeRiskBand}` : "",
                                                typeof repo_1.nativeRiskScore === "number" ? ` (${repo_1.nativeRiskScore})` : ""
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 276,
                                            columnNumber: 46
                                        }, this) : null,
                                        repo_1.nativeScaffoldReason ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-slate-600",
                                            children: repo_1.nativeScaffoldReason
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 281,
                                            columnNumber: 48
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex flex-wrap gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>navigate(`/imported/${repo_1.id}`),
                                                    className: "rounded-lg border-2 border-emerald-300 bg-white/90 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50",
                                                    children: "Open Page"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 19
                                                }, this),
                                                repo_1.previewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: repo_1.previewUrl,
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    className: "rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100",
                                                    children: "Open Static Preview"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 40
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: Boolean(repo_1.activatedFeaturePackage) || activatingRepoId === repo_1.id,
                                                    onClick: ()=>handleActivate(repo_1.id),
                                                    className: "rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60",
                                                    children: repo_1.activatedFeaturePackage ? "Native Feature Ready" : activatingRepoId === repo_1.id ? "Activating..." : "Activate As Native Feature"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 19
                                                }, this),
                                                repo_1.activatedRoute ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>navigate(repo_1.activatedRoute),
                                                    className: "rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100",
                                                    children: "Open Native Feature"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 44
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: deletingRepoId === repo_1.id,
                                                    onClick: ()=>handleDelete(repo_1),
                                                    className: "rounded-lg border-2 border-rose-300 bg-white px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60",
                                                    children: deletingRepoId === repo_1.id ? "Deleting..." : "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 283,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, repo_1.id, true, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 268,
                                    columnNumber: 34
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 267,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 258,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 220,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
        lineNumber: 219,
        columnNumber: 10
    }, this);
}
_s1(RepoImporterRoot, "A4NaN7gfz89Uz2+atwPvAh4+s+c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNavigate"],
        useImportedRepos
    ];
});
_c = RepoImporterRoot;
function ImportedRepoViewer() {
    _s2();
    const { repoId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useParams"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNavigate"])();
    const { repos, loading, error } = useImportedRepos();
    const iframeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [embedState, setEmbedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("loading");
    const repo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ImportedRepoViewer.useMemo[repo]": ()=>repos.find({
                "ImportedRepoViewer.useMemo[repo]": (item)=>item.id === repoId
            }["ImportedRepoViewer.useMemo[repo]"])
    }["ImportedRepoViewer.useMemo[repo]"], [
        repos,
        repoId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImportedRepoViewer.useEffect": ()=>{
            if (!repo?.previewUrl) {
                setEmbedState("failed");
                return;
            }
            setEmbedState("loading");
            const timeout = window.setTimeout({
                "ImportedRepoViewer.useEffect.timeout": ()=>{
                    setEmbedState("failed");
                }
            }["ImportedRepoViewer.useEffect.timeout"], 8000);
            return ({
                "ImportedRepoViewer.useEffect": ()=>{
                    window.clearTimeout(timeout);
                }
            })["ImportedRepoViewer.useEffect"];
        }
    }["ImportedRepoViewer.useEffect"], [
        repo?.id,
        repo?.previewUrl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImportedRepoViewer.useEffect": ()=>{
            logImportDebug("ImportedRepoViewer render", {
                repoId,
                loading,
                hasError: Boolean(error),
                hasRepo: Boolean(repo),
                previewUrl: repo?.previewUrl ?? null,
                embedState
            });
        }
    }["ImportedRepoViewer.useEffect"], [
        repoId,
        loading,
        error,
        repo,
        embedState
    ]);
    const handleFrameLoad = ()=>{
        logImportDebug("ImportedRepoViewer iframe load", {
            repoId,
            previewUrl: repo?.previewUrl ?? null
        });
        window.setTimeout(()=>{
            const frame = iframeRef.current;
            if (!frame) {
                logImportDebug("ImportedRepoViewer iframe missing ref", {
                    repoId
                });
                setEmbedState("failed");
                return;
            }
            try {
                const doc = frame.contentDocument;
                const body = doc?.body;
                const root = body?.querySelector("#root, #app, #__next");
                const textLength = body?.textContent?.replace(/\s+/g, "").length ?? 0;
                const rootChildCount = root?.childElementCount ?? 0;
                const bodyChildCount = body?.childElementCount ?? 0;
                logImportDebug("ImportedRepoViewer iframe DOM stats", {
                    repoId,
                    frameUrl: frame.src,
                    textLength,
                    rootChildCount,
                    bodyChildCount
                });
                if (textLength === 0 && rootChildCount === 0 && bodyChildCount <= 1) {
                    logImportDebug("ImportedRepoViewer iframe appears blank", {
                        repoId,
                        frameUrl: frame.src
                    });
                    setEmbedState("failed");
                    return;
                }
            } catch (inspectError) {
                // If browser blocks frame inspection, still keep embedded view available.
                logImportDebug("ImportedRepoViewer iframe inspection blocked", {
                    repoId,
                    message: inspectError instanceof Error ? inspectError.message : String(inspectError)
                });
            }
            logImportDebug("ImportedRepoViewer iframe marked ready", {
                repoId
            });
            setEmbedState("ready");
        }, 600);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: "2rem"
            },
            children: "Loading imported project..."
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 392,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                color: "#b91c1c",
                padding: "2rem"
            },
            children: [
                "Error: ",
                error
            ]
        }, void 0, true, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 397,
            columnNumber: 12
        }, this);
    }
    if (!repo) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "playful-bg min-h-dvh px-4 py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-4xl rounded-2xl bg-white/85 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-slate-900",
                        children: "Imported project not found."
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 405,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>navigate("/import"),
                        className: "mt-3 rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                        children: "Back To Import Wizard"
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 406,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                lineNumber: 404,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 403,
            columnNumber: 12
        }, this);
    }
    if (!repo.previewUrl) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "playful-bg min-h-dvh px-4 py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-4xl rounded-2xl bg-white/85 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-slate-900",
                        children: repo.name
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 415,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-slate-700",
                        children: [
                            "This repository was downloaded to ",
                            repo.sourcePath,
                            ", but no static index.html preview was detected."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 416,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-slate-700",
                        children: "You can still use the code locally from that folder and wire it into a Toolbox feature package."
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 419,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>navigate("/import"),
                        className: "mt-3 rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                        children: "Back To Import Wizard"
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 422,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                lineNumber: 414,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 413,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "playful-bg min-h-dvh px-4 py-4 md:px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex w-full max-w-7xl flex-col gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-card flex flex-wrap items-center justify-between gap-2 rounded-2xl p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold text-slate-900",
                                    children: repo.name
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 432,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-600",
                                    children: repo.repoUrl
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 433,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 431,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: repo.previewUrl,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                                    children: "Open Static Preview"
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 436,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>navigate("/import"),
                                    className: "rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                                    children: "Back To Import Wizard"
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 439,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 435,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 430,
                    columnNumber: 9
                }, this),
                embedState === "failed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "glass-card rounded-2xl border border-emerald-100 p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-slate-900",
                            children: "Embedded preview could not be rendered."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 446,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-slate-700",
                            children: "This repository may require a build step or block iframe embedding. Use Open Static Preview to open it directly."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 447,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: repo.previewUrl,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "inline-flex rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white",
                                children: "Open Static Preview"
                            }, void 0, false, {
                                fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                lineNumber: 451,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 450,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 445,
                    columnNumber: 36
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-card overflow-hidden rounded-2xl border border-emerald-100",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        ref: iframeRef,
                        src: repo.previewUrl,
                        onLoad: handleFrameLoad,
                        onError: ()=>{
                            logImportDebug("ImportedRepoViewer iframe error event", {
                                repoId,
                                previewUrl: repo.previewUrl
                            });
                            setEmbedState("failed");
                        },
                        title: `${repo.name} preview`,
                        style: {
                            width: "100%",
                            height: "80vh",
                            border: 0,
                            backgroundColor: "#fff"
                        }
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 456,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 455,
                    columnNumber: 24
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 429,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
        lineNumber: 428,
        columnNumber: 10
    }, this);
}
_s2(ImportedRepoViewer, "8aQXd+qXKMB7s3AYtZse0NodBqs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNavigate"],
        useImportedRepos
    ];
});
_c1 = ImportedRepoViewer;
var _c, _c1;
__turbopack_context__.k.register(_c, "RepoImporterRoot");
__turbopack_context__.k.register(_c1, "ImportedRepoViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/toolbox/src/plugins/repo-importer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$RepoImporterRoot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx [app-client] (ecmascript)");
;
;
const repoImporterPlugin = {
    id: "repo-importer",
    name: "Repo Import Wizard",
    version: "0.1.0",
    routes: [
        {
            path: "/import",
            element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$RepoImporterRoot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepoImporterRoot"], {}, void 0, false, {
                fileName: "[project]/packages/toolbox/src/plugins/repo-importer.tsx",
                lineNumber: 11,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        },
        {
            path: "/imported/:repoId/*",
            element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$RepoImporterRoot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImportedRepoViewer"], {}, void 0, false, {
                fileName: "[project]/packages/toolbox/src/plugins/repo-importer.tsx",
                lineNumber: 15,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        }
    ],
    menu: [
        {
            label: "Repo Import",
            to: "/import",
            icon: "Import"
        }
    ]
};
const __TURBOPACK__default__export__ = repoImporterPlugin;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/toolbox/src/plugins/generated-imports.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generatedPlugins",
    ()=>generatedPlugins
]);
// AUTO-GENERATED IMPORTS - do not edit manually.
// __AUTO_IMPORTS_START__
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$hello$2d$world$2f$src$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-octocat-hello-world/src/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$spoon$2d$knife$2f$src$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-octocat-spoon-knife/src/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$grand$2d$opening$2f$src$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-fatkin1012-grand-opening/src/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-fatkin1012-sap-local-wiki/src/index.tsx [app-client] (ecmascript)");
;
;
;
;
const generatedPlugins = [
    // __AUTO_PLUGINS_START__
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$hello$2d$world$2f$src$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$spoon$2d$knife$2f$src$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$grand$2d$opening$2f$src$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/toolbox/src/plugin-registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPlugins",
    ()=>getPlugins,
    "initializePlugins",
    ()=>initializePlugins,
    "registerPlugin",
    ()=>registerPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$repo$2d$importer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/plugins/repo-importer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$generated$2d$imports$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/plugins/generated-imports.ts [app-client] (ecmascript)");
;
;
/**
 * Plugin Registry
 * 中央位置管理和載入所有工具箱功能包
 * 每個 feature-* 套件都應該匯出一個 ToolboxPlugin 物件
 */ let registeredPlugins = [];
let pluginsInitialized = false;
function getPlugins() {
    return registeredPlugins;
}
function registerPlugin(plugin) {
    const exists = registeredPlugins.some((p)=>p.id === plugin.id);
    if (exists) {
        return;
    }
    registeredPlugins.push(plugin);
}
async function initializePlugins() {
    if (pluginsInitialized) {
        return;
    }
    try {
        registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$repo$2d$importer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$generated$2d$imports$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generatedPlugins"].forEach((plugin)=>{
            registerPlugin(plugin);
        });
        // 導入 SAP Playbook 功能包
        const sapPlaybookModule = await __turbopack_context__.A("[project]/packages/features-sap-playbook/src/index.tsx [app-client] (ecmascript, async loader)");
        if (sapPlaybookModule.default) {
            registerPlugin(sapPlaybookModule.default);
        }
        // 這裡可以動態添加更多功能包
        // const projectModule = await import("features-project");
        // if (projectModule.default) registerPlugin(projectModule.default);
        pluginsInitialized = true;
        console.log(`✓ Initialized ${registeredPlugins.length} plugin(s)`);
    } catch (error) {
        console.warn("Failed to initialize some plugins:", error);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/toolbox/src/app/(toolbox)/app-router/app-router.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "app-router-module__JYRw2W__container",
  "content": "app-router-module__JYRw2W__content",
  "dashboard": "app-router-module__JYRw2W__dashboard",
  "dashboardHeader": "app-router-module__JYRw2W__dashboardHeader",
  "emptyState": "app-router-module__JYRw2W__emptyState",
  "featureButton": "app-router-module__JYRw2W__featureButton",
  "featureCard": "app-router-module__JYRw2W__featureCard",
  "featureGrid": "app-router-module__JYRw2W__featureGrid",
  "featureIcon": "app-router-module__JYRw2W__featureIcon",
  "homeButton": "app-router-module__JYRw2W__homeButton",
  "icon": "app-router-module__JYRw2W__icon",
  "main": "app-router-module__JYRw2W__main",
  "notFound": "app-router-module__JYRw2W__notFound",
  "topNav": "app-router-module__JYRw2W__topNav",
  "topNavItem": "app-router-module__JYRw2W__topNavItem",
  "topbar": "app-router-module__JYRw2W__topbar",
  "welcome": "app-router-module__JYRw2W__welcome",
});
}),
"[project]/packages/toolbox/src/app/app/[...slug]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-router-dom/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugin$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/plugin-registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/app/(toolbox)/app-router/app-router.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
/**
 * SPA Router Component
 * 使用 react-router-dom 實現客戶端路由
 * 從 plugin-registry 動態載入所有指定的 plugins
 */ function AppRouterContent() {
    _s();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNavigate"])();
    const [plugins, setPlugins] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppRouterContent.useEffect": ()=>{
            async function loadPlugins() {
                try {
                    setLoading(true);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugin$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializePlugins"])();
                    const registeredPlugins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugin$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlugins"])();
                    setPlugins(registeredPlugins);
                    if (registeredPlugins.length === 0) {
                        setError("No plugins found.");
                    }
                } catch (err) {
                    setError(`Failed to load plugins: ${err}`);
                } finally{
                    setLoading(false);
                }
            }
            loadPlugins();
        }
    }["AppRouterContent.useEffect"], []);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: "2rem"
            },
            children: "Loading plugins..."
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
            lineNumber: 40,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                color: "red",
                padding: "2rem"
            },
            children: [
                "Error: ",
                error
            ]
        }, void 0, true, {
            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
            lineNumber: 45,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].topbar,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: "🧰 Toolbox"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].topNav,
                            "aria-label": "Tool navigation",
                            children: plugins.flatMap((plugin)=>plugin.menu.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Link"], {
                                        to: item.to,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].topNavItem,
                                        children: [
                                            item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon,
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                lineNumber: 56,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                lineNumber: 57,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `${plugin.id}-${item.to}`, true, {
                                        fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                        lineNumber: 55,
                                        columnNumber: 64
                                    }, this)))
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].homeButton,
                            onClick: ()=>navigate("/"),
                            title: "Back to home",
                            children: "🏠"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Routes"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Route"], {
                                path: "/",
                                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardHeader,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    children: "🧰 Toolbox"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 21
                                                }, void 0),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "Select a feature to get started"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 21
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                            lineNumber: 70,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].featureGrid,
                                            children: plugins.map((plugin_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].featureCard,
                                                    children: plugin_0.menu.map((item_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>navigate(item_0.to),
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].featureButton,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].featureIcon,
                                                                    children: item_0.icon || "📦"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                                    lineNumber: 78,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    children: item_0.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                                    lineNumber: 81,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: plugin_0.name || plugin_0.id
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                                    lineNumber: 82,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            ]
                                                        }, item_0.to, true, {
                                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                            lineNumber: 77,
                                                            columnNumber: 54
                                                        }, void 0))
                                                }, plugin_0.id, false, {
                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 46
                                                }, void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 19
                                        }, void 0),
                                        plugins.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "No features available at this time."
                                            }, void 0, false, {
                                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 23
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                            lineNumber: 87,
                                            columnNumber: 44
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 38
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this),
                            plugins.map((plugin_1)=>plugin_1.routes.map((route, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Route"], {
                                        path: route.path,
                                        element: route.element
                                    }, `${plugin_1.id}-route-${index}`, false, {
                                        fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                        lineNumber: 93,
                                        columnNumber: 76
                                    }, this))),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Route"], {
                                path: "*",
                                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notFound,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "404 - Page Not Found"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                            lineNumber: 97,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Link"], {
                                                to: "/",
                                                children: "Back to home"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                lineNumber: 99,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                            lineNumber: 98,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 38
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
        lineNumber: 50,
        columnNumber: 10
    }, this);
}
_s(AppRouterContent, "66YvfKPjwSpmPUqa5pvJtVXoGnw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNavigate"]
    ];
});
_c = AppRouterContent;
function AppRouter() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "aa3e7bb39009741c8447c282e7ec679cf77e290ce955544e888c57aaee30f5be") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "aa3e7bb39009741c8447c282e7ec679cf77e290ce955544e888c57aaee30f5be";
    }
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "AppRouter[useEffect()]": ()=>{
                if ("TURBOPACK compile-time truthy", 1) {
                    if ("serviceWorker" in navigator) {
                        navigator.serviceWorker.getRegistrations().then(_AppRouterUseEffectAnonymous);
                    }
                    if ("caches" in window) {
                        caches.keys().then(_AppRouterUseEffectAnonymous2);
                    }
                }
                setMounted(true);
            }
        })["AppRouter[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect(t0, t1);
    if (!mounted) {
        let t2;
        if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
            t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "2rem"
                },
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                lineNumber: 143,
                columnNumber: 12
            }, this);
            $[3] = t2;
        } else {
            t2 = $[3];
        }
        return t2;
    }
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BrowserRouter"], {
            basename: "/app",
            future: {
                v7_startTransition: true,
                v7_relativeSplatPath: true
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppRouterContent, {}, void 0, false, {
                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                lineNumber: 157,
                columnNumber: 8
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
            lineNumber: 154,
            columnNumber: 10
        }, this);
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_s1(AppRouter, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c1 = AppRouter;
function _AppRouterUseEffectAnonymous2(keys) {
    keys.forEach(_AppRouterUseEffectAnonymousKeysForEach);
}
function _AppRouterUseEffectAnonymousKeysForEach(key) {
    caches.delete(key);
}
function _AppRouterUseEffectAnonymous(registrations) {
    registrations.forEach(_AppRouterUseEffectAnonymousRegistrationsForEach);
}
function _AppRouterUseEffectAnonymousRegistrationsForEach(registration) {
    registration.unregister();
}
var _c, _c1;
__turbopack_context__.k.register(_c, "AppRouterContent");
__turbopack_context__.k.register(_c1, "AppRouter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=packages_toolbox_src_d402f69c._.js.map