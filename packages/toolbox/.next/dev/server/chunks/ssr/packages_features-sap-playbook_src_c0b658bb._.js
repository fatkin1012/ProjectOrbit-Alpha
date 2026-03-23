module.exports = [
"[project]/packages/features-sap-playbook/src/components/CaseForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CaseForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function CaseForm({ onAdd }) {
    const [tCodeInput, setTCodeInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [tCodes, setTCodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [requirement, setRequirement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [steps, setSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isPasted, setIsPasted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const readFileAsDataURL = (file)=>new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = (event)=>resolve(event.target?.result);
            reader.onerror = ()=>reject(new Error("Failed to read image file."));
            reader.readAsDataURL(file);
        });
    const handlePaste = async (e)=>{
        const imageItems = Array.from(e.clipboardData.items).filter((item)=>item.type.includes("image"));
        if (imageItems.length > 0) {
            const blobs = imageItems.map((item)=>item.getAsFile()).filter((file)=>file !== null);
            const nextImages = await Promise.all(blobs.map((blob)=>readFileAsDataURL(blob)));
            setImages((prev)=>[
                    ...prev,
                    ...nextImages
                ]);
            setIsPasted(true);
            window.setTimeout(()=>setIsPasted(false), 1400);
        }
    };
    const handleUploadImages = async (e)=>{
        const files = Array.from(e.target.files ?? []).filter((file)=>file.type.startsWith("image/"));
        if (files.length === 0) {
            return;
        }
        const nextImages = await Promise.all(files.map((file)=>readFileAsDataURL(file)));
        setImages((prev)=>[
                ...prev,
                ...nextImages
            ]);
        e.target.value = "";
    };
    const handleRemoveImage = (indexToRemove)=>{
        setImages((prev)=>prev.filter((_, index)=>index !== indexToRemove));
    };
    const normalizeTCode = (value)=>value.trim().toUpperCase();
    const addTCodes = (rawValue)=>{
        const parsed = rawValue.split(/[\s,]+/).map((code)=>normalizeTCode(code)).filter((code)=>code.length > 0);
        if (parsed.length === 0) {
            return;
        }
        setTCodes((prev)=>{
            const merged = new Set([
                ...prev,
                ...parsed
            ]);
            return Array.from(merged);
        });
        setTCodeInput("");
    };
    const handleAddTCode = ()=>{
        addTCodes(tCodeInput);
    };
    const handleRemoveTCode = (codeToRemove)=>{
        setTCodes((prev)=>prev.filter((code)=>code !== codeToRemove));
    };
    const canSave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return tCodes.length > 0 && [
            title,
            requirement,
            steps
        ].every((field)=>field.trim().length > 0);
    }, [
        requirement,
        steps,
        tCodes.length,
        title
    ]);
    const onSave = ()=>{
        if (!canSave) {
            return;
        }
        onAdd({
            id: Date.now().toString(),
            tCode: tCodes[0],
            tCodes,
            title: title.trim(),
            requirement: requirement.trim(),
            steps: steps.trim(),
            screenshot: images[0],
            screenshots: images,
            createdAt: Date.now()
        });
        setTCodeInput("");
        setTCodes([]);
        setTitle("");
        setRequirement("");
        setSteps("");
        setImages([]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        onPaste: handlePaste,
        className: "glass-card pop-in rounded-3xl p-6 md:p-8",
        "aria-label": "Add new wiki case",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-semibold tracking-tight",
                children: "Add A New SAP Case"
            }, void 0, false, {
                fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-slate-600",
                children: "Capture solutions quickly and make them searchable for future you."
            }, void 0, false, {
                fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "tcode",
                        className: "text-sm font-semibold text-slate-700",
                        children: "T-Codes"
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "tcode",
                                className: "h-12 flex-1 rounded-xl border-2 border-emerald-200 bg-white/90 px-3 outline-none transition focus:border-emerald-500",
                                placeholder: "e.g. VL03N, VA02",
                                value: tCodeInput,
                                onChange: (e)=>setTCodeInput(e.target.value),
                                onKeyDown: (e)=>{
                                    if (e.key === "Enter" || e.key === ",") {
                                        e.preventDefault();
                                        handleAddTCode();
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleAddTCode,
                                className: "h-12 rounded-xl border-2 border-emerald-300 bg-emerald-50 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100",
                                children: "Add"
                            }, void 0, false, {
                                fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-600",
                        children: "Add one or multiple codes (comma or Enter)."
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    tCodes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: tCodes.map((code)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>handleRemoveTCode(code),
                                className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100",
                                "aria-label": `Remove ${code}`,
                                children: [
                                    code,
                                    " x"
                                ]
                            }, code, true, {
                                fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "title",
                        className: "text-sm font-semibold text-slate-700",
                        children: "Case Title"
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "title",
                        className: "h-12 rounded-xl border-2 border-green-200 bg-white/90 px-3 outline-none transition focus:border-green-500",
                        placeholder: "e.g. Delivery status check not updating",
                        value: title,
                        onChange: (e)=>setTitle(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "requirement",
                        className: "text-sm font-semibold text-slate-700",
                        children: "Requirement"
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "requirement",
                        className: "min-h-24 rounded-xl border-2 border-lime-200 bg-white/90 p-3 outline-none transition focus:border-lime-500",
                        placeholder: "What did the user ask for?",
                        value: requirement,
                        onChange: (e)=>setRequirement(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "steps",
                        className: "text-sm font-semibold text-slate-700",
                        children: "Resolution Steps"
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "steps",
                        className: "min-h-32 rounded-xl border-2 border-emerald-200 bg-white/90 p-3 outline-none transition focus:border-emerald-400",
                        placeholder: "Step-by-step notes to solve the case",
                        value: steps,
                        onChange: (e)=>setSteps(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/80 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-emerald-800",
                        children: "Paste Screenshot"
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-emerald-700",
                        children: "Click this card and press Ctrl+V to paste one or more screenshots."
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "mt-3 inline-flex cursor-pointer rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50",
                        children: [
                            "Upload Screenshots",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: "image/*",
                                multiple: true,
                                onChange: handleUploadImages,
                                className: "sr-only"
                            }, void 0, false, {
                                fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 text-xs text-emerald-700",
                        role: "status",
                        "aria-live": "polite",
                        children: isPasted ? "Screenshot pasted successfully." : "Paste or upload screenshots."
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 grid grid-cols-2 gap-2",
                        children: images.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: image,
                                        className: "max-h-32 w-full rounded-xl border border-emerald-200 object-cover shadow",
                                        alt: `Screenshot preview ${index + 1}`
                                    }, void 0, false, {
                                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                                        lineNumber: 222,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handleRemoveImage(index),
                                        className: "absolute right-1 top-1 rounded bg-black/65 px-2 py-1 text-[10px] font-semibold text-white",
                                        "aria-label": `Remove screenshot ${index + 1}`,
                                        children: "Remove"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                                        lineNumber: 227,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, `${image.slice(0, 20)}-${index}`, true, {
                                fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                                lineNumber: 220,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onSave,
                disabled: !canSave,
                className: "mt-5 h-12 w-full rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50",
                children: "Save To Wiki"
            }, void 0, false, {
                fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/features-sap-playbook/src/components/CaseForm.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PictureViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function PictureViewer({ isOpen, images, initialIndex, title, onClose, onSaveAnnotated }) {
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialIndex);
    const [drawEnabled, setDrawEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [eraseEnabled, setEraseEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [brushColor, setBrushColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("#ff3344");
    const [brushSize, setBrushSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(4);
    const [undoCount, setUndoCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const hasDrawnInStrokeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastPointRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const historyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const currentImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>images[currentIndex], [
        currentIndex,
        images
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setDrawEnabled(false);
            setEraseEnabled(false);
        }
    }, [
        initialIndex,
        isOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) {
            return;
        }
        const onKeyDown = (e)=>{
            if (e.key === "Escape") {
                onClose();
            }
            if (e.key === "ArrowRight") {
                setCurrentIndex((prev)=>(prev + 1) % images.length);
            }
            if (e.key === "ArrowLeft") {
                setCurrentIndex((prev)=>(prev - 1 + images.length) % images.length);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        images.length,
        isOpen,
        onClose
    ]);
    const saveHistorySnapshot = ()=>{
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const snapshot = canvas.toDataURL("image/png");
        if (historyRef.current[historyRef.current.length - 1] === snapshot) {
            return;
        }
        historyRef.current = [
            ...historyRef.current,
            snapshot
        ];
        setUndoCount(historyRef.current.length - 1);
    };
    const syncCanvasSize = ()=>{
        const image = imageRef.current;
        const canvas = canvasRef.current;
        if (!image || !canvas) {
            return;
        }
        canvas.width = image.clientWidth;
        canvas.height = image.clientHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        historyRef.current = [
            canvas.toDataURL("image/png")
        ];
        setUndoCount(0);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) {
            return;
        }
        const onResize = ()=>syncCanvasSize();
        window.addEventListener("resize", onResize);
        return ()=>window.removeEventListener("resize", onResize);
    }, [
        isOpen,
        currentIndex
    ]);
    const drawLine = (from, to)=>{
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.globalCompositeOperation = eraseEnabled ? "destination-out" : "source-over";
        ctx.strokeStyle = eraseEnabled ? "rgba(0, 0, 0, 1)" : brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    };
    const getCanvasPoint = (e)=>{
        const canvas = canvasRef.current;
        if (!canvas) {
            return {
                x: 0,
                y: 0
            };
        }
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };
    const handlePointerDown = (e)=>{
        if (!drawEnabled) {
            return;
        }
        const point = getCanvasPoint(e);
        drawingRef.current = true;
        hasDrawnInStrokeRef.current = true;
        lastPointRef.current = point;
        drawLine(point, point);
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const handlePointerMove = (e)=>{
        if (!drawEnabled || !drawingRef.current || !lastPointRef.current) {
            return;
        }
        const point = getCanvasPoint(e);
        drawLine(lastPointRef.current, point);
        hasDrawnInStrokeRef.current = true;
        lastPointRef.current = point;
    };
    const handlePointerUp = (e)=>{
        if (drawingRef.current && hasDrawnInStrokeRef.current) {
            saveHistorySnapshot();
        }
        drawingRef.current = false;
        hasDrawnInStrokeRef.current = false;
        lastPointRef.current = null;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    };
    const handleUndo = ()=>{
        const canvas = canvasRef.current;
        if (!canvas || historyRef.current.length <= 1) {
            return;
        }
        historyRef.current = historyRef.current.slice(0, -1);
        const previousSnapshot = historyRef.current[historyRef.current.length - 1];
        if (!previousSnapshot) {
            return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        const img = new Image();
        img.onload = ()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setUndoCount(historyRef.current.length - 1);
        };
        img.src = previousSnapshot;
    };
    const handleClearMarks = ()=>{
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        saveHistorySnapshot();
    };
    const exportAnnotatedImage = async ()=>{
        const baseImageSrc = images[currentIndex];
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!baseImageSrc || !canvas || !image) {
            return;
        }
        setSaving(true);
        try {
            const merged = await new Promise((resolve, reject)=>{
                const base = new Image();
                base.onload = ()=>{
                    const mergedCanvas = document.createElement("canvas");
                    mergedCanvas.width = base.naturalWidth;
                    mergedCanvas.height = base.naturalHeight;
                    const ctx = mergedCanvas.getContext("2d");
                    if (!ctx) {
                        reject(new Error("Could not create drawing context."));
                        return;
                    }
                    ctx.drawImage(base, 0, 0, mergedCanvas.width, mergedCanvas.height);
                    ctx.drawImage(canvas, 0, 0, mergedCanvas.width, mergedCanvas.height);
                    resolve(mergedCanvas.toDataURL("image/png"));
                };
                base.onerror = ()=>reject(new Error("Failed to load source image."));
                base.src = baseImageSrc;
            });
            onSaveAnnotated(merged, currentIndex);
            handleClearMarks();
            setDrawEnabled(false);
            setEraseEnabled(false);
        } finally{
            setSaving(false);
        }
    };
    if (!isOpen || images.length === 0 || !currentImage) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-4",
        role: "dialog",
        "aria-modal": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-6xl rounded-2xl border border-white/20 bg-slate-950/95 p-3 text-white md:p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 flex flex-wrap items-center justify-between gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-semibold text-emerald-200",
                            children: [
                                title,
                                " - Image ",
                                currentIndex + 1,
                                " / ",
                                images.length
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 275,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setCurrentIndex((prev)=>(prev - 1 + images.length) % images.length),
                                    className: "rounded-lg border border-white/25 px-3 py-1 text-xs font-semibold hover:bg-white/10",
                                    children: "Prev"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                                    lineNumber: 279,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setCurrentIndex((prev)=>(prev + 1) % images.length),
                                    className: "rounded-lg border border-white/25 px-3 py-1 text-xs font-semibold hover:bg-white/10",
                                    children: "Next"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                                    lineNumber: 286,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "rounded-lg border border-rose-300/60 px-3 py-1 text-xs font-semibold text-rose-200 hover:bg-rose-300/10",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                                    lineNumber: 293,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 278,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                    lineNumber: 274,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-white/15 bg-white/5 p-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setDrawEnabled((prev)=>!prev),
                            className: `rounded-lg px-3 py-1 text-xs font-semibold transition ${drawEnabled ? "bg-emerald-500 text-white" : "border border-white/25 text-emerald-100"}`,
                            children: drawEnabled ? "Drawing On" : "Enable Draw"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 304,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setEraseEnabled((prev)=>!prev);
                                if (!drawEnabled) {
                                    setDrawEnabled(true);
                                }
                            },
                            className: `rounded-lg px-3 py-1 text-xs font-semibold transition ${eraseEnabled ? "bg-amber-500 text-white" : "border border-white/25 text-amber-100"}`,
                            children: eraseEnabled ? "Eraser On" : "Eraser"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 314,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-xs text-white/80",
                            children: "Color"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 329,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "color",
                            value: brushColor,
                            onChange: (e)=>setBrushColor(e.target.value),
                            className: "h-8 w-10 rounded border border-white/20 bg-transparent",
                            "aria-label": "Brush color"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 330,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "brush-size",
                            className: "text-xs text-white/80",
                            children: "Brush"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 338,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "brush-size",
                            type: "range",
                            min: 2,
                            max: 18,
                            value: brushSize,
                            onChange: (e)=>setBrushSize(Number(e.target.value)),
                            className: "accent-emerald-400"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 341,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleUndo,
                            disabled: undoCount === 0,
                            className: "rounded-lg border border-white/25 px-3 py-1 text-xs font-semibold hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50",
                            children: "Undo"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 351,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleClearMarks,
                            className: "rounded-lg border border-white/25 px-3 py-1 text-xs font-semibold hover:bg-white/10",
                            children: "Clear Marks"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 360,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: exportAnnotatedImage,
                            disabled: saving,
                            className: "rounded-lg bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60",
                            children: saving ? "Saving..." : "Save Marked Copy"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                            lineNumber: 368,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                    lineNumber: 303,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex max-h-[70vh] justify-center overflow-auto rounded-xl border border-white/10 bg-black/30 p-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative inline-block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                ref: imageRef,
                                src: currentImage,
                                alt: `Viewer image ${currentIndex + 1}`,
                                className: "max-h-[66vh] rounded-lg object-contain",
                                onLoad: syncCanvasSize
                            }, void 0, false, {
                                fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                                lineNumber: 381,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                ref: canvasRef,
                                className: `absolute inset-0 ${drawEnabled ? eraseEnabled ? "cursor-cell" : "cursor-crosshair" : "pointer-events-none"}`,
                                onPointerDown: handlePointerDown,
                                onPointerMove: handlePointerMove,
                                onPointerUp: handlePointerUp,
                                onPointerLeave: handlePointerUp
                            }, void 0, false, {
                                fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
                    lineNumber: 378,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
            lineNumber: 273,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx",
        lineNumber: 272,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/features-sap-playbook/src/hooks/uselocalStorage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLocalStorage",
    ()=>useLocalStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialValue);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const item = window.localStorage.getItem(key);
        if (item) setStoredValue(JSON.parse(item));
    }, [
        key
    ]);
    const setValue = (value)=>{
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    };
    return [
        storedValue,
        setValue
    ];
}
}),
"[project]/packages/features-sap-playbook/src/SapRoot.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SapRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$sap$2d$playbook$2f$src$2f$components$2f$CaseForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-sap-playbook/src/components/CaseForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$sap$2d$playbook$2f$src$2f$components$2f$PictureViewer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-sap-playbook/src/components/PictureViewer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$sap$2d$playbook$2f$src$2f$hooks$2f$uselocalStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-sap-playbook/src/hooks/uselocalStorage.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function SapRoot() {
    const [cases, setCases] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$sap$2d$playbook$2f$src$2f$hooks$2f$uselocalStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocalStorage"])("sap-wiki-cases", []);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [activeTCode, setActiveTCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [expandedCaseId, setExpandedCaseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copiedCaseId, setCopiedCaseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingCaseId, setEditingCaseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingSteps, setEditingSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingScreenshots, setEditingScreenshots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isEditPasted, setIsEditPasted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [exportStatus, setExportStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [importStatus, setImportStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [lastImportCount, setLastImportCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [viewer, setViewer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const importInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const readFileAsDataURL = (file)=>new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = (event)=>resolve(event.target?.result);
            reader.onerror = ()=>reject(new Error("Failed to read image file."));
            reader.readAsDataURL(file);
        });
    const getCaseTCodes = (wikiCase)=>{
        if (wikiCase.tCodes && wikiCase.tCodes.length > 0) {
            return wikiCase.tCodes;
        }
        return wikiCase.tCode ? [
            wikiCase.tCode
        ] : [];
    };
    const getCaseScreenshots = (wikiCase)=>{
        if (wikiCase.screenshots && wikiCase.screenshots.length > 0) {
            return wikiCase.screenshots;
        }
        return wikiCase.screenshot ? [
            wikiCase.screenshot
        ] : [];
    };
    const filteredCases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const normalized = query.trim().toLowerCase();
        return cases.filter((wikiCase)=>{
            const caseTCodes = getCaseTCodes(wikiCase);
            if (activeTCode !== "all" && !caseTCodes.includes(activeTCode)) {
                return false;
            }
            if (!normalized) {
                return true;
            }
            return caseTCodes.join(" ").toLowerCase().includes(normalized) || wikiCase.title.toLowerCase().includes(normalized) || wikiCase.requirement.toLowerCase().includes(normalized) || wikiCase.steps.toLowerCase().includes(normalized);
        }).sort((a, b)=>b.createdAt - a.createdAt);
    }, [
        activeTCode,
        cases,
        query
    ]);
    const tCodeFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const uniqueCodes = Array.from(new Set(cases.flatMap((wikiCase)=>getCaseTCodes(wikiCase))));
        return [
            "all",
            ...uniqueCodes
        ];
    }, [
        cases
    ]);
    const newestCase = filteredCases[0];
    const handleAdd = (wikiCase)=>{
        setCases([
            wikiCase,
            ...cases
        ]);
        setExpandedCaseId(wikiCase.id);
    };
    const handleDelete = (caseId)=>{
        setCases(cases.filter((wikiCase)=>wikiCase.id !== caseId));
        if (expandedCaseId === caseId) {
            setExpandedCaseId(null);
        }
        if (editingCaseId === caseId) {
            setEditingCaseId(null);
            setEditingSteps("");
            setEditingScreenshots([]);
            setIsEditPasted(false);
        }
    };
    const handleStartEditSolution = (wikiCase)=>{
        setExpandedCaseId(wikiCase.id);
        setEditingCaseId(wikiCase.id);
        setEditingSteps(wikiCase.steps);
        setEditingScreenshots(getCaseScreenshots(wikiCase));
    };
    const handleCancelEditSolution = ()=>{
        setEditingCaseId(null);
        setEditingSteps("");
        setEditingScreenshots([]);
        setIsEditPasted(false);
    };
    const handleSaveEditSolution = (caseId)=>{
        const nextSteps = editingSteps.trim();
        if (!nextSteps) {
            return;
        }
        setCases(cases.map((wikiCase)=>{
            if (wikiCase.id !== caseId) {
                return wikiCase;
            }
            return {
                ...wikiCase,
                steps: nextSteps,
                screenshots: editingScreenshots,
                screenshot: editingScreenshots[0]
            };
        }));
        setEditingCaseId(null);
        setEditingSteps("");
        setEditingScreenshots([]);
        setIsEditPasted(false);
    };
    const handleAddEditScreenshots = async (e)=>{
        const files = Array.from(e.target.files ?? []).filter((file)=>file.type.startsWith("image/"));
        if (files.length === 0) {
            return;
        }
        const nextImages = await Promise.all(files.map((file)=>readFileAsDataURL(file)));
        setEditingScreenshots((prev)=>[
                ...prev,
                ...nextImages
            ]);
        e.target.value = "";
    };
    const handlePasteEditScreenshots = async (e)=>{
        const imageItems = Array.from(e.clipboardData.items).filter((item)=>item.type.includes("image"));
        if (imageItems.length === 0) {
            return;
        }
        e.preventDefault();
        const blobs = imageItems.map((item)=>item.getAsFile()).filter((file)=>file !== null);
        const nextImages = await Promise.all(blobs.map((blob)=>readFileAsDataURL(blob)));
        setEditingScreenshots((prev)=>[
                ...prev,
                ...nextImages
            ]);
        setIsEditPasted(true);
        window.setTimeout(()=>setIsEditPasted(false), 1400);
    };
    const handleRemoveEditScreenshot = (indexToRemove)=>{
        setEditingScreenshots((prev)=>prev.filter((_, index)=>index !== indexToRemove));
    };
    const handleCopyTCode = async (wikiCase)=>{
        const caseTCodes = getCaseTCodes(wikiCase);
        try {
            await navigator.clipboard.writeText(caseTCodes.join(", "));
            setCopiedCaseId(wikiCase.id);
            window.setTimeout(()=>setCopiedCaseId(null), 1200);
        } catch  {
            setCopiedCaseId(null);
        }
    };
    const viewerCase = viewer ? cases.find((wikiCase)=>wikiCase.id === viewer.caseId) : null;
    const viewerImages = viewerCase ? getCaseScreenshots(viewerCase) : [];
    const viewerTitle = viewerCase ? `${getCaseTCodes(viewerCase).join(", ")} • ${viewerCase.title}` : "Viewer";
    const handleOpenViewer = (caseId, index)=>{
        setViewer({
            caseId,
            index
        });
    };
    const handleCloseViewer = ()=>{
        setViewer(null);
    };
    const handleSaveMarkedCopy = (annotatedImage, _sourceIndex)=>{
        if (!viewer) {
            return;
        }
        setCases(cases.map((wikiCase)=>{
            if (wikiCase.id !== viewer.caseId) {
                return wikiCase;
            }
            const screenshots = getCaseScreenshots(wikiCase);
            const nextScreenshots = [
                ...screenshots,
                annotatedImage
            ];
            return {
                ...wikiCase,
                screenshots: nextScreenshots,
                screenshot: nextScreenshots[0]
            };
        }));
    };
    const handleExportData = ()=>{
        try {
            const payload = {
                exportedAt: new Date().toISOString(),
                schemaVersion: 1,
                app: "sap-playbook",
                cases
            };
            const json = JSON.stringify(payload, null, 2);
            const blob = new Blob([
                json
            ], {
                type: "application/json"
            });
            const url = window.URL.createObjectURL(blob);
            const dateStamp = new Date().toISOString().slice(0, 10);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = `sap-playbook-backup-${dateStamp}.json`;
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            window.URL.revokeObjectURL(url);
            setExportStatus("ok");
            setImportStatus("idle");
            window.setTimeout(()=>setExportStatus("idle"), 2200);
        } catch  {
            setExportStatus("error");
            setImportStatus("idle");
            window.setTimeout(()=>setExportStatus("idle"), 2600);
        }
    };
    const isSAPCase = (value)=>{
        if (!value || typeof value !== "object") {
            return false;
        }
        const candidate = value;
        return typeof candidate.id === "string" && typeof candidate.title === "string" && typeof candidate.requirement === "string" && typeof candidate.steps === "string" && typeof candidate.createdAt === "number";
    };
    const normalizeImportedCase = (wikiCase)=>{
        const normalizedTCodes = wikiCase.tCodes && wikiCase.tCodes.length > 0 ? wikiCase.tCodes : wikiCase.tCode ? [
            wikiCase.tCode
        ] : [];
        const normalizedScreenshots = wikiCase.screenshots && wikiCase.screenshots.length > 0 ? wikiCase.screenshots : wikiCase.screenshot ? [
            wikiCase.screenshot
        ] : [];
        return {
            ...wikiCase,
            tCode: normalizedTCodes[0] ?? wikiCase.tCode,
            tCodes: normalizedTCodes,
            screenshot: normalizedScreenshots[0],
            screenshots: normalizedScreenshots
        };
    };
    const handleImportData = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        try {
            const fileText = await file.text();
            const parsed = JSON.parse(fileText);
            const imported = Array.isArray(parsed) ? parsed : parsed && typeof parsed === "object" && Array.isArray(parsed.cases) ? parsed.cases : null;
            if (!imported) {
                throw new Error("Invalid backup file format.");
            }
            const validCases = imported.filter(isSAPCase).map(normalizeImportedCase);
            if (validCases.length === 0) {
                throw new Error("No valid case records found in file.");
            }
            const shouldReplace = window.confirm(`Import ${validCases.length} case(s)? This will replace your current local wiki data on this browser.`);
            if (!shouldReplace) {
                e.target.value = "";
                return;
            }
            setCases(validCases);
            setExpandedCaseId(null);
            setEditingCaseId(null);
            setEditingSteps("");
            setEditingScreenshots([]);
            setViewer(null);
            setLastImportCount(validCases.length);
            setImportStatus("ok");
            setExportStatus("idle");
            window.setTimeout(()=>setImportStatus("idle"), 2600);
        } catch  {
            setImportStatus("error");
            setExportStatus("idle");
            window.setTimeout(()=>setImportStatus("idle"), 2800);
        } finally{
            e.target.value = "";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "playful-bg min-h-dvh px-4 py-6 md:px-8 md:py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto w-full max-w-6xl space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "glass-card pop-in relative overflow-hidden rounded-3xl p-6 md:p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "float-slow absolute -right-8 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-emerald-300 to-green-500 opacity-70 blur-[1px]"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                            lineNumber: 352,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -left-6 bottom-2 h-24 w-24 rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 opacity-70"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                            lineNumber: 353,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700",
                                    children: "LOCAL SEARCHABLE WIKI"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 356,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "mt-3 text-3xl font-semibold leading-tight text-slate-900 md:text-5xl",
                                    children: [
                                        "Find The Fix Fast,",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-gradient-to-r from-emerald-700 via-green-600 to-teal-500 bg-clip-text text-transparent",
                                            children: [
                                                " ",
                                                "Keep The Know-How Forever"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                            lineNumber: 361,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 359,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 max-w-2xl text-sm leading-7 text-slate-700 md:text-base",
                                    children: "Store SAP case solutions, search instantly by T-Code or keyword, and turn today's issue into tomorrow's shortcut."
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 366,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: importInputRef,
                                            type: "file",
                                            accept: "application/json,.json",
                                            onChange: handleImportData,
                                            className: "sr-only",
                                            "aria-label": "Import backup file"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                            lineNumber: 372,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleExportData,
                                            className: "h-11 rounded-xl border-2 border-emerald-300 bg-white/90 px-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50",
                                            children: "Export Backup"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                            lineNumber: 381,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>importInputRef.current?.click(),
                                            className: "h-11 rounded-xl border-2 border-slate-300 bg-white/90 px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-100",
                                            children: "Import Backup"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                            lineNumber: 389,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-600",
                                            role: "status",
                                            "aria-live": "polite",
                                            children: [
                                                exportStatus === "ok" && "Backup downloaded as JSON.",
                                                exportStatus === "error" && "Export failed. Try again.",
                                                importStatus === "ok" && `Imported ${lastImportCount} case(s) into local wiki.`,
                                                importStatus === "error" && "Import failed. Use a valid backup JSON file.",
                                                exportStatus === "idle" && importStatus === "idle" && "Local-only import/export. Nothing is uploaded."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                            lineNumber: 397,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 371,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                            lineNumber: 355,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                    lineNumber: 351,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "grid gap-4 md:grid-cols-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "glass-card rounded-2xl p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold tracking-wider text-slate-600",
                                    children: "TOTAL CASES"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 410,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-3xl font-semibold text-slate-900",
                                    children: cases.length
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 411,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                            lineNumber: 409,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "glass-card rounded-2xl p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold tracking-wider text-slate-600",
                                    children: "VISIBLE NOW"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 414,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-3xl font-semibold text-slate-900",
                                    children: filteredCases.length
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 415,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                            lineNumber: 413,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "glass-card rounded-2xl p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold tracking-wider text-slate-600",
                                    children: "LATEST HOTSPOT"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 418,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 truncate text-xl font-semibold text-slate-900",
                                    children: newestCase ? getCaseTCodes(newestCase).join(", ") : "No cases yet"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 419,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                            lineNumber: 417,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                    lineNumber: 408,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "grid gap-5 lg:grid-cols-[1.1fr_0.9fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass-card rounded-3xl p-4 md:p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "search",
                                            className: "text-sm font-semibold text-slate-700",
                                            children: "Search Cases"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                            lineNumber: 428,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "search",
                                                    type: "search",
                                                    value: query,
                                                    onChange: (e)=>setQuery(e.target.value),
                                                    placeholder: "Search by T-Code, title, requirement, or steps",
                                                    className: "h-12 flex-1 rounded-xl border-2 border-emerald-200 bg-white/90 px-3 outline-none transition focus:border-emerald-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                    lineNumber: 432,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setQuery(""),
                                                    className: "h-12 rounded-xl border-2 border-slate-200 bg-white/90 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100",
                                                    children: "Clear"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                            lineNumber: 431,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex flex-wrap gap-2",
                                            children: tCodeFilters.map((filterCode)=>{
                                                const isActive = activeTCode === filterCode;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setActiveTCode(filterCode),
                                                    className: `rounded-full border-2 px-3 py-1 text-xs font-semibold transition ${isActive ? "border-emerald-600 bg-emerald-600 text-white" : "border-emerald-200 bg-white/80 text-slate-700 hover:border-emerald-400"}`,
                                                    children: filterCode === "all" ? "All T-Codes" : filterCode
                                                }, filterCode, false, {
                                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                            lineNumber: 449,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3",
                                    children: [
                                        filteredCases.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "glass-card rounded-2xl p-6 text-sm text-slate-700",
                                            children: "No matching cases yet. Add one on the right and it will appear here instantly."
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                            lineNumber: 472,
                                            columnNumber: 17
                                        }, this),
                                        filteredCases.map((wikiCase, index)=>{
                                            const isExpanded = expandedCaseId === wikiCase.id;
                                            const isEditing = editingCaseId === wikiCase.id;
                                            const caseTCodes = getCaseTCodes(wikiCase);
                                            const screenshots = getCaseScreenshots(wikiCase);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "glass-card rounded-2xl p-4",
                                                style: {
                                                    animationDelay: `${index * 45}ms`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-start justify-between gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-wrap gap-1",
                                                                        children: caseTCodes.map((code)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "inline-flex rounded-full bg-gradient-to-r from-emerald-600 to-green-500 px-2 py-1 text-xs font-semibold text-white",
                                                                                children: code
                                                                            }, `${wikiCase.id}-${code}`, false, {
                                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                lineNumber: 493,
                                                                                columnNumber: 29
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                        lineNumber: 491,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "mt-2 text-lg font-semibold text-slate-900",
                                                                        children: wikiCase.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                        lineNumber: 501,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                lineNumber: 490,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>handleCopyTCode(wikiCase),
                                                                        className: "rounded-lg border-2 border-emerald-200 bg-white/90 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100",
                                                                        children: copiedCaseId === wikiCase.id ? "Copied" : "Copy T-Codes"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                        lineNumber: 505,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>handleDelete(wikiCase.id),
                                                                        className: "rounded-lg border-2 border-rose-200 bg-white/90 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100",
                                                                        children: "Remove"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                        lineNumber: 512,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                        lineNumber: 489,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 line-clamp-2 text-sm text-slate-700",
                                                        children: wikiCase.requirement
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                        lineNumber: 522,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setExpandedCaseId(isExpanded ? null : wikiCase.id),
                                                        className: "mt-3 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700",
                                                        children: isExpanded ? "Hide Solution" : "Show Solution"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                        lineNumber: 524,
                                                        columnNumber: 21
                                                    }, this),
                                                    isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pop-in mt-3 space-y-3 rounded-xl border border-slate-200 bg-white/90 p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-slate-500",
                                                                        children: "Requirement"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                        lineNumber: 535,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-slate-700",
                                                                        children: wikiCase.requirement
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                        lineNumber: 536,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                lineNumber: 534,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-slate-500",
                                                                        children: "Resolution"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                        lineNumber: 539,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                                value: editingSteps,
                                                                                onChange: (e)=>setEditingSteps(e.target.value),
                                                                                className: "min-h-28 w-full rounded-xl border-2 border-emerald-200 bg-white p-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500",
                                                                                "aria-label": "Edit solution"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                lineNumber: 542,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "rounded-xl border border-emerald-200 bg-emerald-50/60 p-3",
                                                                                onPaste: handlePasteEditScreenshots,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-xs font-semibold text-emerald-800",
                                                                                        children: "Edit Screenshots"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                        lineNumber: 552,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-1 text-xs text-emerald-700",
                                                                                        children: "Click here and press Ctrl+V to paste screenshot(s)."
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                        lineNumber: 553,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "mt-2 inline-flex cursor-pointer rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50",
                                                                                        children: [
                                                                                            "Add Screenshots",
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                type: "file",
                                                                                                accept: "image/*",
                                                                                                multiple: true,
                                                                                                onChange: handleAddEditScreenshots,
                                                                                                className: "sr-only"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                                lineNumber: 558,
                                                                                                columnNumber: 35
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                        lineNumber: 556,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-2 text-xs text-emerald-700",
                                                                                        role: "status",
                                                                                        "aria-live": "polite",
                                                                                        children: isEditPasted ? "Screenshot pasted successfully." : "Paste or upload screenshots."
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                        lineNumber: 566,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    editingScreenshots.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "mt-3 grid grid-cols-2 gap-2",
                                                                                        children: editingScreenshots.map((screenshot, screenshotIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "relative",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                        src: screenshot,
                                                                                                        alt: `Editing screenshot ${screenshotIndex + 1} for ${caseTCodes.join(", ")}`,
                                                                                                        className: "max-h-28 w-full rounded-lg border border-emerald-200 object-cover"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                                        lineNumber: 575,
                                                                                                        columnNumber: 41
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                        type: "button",
                                                                                                        onClick: ()=>handleRemoveEditScreenshot(screenshotIndex),
                                                                                                        className: "absolute right-1 top-1 rounded bg-black/65 px-2 py-1 text-[10px] font-semibold text-white",
                                                                                                        "aria-label": `Remove screenshot ${screenshotIndex + 1}`,
                                                                                                        children: "Remove"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                                        lineNumber: 580,
                                                                                                        columnNumber: 41
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, `edit-${wikiCase.id}-${screenshotIndex}`, true, {
                                                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                                lineNumber: 573,
                                                                                                columnNumber: 39
                                                                                            }, this))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                        lineNumber: 571,
                                                                                        columnNumber: 35
                                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-2 text-xs text-emerald-700",
                                                                                        children: "No screenshots attached."
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                        lineNumber: 592,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                lineNumber: 548,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        type: "button",
                                                                                        onClick: ()=>handleSaveEditSolution(wikiCase.id),
                                                                                        disabled: !editingSteps.trim(),
                                                                                        className: "rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50",
                                                                                        children: "Save Solution"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                        lineNumber: 596,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        type: "button",
                                                                                        onClick: handleCancelEditSolution,
                                                                                        className: "rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50",
                                                                                        children: "Cancel"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                        lineNumber: 604,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                lineNumber: 595,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                        lineNumber: 541,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "whitespace-pre-wrap text-sm text-slate-700",
                                                                                children: wikiCase.steps
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                lineNumber: 615,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>handleStartEditSolution(wikiCase),
                                                                                className: "mt-2 rounded-lg border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100",
                                                                                children: "Edit Solution"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                lineNumber: 616,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                lineNumber: 538,
                                                                columnNumber: 25
                                                            }, this),
                                                            screenshots.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mb-2 text-xs font-semibold text-slate-500",
                                                                        children: [
                                                                            "Screenshots (",
                                                                            screenshots.length,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                        lineNumber: 628,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
                                                                        children: screenshots.map((screenshot, screenshotIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>handleOpenViewer(wikiCase.id, screenshotIndex),
                                                                                className: "group relative overflow-hidden rounded-lg border border-slate-200 text-left",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        src: screenshot,
                                                                                        alt: `Screenshot ${screenshotIndex + 1} for ${caseTCodes.join(", ")}`,
                                                                                        className: "max-h-52 w-full object-cover transition group-hover:scale-[1.02]"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                        lineNumber: 640,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold text-white",
                                                                                        children: "Open"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                        lineNumber: 645,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, `${wikiCase.id}-shot-${screenshotIndex}`, true, {
                                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                                lineNumber: 633,
                                                                                columnNumber: 33
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                        lineNumber: 631,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                                lineNumber: 627,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                        lineNumber: 533,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, wikiCase.id, true, {
                                                fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                                lineNumber: 484,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                                    lineNumber: 470,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                            lineNumber: 426,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$sap$2d$playbook$2f$src$2f$components$2f$CaseForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onAdd: handleAdd
                        }, void 0, false, {
                            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                            lineNumber: 661,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                    lineNumber: 425,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$sap$2d$playbook$2f$src$2f$components$2f$PictureViewer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    isOpen: Boolean(viewer && viewerImages.length > 0),
                    images: viewerImages,
                    initialIndex: viewer?.index ?? 0,
                    title: viewerTitle,
                    onClose: handleCloseViewer,
                    onSaveAnnotated: handleSaveMarkedCopy
                }, void 0, false, {
                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                    lineNumber: 664,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "pb-4 text-center text-xs font-semibold text-slate-600",
                    children: "Built for quick fixes, shared memory, and less repeated debugging."
                }, void 0, false, {
                    fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
                    lineNumber: 673,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
            lineNumber: 350,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/features-sap-playbook/src/SapRoot.tsx",
        lineNumber: 349,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/features-sap-playbook/src/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$sap$2d$playbook$2f$src$2f$SapRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-sap-playbook/src/SapRoot.tsx [app-ssr] (ecmascript)");
;
;
/**
 * SAP Playbook Plugin
 * Exported as ToolboxPlugin interface for dynamic registration
 */ const sapPlaybookPlugin = {
    id: "sap-playbook",
    name: "SAP Playbook",
    version: "0.1.0",
    routes: [
        {
            path: "/sap/*",
            element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$sap$2d$playbook$2f$src$2f$SapRoot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/packages/features-sap-playbook/src/index.tsx",
                lineNumber: 15,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        }
    ],
    menu: [
        {
            label: "SAP Playbook",
            to: "/sap",
            icon: "📖"
        }
    ]
};
const __TURBOPACK__default__export__ = sapPlaybookPlugin;
}),
];

//# sourceMappingURL=packages_features-sap-playbook_src_c0b658bb._.js.map