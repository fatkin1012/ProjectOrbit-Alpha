"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type ImportedRepoRecord = {
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
  nativeTransformLevel?: "strict" | "balanced" | "safe";
  nativeScaffoldMode?: "native" | "iframe";
  nativeScaffoldReason?: string;
  nativeRiskScore?: number;
  nativeRiskBand?: "low" | "medium" | "high";
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

function logImportDebug(event: string, payload?: Record<string, unknown>): void {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  if (payload) {
    console.log(`[RepoImportDebug] ${event}`, payload);
    return;
  }

  console.log(`[RepoImportDebug] ${event}`);
}

function useImportedRepos() {
  const [repos, setRepos] = useState<ImportedRepoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/repo-import", {
        method: "GET",
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = (await response.json()) as { repos?: ImportedRepoRecord[]; error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Failed to load imports.");
      }
      setRepos(Array.isArray(data.repos) ? data.repos : []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load imports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { repos, loading, error, refresh };
}

export function RepoImporterRoot() {
  const navigate = useNavigate();
  const { repos, loading, error, refresh } = useImportedRepos();
  const [repoUrl, setRepoUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [transformLevel, setTransformLevel] = useState<"strict" | "balanced" | "safe">("balanced");
  const [activatingRepoId, setActivatingRepoId] = useState<string | null>(null);
  const [deletingRepoId, setDeletingRepoId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleImport = async (event: React.FormEvent<HTMLFormElement>) => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: trimmed }),
      });

      const data = (await response.json()) as {
        imported?: ImportedRepoRecord;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Import failed.");
      }

      setStatus(`Imported ${data.imported?.id ?? "repository"} successfully.`);
      setRepoUrl("");
      await refresh();
    } catch (importError) {
      setSubmitError(importError instanceof Error ? importError.message : "Import failed.");
    } finally {
      setImporting(false);
    }
  };

  const handleActivate = async (repoId: string) => {
    setStatus(null);
    setSubmitError(null);

    try {
      setActivatingRepoId(repoId);
      const response = await fetch("/api/repo-import/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId, transformLevel }),
      });

      const data = (await response.json()) as {
        activated?: ImportedRepoRecord;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Feature activation failed.");
      }

      setStatus(
        `Activated ${data.activated?.name ?? repoId} as ${data.activated?.activatedFeaturePackage ?? "feature package"} using ${transformLevel} mode. Restart dev server to load it.`,
      );
      await refresh();
      if (data.activated?.activatedRoute) {
        navigate(data.activated.activatedRoute);
      }
    } catch (activationError) {
      try {
        const fallbackResponse = await fetch("/api/repo-import", {
          method: "GET",
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        const fallbackData = (await fallbackResponse.json()) as {
          repos?: ImportedRepoRecord[];
        };

        const activatedRepo = fallbackData.repos?.find((repo) => repo.id === repoId && repo.activatedRoute);
        if (activatedRepo?.activatedRoute) {
          setStatus(`Activated ${activatedRepo.name}. Opening native feature...`);
          await refresh();
          navigate(activatedRepo.activatedRoute);
          return;
        }
      } catch {
        // Fallback check is best-effort only.
      }

      setSubmitError(activationError instanceof Error ? activationError.message : "Feature activation failed.");
    } finally {
      setActivatingRepoId(null);
    }
  };

  const handleDelete = async (repo: ImportedRepoRecord) => {
    const confirmed = window.confirm(
      `Delete ${repo.name}? This removes downloaded files and generated feature package (if activated).`,
    );

    if (!confirmed) {
      return;
    }

    setStatus(null);
    setSubmitError(null);

    try {
      setDeletingRepoId(repo.id);
      const response = await fetch("/api/repo-import", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId: repo.id }),
      });

      const data = (await response.json()) as {
        deleted?: { deletedId?: string };
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Delete failed.");
      }

      setStatus(`Deleted ${data.deleted?.deletedId ?? repo.id}.`);
      await refresh();
    } catch (deleteError) {
      setSubmitError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
    } finally {
      setDeletingRepoId(null);
    }
  };

  return (
    <div className="playful-bg min-h-dvh px-4 py-6 md:px-8 md:py-10">
      <main className="mx-auto w-full max-w-6xl space-y-5">
        <header className="glass-card rounded-3xl p-5 md:p-6">
          <p className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
            REPOSITORY IMPORT WIZARD
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900 md:text-4xl">Import A New Project</h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 md:text-base">
            Paste a GitHub repository URL. Toolbox will clone it into your local workspace under packages/imported-repos and create a new in-app page.
          </p>
        </header>

        <section className="glass-card rounded-2xl p-5">
          <form onSubmit={handleImport} className="space-y-3">
            <label htmlFor="repo-url" className="text-sm font-semibold text-slate-700">
              GitHub Repository URL
            </label>
            <input
              id="repo-url"
              value={repoUrl}
              onChange={(event) => setRepoUrl(event.target.value)}
              placeholder="https://github.com/owner/repository"
              className="h-12 w-full rounded-xl border-2 border-emerald-200 bg-white/90 px-3 text-sm outline-none transition focus:border-emerald-500"
            />
            <div className="flex flex-wrap items-center gap-2">
              <label className="text-xs font-semibold text-slate-700" htmlFor="transform-level">
                Native Transform Level
              </label>
              <select
                id="transform-level"
                value={transformLevel}
                onChange={(event) => setTransformLevel(event.target.value as "strict" | "balanced" | "safe")}
                className="h-11 rounded-xl border-2 border-slate-300 bg-white/90 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500"
              >
                <option value="safe">safe (low risk only)</option>
                <option value="balanced">balanced (recommended)</option>
                <option value="strict">strict (prefer native)</option>
              </select>
              <button
                type="submit"
                disabled={importing}
                className="h-11 rounded-xl border-2 border-emerald-500 bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {importing ? "Importing..." : "Import Repository"}
              </button>
              <p className="text-xs text-slate-600">Requires Git installed on this machine.</p>
            </div>
          </form>

          {status ? <p className="mt-3 text-sm font-semibold text-emerald-700">{status}</p> : null}
          {submitError ? <p className="mt-3 text-sm font-semibold text-rose-700">{submitError}</p> : null}
          {error ? <p className="mt-3 text-sm font-semibold text-rose-700">{error}</p> : null}
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Imported Projects</h2>

          {loading ? (
            <div className="glass-card rounded-2xl p-4 text-sm text-slate-700">Loading imported repositories...</div>
          ) : null}

          {!loading && repos.length === 0 ? (
            <div className="glass-card rounded-2xl p-4 text-sm text-slate-700">
              No repositories imported yet.
            </div>
          ) : null}

          <div className="grid gap-3 md:grid-cols-2">
            {repos.map((repo) => (
              <article key={repo.id} className="glass-card rounded-2xl p-4">
                <p className="text-xs font-semibold tracking-wider text-slate-500">{repo.owner}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{repo.name}</h3>
                <p className="mt-1 text-xs text-slate-600">Imported: {formatDate(repo.importedAt)}</p>
                <p className="mt-2 text-xs text-slate-600">Stored at: {repo.sourcePath}</p>
                {repo.activatedFeaturePackage ? (
                  <p className="mt-1 text-xs font-semibold text-emerald-700">
                    Active native feature: {repo.activatedFeaturePackage}
                  </p>
                ) : null}
                {repo.nativeScaffoldMode ? (
                  <p className="mt-1 text-xs text-slate-700">
                    Scaffold mode: {repo.nativeScaffoldMode} ({repo.nativeTransformLevel ?? "balanced"})
                    {repo.nativeRiskBand ? ` • risk ${repo.nativeRiskBand}` : ""}
                    {typeof repo.nativeRiskScore === "number" ? ` (${repo.nativeRiskScore})` : ""}
                  </p>
                ) : null}
                {repo.nativeScaffoldReason ? (
                  <p className="mt-1 text-xs text-slate-600">{repo.nativeScaffoldReason}</p>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/imported/${repo.id}`)}
                    className="rounded-lg border-2 border-emerald-300 bg-white/90 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    Open Page
                  </button>
                  {repo.previewUrl ? (
                    <a
                      href={repo.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Open Static Preview
                    </a>
                  ) : null}
                  <button
                    type="button"
                    disabled={Boolean(repo.activatedFeaturePackage) || activatingRepoId === repo.id}
                    onClick={() => handleActivate(repo.id)}
                    className="rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {repo.activatedFeaturePackage
                      ? "Native Feature Ready"
                      : activatingRepoId === repo.id
                        ? "Activating..."
                        : "Activate As Native Feature"}
                  </button>
                  {repo.activatedRoute ? (
                    <button
                      type="button"
                      onClick={() => navigate(repo.activatedRoute as string)}
                      className="rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Open Native Feature
                    </button>
                  ) : null}
                  <button
                    type="button"
                    disabled={deletingRepoId === repo.id}
                    onClick={() => handleDelete(repo)}
                    className="rounded-lg border-2 border-rose-300 bg-white px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingRepoId === repo.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export function ImportedRepoViewer() {
  const { repoId } = useParams();
  const navigate = useNavigate();
  const { repos, loading, error } = useImportedRepos();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [embedState, setEmbedState] = useState<"loading" | "ready" | "failed">("loading");

  const repo = useMemo(() => repos.find((item) => item.id === repoId), [repos, repoId]);

  useEffect(() => {
    if (!repo?.previewUrl) {
      setEmbedState("failed");
      return;
    }

    setEmbedState("loading");
    const timeout = window.setTimeout(() => {
      setEmbedState("failed");
    }, 8000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [repo?.id, repo?.previewUrl]);

  useEffect(() => {
    logImportDebug("ImportedRepoViewer render", {
      repoId,
      loading,
      hasError: Boolean(error),
      hasRepo: Boolean(repo),
      previewUrl: repo?.previewUrl ?? null,
      embedState,
    });
  }, [repoId, loading, error, repo, embedState]);

  const handleFrameLoad = () => {
    logImportDebug("ImportedRepoViewer iframe load", {
      repoId,
      previewUrl: repo?.previewUrl ?? null,
    });

    window.setTimeout(() => {
      const frame = iframeRef.current;
      if (!frame) {
        logImportDebug("ImportedRepoViewer iframe missing ref", { repoId });
        setEmbedState("failed");
        return;
      }

      try {
        const doc = frame.contentDocument;
        const body = doc?.body;
        const root = body?.querySelector("#root, #app, #__next") as HTMLElement | null;

        const textLength = body?.textContent?.replace(/\s+/g, "").length ?? 0;
        const rootChildCount = root?.childElementCount ?? 0;
        const bodyChildCount = body?.childElementCount ?? 0;

        logImportDebug("ImportedRepoViewer iframe DOM stats", {
          repoId,
          frameUrl: frame.src,
          textLength,
          rootChildCount,
          bodyChildCount,
        });

        if (textLength === 0 && rootChildCount === 0 && bodyChildCount <= 1) {
          logImportDebug("ImportedRepoViewer iframe appears blank", {
            repoId,
            frameUrl: frame.src,
          });
          setEmbedState("failed");
          return;
        }
      } catch (inspectError) {
        // If browser blocks frame inspection, still keep embedded view available.
        logImportDebug("ImportedRepoViewer iframe inspection blocked", {
          repoId,
          message: inspectError instanceof Error ? inspectError.message : String(inspectError),
        });
      }

      logImportDebug("ImportedRepoViewer iframe marked ready", { repoId });
      setEmbedState("ready");
    }, 600);
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading imported project...</div>;
  }

  if (error) {
    return <div style={{ color: "#b91c1c", padding: "2rem" }}>Error: {error}</div>;
  }

  if (!repo) {
    return (
      <div className="playful-bg min-h-dvh px-4 py-8">
        <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white/85 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Imported project not found.</h2>
          <button
            type="button"
            onClick={() => navigate("/import")}
            className="mt-3 rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700"
          >
            Back To Import Wizard
          </button>
        </div>
      </div>
    );
  }

  if (!repo.previewUrl) {
    return (
      <div className="playful-bg min-h-dvh px-4 py-8">
        <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white/85 p-6">
          <h2 className="text-xl font-semibold text-slate-900">{repo.name}</h2>
          <p className="mt-2 text-sm text-slate-700">
            This repository was downloaded to {repo.sourcePath}, but no static index.html preview was detected.
          </p>
          <p className="mt-2 text-sm text-slate-700">
            You can still use the code locally from that folder and wire it into a Toolbox feature package.
          </p>
          <button
            type="button"
            onClick={() => navigate("/import")}
            className="mt-3 rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700"
          >
            Back To Import Wizard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="playful-bg min-h-dvh px-4 py-4 md:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">
        <div className="glass-card flex flex-wrap items-center justify-between gap-2 rounded-2xl p-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{repo.name}</h2>
            <p className="text-xs text-slate-600">{repo.repoUrl}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={repo.previewUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700"
            >
              Open Static Preview
            </a>
            <button
              type="button"
              onClick={() => navigate("/import")}
              className="rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700"
            >
              Back To Import Wizard
            </button>
          </div>
        </div>

        {embedState === "failed" ? (
          <section className="glass-card rounded-2xl border border-emerald-100 p-5">
            <h3 className="text-base font-semibold text-slate-900">Embedded preview could not be rendered.</h3>
            <p className="mt-2 text-sm text-slate-700">
              This repository may require a build step or block iframe embedding. Use Open Static Preview to open it directly.
            </p>
            <div className="mt-3">
              <a
                href={repo.previewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
              >
                Open Static Preview
              </a>
            </div>
          </section>
        ) : (
          <div className="glass-card overflow-hidden rounded-2xl border border-emerald-100">
            <iframe
              ref={iframeRef}
              src={repo.previewUrl}
              onLoad={handleFrameLoad}
              onError={() => {
                logImportDebug("ImportedRepoViewer iframe error event", {
                  repoId,
                  previewUrl: repo.previewUrl,
                });
                setEmbedState("failed");
              }}
              title={`${repo.name} preview`}
              style={{ width: "100%", height: "80vh", border: 0, backgroundColor: "#fff" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
