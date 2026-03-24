"use client";

const previewUrl: string | null = null;
const repoUrl = "https://github.com/octocat/Hello-World";
const sourcePath = "packages/imported-repos/octocat-hello-world";
const title = "Hello World";
const readmeExcerpt: string | null = null;

export default function GeneratedFeatureRoot() {
  return (
    <div className="playful-bg min-h-dvh px-4 py-5 md:px-8 md:py-8">
      <main className="mx-auto w-full max-w-7xl space-y-4">
        <header className="glass-card rounded-2xl p-4 md:p-5">
          <p className="text-xs font-semibold tracking-wider text-slate-600">IMPORTED FEATURE</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900 md:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-slate-700">Source repository: {repoUrl}</p>
          <p className="text-xs text-slate-600">Local files: {sourcePath}</p>
        </header>

        {previewUrl ? (
          <div className="glass-card overflow-hidden rounded-2xl border border-emerald-100">
            <iframe
              src={previewUrl}
              title={title + " preview"}
              style={{ width: "100%", height: "80vh", border: 0, backgroundColor: "#fff" }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        ) : (
          <section className="glass-card rounded-2xl p-4">
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
