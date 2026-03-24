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
        } catch (activationError) {
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
                            lineNumber: 183,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-3 text-2xl font-semibold text-slate-900 md:text-4xl",
                            children: "Import A New Project"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 max-w-3xl text-sm leading-7 text-slate-700 md:text-base",
                            children: "Paste a GitHub repository URL. Toolbox will clone it into your local workspace under packages/imported-repos and create a new in-app page."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 182,
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
                                    lineNumber: 194,
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
                                    lineNumber: 197,
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
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-600",
                                            children: "Requires Git installed on this machine."
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 212,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-semibold text-emerald-700",
                            children: status
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 216,
                            columnNumber: 21
                        }, this) : null,
                        submitError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-semibold text-rose-700",
                            children: submitError
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 217,
                            columnNumber: 26
                        }, this) : null,
                        error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-semibold text-rose-700",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 218,
                            columnNumber: 20
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 192,
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
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-card rounded-2xl p-4 text-sm text-slate-700",
                            children: "Loading imported repositories..."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, this) : null,
                        !loading && repos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-card rounded-2xl p-4 text-sm text-slate-700",
                            children: "No repositories imported yet."
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 229,
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
                                            lineNumber: 237,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mt-1 text-lg font-semibold text-slate-900",
                                            children: repo.name
                                        }, void 0, false, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 238,
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
                                            lineNumber: 239,
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
                                            lineNumber: 240,
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
                                            lineNumber: 242,
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
                                                    lineNumber: 248,
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
                                                    lineNumber: 256,
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
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, this),
                                                repo.activatedRoute ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>navigate(repo.activatedRoute),
                                                    className: "rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100",
                                                    children: "Open Native Feature"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                                    lineNumber: 278,
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
                                                    lineNumber: 286,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                            lineNumber: 247,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, repo.id, true, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 236,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 181,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
function ImportedRepoViewer() {
    const { repoId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useParams"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNavigate"])();
    const { repos, loading, error } = useImportedRepos();
    const repo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>repos.find((item)=>item.id === repoId), [
        repos,
        repoId
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: "2rem"
            },
            children: "Loading imported project..."
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 312,
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
            lineNumber: 316,
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
                        lineNumber: 323,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>navigate("/import"),
                        className: "mt-3 rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                        children: "Back To Import Wizard"
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 324,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                lineNumber: 322,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 321,
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
                        lineNumber: 340,
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
                        lineNumber: 341,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-slate-700",
                        children: "You can still use the code locally from that folder and wire it into a Toolbox feature package."
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>navigate("/import"),
                        className: "mt-3 rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                        children: "Back To Import Wizard"
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 347,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                lineNumber: 339,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 338,
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
                                    lineNumber: 364,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-600",
                                    children: repo.repoUrl
                                }, void 0, false, {
                                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 363,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>navigate("/import"),
                            className: "rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700",
                            children: "Back To Import Wizard"
                        }, void 0, false, {
                            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                            lineNumber: 367,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 362,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-card overflow-hidden rounded-2xl border border-emerald-100",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        src: repo.previewUrl,
                        title: `${repo.name} preview`,
                        style: {
                            width: "100%",
                            height: "80vh",
                            border: 0,
                            backgroundColor: "#fff"
                        }
                    }, void 0, false, {
                        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                        lineNumber: 377,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
                    lineNumber: 376,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
            lineNumber: 361,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/toolbox/src/plugins/RepoImporterRoot.tsx",
        lineNumber: 360,
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
"[project]/packages/toolbox/src/plugins/generated-imports.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generatedPlugins",
    ()=>generatedPlugins
]);
// AUTO-GENERATED IMPORTS - do not edit manually.
// __AUTO_IMPORTS_START__
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$hello$2d$world$2f$src$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-octocat-hello-world/src/index.tsx [app-ssr] (ecmascript)");
;
const generatedPlugins = [
    // __AUTO_PLUGINS_START__
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$octocat$2d$hello$2d$world$2f$src$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
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
function getPlugins() {
    return registeredPlugins;
}
function registerPlugin(plugin) {
    const exists = registeredPlugins.some((p)=>p.id === plugin.id);
    if (exists) {
        console.warn(`Plugin with id "${plugin.id}" already registered, skipping.`);
        return;
    }
    registeredPlugins.push(plugin);
}
async function initializePlugins() {
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
            lineNumber: 149,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BrowserRouter"], {
        basename: "/app",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppRouterContent, {}, void 0, false, {
            fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
            lineNumber: 154,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/toolbox/src/app/app/[...slug]/page.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e3313370._.js.map