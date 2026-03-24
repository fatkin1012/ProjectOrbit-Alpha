module.exports=[12714,(e,t,a)=>{t.exports=e.x("node:fs/promises",()=>require("node:fs/promises"))},60526,(e,t,a)=>{t.exports=e.x("node:os",()=>require("node:os"))},50227,(e,t,a)=>{t.exports=e.x("node:path",()=>require("node:path"))},74533,(e,t,a)=>{t.exports=e.x("node:child_process",()=>require("node:child_process"))},8626,e=>{"use strict";var t=e.i(12714),a=e.i(60526),i=e.i(50227),r=e.i(74533);let o=i.default.join(process.cwd(),".toolbox-imports.json"),n=i.default.resolve(process.cwd(),"..","imported-repos"),l=i.default.join(process.cwd(),"public","imported"),s=i.default.join(process.cwd(),"src","plugins","generated-imports.ts");function d(e){return e.toLowerCase().replace(/\.git$/i,"").replace(/[^a-z0-9-]/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")}function c(e){return e.split("-").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join("")}async function u(e){try{return await (0,t.stat)(e),!0}catch{return!1}}async function f(e,a){for(let r of(await (0,t.mkdir)(a,{recursive:!0}),await (0,t.readdir)(e,{withFileTypes:!0}))){if([".git","node_modules",".next",".turbo","dist-ssr"].includes(r.name))continue;let o=i.default.join(e,r.name),n=i.default.join(a,r.name);if(r.isDirectory()){await f(o,n);continue}r.isFile()&&await (0,t.copyFile)(o,n)}}async function p(e,t){await new Promise((a,i)=>{let o=(0,r.spawn)("git",["clone","--depth","1",e,t],{stdio:["ignore","pipe","pipe"]}),n="";o.stderr.on("data",e=>{n+=String(e)}),o.on("error",()=>{i(Error("Git executable not found. Please install Git and retry."))}),o.on("close",e=>{0!==e?i(Error(n.trim()||"Failed to clone repository.")):a()})})}function m(e){return`${e}.cmd`}function w(e,t){return!!(e.dependencies?.[t]||e.devDependencies?.[t])}async function h(e,t,a,i){await new Promise((o,n)=>{let l=(0,r.spawn)(e,t,{cwd:a,env:{...process.env,CI:"1",NEXT_TELEMETRY_DISABLED:"1"},stdio:["ignore","pipe","pipe"]}),s="";l.stderr.on("data",e=>{s+=String(e)});let d=setTimeout(()=>{l.kill(),n(Error(`Command timed out: ${e} ${t.join(" ")}`))},i);l.on("error",()=>{clearTimeout(d),n(Error(`Failed to run command: ${e}`))}),l.on("close",e=>{(clearTimeout(d),0!==e)?n(Error(s.trim()||`Command failed with exit code ${e}`)):o()})})}async function x(e){let a=i.default.join(e,"package.json");if(!await u(a))return null;try{let e=await (0,t.readFile)(a,"utf8");return JSON.parse(e)}catch{return null}}function g(e,t){if(!t)return e;let a={...e};for(let[e,i]of Object.entries(t))a[e]=i;return a}async function v(e){for(let a of[i.default.join(e,"src","pages","routes.tsx"),i.default.join(e,"src","pages","routes.ts"),i.default.join(e,"src","routes.tsx"),i.default.join(e,"src","routes.ts")]){if(!await u(a))continue;let r=await (0,t.readFile)(a,"utf8");if(/createBrowserRouter|BrowserRouter/.test(r))return i.default.relative(e,a).replace(/\\/g,"/")}return null}async function y(e){for(let t of[{filePath:i.default.join(e,"src","App.tsx"),importPath:"./App"},{filePath:i.default.join(e,"src","App.ts"),importPath:"./App"},{filePath:i.default.join(e,"src","app","App.tsx"),importPath:"./app/App"},{filePath:i.default.join(e,"src","app","App.ts"),importPath:"./app/App"}])if(await u(t.filePath))return t.importPath;return null}async function j(e,a){let r=new Set;for(let a of[i.default.join(e,"src","app","modules.ts"),i.default.join(e,"src","modules.ts"),i.default.join(e,"src","config","modules.ts")])if(await u(a))for(let e of(await (0,t.readFile)(a,"utf8")).matchAll(/title\s*:\s*["'`]([^"'`]+)["'`]/g))e[1]&&r.add(e[1].trim());if(a){let o=i.default.join(e,a);if(await u(o))for(let e of(await (0,t.readFile)(o,"utf8")).matchAll(/path\s*:\s*["'`]([^"'`]+)["'`]/g)){let t=(e[1]||"").trim();if(!t||"*"===t||"/"===t)continue;let a=t.replace(/^\//,"").split("/").filter(Boolean).slice(-1)[0]?.replace(/[-_]/g," ").replace(/\b\w/g,e=>e.toUpperCase());a&&r.add(a)}}return Array.from(r).slice(0,24)}async function $(e,t){var a;let r=await x(e),o=w(r??{},"react"),n=w(r??{},"react-router-dom"),l=w(r??{},"next"),s=w(r??{},"vite"),d=await v(e),c=await j(e,d),f=await y(e),p=await u(i.default.join(e,"src","app","providers.tsx")),m=await u(i.default.join(e,"src","styles","globals.css")),h=0;o||(h+=10),n||(h+=3),d||(h+=3),f||(h+=2),l&&(h+=3),m||(h+=1),s&&(h=Math.max(0,h-1));let g=(a=h)<=3?"low":a<=6?"medium":"high";if(!o)return{shouldUseNative:!1,reason:"No React dependency detected.",routeFileRelativePath:null,moduleLabels:c,sourceManifest:r,hasAppProviders:p,hasGlobalStyles:m,appEntryImportPath:f,riskScore:h,riskBand:g,transformLevel:t};if(!f)return{shouldUseNative:!1,reason:"App entry file was not detected (expected src/App.tsx or src/app/App.tsx).",routeFileRelativePath:d,moduleLabels:c,sourceManifest:r,hasAppProviders:p,hasGlobalStyles:m,appEntryImportPath:f,riskScore:h,riskBand:g,transformLevel:t};let $=!!(n&&d),_=!1,b="";return b="strict"===t?(_=$||o)?`Strict mode enabled native scaffold (risk: ${g}, score: ${h}).`:"Strict mode fallback to iframe due to missing React entry signals.":"safe"===t?(_=$&&!l&&h<=3)?`Safe mode approved native scaffold (risk: ${g}, score: ${h}).`:`Safe mode fallback to iframe (risk: ${g}, score: ${h}).`:(_=$&&h<=6)?`Balanced mode approved native scaffold (risk: ${g}, score: ${h}).`:`Balanced mode fallback to iframe (risk: ${g}, score: ${h}).`,{shouldUseNative:_,reason:b,routeFileRelativePath:d,moduleLabels:c,sourceManifest:r,hasAppProviders:p,hasGlobalStyles:m,appEntryImportPath:f,riskScore:h,riskBand:g,transformLevel:t}}async function _(e,a){let r=i.default.join(e,a);if(!await u(r))return;let o=await (0,t.readFile)(r,"utf8"),n=o;(o=o.replace(/\bcreateBrowserRouter\b/g,"createMemoryRouter"))!==n&&await (0,t.writeFile)(r,o,"utf8")}async function b(e){for(let a of["next.config.ts","next.config.mjs","next.config.js"]){let r=i.default.join(e,a);if(!await u(r))continue;let o=await (0,t.readFile)(r,"utf8");if(/\boutput\s*:\s*["']export["']/m.test(o))return!0;for(let e of[/const\s+nextConfig\s*:\s*NextConfig\s*=\s*\{/m,/const\s+nextConfig\s*=\s*\{/m,/module\.exports\s*=\s*\{/m,/export\s+default\s*\{/m]){if(!e.test(o))continue;let a=o.replace(e,e=>`${e}
  output: "export",`);return await (0,t.writeFile)(r,a,"utf8"),!0}}return!1}async function N(e){let a=[i.default.join(e,"src","app"),i.default.join(e,"app")],r=["manifest.ts","manifest.js","manifest.mjs","manifest.tsx","manifest.jsx"];for(let e of a)for(let a of r){let r=i.default.join(e,a);await u(r)&&await (0,t.rm)(r,{force:!0})}}async function R(e){let t=await x(e);if(!t?.scripts?.build)return null;try{await u(i.default.join(e,"node_modules"))||await h(m("npm"),["install","--no-audit","--no-fund"],e,36e4),await h(m("npm"),["run","build"],e,36e4);let a=await P(e);if(a&&await S(a))return a;if(w(t,"next")){if(await b(e)){await N(e);try{await h(m("npm"),["run","build"],e,36e4)}catch{}if((a=await P(e))&&await S(a))return a}try{await h(m("npx"),["next","export"],e,18e4)}catch{}if((a=await P(e))&&await S(a))return a}}catch{}return null}async function P(e){for(let t of[e,i.default.join(e,"dist"),i.default.join(e,"build"),i.default.join(e,"out"),i.default.join(e,"public")])if(await u(i.default.join(t,"index.html")))return t;return null}async function S(e){let a=i.default.join(e,"index.html");if(!await u(a))return!1;let r=await (0,t.readFile)(a,"utf8");return!/<script[^>]+src=["']\/?src\//i.test(r)}async function F(e){let a=i.default.join(e,"index.html");if(!await u(a))return;let r=await (0,t.readFile)(a,"utf8");r=r.replace(/(['"])\/([a-zA-Z_-])/g,"$1./$2"),await (0,t.writeFile)(a,r,"utf8")}async function A(e){for(let a of["README.md","readme.md","README.MD"]){let r=i.default.join(e,a);if(await u(r))return(await (0,t.readFile)(r,"utf8")).slice(0,1600)}return null}async function E(){if(!await u(o))return[];let e=JSON.parse(await (0,t.readFile)(o,"utf8"));return Array.isArray(e)?e:[]}async function O(e){await (0,t.writeFile)(o,JSON.stringify(e,null,2),"utf8")}async function U(){if(await u(s))return;let e=`import type { ToolboxPlugin } from "../plugin-types";

// AUTO-GENERATED IMPORTS - do not edit manually.
// __AUTO_IMPORTS_START__
// __AUTO_IMPORTS_END__

export const generatedPlugins: ToolboxPlugin[] = [
  // __AUTO_PLUGINS_START__
  // __AUTO_PLUGINS_END__
];
`;await (0,t.writeFile)(s,e,"utf8")}async function T(e,a){await U();let i=await (0,t.readFile)(s,"utf8");if(i.includes(`from "${e}"`))return;let r=`import ${a} from "${e}";`,o=i.replace("// __AUTO_IMPORTS_END__",`${r}
// __AUTO_IMPORTS_END__`).replace("// __AUTO_PLUGINS_END__",`  ${a},
  // __AUTO_PLUGINS_END__`);await (0,t.writeFile)(s,o,"utf8")}async function k(e,a){if(!await u(s))return;let i=(await (0,t.readFile)(s,"utf8")).replace(`import ${a} from "${e}";
`,"").replace(`  ${a},
`,"");await (0,t.writeFile)(s,i,"utf8")}async function I(e,a){let r=`features-${e.id}`,o=i.default.resolve(process.cwd(),"..",r),l=`repo-${e.id}`,s=`/${l}`,d=e.name.split("-").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),u=`feature${c(e.id)}Plugin`,p=i.default.join(n,e.id),m=await $(p,a);await (0,t.mkdir)(i.default.join(o,"src"),{recursive:!0}),m.shouldUseNative&&(await f(i.default.join(p,"src"),i.default.join(o,"src")),m.routeFileRelativePath&&await _(o,m.routeFileRelativePath));let w={name:r,version:"0.1.0",private:!0,description:`Generated feature package for imported repo ${e.repoUrl}`,main:"src/index.tsx",exports:{".":"./src/index.tsx"},dependencies:g({react:"^19.2.3","react-dom":"^19.2.3"},m.shouldUseNative?m.sourceManifest?.dependencies:void 0),devDependencies:g({"@types/react":"^19","@types/react-dom":"^19",typescript:"^5"},m.shouldUseNative?m.sourceManifest?.devDependencies:void 0)},h=JSON.stringify(e.previewUrl),x=JSON.stringify(e.repoUrl),v=JSON.stringify(e.sourcePath),y=JSON.stringify(d),j=JSON.stringify(e.readmeExcerpt),b=JSON.stringify(m.moduleLabels),N=JSON.stringify(m.reason),R=`export const detectedModules = ${b} as const;
export const nativeScaffoldReason = ${N};
`,P=m.appEntryImportPath??"./App",S=`"use client";

import App from ${JSON.stringify(P)};
import { detectedModules, nativeScaffoldReason } from "./GeneratedFeatureModules";
${m.hasAppProviders?'import { AppProviders } from "./app/providers";\n':""}${m.hasGlobalStyles?'import "./styles/globals.css";\n':""}export default function GeneratedFeatureRoot() {
  const app = <App />;

  return (
    <div className="-m-6 min-h-[calc(100dvh-4.25rem)] p-6">
      <p className="mb-3 text-xs text-slate-600">{nativeScaffoldReason}</p>
      {detectedModules.length > 0 ? (
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white/80 p-3 text-xs text-slate-700">
          <span className="font-semibold text-slate-900">Detected modules:</span>
          {detectedModules.map((moduleLabel) => (
            <span key={moduleLabel} className="rounded-full border border-slate-300 bg-white px-2 py-1">
              {moduleLabel}
            </span>
          ))}
        </div>
      ) : null}
      ${m.hasAppProviders?"<AppProviders>{app}</AppProviders>":"app"}
    </div>
  );
}
`,F=`"use client";

const previewUrl: string | null = ${h};
const repoUrl = ${x};
const sourcePath = ${v};
const title = ${y};
const readmeExcerpt: string | null = ${j};

export default function GeneratedFeatureRoot() {
  return (
    <div className="-m-6 flex h-[calc(100dvh-4.25rem)] min-h-[calc(100dvh-4.25rem)] w-[calc(100%+3rem)] flex-col bg-white">
      <main className="flex h-full min-h-0 w-full flex-1 flex-col">
        {previewUrl ? (
          <div className="flex min-h-0 flex-1 overflow-hidden bg-white">
            <iframe
              src={previewUrl}
              title={title + " preview"}
              style={{ width: "100%", height: "100%", border: 0, backgroundColor: "#fff" }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads allow-presentation"
            />
          </div>
        ) : (
          <section className="h-full w-full overflow-auto bg-white p-4">
            <p className="text-sm text-slate-700">
              No static index.html preview was detected for this repository. You can still use its code from the local folder and adapt it to a native React feature package.
            </p>
            {readmeExcerpt ? (
              <pre className="mt-3 max-h-80 overflow-auto rounded-xl bg-white/85 p-3 text-xs leading-6 text-slate-700">
                {readmeExcerpt}
              </pre>
            ) : null}
          </section>
        )}
      </main>
    </div>
  );
}
`,A=`import type { ToolboxPlugin } from "@toolbox/plugin-types";
import GeneratedFeatureRoot from "./GeneratedFeatureRoot";

const ${u}: ToolboxPlugin = {
  id: ${JSON.stringify(`imported-${e.id}`)},
  name: ${y},
  version: "0.1.0",
  routes: [
    {
      path: ${JSON.stringify(`${s}/*`)},
      element: <GeneratedFeatureRoot />,
    },
  ],
  menu: [
    {
      label: ${y},
      to: ${JSON.stringify(s)},
      icon: "Repo",
    },
  ],
};

export default ${u};
`;return await (0,t.writeFile)(i.default.join(o,"package.json"),JSON.stringify(w,null,2),"utf8"),await (0,t.writeFile)(i.default.join(o,"tsconfig.json"),JSON.stringify({extends:"../../tsconfig.base.json",compilerOptions:{noEmit:!0},include:["src/**/*"]},null,2),"utf8"),await (0,t.writeFile)(i.default.join(o,"src","GeneratedFeatureModules.ts"),R,"utf8"),await (0,t.writeFile)(i.default.join(o,"src","GeneratedFeatureRoot.tsx"),m.shouldUseNative?S:F,"utf8"),await (0,t.writeFile)(i.default.join(o,"src","index.tsx"),A,"utf8"),await T(r,u),{packageName:r,routePath:s,nativePlan:m}}async function L(e){let{owner:r,repo:o}=function(e){let t;try{t=new URL(e.trim())}catch{throw Error("Invalid URL. Please paste a full repository URL.")}if(!t.hostname.endsWith("github.com"))throw Error("Only github.com repository URLs are supported right now.");let a=t.pathname.split("/").filter(Boolean);if(a.length<2)throw Error("Repository URL should look like https://github.com/owner/repo");return{owner:d(a[0]),repo:d(a[1])}}(e),s=`${r}-${o}`,c=await E(),u=c.find(t=>t.id===s||t.repoUrl===e);if(u)throw Error(`Repository already imported as ${u.id}.`);let m=await (0,t.mkdtemp)(i.default.join(a.default.tmpdir(),"toolbox-import-")),w=i.default.join(m,"repo");try{await p(e,w);let a=i.default.join(n,s);await (0,t.rm)(a,{recursive:!0,force:!0}),await f(w,a);let d=await P(w);d&&!await S(d)&&(d=null),d||(d=await R(w));let u=null;if(d){let e=i.default.join(l,s);await (0,t.rm)(e,{recursive:!0,force:!0}),await f(d,e),await F(e),u=`/imported/${s}/index.html`}let m=await A(w),h={id:s,name:o,owner:r,repoUrl:e,importedAt:new Date().toISOString(),sourcePath:`packages/imported-repos/${s}`,previewUrl:u,readmeExcerpt:m};return c.unshift(h),await O(c),h}finally{await (0,t.rm)(m,{recursive:!0,force:!0})}}async function M(e,t){let a=await E(),i=a.find(t=>t.id===d(e));if(!i)throw Error("Imported repository not found.");if(i.activatedFeaturePackage)throw Error(`Repository already activated as ${i.activatedFeaturePackage}.`);let r=function(e){let t=(e??"").trim().toLowerCase();if("strict"===t||"safe"===t||"balanced"===t)return t;let a=(process.env.TOOLBOX_NATIVE_TRANSFORM_LEVEL??"").trim().toLowerCase();return"strict"===a||"safe"===a||"balanced"===a?a:"balanced"}(t),{packageName:o,routePath:n,nativePlan:l}=await I(i,r),s={...i,activatedFeaturePackage:o,activatedRoute:n,activatedAt:new Date().toISOString(),nativeTransformLevel:r,nativeScaffoldMode:l.shouldUseNative?"native":"iframe",nativeScaffoldReason:l.reason,nativeRiskScore:l.riskScore,nativeRiskBand:l.riskBand},c=a.map(e=>e.id===i.id?s:e);return await O(c),s}async function D(e){let a=d(e),r=await E(),o=r.find(e=>e.id===a);if(!o)throw Error("Imported repository not found.");if(await (0,t.rm)(i.default.join(n,o.id),{recursive:!0,force:!0}),await (0,t.rm)(i.default.join(l,o.id),{recursive:!0,force:!0}),o.activatedFeaturePackage){let e=`feature${c(o.id)}Plugin`,a=i.default.resolve(process.cwd(),"..",o.activatedFeaturePackage);await (0,t.rm)(a,{recursive:!0,force:!0}),await k(o.activatedFeaturePackage,e)}let s=r.filter(e=>e.id!==o.id);return await O(s),{deletedId:o.id}}i.default.join(process.cwd(),"next.config.ts"),e.s(["activateImportedRepository",()=>M,"deleteImportedRepository",()=>D,"importRepository",()=>L,"loadImportedRepos",()=>E])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__05415919._.js.map