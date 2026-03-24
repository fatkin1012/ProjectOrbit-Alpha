module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImportedRepoViewer",
    ()=>ImportedRepoViewer,
    "RepoImporterRoot",
    ()=>RepoImporterRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/index.js [app-ssr] (ecmascript) <locals>");
"use client";
;
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
    const [repos, setRepos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refresh();
    }, []);
    return {
        repos,
        loading,
        error,
        refresh
    };
}
function RepoImporterRoot() {
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNavigate"])();
    const { repos, loading, error, refresh } = useImportedRepos();
    const [repoUrl, setRepoUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [importing, setImporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activatingRepoId, setActivatingRepoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletingRepoId, setDeletingRepoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
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
            const response = await fetch("/api/repo-import/activate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    repoId
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Feature activation failed.");
            }
            setStatus(`Activated ${data.activated?.name ?? repoId} as ${data.activated?.activatedFeaturePackage ?? "feature package"}. Restart dev server to load it.`);
            await refresh();
            if (data.activated?.activatedRoute) {
                navigate(data.activated.activatedRoute);
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
    const handleDelete = async (repo)=>{
        const confirmed = window.confirm(`Delete ${repo.name}? This removes downloaded files and generated feature package (if activated).`);
        if (!confirmed) {
            return;
        }
        setStatus(null);
        setSubmitError(null);
        try {
            setDeletingRepoId(repo.id);
            const response = await fetch("/api/repo-import", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    repoId: repo.id
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Delete failed.");
            }
            setStatus(`Deleted ${data.deleted?.deletedId ?? repo.id}.`);
            await refresh();
        } catch (deleteError) {
            setSubmitError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
        } finally{
            setDeletingRepoId(null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "playful-bg min-h-dvh px-4 py-6 md:px-8 md:py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto w-full max-w-6xl space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "glass-card rounded-3xl p-5 md:p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700",
                            children: "REPOSITORY IMPORT WIZARD"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-3 text-2xl font-semibold text-slate-900 md:text-4xl",
                            children: "Import A New Project"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 max-w-3xl text-sm leading-7 text-slate-700 md:text-base",
                            children: "Paste a GitHub repository URL. Toolbox will clone it into your local workspace under packages/imported-repos and create a new in-app page."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 219,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "glass-card rounded-2xl p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleImport,
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "repo-url",
                                    className: "text-sm font-semibold text-slate-700",
                                    children: "GitHub Repository URL"
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "repo-url",
                                    value: repoUrl,
                                    onChange: (event)=>setRepoUrl(event.target.value),
                                    placeholder: "https://github.com/owner/repository",
                                    className: "h-12 w-full rounded-xl border-2 border-emerald-200 bg-white/90 px-3 text-sm outline-none transition focus:border-emerald-500"
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: importing,
                                            className: "h-11 rounded-xl border-2 border-emerald-500 bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60",
                                            children: importing ? "Importing..." : "Import Repository"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 242,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this),
                        status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-semibold text-emerald-700",
                            children: status
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 253,
                            columnNumber: 21
                        }, this) : null,
                        submitError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-semibold text-rose-700",
                            children: submitError
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 254,
                            columnNumber: 26
                        }, this) : null,
                        error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    lineNumber: 229,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold text-slate-900",
                            children: "Imported Projects"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this),
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-card rounded-2xl p-4 text-sm text-slate-700",
                            children: "Loading imported repositories..."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 262,
                            columnNumber: 13
                        }, this) : null,
                        !loading && repos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-card rounded-2xl p-4 text-sm text-slate-700",
                            children: "No repositories imported yet."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-3 md:grid-cols-2",
                            children: repos.map((repo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "glass-card rounded-2xl p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold tracking-wider text-slate-500",
                                            children: repo.owner
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 274,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mt-1 text-lg font-semibold text-slate-900",
                                            children: repo.name
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 275,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-slate-600",
                                            children: [
                                                "Imported: ",
                                                formatDate(repo.importedAt)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 276,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-slate-600",
                                            children: [
                                                "Stored at: ",
                                                repo.sourcePath
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 277,
                                            columnNumber: 17
                                        }, this),
                                        repo.activatedFeaturePackage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs font-semibold text-emerald-700",
                                            children: [
                                                "Active native feature: ",
                                                repo.activatedFeaturePackage
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 279,
                                            columnNumber: 19
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex flex-wrap gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>navigate(`/imported/${repo.id}`),
                                                    className: "rounded-lg border-2 border-emerald-300 bg-white/90 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50",
                                                    children: "Open Page"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 19
                                                }, this),
                                                repo.previewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: repo.previewUrl,
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    className: "rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100",
                                                    children: "Open Static Preview"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 21
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: Boolean(repo.activatedFeaturePackage) || activatingRepoId === repo.id,
                                                    onClick: ()=>handleActivate(repo.id),
                                                    className: "rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60",
                                                    children: repo.activatedFeaturePackage ? "Native Feature Ready" : activatingRepoId === repo.id ? "Activating..." : "Activate As Native Feature"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 19
                                                }, this),
                                                repo.activatedRoute ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>navigate(repo.activatedRoute),
                                                    className: "rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100",
                                                    children: "Open Native Feature"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 21
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: deletingRepoId === repo.id,
                                                    onClick: ()=>handleDelete(repo),
                                                    className: "rounded-lg border-2 border-rose-300 bg-white px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60",
                                                    children: deletingRepoId === repo.id ? "Deleting..." : "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 284,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, repo.id, true, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 273,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 271,
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
            lineNumber: 218,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
}
function ImportedRepoViewer() {
    const { repoId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useParams"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNavigate"])();
    const { repos, loading, error } = useImportedRepos();
    const iframeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [embedState, setEmbedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("loading");
    const repo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>repos.find((item)=>item.id === repoId), [
        repos,
        repoId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!repo?.previewUrl) {
            setEmbedState("failed");
            return;
        }
        setEmbedState("loading");
        const timeout = window.setTimeout(()=>{
            setEmbedState("failed");
        }, 8000);
        return ()=>{
            window.clearTimeout(timeout);
        };
    }, [
        repo?.id,
        repo?.previewUrl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        logImportDebug("ImportedRepoViewer render", {
            repoId,
            loading,
            hasError: Boolean(error),
            hasRepo: Boolean(repo),
            previewUrl: repo?.previewUrl ?? null,
            embedState
        });
    }, [
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: "2rem"
            },
            children: "Loading imported project..."
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 430,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            lineNumber: 434,
            columnNumber: 12
        }, this);
    }
    if (!repo) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "playful-bg min-h-dvh px-4 py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-4xl rounded-2xl bg-white/85 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-slate-900",
                        children: "Imported project not found."
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 441,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>navigate("/import"),
                        className: "mt-3 rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                        children: "Back To Import Wizard"
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                lineNumber: 440,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 439,
            columnNumber: 7
        }, this);
    }
    if (!repo.previewUrl) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "playful-bg min-h-dvh px-4 py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-4xl rounded-2xl bg-white/85 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-slate-900",
                        children: repo.name
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 458,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-slate-700",
                        children: [
                            "This repository was downloaded to ",
                            repo.sourcePath,
                            ", but no static index.html preview was detected."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 459,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-slate-700",
                        children: "You can still use the code locally from that folder and wire it into a Toolbox feature package."
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 462,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>navigate("/import"),
                        className: "mt-3 rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                        children: "Back To Import Wizard"
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 465,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                lineNumber: 457,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 456,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "playful-bg min-h-dvh px-4 py-4 md:px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex w-full max-w-7xl flex-col gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-card flex flex-wrap items-center justify-between gap-2 rounded-2xl p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold text-slate-900",
                                    children: repo.name
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 482,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-600",
                                    children: repo.repoUrl
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 483,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 481,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: repo.previewUrl,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                                    children: "Open Static Preview"
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 486,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>navigate("/import"),
                                    className: "rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                                    children: "Back To Import Wizard"
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 494,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 485,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 480,
                    columnNumber: 9
                }, this),
                embedState === "failed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "glass-card rounded-2xl border border-emerald-100 p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-slate-900",
                            children: "Embedded preview could not be rendered."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 506,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-slate-700",
                            children: "This repository may require a build step or block iframe embedding. Use Open Static Preview to open it directly."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 507,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: repo.previewUrl,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "inline-flex rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white",
                                children: "Open Static Preview"
                            }, void 0, false, {
                                fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                lineNumber: 511,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 510,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 505,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-card overflow-hidden rounded-2xl border border-emerald-100",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
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
                        lineNumber: 523,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 522,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 479,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
        lineNumber: 478,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/toolbox/src/plugins/repo-importer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$RepoImporterRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx [app-ssr] (ecmascript)");
;
;
const repoImporterPlugin = {
    id: "repo-importer",
    name: "Repo Import Wizard",
    version: "0.1.0",
    routes: [
        {
            path: "/import",
            element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$RepoImporterRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepoImporterRoot"], {}, void 0, false, {
                fileName: "[project]/packages/toolbox/src/plugins/repo-importer.tsx",
                lineNumber: 11,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        },
        {
            path: "/imported/:repoId/*",
            element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$RepoImporterRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImportedRepoViewer"], {}, void 0, false, {
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
}),
"[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeneratedFeatureRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const previewUrl = null;
const repoUrl = "https://github.com/octocat/Hello-World";
const sourcePath = "packages/imported-repos/octocat-hello-world";
const title = "Hello World";
const readmeExcerpt = null;
function GeneratedFeatureRoot() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "playful-bg min-h-dvh px-4 py-5 md:px-8 md:py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto w-full max-w-7xl space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "glass-card rounded-2xl p-4 md:p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold tracking-wider text-slate-600",
                            children: "IMPORTED FEATURE"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-1 text-2xl font-semibold text-slate-900 md:text-3xl",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-slate-700",
                            children: [
                                "Source repository: ",
                                repoUrl
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-slate-600",
                            children: [
                                "Local files: ",
                                sourcePath
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this),
                ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "glass-card rounded-2xl p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-700",
                            children: "No static index.html preview was detected for this repository. You can still use its code from the local folder and adapt it to a native React feature package."
                        }, void 0, false, {
                            fileName: "[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this),
                        ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/features-octocat-hello-world/src/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$hello$2d$world$2f$src$2f$GeneratedFeatureRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-octocat-hello-world/src/GeneratedFeatureRoot.tsx [app-ssr] (ecmascript)");
;
;
const featureOctocatHelloWorldPlugin = {
    id: "imported-octocat-hello-world",
    name: "Hello World",
    version: "0.1.0",
    routes: [
        {
            path: "/repo-octocat-hello-world/*",
            element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$hello$2d$world$2f$src$2f$GeneratedFeatureRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/packages/features-octocat-hello-world/src/index.tsx",
                lineNumber: 11,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        }
    ],
    menu: [
        {
            label: "Hello World",
            to: "/repo-octocat-hello-world",
            icon: "Repo"
        }
    ]
};
const __TURBOPACK__default__export__ = featureOctocatHelloWorldPlugin;
}),
"[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeneratedFeatureRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const previewUrl = "/imported/octocat-spoon-knife/index.html";
const repoUrl = "https://github.com/octocat/Spoon-Knife";
const sourcePath = "packages/imported-repos/octocat-spoon-knife";
const title = "Spoon Knife";
const readmeExcerpt = "### Well hello there!\r\n\r\nThis repository is meant to provide an example for *forking* a repository on GitHub.\r\n\r\nCreating a *fork* is producing a personal copy of someone else's project. Forks act as a sort of bridge between the original repository and your personal copy. You can submit *Pull Requests* to help make other people's projects better by offering your changes up to the original project. Forking is at the core of social coding at GitHub.\r\n\r\nAfter forking this repository, you can make some changes to the project, and submit [a Pull Request](https://github.com/octocat/Spoon-Knife/pulls) as practice.\r\n\r\nFor some more information on how to fork a repository, [check out our guide, \"Forking Projects\"\"](http://guides.github.com/overviews/forking/). Thanks! :sparkling_heart:\r\n";
function logGeneratedFeatureDebug(event, payload) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (payload) {
        console.log(`[GeneratedFeatureDebug] ${event}`, payload);
        return;
    }
    console.log(`[GeneratedFeatureDebug] ${event}`);
}
function GeneratedFeatureRoot() {
    const iframeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const readinessTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [embedState, setEmbedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [embedIssue, setEmbedIssue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [canEmbed, setCanEmbed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const clearReadinessTimeout = ()=>{
        if (readinessTimeoutRef.current !== null) {
            window.clearTimeout(readinessTimeoutRef.current);
            readinessTimeoutRef.current = null;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        logGeneratedFeatureDebug("mounted", {
            title,
            previewUrl,
            sourcePath
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setEmbedState("loading");
        setEmbedIssue(null);
        setCanEmbed(null);
        void fetch(previewUrl, {
            cache: "no-store"
        }).then(async (response)=>{
            if (!response.ok) {
                const issue = `Preview URL returned HTTP ${response.status}.`;
                logGeneratedFeatureDebug("preview preflight HTTP failure", {
                    title,
                    previewUrl,
                    status: response.status
                });
                clearReadinessTimeout();
                setEmbedIssue(issue);
                setCanEmbed(false);
                setEmbedState("failed");
                return;
            }
            const html = await response.text();
            const hasSourceEntrypoint = /<script[^>]+src=["']\/?src\//i.test(html);
            if (hasSourceEntrypoint) {
                const issue = "Preview references source files (for example /src/main.tsx) and needs a build/dev server.";
                logGeneratedFeatureDebug("preview preflight detected source entry", {
                    title,
                    previewUrl
                });
                clearReadinessTimeout();
                setEmbedIssue(issue);
                setCanEmbed(false);
                setEmbedState("failed");
                return;
            }
            logGeneratedFeatureDebug("preview preflight passed", {
                title,
                previewUrl
            });
            setCanEmbed(true);
        }).catch((preflightError)=>{
            const issue = preflightError instanceof Error ? preflightError.message : String(preflightError);
            logGeneratedFeatureDebug("preview preflight error", {
                title,
                previewUrl,
                issue
            });
            clearReadinessTimeout();
            setEmbedIssue(`Preview preflight failed: ${issue}`);
            setCanEmbed(false);
            setEmbedState("failed");
        });
        clearReadinessTimeout();
        readinessTimeoutRef.current = window.setTimeout(()=>{
            logGeneratedFeatureDebug("iframe readiness timeout", {
                title,
                previewUrl
            });
            setEmbedIssue((existing)=>existing ?? "Iframe rendered no visible content before timeout.");
            setEmbedState("failed");
        }, 9000);
        return ()=>{
            clearReadinessTimeout();
        };
    }, []);
    const inspectFrame = ()=>{
        const frame = iframeRef.current;
        if (!frame) {
            logGeneratedFeatureDebug("iframe ref missing", {
                title
            });
            return;
        }
        try {
            const doc = frame.contentDocument;
            const body = doc?.body;
            const root = body?.querySelector("#root, #app, #__next");
            const textLength = body?.textContent?.replace(/\s+/g, "").length ?? 0;
            const rootChildCount = root?.childElementCount ?? 0;
            const bodyChildCount = body?.childElementCount ?? 0;
            logGeneratedFeatureDebug("iframe DOM stats", {
                title,
                frameUrl: frame.src,
                textLength,
                rootChildCount,
                bodyChildCount
            });
            if (textLength === 0 && rootChildCount === 0) {
                logGeneratedFeatureDebug("iframe appears blank", {
                    title,
                    frameUrl: frame.src
                });
                clearReadinessTimeout();
                setEmbedIssue("Iframe loaded but page body stayed empty (likely missing runtime assets).");
                setEmbedState("failed");
                return;
            }
            clearReadinessTimeout();
            setEmbedState("ready");
        } catch (inspectError) {
            logGeneratedFeatureDebug("iframe inspection blocked", {
                title,
                message: inspectError instanceof Error ? inspectError.message : String(inspectError)
            });
            clearReadinessTimeout();
            setEmbedState("ready");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "-m-6 flex h-[calc(100dvh-4.25rem)] min-h-[calc(100dvh-4.25rem)] w-[calc(100%+3rem)] flex-col bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex h-full min-h-0 w-full flex-1 flex-col",
            children: ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-0 flex-1 overflow-hidden bg-white",
                children: embedState === "failed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "h-full w-full overflow-auto p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-slate-900",
                            children: "Preview could not be rendered inline."
                        }, void 0, false, {
                            fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 157,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-slate-700",
                            children: embedIssue ?? "This repo likely needs a build/dev server and cannot be shown as a raw static iframe."
                        }, void 0, false, {
                            fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 158,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: previewUrl,
                            target: "_blank",
                            rel: "noreferrer",
                            className: "mt-3 inline-flex rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white",
                            children: "Open Raw Imported Index"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 161,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
                    lineNumber: 156,
                    columnNumber: 15
                }, this) : canEmbed === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "h-full w-full overflow-auto p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-slate-900",
                            children: "Checking preview compatibility..."
                        }, void 0, false, {
                            fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 172,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-slate-700",
                            children: "Verifying whether this imported project can be rendered safely in an iframe."
                        }, void 0, false, {
                            fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 173,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
                    lineNumber: 171,
                    columnNumber: 15
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                    ref: iframeRef,
                    src: previewUrl,
                    onLoad: ()=>{
                        logGeneratedFeatureDebug("iframe loaded", {
                            title,
                            previewUrl
                        });
                        window.setTimeout(inspectFrame, 600);
                    },
                    onError: ()=>{
                        logGeneratedFeatureDebug("iframe error event", {
                            title,
                            previewUrl
                        });
                        clearReadinessTimeout();
                        setCanEmbed(false);
                        setEmbedState("failed");
                    },
                    title: title + " preview",
                    style: {
                        width: "100%",
                        height: "100%",
                        border: 0,
                        backgroundColor: "#fff"
                    },
                    loading: "lazy",
                    sandbox: "allow-scripts allow-same-origin allow-forms allow-popups"
                }, void 0, false, {
                    fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
                    lineNumber: 176,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
                lineNumber: 154,
                columnNumber: 11
            }, this) : /*#__PURE__*/ "TURBOPACK unreachable"
        }, void 0, false, {
            fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/features-octocat-spoon-knife/src/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$spoon$2d$knife$2f$src$2f$GeneratedFeatureRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-octocat-spoon-knife/src/GeneratedFeatureRoot.tsx [app-ssr] (ecmascript)");
;
;
const featureOctocatSpoonKnifePlugin = {
    id: "imported-octocat-spoon-knife",
    name: "Spoon Knife",
    version: "0.1.0",
    routes: [
        {
            path: "/repo-octocat-spoon-knife/*",
            element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$spoon$2d$knife$2f$src$2f$GeneratedFeatureRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/packages/features-octocat-spoon-knife/src/index.tsx",
                lineNumber: 11,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        }
    ],
    menu: [
        {
            label: "Spoon Knife",
            to: "/repo-octocat-spoon-knife",
            icon: "Repo"
        }
    ]
};
const __TURBOPACK__default__export__ = featureOctocatSpoonKnifePlugin;
}),
"[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeneratedFeatureRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const previewUrl = "/imported/fatkin1012-grand-opening/index.html";
const repoUrl = "https://github.com/fatkin1012/Grand_Opening";
const sourcePath = "packages/imported-repos/fatkin1012-grand-opening";
const title = "Grand Opening";
const readmeExcerpt = "Pomodoro\r\nHabit tracker\r\ncalender view\r\nSOP assit\r\nAutomation??\r\n\r\nHow to make this more business worthy\r\n\r\n\r\nMicro-Habit Builder: an app that helps users build tiny habits (30s–5min). Uses streaks, gentle nudges, context triggers (location, time, weather), and micro-rewards. Offers customizable habit templates and habit chains (e.g., \"after brushing -> 1min stretch\").\r\n\r\nSkill Snack Marketplace: short, focused lessons (2–8 minutes) for practical skills: speed reading, Excel trick, basic car maintenance, quick recipes. Users buy or trade \"snack packs.\" Includes progress badges and a “practice timer” to keep sessions tiny and consistent.\r\n\r\nQuiet Commute: ambient-sound + productivity app that turns commute time into micro-work sessions without stress. Offers curated playlists, single-task prompts (read one article, reply to 2 emails), and commute-safe activities like vocabulary flashcards or mindfulness.\r\n\r\nShared Pantry: community app for neighbors to share surplus food and household items. Simple posting, pickup scheduling, swap credits, safety checks, and an automatic grocery-match feature that suggests who might want an item.\r\n\r\nFocus Friend: pair users together for timed co-working sprints with built-in accountability. Option for anonymous partners, optional voice check-ins at start/end, and a leaderboard for consistency. Integrates with calendars and has Pomodoro, ultradian, and custom modes.\r\n\r\nSecond-Brain Clips: capture short notes (text, voice, photo) and auto-summarize into searchable “clips.” Smart tags, link suggestions, and daily review prompts turn loose ideas";
function logGeneratedFeatureDebug(event, payload) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (payload) {
        console.log(`[GeneratedFeatureDebug] ${event}`, payload);
        return;
    }
    console.log(`[GeneratedFeatureDebug] ${event}`);
}
function GeneratedFeatureRoot() {
    const iframeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const readinessTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [embedState, setEmbedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [embedIssue, setEmbedIssue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [canEmbed, setCanEmbed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const clearReadinessTimeout = ()=>{
        if (readinessTimeoutRef.current !== null) {
            window.clearTimeout(readinessTimeoutRef.current);
            readinessTimeoutRef.current = null;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        logGeneratedFeatureDebug("mounted", {
            title,
            previewUrl,
            sourcePath
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setEmbedState("loading");
        setEmbedIssue(null);
        setCanEmbed(null);
        void fetch(previewUrl, {
            cache: "no-store"
        }).then(async (response)=>{
            if (!response.ok) {
                const issue = `Preview URL returned HTTP ${response.status}.`;
                logGeneratedFeatureDebug("preview preflight HTTP failure", {
                    title,
                    previewUrl,
                    status: response.status
                });
                clearReadinessTimeout();
                setEmbedIssue(issue);
                setCanEmbed(false);
                setEmbedState("failed");
                return;
            }
            const html = await response.text();
            const hasSourceEntrypoint = /<script[^>]+src=["']\/?src\//i.test(html);
            if (hasSourceEntrypoint) {
                const issue = "Preview references source files (for example /src/main.tsx) and needs a build/dev server.";
                logGeneratedFeatureDebug("preview preflight detected source entry", {
                    title,
                    previewUrl
                });
                clearReadinessTimeout();
                setEmbedIssue(issue);
                setCanEmbed(false);
                setEmbedState("failed");
                return;
            }
            logGeneratedFeatureDebug("preview preflight passed", {
                title,
                previewUrl
            });
            setCanEmbed(true);
        }).catch((preflightError)=>{
            const issue = preflightError instanceof Error ? preflightError.message : String(preflightError);
            logGeneratedFeatureDebug("preview preflight error", {
                title,
                previewUrl,
                issue
            });
            clearReadinessTimeout();
            setEmbedIssue(`Preview preflight failed: ${issue}`);
            setCanEmbed(false);
            setEmbedState("failed");
        });
        clearReadinessTimeout();
        readinessTimeoutRef.current = window.setTimeout(()=>{
            logGeneratedFeatureDebug("iframe readiness timeout", {
                title,
                previewUrl
            });
            setEmbedIssue((existing)=>existing ?? "Iframe rendered no visible content before timeout.");
            setEmbedState("failed");
        }, 9000);
        return ()=>{
            clearReadinessTimeout();
        };
    }, []);
    const inspectFrame = ()=>{
        const frame = iframeRef.current;
        if (!frame) {
            logGeneratedFeatureDebug("iframe ref missing", {
                title
            });
            return;
        }
        try {
            const doc = frame.contentDocument;
            const body = doc?.body;
            const root = body?.querySelector("#root, #app, #__next");
            const textLength = body?.textContent?.replace(/\s+/g, "").length ?? 0;
            const rootChildCount = root?.childElementCount ?? 0;
            const bodyChildCount = body?.childElementCount ?? 0;
            logGeneratedFeatureDebug("iframe DOM stats", {
                title,
                frameUrl: frame.src,
                textLength,
                rootChildCount,
                bodyChildCount
            });
            if (textLength === 0 && rootChildCount === 0) {
                logGeneratedFeatureDebug("iframe appears blank", {
                    title,
                    frameUrl: frame.src
                });
                clearReadinessTimeout();
                setEmbedIssue("Iframe loaded but page body stayed empty (likely missing runtime assets).");
                setEmbedState("failed");
                return;
            }
            clearReadinessTimeout();
            setEmbedState("ready");
        } catch (inspectError) {
            logGeneratedFeatureDebug("iframe inspection blocked", {
                title,
                message: inspectError instanceof Error ? inspectError.message : String(inspectError)
            });
            clearReadinessTimeout();
            setEmbedState("ready");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "-m-6 flex h-[calc(100dvh-4.25rem)] min-h-[calc(100dvh-4.25rem)] w-[calc(100%+3rem)] flex-col bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex h-full min-h-0 w-full flex-1 flex-col",
            children: ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-0 flex-1 overflow-hidden bg-white",
                children: embedState === "failed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "h-full w-full overflow-auto p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-slate-900",
                            children: "Preview could not be rendered inline."
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 157,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-slate-700",
                            children: embedIssue ?? "This repo likely needs a build/dev server and cannot be shown as a raw static iframe."
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 158,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: previewUrl,
                            target: "_blank",
                            rel: "noreferrer",
                            className: "mt-3 inline-flex rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white",
                            children: "Open Raw Imported Index"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 161,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
                    lineNumber: 156,
                    columnNumber: 15
                }, this) : canEmbed === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "h-full w-full overflow-auto p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-slate-900",
                            children: "Checking preview compatibility..."
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 172,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-slate-700",
                            children: "Verifying whether this imported project can be rendered safely in an iframe."
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
                            lineNumber: 173,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
                    lineNumber: 171,
                    columnNumber: 15
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                    ref: iframeRef,
                    src: previewUrl,
                    onLoad: ()=>{
                        logGeneratedFeatureDebug("iframe loaded", {
                            title,
                            previewUrl
                        });
                        window.setTimeout(inspectFrame, 600);
                    },
                    onError: ()=>{
                        logGeneratedFeatureDebug("iframe error event", {
                            title,
                            previewUrl
                        });
                        clearReadinessTimeout();
                        setCanEmbed(false);
                        setEmbedState("failed");
                    },
                    title: title + " preview",
                    style: {
                        width: "100%",
                        height: "100%",
                        border: 0,
                        backgroundColor: "#fff"
                    },
                    loading: "lazy",
                    sandbox: "allow-scripts allow-same-origin allow-forms allow-popups"
                }, void 0, false, {
                    fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
                    lineNumber: 176,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
                lineNumber: 154,
                columnNumber: 11
            }, this) : /*#__PURE__*/ "TURBOPACK unreachable"
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/features-fatkin1012-grand-opening/src/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$grand$2d$opening$2f$src$2f$GeneratedFeatureRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-fatkin1012-grand-opening/src/GeneratedFeatureRoot.tsx [app-ssr] (ecmascript)");
;
;
const featureFatkin1012GrandOpeningPlugin = {
    id: "imported-fatkin1012-grand-opening",
    name: "Grand Opening",
    version: "0.1.0",
    routes: [
        {
            path: "/repo-fatkin1012-grand-opening/*",
            element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$grand$2d$opening$2f$src$2f$GeneratedFeatureRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/packages/features-fatkin1012-grand-opening/src/index.tsx",
                lineNumber: 11,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        }
    ],
    menu: [
        {
            label: "Grand Opening",
            to: "/repo-fatkin1012-grand-opening",
            icon: "Repo"
        }
    ]
};
const __TURBOPACK__default__export__ = featureFatkin1012GrandOpeningPlugin;
}),
"[project]/packages/toolbox/src/plugins/generated-imports.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generatedPlugins",
    ()=>generatedPlugins
]);
// AUTO-GENERATED IMPORTS - do not edit manually.
// __AUTO_IMPORTS_START__
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$hello$2d$world$2f$src$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-octocat-hello-world/src/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$spoon$2d$knife$2f$src$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-octocat-spoon-knife/src/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$grand$2d$opening$2f$src$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-fatkin1012-grand-opening/src/index.tsx [app-ssr] (ecmascript)");
;
;
;
const generatedPlugins = [
    // __AUTO_PLUGINS_START__
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$hello$2d$world$2f$src$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$spoon$2d$knife$2f$src$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$grand$2d$opening$2f$src$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
];
}),
"[project]/packages/toolbox/src/plugin-registry.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPlugins",
    ()=>getPlugins,
    "initializePlugins",
    ()=>initializePlugins,
    "registerPlugin",
    ()=>registerPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$repo$2d$importer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/plugins/repo-importer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$generated$2d$imports$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/plugins/generated-imports.ts [app-ssr] (ecmascript)");
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
        registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$repo$2d$importer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugins$2f$generated$2d$imports$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generatedPlugins"].forEach((plugin)=>{
            registerPlugin(plugin);
        });
        // 導入 SAP Playbook 功能包
        const sapPlaybookModule = await __turbopack_context__.A("[project]/packages/features-sap-playbook/src/index.tsx [app-ssr] (ecmascript, async loader)");
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
}),
"[project]/packages/toolbox/src/app/(toolbox)/app-router/app-router.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/packages/toolbox/src/app/app/[...slug]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-router-dom/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugin$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/plugin-registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/packages/toolbox/src/app/(toolbox)/app-router/app-router.module.css [app-ssr] (css module)");
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
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNavigate"])();
    const [plugins, setPlugins] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function loadPlugins() {
            try {
                setLoading(true);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugin$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializePlugins"])();
                const registeredPlugins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$plugin$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPlugins"])();
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
    }, []);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: "2rem"
            },
            children: "Loading plugins..."
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
            lineNumber: 42,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            lineNumber: 46,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].main,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].topbar,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: "🧰 Toolbox"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].topNav,
                            "aria-label": "Tool navigation",
                            children: plugins.flatMap((plugin)=>plugin.menu.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Link"], {
                                        to: item.to,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].topNavItem,
                                        children: [
                                            item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icon,
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                lineNumber: 58,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                lineNumber: 59,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `${plugin.id}-${item.to}`, true, {
                                        fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this)))
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].homeButton,
                            onClick: ()=>navigate("/"),
                            title: "Back to home",
                            children: "🏠"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].content,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Routes"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Route"], {
                                path: "/",
                                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dashboard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dashboardHeader,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    children: "🧰 Toolbox"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 21
                                                }, void 0),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "Select a feature to get started"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 21
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                            lineNumber: 81,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].featureGrid,
                                            children: plugins.map((plugin)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].featureCard,
                                                    children: plugin.menu.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>navigate(item.to),
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].featureButton,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].featureIcon,
                                                                    children: item.icon || "📦"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                                    lineNumber: 95,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    children: item.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                                    lineNumber: 98,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: plugin.name || plugin.id
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                                    lineNumber: 99,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            ]
                                                        }, item.to, true, {
                                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                            lineNumber: 90,
                                                            columnNumber: 27
                                                        }, void 0))
                                                }, plugin.id, false, {
                                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 23
                                                }, void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                            lineNumber: 86,
                                            columnNumber: 19
                                        }, void 0),
                                        plugins.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyState,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "No features available at this time."
                                            }, void 0, false, {
                                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                lineNumber: 108,
                                                columnNumber: 23
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 21
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                    lineNumber: 80,
                                    columnNumber: 17
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            plugins.map((plugin)=>plugin.routes.map((route, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Route"], {
                                        path: route.path,
                                        element: route.element
                                    }, `${plugin.id}-route-${index}`, false, {
                                        fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 17
                                    }, this))),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Route"], {
                                path: "*",
                                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$toolbox$2f$src$2f$app$2f28$toolbox$292f$app$2d$router$2f$app$2d$router$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].notFound,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "404 - Page Not Found"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                            lineNumber: 127,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Link"], {
                                                to: "/",
                                                children: "Back to home"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 17
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
                    lineNumber: 74,
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
        columnNumber: 5
    }, this);
}
function AppRouter() {
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setMounted(true);
    }, []);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: "2rem"
            },
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
            lineNumber: 167,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BrowserRouter"], {
        basename: "/app",
        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppRouterContent, {}, void 0, false, {
            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
            lineNumber: 178,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__79f9025f._.js.map