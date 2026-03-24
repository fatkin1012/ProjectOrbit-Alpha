(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CaseForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CaseForm(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(75);
    if ($[0] !== "66d18cf4955fb7345661cc24495ea36cad1f2821e3c96f3aa04c83a9d6a474d2") {
        for(let $i = 0; $i < 75; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "66d18cf4955fb7345661cc24495ea36cad1f2821e3c96f3aa04c83a9d6a474d2";
    }
    const { onAdd } = t0;
    const [tCodeInput, setTCodeInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [tCodes, setTCodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [requirement, setRequirement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [steps, setSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = [];
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t2);
    const [isPasted, setIsPasted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const readFileAsDataURL = _CaseFormReadFileAsDataURL;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "CaseForm[handlePaste]": async (e)=>{
                const imageItems = Array.from(e.clipboardData.items).filter(_CaseFormHandlePasteAnonymous);
                if (imageItems.length > 0) {
                    const blobs = imageItems.map(_CaseFormHandlePasteImageItemsMap).filter(_CaseFormHandlePasteAnonymous2);
                    const nextImages = await Promise.all(blobs.map({
                        "CaseForm[handlePaste > blobs.map()]": (blob)=>readFileAsDataURL(blob)
                    }["CaseForm[handlePaste > blobs.map()]"]));
                    setImages({
                        "CaseForm[handlePaste > setImages()]": (prev)=>[
                                ...prev,
                                ...nextImages
                            ]
                    }["CaseForm[handlePaste > setImages()]"]);
                    setIsPasted(true);
                    window.setTimeout({
                        "CaseForm[handlePaste > window.setTimeout()]": ()=>setIsPasted(false)
                    }["CaseForm[handlePaste > window.setTimeout()]"], 1400);
                }
            }
        })["CaseForm[handlePaste]"];
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    const handlePaste = t3;
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "CaseForm[handleUploadImages]": async (e_0)=>{
                const files = Array.from(e_0.target.files ?? []).filter(_CaseFormHandleUploadImagesAnonymous);
                if (files.length === 0) {
                    return;
                }
                const nextImages_0 = await Promise.all(files.map({
                    "CaseForm[handleUploadImages > files.map()]": (file_2)=>readFileAsDataURL(file_2)
                }["CaseForm[handleUploadImages > files.map()]"]));
                setImages({
                    "CaseForm[handleUploadImages > setImages()]": (prev_0)=>[
                            ...prev_0,
                            ...nextImages_0
                        ]
                }["CaseForm[handleUploadImages > setImages()]"]);
                e_0.target.value = "";
            }
        })["CaseForm[handleUploadImages]"];
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    const handleUploadImages = t4;
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "CaseForm[handleRemoveImage]": (indexToRemove)=>{
                setImages({
                    "CaseForm[handleRemoveImage > setImages()]": (prev_1)=>prev_1.filter({
                            "CaseForm[handleRemoveImage > setImages() > prev_1.filter()]": (_, index)=>index !== indexToRemove
                        }["CaseForm[handleRemoveImage > setImages() > prev_1.filter()]"])
                }["CaseForm[handleRemoveImage > setImages()]"]);
            }
        })["CaseForm[handleRemoveImage]"];
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    const handleRemoveImage = t5;
    const normalizeTCode = _CaseFormNormalizeTCode;
    let t6;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "CaseForm[addTCodes]": (rawValue)=>{
                const parsed = rawValue.split(/[\s,]+/).map({
                    "CaseForm[addTCodes > (anonymous)()]": (code)=>normalizeTCode(code)
                }["CaseForm[addTCodes > (anonymous)()]"]).filter(_CaseFormAddTCodesAnonymous);
                if (parsed.length === 0) {
                    return;
                }
                setTCodes({
                    "CaseForm[addTCodes > setTCodes()]": (prev_2)=>{
                        const merged = new Set([
                            ...prev_2,
                            ...parsed
                        ]);
                        return Array.from(merged);
                    }
                }["CaseForm[addTCodes > setTCodes()]"]);
                setTCodeInput("");
            }
        })["CaseForm[addTCodes]"];
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    const addTCodes = t6;
    let t7;
    if ($[7] !== tCodeInput) {
        t7 = ({
            "CaseForm[handleAddTCode]": ()=>{
                addTCodes(tCodeInput);
            }
        })["CaseForm[handleAddTCode]"];
        $[7] = tCodeInput;
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    const handleAddTCode = t7;
    let t8;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "CaseForm[handleRemoveTCode]": (codeToRemove)=>{
                setTCodes({
                    "CaseForm[handleRemoveTCode > setTCodes()]": (prev_3)=>prev_3.filter({
                            "CaseForm[handleRemoveTCode > setTCodes() > prev_3.filter()]": (code_1)=>code_1 !== codeToRemove
                        }["CaseForm[handleRemoveTCode > setTCodes() > prev_3.filter()]"])
                }["CaseForm[handleRemoveTCode > setTCodes()]"]);
            }
        })["CaseForm[handleRemoveTCode]"];
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    const handleRemoveTCode = t8;
    let t9;
    if ($[10] !== requirement || $[11] !== steps || $[12] !== tCodes.length || $[13] !== title) {
        t9 = tCodes.length > 0 && [
            title,
            requirement,
            steps
        ].every(_CaseFormAnonymous);
        $[10] = requirement;
        $[11] = steps;
        $[12] = tCodes.length;
        $[13] = title;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    const canSave = t9;
    let t10;
    if ($[15] !== canSave || $[16] !== images || $[17] !== onAdd || $[18] !== requirement || $[19] !== steps || $[20] !== tCodes || $[21] !== title) {
        t10 = ({
            "CaseForm[onSave]": ()=>{
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
            }
        })["CaseForm[onSave]"];
        $[15] = canSave;
        $[16] = images;
        $[17] = onAdd;
        $[18] = requirement;
        $[19] = steps;
        $[20] = tCodes;
        $[21] = title;
        $[22] = t10;
    } else {
        t10 = $[22];
    }
    const onSave = t10;
    let t11;
    let t12;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Add A New SAP Case"
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-1 text-sm text-slate-600",
            children: "Capture solutions quickly and make them searchable for future you."
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 210,
            columnNumber: 11
        }, this);
        $[23] = t11;
        $[24] = t12;
    } else {
        t11 = $[23];
        t12 = $[24];
    }
    let t13;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            htmlFor: "tcode",
            className: "text-sm font-semibold text-slate-700",
            children: "T-Codes"
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 219,
            columnNumber: 11
        }, this);
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = ({
            "CaseForm[<input>.onChange]": (e_1)=>setTCodeInput(e_1.target.value)
        })["CaseForm[<input>.onChange]"];
        $[26] = t14;
    } else {
        t14 = $[26];
    }
    let t15;
    if ($[27] !== handleAddTCode) {
        t15 = ({
            "CaseForm[<input>.onKeyDown]": (e_2)=>{
                if (e_2.key === "Enter" || e_2.key === ",") {
                    e_2.preventDefault();
                    handleAddTCode();
                }
            }
        })["CaseForm[<input>.onKeyDown]"];
        $[27] = handleAddTCode;
        $[28] = t15;
    } else {
        t15 = $[28];
    }
    let t16;
    if ($[29] !== t15 || $[30] !== tCodeInput) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            id: "tcode",
            className: "h-12 flex-1 rounded-xl border-2 border-emerald-200 bg-white/90 px-3 outline-none transition focus:border-emerald-500",
            placeholder: "e.g. VL03N, VA02",
            value: tCodeInput,
            onChange: t14,
            onKeyDown: t15
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[29] = t15;
        $[30] = tCodeInput;
        $[31] = t16;
    } else {
        t16 = $[31];
    }
    let t17;
    if ($[32] !== handleAddTCode) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: handleAddTCode,
            className: "h-12 rounded-xl border-2 border-emerald-300 bg-emerald-50 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100",
            children: "Add"
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 259,
            columnNumber: 11
        }, this);
        $[32] = handleAddTCode;
        $[33] = t17;
    } else {
        t17 = $[33];
    }
    let t18;
    if ($[34] !== t16 || $[35] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: [
                t16,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 267,
            columnNumber: 11
        }, this);
        $[34] = t16;
        $[35] = t17;
        $[36] = t18;
    } else {
        t18 = $[36];
    }
    let t19;
    if ($[37] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-slate-600",
            children: "Add one or multiple codes (comma or Enter)."
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 276,
            columnNumber: 11
        }, this);
        $[37] = t19;
    } else {
        t19 = $[37];
    }
    let t20;
    if ($[38] !== tCodes) {
        t20 = tCodes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2",
            children: tCodes.map({
                "CaseForm[tCodes.map()]": (code_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "CaseForm[tCodes.map() > <button>.onClick]": ()=>handleRemoveTCode(code_2)
                        }["CaseForm[tCodes.map() > <button>.onClick]"],
                        className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100",
                        "aria-label": `Remove ${code_2}`,
                        children: [
                            code_2,
                            " x"
                        ]
                    }, code_2, true, {
                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
                        lineNumber: 284,
                        columnNumber: 45
                    }, this)
            }["CaseForm[tCodes.map()]"])
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 283,
            columnNumber: 32
        }, this);
        $[38] = tCodes;
        $[39] = t20;
    } else {
        t20 = $[39];
    }
    let t21;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            htmlFor: "title",
            className: "text-sm font-semibold text-slate-700",
            children: "Case Title"
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 295,
            columnNumber: 11
        }, this);
        $[40] = t21;
    } else {
        t21 = $[40];
    }
    let t22;
    if ($[41] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = ({
            "CaseForm[<input>.onChange]": (e_3)=>setTitle(e_3.target.value)
        })["CaseForm[<input>.onChange]"];
        $[41] = t22;
    } else {
        t22 = $[41];
    }
    let t23;
    if ($[42] !== title) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            id: "title",
            className: "h-12 rounded-xl border-2 border-green-200 bg-white/90 px-3 outline-none transition focus:border-green-500",
            placeholder: "e.g. Delivery status check not updating",
            value: title,
            onChange: t22
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 311,
            columnNumber: 11
        }, this);
        $[42] = title;
        $[43] = t23;
    } else {
        t23 = $[43];
    }
    let t24;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            htmlFor: "requirement",
            className: "text-sm font-semibold text-slate-700",
            children: "Requirement"
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 319,
            columnNumber: 11
        }, this);
        $[44] = t24;
    } else {
        t24 = $[44];
    }
    let t25;
    if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = ({
            "CaseForm[<textarea>.onChange]": (e_4)=>setRequirement(e_4.target.value)
        })["CaseForm[<textarea>.onChange]"];
        $[45] = t25;
    } else {
        t25 = $[45];
    }
    let t26;
    if ($[46] !== requirement) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
            id: "requirement",
            className: "min-h-24 rounded-xl border-2 border-lime-200 bg-white/90 p-3 outline-none transition focus:border-lime-500",
            placeholder: "What did the user ask for?",
            value: requirement,
            onChange: t25
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 335,
            columnNumber: 11
        }, this);
        $[46] = requirement;
        $[47] = t26;
    } else {
        t26 = $[47];
    }
    let t27;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            htmlFor: "steps",
            className: "text-sm font-semibold text-slate-700",
            children: "Resolution Steps"
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 343,
            columnNumber: 11
        }, this);
        $[48] = t27;
    } else {
        t27 = $[48];
    }
    let t28;
    if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = ({
            "CaseForm[<textarea>.onChange]": (e_5)=>setSteps(e_5.target.value)
        })["CaseForm[<textarea>.onChange]"];
        $[49] = t28;
    } else {
        t28 = $[49];
    }
    let t29;
    if ($[50] !== steps) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
            id: "steps",
            className: "min-h-32 rounded-xl border-2 border-emerald-200 bg-white/90 p-3 outline-none transition focus:border-emerald-400",
            placeholder: "Step-by-step notes to solve the case",
            value: steps,
            onChange: t28
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 359,
            columnNumber: 11
        }, this);
        $[50] = steps;
        $[51] = t29;
    } else {
        t29 = $[51];
    }
    let t30;
    if ($[52] !== t18 || $[53] !== t20 || $[54] !== t23 || $[55] !== t26 || $[56] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 grid gap-3",
            children: [
                t13,
                t18,
                t19,
                t20,
                t21,
                t23,
                t24,
                t26,
                t27,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 367,
            columnNumber: 11
        }, this);
        $[52] = t18;
        $[53] = t20;
        $[54] = t23;
        $[55] = t26;
        $[56] = t29;
        $[57] = t30;
    } else {
        t30 = $[57];
    }
    let t31;
    let t32;
    if ($[58] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-semibold text-emerald-800",
            children: "Paste Screenshot"
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 380,
            columnNumber: 11
        }, this);
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-emerald-700",
            children: "Click this card and press Ctrl+V to paste one or more screenshots."
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 381,
            columnNumber: 11
        }, this);
        $[58] = t31;
        $[59] = t32;
    } else {
        t31 = $[58];
        t32 = $[59];
    }
    let t33;
    if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "mt-3 inline-flex cursor-pointer rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50",
            children: [
                "Upload Screenshots",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "file",
                    accept: "image/*",
                    multiple: true,
                    onChange: handleUploadImages,
                    className: "sr-only"
                }, void 0, false, {
                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
                    lineNumber: 390,
                    columnNumber: 208
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 390,
            columnNumber: 11
        }, this);
        $[60] = t33;
    } else {
        t33 = $[60];
    }
    const t34 = isPasted ? "Screenshot pasted successfully." : "Paste or upload screenshots.";
    let t35;
    if ($[61] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 text-xs text-emerald-700",
            role: "status",
            "aria-live": "polite",
            children: t34
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 398,
            columnNumber: 11
        }, this);
        $[61] = t34;
        $[62] = t35;
    } else {
        t35 = $[62];
    }
    let t36;
    if ($[63] !== images) {
        t36 = images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 grid grid-cols-2 gap-2",
            children: images.map({
                "CaseForm[images.map()]": (image, index_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: image,
                                className: "max-h-32 w-full rounded-xl border border-emerald-200 object-cover shadow",
                                alt: `Screenshot preview ${index_0 + 1}`
                            }, void 0, false, {
                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
                                lineNumber: 407,
                                columnNumber: 122
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: {
                                    "CaseForm[images.map() > <button>.onClick]": ()=>handleRemoveImage(index_0)
                                }["CaseForm[images.map() > <button>.onClick]"],
                                className: "absolute right-1 top-1 rounded bg-black/65 px-2 py-1 text-[10px] font-semibold text-white",
                                "aria-label": `Remove screenshot ${index_0 + 1}`,
                                children: "Remove"
                            }, void 0, false, {
                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
                                lineNumber: 407,
                                columnNumber: 268
                            }, this)
                        ]
                    }, `${image.slice(0, 20)}-${index_0}`, true, {
                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
                        lineNumber: 407,
                        columnNumber: 55
                    }, this)
            }["CaseForm[images.map()]"])
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 406,
            columnNumber: 32
        }, this);
        $[63] = images;
        $[64] = t36;
    } else {
        t36 = $[64];
    }
    let t37;
    if ($[65] !== t35 || $[66] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/80 p-4",
            children: [
                t31,
                t32,
                t33,
                t35,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 418,
            columnNumber: 11
        }, this);
        $[65] = t35;
        $[66] = t36;
        $[67] = t37;
    } else {
        t37 = $[67];
    }
    const t38 = !canSave;
    let t39;
    if ($[68] !== onSave || $[69] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onSave,
            disabled: t38,
            className: "mt-5 h-12 w-full rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50",
            children: "Save To Wiki"
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 428,
            columnNumber: 11
        }, this);
        $[68] = onSave;
        $[69] = t38;
        $[70] = t39;
    } else {
        t39 = $[70];
    }
    let t40;
    if ($[71] !== t30 || $[72] !== t37 || $[73] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            onPaste: handlePaste,
            className: "glass-card pop-in rounded-3xl p-6 md:p-8",
            "aria-label": "Add new wiki case",
            children: [
                t11,
                t12,
                t30,
                t37,
                t39
            ]
        }, void 0, true, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx",
            lineNumber: 437,
            columnNumber: 11
        }, this);
        $[71] = t30;
        $[72] = t37;
        $[73] = t39;
        $[74] = t40;
    } else {
        t40 = $[74];
    }
    return t40;
}
_s(CaseForm, "nAf33b7SIbK4yVMSceMllmxt3vo=");
_c = CaseForm;
function _CaseFormAnonymous(field) {
    return field.trim().length > 0;
}
function _CaseFormAddTCodesAnonymous(code_0) {
    return code_0.length > 0;
}
function _CaseFormNormalizeTCode(value) {
    return value.trim().toUpperCase();
}
function _CaseFormHandleUploadImagesAnonymous(file_1) {
    return file_1.type.startsWith("image/");
}
function _CaseFormHandlePasteAnonymous2(file_0) {
    return file_0 !== null;
}
function _CaseFormHandlePasteImageItemsMap(item_0) {
    return item_0.getAsFile();
}
function _CaseFormHandlePasteAnonymous(item) {
    return item.type.includes("image");
}
function _CaseFormReadFileAsDataURL(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = (event)=>resolve(event.target?.result);
        reader.onerror = ()=>reject(new Error("Failed to read image file."));
        reader.readAsDataURL(file);
    });
}
var _c;
__turbopack_context__.k.register(_c, "CaseForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PictureViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function PictureViewer({ isOpen, images, initialIndex, title, onClose, onSaveAnnotated }) {
    _s();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialIndex);
    const [drawEnabled, setDrawEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [eraseEnabled, setEraseEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [brushColor, setBrushColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("#ff3344");
    const [brushSize, setBrushSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4);
    const [undoCount, setUndoCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const hasDrawnInStrokeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastPointRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const historyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const currentImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PictureViewer.useMemo[currentImage]": ()=>images[currentIndex]
    }["PictureViewer.useMemo[currentImage]"], [
        currentIndex,
        images
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PictureViewer.useEffect": ()=>{
            if (isOpen) {
                setCurrentIndex(initialIndex);
                setDrawEnabled(false);
                setEraseEnabled(false);
            }
        }
    }["PictureViewer.useEffect"], [
        initialIndex,
        isOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PictureViewer.useEffect": ()=>{
            if (!isOpen) {
                return;
            }
            const onKeyDown = {
                "PictureViewer.useEffect.onKeyDown": (e)=>{
                    if (e.key === "Escape") {
                        onClose();
                    }
                    if (e.key === "ArrowRight") {
                        setCurrentIndex({
                            "PictureViewer.useEffect.onKeyDown": (prev)=>(prev + 1) % images.length
                        }["PictureViewer.useEffect.onKeyDown"]);
                    }
                    if (e.key === "ArrowLeft") {
                        setCurrentIndex({
                            "PictureViewer.useEffect.onKeyDown": (prev_0)=>(prev_0 - 1 + images.length) % images.length
                        }["PictureViewer.useEffect.onKeyDown"]);
                    }
                }
            }["PictureViewer.useEffect.onKeyDown"];
            window.addEventListener("keydown", onKeyDown);
            return ({
                "PictureViewer.useEffect": ()=>window.removeEventListener("keydown", onKeyDown)
            })["PictureViewer.useEffect"];
        }
    }["PictureViewer.useEffect"], [
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
        const canvas_0 = canvasRef.current;
        if (!image || !canvas_0) {
            return;
        }
        canvas_0.width = image.clientWidth;
        canvas_0.height = image.clientHeight;
        const ctx = canvas_0.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, canvas_0.width, canvas_0.height);
        historyRef.current = [
            canvas_0.toDataURL("image/png")
        ];
        setUndoCount(0);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PictureViewer.useEffect": ()=>{
            if (!isOpen) {
                return;
            }
            const onResize = {
                "PictureViewer.useEffect.onResize": ()=>syncCanvasSize()
            }["PictureViewer.useEffect.onResize"];
            window.addEventListener("resize", onResize);
            return ({
                "PictureViewer.useEffect": ()=>window.removeEventListener("resize", onResize)
            })["PictureViewer.useEffect"];
        }
    }["PictureViewer.useEffect"], [
        isOpen,
        currentIndex
    ]);
    const drawLine = (from, to)=>{
        const canvas_1 = canvasRef.current;
        if (!canvas_1) {
            return;
        }
        const ctx_0 = canvas_1.getContext("2d");
        if (!ctx_0) {
            return;
        }
        ctx_0.globalCompositeOperation = eraseEnabled ? "destination-out" : "source-over";
        ctx_0.strokeStyle = eraseEnabled ? "rgba(0, 0, 0, 1)" : brushColor;
        ctx_0.lineWidth = brushSize;
        ctx_0.lineCap = "round";
        ctx_0.lineJoin = "round";
        ctx_0.beginPath();
        ctx_0.moveTo(from.x, from.y);
        ctx_0.lineTo(to.x, to.y);
        ctx_0.stroke();
    };
    const getCanvasPoint = (e_0)=>{
        const canvas_2 = canvasRef.current;
        if (!canvas_2) {
            return {
                x: 0,
                y: 0
            };
        }
        const rect = canvas_2.getBoundingClientRect();
        return {
            x: e_0.clientX - rect.left,
            y: e_0.clientY - rect.top
        };
    };
    const handlePointerDown = (e_1)=>{
        if (!drawEnabled) {
            return;
        }
        const point = getCanvasPoint(e_1);
        drawingRef.current = true;
        hasDrawnInStrokeRef.current = true;
        lastPointRef.current = point;
        drawLine(point, point);
        e_1.currentTarget.setPointerCapture(e_1.pointerId);
    };
    const handlePointerMove = (e_2)=>{
        if (!drawEnabled || !drawingRef.current || !lastPointRef.current) {
            return;
        }
        const point_0 = getCanvasPoint(e_2);
        drawLine(lastPointRef.current, point_0);
        hasDrawnInStrokeRef.current = true;
        lastPointRef.current = point_0;
    };
    const handlePointerUp = (e_3)=>{
        if (drawingRef.current && hasDrawnInStrokeRef.current) {
            saveHistorySnapshot();
        }
        drawingRef.current = false;
        hasDrawnInStrokeRef.current = false;
        lastPointRef.current = null;
        if (e_3.currentTarget.hasPointerCapture(e_3.pointerId)) {
            e_3.currentTarget.releasePointerCapture(e_3.pointerId);
        }
    };
    const handleUndo = ()=>{
        const canvas_3 = canvasRef.current;
        if (!canvas_3 || historyRef.current.length <= 1) {
            return;
        }
        historyRef.current = historyRef.current.slice(0, -1);
        const previousSnapshot = historyRef.current[historyRef.current.length - 1];
        if (!previousSnapshot) {
            return;
        }
        const ctx_1 = canvas_3.getContext("2d");
        if (!ctx_1) {
            return;
        }
        const img = new Image();
        img.onload = ()=>{
            ctx_1.clearRect(0, 0, canvas_3.width, canvas_3.height);
            ctx_1.drawImage(img, 0, 0, canvas_3.width, canvas_3.height);
            setUndoCount(historyRef.current.length - 1);
        };
        img.src = previousSnapshot;
    };
    const handleClearMarks = ()=>{
        const canvas_4 = canvasRef.current;
        if (!canvas_4) {
            return;
        }
        const ctx_2 = canvas_4.getContext("2d");
        if (!ctx_2) {
            return;
        }
        ctx_2.clearRect(0, 0, canvas_4.width, canvas_4.height);
        saveHistorySnapshot();
    };
    const exportAnnotatedImage = async ()=>{
        const baseImageSrc = images[currentIndex];
        const canvas_5 = canvasRef.current;
        const image_0 = imageRef.current;
        if (!baseImageSrc || !canvas_5 || !image_0) {
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
                    ctx.drawImage(canvas_5, 0, 0, mergedCanvas.width, mergedCanvas.height);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-4",
        role: "dialog",
        "aria-modal": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-6xl rounded-2xl border border-white/20 bg-slate-950/95 p-3 text-white md:p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 flex flex-wrap items-center justify-between gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-semibold text-emerald-200",
                            children: [
                                title,
                                " - Image ",
                                currentIndex + 1,
                                " / ",
                                images.length
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setCurrentIndex((prev_1)=>(prev_1 - 1 + images.length) % images.length),
                                    className: "rounded-lg border border-white/25 px-3 py-1 text-xs font-semibold hover:bg-white/10",
                                    children: "Prev"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setCurrentIndex((prev_2)=>(prev_2 + 1) % images.length),
                                    className: "rounded-lg border border-white/25 px-3 py-1 text-xs font-semibold hover:bg-white/10",
                                    children: "Next"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                                    lineNumber: 250,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "rounded-lg border border-rose-300/60 px-3 py-1 text-xs font-semibold text-rose-200 hover:bg-rose-300/10",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                                    lineNumber: 253,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-white/15 bg-white/5 p-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setDrawEnabled((prev_3)=>!prev_3),
                            className: `rounded-lg px-3 py-1 text-xs font-semibold transition ${drawEnabled ? "bg-emerald-500 text-white" : "border border-white/25 text-emerald-100"}`,
                            children: drawEnabled ? "Drawing On" : "Enable Draw"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 260,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setEraseEnabled((prev_4)=>!prev_4);
                                if (!drawEnabled) {
                                    setDrawEnabled(true);
                                }
                            },
                            className: `rounded-lg px-3 py-1 text-xs font-semibold transition ${eraseEnabled ? "bg-amber-500 text-white" : "border border-white/25 text-amber-100"}`,
                            children: eraseEnabled ? "Eraser On" : "Eraser"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 264,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-xs text-white/80",
                            children: "Color"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 273,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "color",
                            value: brushColor,
                            onChange: (e_4)=>setBrushColor(e_4.target.value),
                            className: "h-8 w-10 rounded border border-white/20 bg-transparent",
                            "aria-label": "Brush color"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "brush-size",
                            className: "text-xs text-white/80",
                            children: "Brush"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "brush-size",
                            type: "range",
                            min: 2,
                            max: 18,
                            value: brushSize,
                            onChange: (e_5)=>setBrushSize(Number(e_5.target.value)),
                            className: "accent-emerald-400"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 279,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleUndo,
                            disabled: undoCount === 0,
                            className: "rounded-lg border border-white/25 px-3 py-1 text-xs font-semibold hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50",
                            children: "Undo"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleClearMarks,
                            className: "rounded-lg border border-white/25 px-3 py-1 text-xs font-semibold hover:bg-white/10",
                            children: "Clear Marks"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 285,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: exportAnnotatedImage,
                            disabled: saving,
                            className: "rounded-lg bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60",
                            children: saving ? "Saving..." : "Save Marked Copy"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                    lineNumber: 259,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex max-h-[70vh] justify-center overflow-auto rounded-xl border border-white/10 bg-black/30 p-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative inline-block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                ref: imageRef,
                                src: currentImage,
                                alt: `Viewer image ${currentIndex + 1}`,
                                className: "max-h-[66vh] rounded-lg object-contain",
                                onLoad: syncCanvasSize
                            }, void 0, false, {
                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                ref: canvasRef,
                                className: `absolute inset-0 ${drawEnabled ? eraseEnabled ? "cursor-cell" : "cursor-crosshair" : "pointer-events-none"}`,
                                onPointerDown: handlePointerDown,
                                onPointerMove: handlePointerMove,
                                onPointerUp: handlePointerUp,
                                onPointerLeave: handlePointerUp
                            }, void 0, false, {
                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                        lineNumber: 295,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
                    lineNumber: 294,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
            lineNumber: 241,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx",
        lineNumber: 240,
        columnNumber: 10
    }, this);
}
_s(PictureViewer, "+E5s2M7JRIHBDlyPaRTUglM9avk=");
_c = PictureViewer;
var _c;
__turbopack_context__.k.register(_c, "PictureViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PWAInstallPrompt.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PWAInstallPrompt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function PWAInstallPrompt() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "bdb37b56c09a6a31a682a52627e78dfdcd62a0b8df99dbd1ba65e2a476508480") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "bdb37b56c09a6a31a682a52627e78dfdcd62a0b8df99dbd1ba65e2a476508480";
    }
    const [deferredPrompt, setDeferredPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [installed, setInstalled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "PWAInstallPrompt[useEffect()]": ()=>{
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                if ("serviceWorker" in navigator) {
                    navigator.serviceWorker.register("/sw.js").catch(_PWAInstallPromptUseEffectAnonymous);
                }
                const onBeforeInstallPrompt = {
                    "PWAInstallPrompt[useEffect() > onBeforeInstallPrompt]": (event)=>{
                        event.preventDefault();
                        setDeferredPrompt(event);
                    }
                }["PWAInstallPrompt[useEffect() > onBeforeInstallPrompt]"];
                const onAppInstalled = {
                    "PWAInstallPrompt[useEffect() > onAppInstalled]": ()=>{
                        setInstalled(true);
                        setDeferredPrompt(null);
                    }
                }["PWAInstallPrompt[useEffect() > onAppInstalled]"];
                window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
                window.addEventListener("appinstalled", onAppInstalled);
                return ()=>{
                    window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
                    window.removeEventListener("appinstalled", onAppInstalled);
                };
            }
        })["PWAInstallPrompt[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[3] !== deferredPrompt) {
        t2 = ({
            "PWAInstallPrompt[handleInstall]": async ()=>{
                if (!deferredPrompt) {
                    return;
                }
                await deferredPrompt.prompt();
                await deferredPrompt.userChoice;
                setDeferredPrompt(null);
            }
        })["PWAInstallPrompt[handleInstall]"];
        $[3] = deferredPrompt;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const handleInstall = t2;
    if (installed) {
        let t3;
        if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-semibold text-emerald-700",
                role: "status",
                "aria-live": "polite",
                children: "App installed successfully."
            }, void 0, false, {
                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PWAInstallPrompt.tsx",
                lineNumber: 82,
                columnNumber: 12
            }, this);
            $[5] = t3;
        } else {
            t3 = $[5];
        }
        return t3;
    }
    if (!deferredPrompt) {
        return null;
    }
    let t3;
    if ($[6] !== handleInstall) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: handleInstall,
            className: "h-11 rounded-xl border-2 border-emerald-500 bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500",
            "aria-label": "Install this app",
            children: "Install App"
        }, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PWAInstallPrompt.tsx",
            lineNumber: 94,
            columnNumber: 10
        }, this);
        $[6] = handleInstall;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return t3;
}
_s(PWAInstallPrompt, "cGoyO0w3Bm3FgyrYsn1uoexrTsY=");
_c = PWAInstallPrompt;
function _PWAInstallPromptUseEffectAnonymous() {}
var _c;
__turbopack_context__.k.register(_c, "PWAInstallPrompt");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/features-fatkin1012-sap-local-wiki/src/hooks/uselocalStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLocalStorage",
    ()=>useLocalStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useLocalStorage(key, initialValue) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "b92c71b1f927ece666c58e8e327252056724cd3aa25b7fdd8b1812bc78edb98f") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b92c71b1f927ece666c58e8e327252056724cd3aa25b7fdd8b1812bc78edb98f";
    }
    const [storedValue, setStoredValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValue);
    let t0;
    let t1;
    if ($[1] !== key) {
        t0 = ({
            "useLocalStorage[useEffect()]": ()=>{
                const item = window.localStorage.getItem(key);
                if (item) {
                    setStoredValue(JSON.parse(item));
                }
            }
        })["useLocalStorage[useEffect()]"];
        t1 = [
            key
        ];
        $[1] = key;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[4] !== key) {
        t2 = ({
            "useLocalStorage[setValue]": (value)=>{
                setStoredValue(value);
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        })["useLocalStorage[setValue]"];
        $[4] = key;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const setValue = t2;
    let t3;
    if ($[6] !== setValue || $[7] !== storedValue) {
        t3 = [
            storedValue,
            setValue
        ];
        $[6] = setValue;
        $[7] = storedValue;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return t3;
}
_s(useLocalStorage, "fIWh0yMiN4KpXbSVauF2DSPG7i4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SapWikiRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$components$2f$CaseForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-fatkin1012-sap-local-wiki/src/components/CaseForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$components$2f$PictureViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PictureViewer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$components$2f$PWAInstallPrompt$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-fatkin1012-sap-local-wiki/src/components/PWAInstallPrompt.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$hooks$2f$uselocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-fatkin1012-sap-local-wiki/src/hooks/uselocalStorage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function SapWikiRoot() {
    _s();
    const [cases, setCases] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$hooks$2f$uselocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"])("sap-wiki-cases", []);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [activeTCode, setActiveTCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [expandedCaseId, setExpandedCaseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copiedCaseId, setCopiedCaseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingCaseId, setEditingCaseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingSteps, setEditingSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingScreenshots, setEditingScreenshots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isEditPasted, setIsEditPasted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [exportStatus, setExportStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [importStatus, setImportStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [lastImportCount, setLastImportCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [viewer, setViewer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const importInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
    const getCaseScreenshots = (wikiCase_0)=>{
        if (wikiCase_0.screenshots && wikiCase_0.screenshots.length > 0) {
            return wikiCase_0.screenshots;
        }
        return wikiCase_0.screenshot ? [
            wikiCase_0.screenshot
        ] : [];
    };
    const filteredCases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SapWikiRoot.useMemo[filteredCases]": ()=>{
            const normalized = query.trim().toLowerCase();
            return cases.filter({
                "SapWikiRoot.useMemo[filteredCases]": (wikiCase_1)=>{
                    const caseTCodes = getCaseTCodes(wikiCase_1);
                    if (activeTCode !== "all" && !caseTCodes.includes(activeTCode)) {
                        return false;
                    }
                    if (!normalized) {
                        return true;
                    }
                    return caseTCodes.join(" ").toLowerCase().includes(normalized) || wikiCase_1.title.toLowerCase().includes(normalized) || wikiCase_1.requirement.toLowerCase().includes(normalized) || wikiCase_1.steps.toLowerCase().includes(normalized);
                }
            }["SapWikiRoot.useMemo[filteredCases]"]).sort({
                "SapWikiRoot.useMemo[filteredCases]": (a, b)=>b.createdAt - a.createdAt
            }["SapWikiRoot.useMemo[filteredCases]"]);
        }
    }["SapWikiRoot.useMemo[filteredCases]"], [
        activeTCode,
        cases,
        query
    ]);
    const tCodeFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SapWikiRoot.useMemo[tCodeFilters]": ()=>{
            const uniqueCodes = Array.from(new Set(cases.flatMap({
                "SapWikiRoot.useMemo[tCodeFilters].uniqueCodes": (wikiCase_2)=>getCaseTCodes(wikiCase_2)
            }["SapWikiRoot.useMemo[tCodeFilters].uniqueCodes"])));
            return [
                "all",
                ...uniqueCodes
            ];
        }
    }["SapWikiRoot.useMemo[tCodeFilters]"], [
        cases
    ]);
    const newestCase = filteredCases[0];
    const handleAdd = (wikiCase_3)=>{
        setCases([
            wikiCase_3,
            ...cases
        ]);
        setExpandedCaseId(wikiCase_3.id);
    };
    const handleDelete = (caseId)=>{
        setCases(cases.filter((wikiCase_4)=>wikiCase_4.id !== caseId));
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
    const handleStartEditSolution = (wikiCase_5)=>{
        setExpandedCaseId(wikiCase_5.id);
        setEditingCaseId(wikiCase_5.id);
        setEditingSteps(wikiCase_5.steps);
        setEditingScreenshots(getCaseScreenshots(wikiCase_5));
    };
    const handleCancelEditSolution = ()=>{
        setEditingCaseId(null);
        setEditingSteps("");
        setEditingScreenshots([]);
        setIsEditPasted(false);
    };
    const handleSaveEditSolution = (caseId_0)=>{
        const nextSteps = editingSteps.trim();
        if (!nextSteps) {
            return;
        }
        setCases(cases.map((wikiCase_6)=>{
            if (wikiCase_6.id !== caseId_0) {
                return wikiCase_6;
            }
            return {
                ...wikiCase_6,
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
        const files = Array.from(e.target.files ?? []).filter((file_0)=>file_0.type.startsWith("image/"));
        if (files.length === 0) {
            return;
        }
        const nextImages = await Promise.all(files.map((file_1)=>readFileAsDataURL(file_1)));
        setEditingScreenshots((prev)=>[
                ...prev,
                ...nextImages
            ]);
        e.target.value = "";
    };
    const handlePasteEditScreenshots = async (e_0)=>{
        const imageItems = Array.from(e_0.clipboardData.items).filter((item)=>item.type.includes("image"));
        if (imageItems.length === 0) {
            return;
        }
        e_0.preventDefault();
        const blobs = imageItems.map((item_0)=>item_0.getAsFile()).filter((file_2)=>file_2 !== null);
        const nextImages_0 = await Promise.all(blobs.map((blob)=>readFileAsDataURL(blob)));
        setEditingScreenshots((prev_0)=>[
                ...prev_0,
                ...nextImages_0
            ]);
        setIsEditPasted(true);
        window.setTimeout(()=>setIsEditPasted(false), 1400);
    };
    const handleRemoveEditScreenshot = (indexToRemove)=>{
        setEditingScreenshots((prev_1)=>prev_1.filter((_, index)=>index !== indexToRemove));
    };
    const handleCopyTCode = async (wikiCase_7)=>{
        const caseTCodes_0 = getCaseTCodes(wikiCase_7);
        try {
            await navigator.clipboard.writeText(caseTCodes_0.join(", "));
            setCopiedCaseId(wikiCase_7.id);
            window.setTimeout(()=>setCopiedCaseId(null), 1200);
        } catch  {
            setCopiedCaseId(null);
        }
    };
    const viewerCase = viewer ? cases.find((wikiCase_8)=>wikiCase_8.id === viewer.caseId) : null;
    const viewerImages = viewerCase ? getCaseScreenshots(viewerCase) : [];
    const viewerTitle = viewerCase ? `${getCaseTCodes(viewerCase).join(", ")} • ${viewerCase.title}` : "Viewer";
    const handleOpenViewer = (caseId_1, index_0)=>{
        setViewer({
            caseId: caseId_1,
            index: index_0
        });
    };
    const handleCloseViewer = ()=>{
        setViewer(null);
    };
    const handleSaveMarkedCopy = (annotatedImage, _sourceIndex)=>{
        if (!viewer) {
            return;
        }
        setCases(cases.map((wikiCase_9)=>{
            if (wikiCase_9.id !== viewer.caseId) {
                return wikiCase_9;
            }
            const screenshots = getCaseScreenshots(wikiCase_9);
            const nextScreenshots = [
                ...screenshots,
                annotatedImage
            ];
            return {
                ...wikiCase_9,
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
            const blob_0 = new Blob([
                json
            ], {
                type: "application/json"
            });
            const url = window.URL.createObjectURL(blob_0);
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
    const normalizeImportedCase = (wikiCase_10)=>{
        const normalizedTCodes = wikiCase_10.tCodes && wikiCase_10.tCodes.length > 0 ? wikiCase_10.tCodes : wikiCase_10.tCode ? [
            wikiCase_10.tCode
        ] : [];
        const normalizedScreenshots = wikiCase_10.screenshots && wikiCase_10.screenshots.length > 0 ? wikiCase_10.screenshots : wikiCase_10.screenshot ? [
            wikiCase_10.screenshot
        ] : [];
        return {
            ...wikiCase_10,
            tCode: normalizedTCodes[0] ?? wikiCase_10.tCode,
            tCodes: normalizedTCodes,
            screenshot: normalizedScreenshots[0],
            screenshots: normalizedScreenshots
        };
    };
    const handleImportData = async (e_1)=>{
        const file_3 = e_1.target.files?.[0];
        if (!file_3) {
            return;
        }
        try {
            const fileText = await file_3.text();
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
                e_1.target.value = "";
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
            e_1.target.value = "";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "playful-bg min-h-dvh px-4 py-6 md:px-8 md:py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto w-full max-w-6xl space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "glass-card pop-in relative overflow-hidden rounded-3xl p-6 md:p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "float-slow absolute -right-8 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-emerald-300 to-green-500 opacity-70 blur-[1px]"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                            lineNumber: 269,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -left-6 bottom-2 h-24 w-24 rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 opacity-70"
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700",
                                    children: "LOCAL SEARCHABLE WIKI"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "mt-3 text-3xl font-semibold leading-tight text-slate-900 md:text-5xl",
                                    children: [
                                        "Find The Fix Fast,",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-gradient-to-r from-emerald-700 via-green-600 to-teal-500 bg-clip-text text-transparent",
                                            children: [
                                                " ",
                                                "Keep The Know-How Forever"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                            lineNumber: 278,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 276,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 max-w-2xl text-sm leading-7 text-slate-700 md:text-base",
                                    children: "Store SAP case solutions, search instantly by T-Code or keyword, and turn today's issue into tomorrow's shortcut."
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 283,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: importInputRef,
                                            type: "file",
                                            accept: "application/json,.json",
                                            onChange: handleImportData,
                                            className: "sr-only",
                                            "aria-label": "Import backup file"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                            lineNumber: 289,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleExportData,
                                            className: "h-11 rounded-xl border-2 border-emerald-300 bg-white/90 px-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50",
                                            children: "Export Backup"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                            lineNumber: 291,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>importInputRef.current?.click(),
                                            className: "h-11 rounded-xl border-2 border-slate-300 bg-white/90 px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-100",
                                            children: "Import Backup"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$components$2f$PWAInstallPrompt$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                            lineNumber: 299,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                            lineNumber: 301,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "grid gap-4 md:grid-cols-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "glass-card rounded-2xl p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold tracking-wider text-slate-600",
                                    children: "TOTAL CASES"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 314,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-3xl font-semibold text-slate-900",
                                    children: cases.length
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 315,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                            lineNumber: 313,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "glass-card rounded-2xl p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold tracking-wider text-slate-600",
                                    children: "VISIBLE NOW"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-3xl font-semibold text-slate-900",
                                    children: filteredCases.length
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 319,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "glass-card rounded-2xl p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold tracking-wider text-slate-600",
                                    children: "LATEST HOTSPOT"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 truncate text-xl font-semibold text-slate-900",
                                    children: newestCase ? getCaseTCodes(newestCase).join(", ") : "No cases yet"
                                }, void 0, false, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                    lineNumber: 312,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "grid gap-5 lg:grid-cols-[1.1fr_0.9fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass-card rounded-3xl p-4 md:p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "search",
                                            className: "text-sm font-semibold text-slate-700",
                                            children: "Search Cases"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                            lineNumber: 332,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "search",
                                                    type: "search",
                                                    value: query,
                                                    onChange: (e_2)=>setQuery(e_2.target.value),
                                                    placeholder: "Search by T-Code, title, requirement, or steps",
                                                    className: "h-12 flex-1 rounded-xl border-2 border-emerald-200 bg-white/90 px-3 outline-none transition focus:border-emerald-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setQuery(""),
                                                    className: "h-12 rounded-xl border-2 border-slate-200 bg-white/90 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100",
                                                    children: "Clear"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                            lineNumber: 335,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex flex-wrap gap-2",
                                            children: tCodeFilters.map((filterCode)=>{
                                                const isActive = activeTCode === filterCode;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setActiveTCode(filterCode),
                                                    className: `rounded-full border-2 px-3 py-1 text-xs font-semibold transition ${isActive ? "border-emerald-600 bg-emerald-600 text-white" : "border-emerald-200 bg-white/80 text-slate-700 hover:border-emerald-400"}`,
                                                    children: filterCode === "all" ? "All T-Codes" : filterCode
                                                }, filterCode, false, {
                                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 24
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                            lineNumber: 342,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3",
                                    children: [
                                        filteredCases.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "glass-card rounded-2xl p-6 text-sm text-slate-700",
                                            children: "No matching cases yet. Add one on the right and it will appear here instantly."
                                        }, void 0, false, {
                                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                            lineNumber: 353,
                                            columnNumber: 46
                                        }, this),
                                        filteredCases.map((wikiCase_11, index_1)=>{
                                            const isExpanded = expandedCaseId === wikiCase_11.id;
                                            const isEditing = editingCaseId === wikiCase_11.id;
                                            const caseTCodes_1 = getCaseTCodes(wikiCase_11);
                                            const screenshots_0 = getCaseScreenshots(wikiCase_11);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "glass-card rounded-2xl p-4",
                                                style: {
                                                    animationDelay: `${index_1 * 45}ms`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-start justify-between gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-wrap gap-1",
                                                                        children: caseTCodes_1.map((code)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "inline-flex rounded-full bg-gradient-to-r from-emerald-600 to-green-500 px-2 py-1 text-xs font-semibold text-white",
                                                                                children: code
                                                                            }, `${wikiCase_11.id}-${code}`, false, {
                                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                lineNumber: 368,
                                                                                columnNumber: 53
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                        lineNumber: 367,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "mt-2 text-lg font-semibold text-slate-900",
                                                                        children: wikiCase_11.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                        lineNumber: 372,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                lineNumber: 366,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>handleCopyTCode(wikiCase_11),
                                                                        className: "rounded-lg border-2 border-emerald-200 bg-white/90 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100",
                                                                        children: copiedCaseId === wikiCase_11.id ? "Copied" : "Copy T-Codes"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                        lineNumber: 376,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>handleDelete(wikiCase_11.id),
                                                                        className: "rounded-lg border-2 border-rose-200 bg-white/90 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100",
                                                                        children: "Remove"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                        lineNumber: 379,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                lineNumber: 375,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                        lineNumber: 365,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 line-clamp-2 text-sm text-slate-700",
                                                        children: wikiCase_11.requirement
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setExpandedCaseId(isExpanded ? null : wikiCase_11.id),
                                                        className: "mt-3 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700",
                                                        children: isExpanded ? "Hide Solution" : "Show Solution"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 21
                                                    }, this),
                                                    isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pop-in mt-3 space-y-3 rounded-xl border border-slate-200 bg-white/90 p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-slate-500",
                                                                        children: "Requirement"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                        lineNumber: 393,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-slate-700",
                                                                        children: wikiCase_11.requirement
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                        lineNumber: 394,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                lineNumber: 392,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-slate-500",
                                                                        children: "Resolution"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                        lineNumber: 397,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                                value: editingSteps,
                                                                                onChange: (e_3)=>setEditingSteps(e_3.target.value),
                                                                                className: "min-h-28 w-full rounded-xl border-2 border-emerald-200 bg-white p-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500",
                                                                                "aria-label": "Edit solution"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                lineNumber: 399,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "rounded-xl border border-emerald-200 bg-emerald-50/60 p-3",
                                                                                onPaste: handlePasteEditScreenshots,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-xs font-semibold text-emerald-800",
                                                                                        children: "Edit Screenshots"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                        lineNumber: 401,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-1 text-xs text-emerald-700",
                                                                                        children: "Click here and press Ctrl+V to paste screenshot(s)."
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                        lineNumber: 402,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "mt-2 inline-flex cursor-pointer rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50",
                                                                                        children: [
                                                                                            "Add Screenshots",
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                type: "file",
                                                                                                accept: "image/*",
                                                                                                multiple: true,
                                                                                                onChange: handleAddEditScreenshots,
                                                                                                className: "sr-only"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                                lineNumber: 407,
                                                                                                columnNumber: 35
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                        lineNumber: 405,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-2 text-xs text-emerald-700",
                                                                                        role: "status",
                                                                                        "aria-live": "polite",
                                                                                        children: isEditPasted ? "Screenshot pasted successfully." : "Paste or upload screenshots."
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                        lineNumber: 409,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    editingScreenshots.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "mt-3 grid grid-cols-2 gap-2",
                                                                                        children: editingScreenshots.map((screenshot, screenshotIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "relative",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                        src: screenshot,
                                                                                                        alt: `Editing screenshot ${screenshotIndex + 1} for ${caseTCodes_1.join(", ")}`,
                                                                                                        className: "max-h-28 w-full rounded-lg border border-emerald-200 object-cover"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                                        lineNumber: 416,
                                                                                                        columnNumber: 41
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                        type: "button",
                                                                                                        onClick: ()=>handleRemoveEditScreenshot(screenshotIndex),
                                                                                                        className: "absolute right-1 top-1 rounded bg-black/65 px-2 py-1 text-[10px] font-semibold text-white",
                                                                                                        "aria-label": `Remove screenshot ${screenshotIndex + 1}`,
                                                                                                        children: "Remove"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                                        lineNumber: 417,
                                                                                                        columnNumber: 41
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, `edit-${wikiCase_11.id}-${screenshotIndex}`, true, {
                                                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                                lineNumber: 414,
                                                                                                columnNumber: 94
                                                                                            }, this))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                        lineNumber: 413,
                                                                                        columnNumber: 66
                                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-2 text-xs text-emerald-700",
                                                                                        children: "No screenshots attached."
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                        lineNumber: 421,
                                                                                        columnNumber: 44
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                lineNumber: 400,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        type: "button",
                                                                                        onClick: ()=>handleSaveEditSolution(wikiCase_11.id),
                                                                                        disabled: !editingSteps.trim(),
                                                                                        className: "rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50",
                                                                                        children: "Save Solution"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                        lineNumber: 424,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        type: "button",
                                                                                        onClick: handleCancelEditSolution,
                                                                                        className: "rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50",
                                                                                        children: "Cancel"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                        lineNumber: 427,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                lineNumber: 423,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                        lineNumber: 398,
                                                                        columnNumber: 40
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "whitespace-pre-wrap text-sm text-slate-700",
                                                                                children: wikiCase_11.steps
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                lineNumber: 432,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>handleStartEditSolution(wikiCase_11),
                                                                                className: "mt-2 rounded-lg border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100",
                                                                                children: "Edit Solution"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                lineNumber: 433,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 25
                                                            }, this),
                                                            screenshots_0.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mb-2 text-xs font-semibold text-slate-500",
                                                                        children: [
                                                                            "Screenshots (",
                                                                            screenshots_0.length,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                        lineNumber: 439,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
                                                                        children: screenshots_0.map((screenshot_0, screenshotIndex_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>handleOpenViewer(wikiCase_11.id, screenshotIndex_0),
                                                                                className: "group relative overflow-hidden rounded-lg border border-slate-200 text-left",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        src: screenshot_0,
                                                                                        alt: `Screenshot ${screenshotIndex_0 + 1} for ${caseTCodes_1.join(", ")}`,
                                                                                        className: "max-h-52 w-full object-cover transition group-hover:scale-[1.02]"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                        lineNumber: 445,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold text-white",
                                                                                        children: "Open"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                        lineNumber: 446,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, `${wikiCase_11.id}-shot-${screenshotIndex_0}`, true, {
                                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                                lineNumber: 443,
                                                                                columnNumber: 87
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                        lineNumber: 442,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                                lineNumber: 438,
                                                                columnNumber: 54
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 36
                                                    }, this)
                                                ]
                                            }, wikiCase_11.id, true, {
                                                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                                lineNumber: 362,
                                                columnNumber: 22
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                                    lineNumber: 352,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                            lineNumber: 330,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$components$2f$CaseForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onAdd: handleAdd
                        }, void 0, false, {
                            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                            lineNumber: 458,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                    lineNumber: 329,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$components$2f$PictureViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    isOpen: Boolean(viewer && viewerImages.length > 0),
                    images: viewerImages,
                    initialIndex: viewer?.index ?? 0,
                    title: viewerTitle,
                    onClose: handleCloseViewer,
                    onSaveAnnotated: handleSaveMarkedCopy
                }, void 0, false, {
                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                    lineNumber: 461,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "pb-4 text-center text-xs font-semibold text-slate-600",
                    children: "Built for quick fixes, shared memory, and less repeated debugging."
                }, void 0, false, {
                    fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
                    lineNumber: 463,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
            lineNumber: 267,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx",
        lineNumber: 266,
        columnNumber: 10
    }, this);
}
_s(SapWikiRoot, "gPHnWT2s1QzijJqpb1iKSCNa+uQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$hooks$2f$uselocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"]
    ];
});
_c = SapWikiRoot;
var _c;
__turbopack_context__.k.register(_c, "SapWikiRoot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/features-fatkin1012-sap-local-wiki/src/GeneratedFeatureRoot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeneratedFeatureRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$SapWikiRoot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-fatkin1012-sap-local-wiki/src/SapWikiRoot.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function GeneratedFeatureRoot() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "d9cabd8c3fdd9d518f3aeff0f956691dae783ac8ec70b91b8583dee2106b1dfe") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d9cabd8c3fdd9d518f3aeff0f956691dae783ac8ec70b91b8583dee2106b1dfe";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$SapWikiRoot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/GeneratedFeatureRoot.tsx",
            lineNumber: 15,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c = GeneratedFeatureRoot;
var _c;
__turbopack_context__.k.register(_c, "GeneratedFeatureRoot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/features-fatkin1012-sap-local-wiki/src/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$GeneratedFeatureRoot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features-fatkin1012-sap-local-wiki/src/GeneratedFeatureRoot.tsx [app-client] (ecmascript)");
;
;
const featureFatkin1012SapLocalWikiPlugin = {
    id: "imported-fatkin1012-sap-local-wiki",
    name: "Sap Local Wiki",
    version: "0.1.0",
    routes: [
        {
            path: "/repo-fatkin1012-sap-local-wiki/*",
            element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2d$fatkin1012$2d$sap$2d$local$2d$wiki$2f$src$2f$GeneratedFeatureRoot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/packages/features-fatkin1012-sap-local-wiki/src/index.tsx",
                lineNumber: 11,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        }
    ],
    menu: [
        {
            label: "Sap Local Wiki",
            to: "/repo-fatkin1012-sap-local-wiki",
            icon: "Repo"
        }
    ]
};
const __TURBOPACK__default__export__ = featureFatkin1012SapLocalWikiPlugin;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=packages_features-fatkin1012-sap-local-wiki_src_c3120895._.js.map