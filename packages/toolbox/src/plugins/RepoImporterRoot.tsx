"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type ImportedRepoRecord = {
  id: string;
  name: string;
  owner: string;
  category?: string;
  repoUrl: string;
  importedAt: string;
  sourcePath: string;
  previewUrl: string | null;
  readmeExcerpt: string | null;
  activatedFeaturePackage?: string;
  activatedRoute?: string;
  activatedAt?: string;
  nativeTransformLevel?: "strict" | "balanced" | "safe";
  nativeScaffoldMode?: "native" | "iframe" | "static";
  nativeScaffoldReason?: string;
  nativeRiskScore?: number;
  nativeRiskBand?: "low" | "medium" | "high";
  lastSyncedCommit?: string;
  lastCheckedAt?: string;
  lastUpdatedAt?: string;
  previewHealth?: {
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
};

function buildVersionedPreviewUrl(repo: ImportedRepoRecord): string | null {
  if (!repo.previewUrl) {
    return null;
  }

  const version = encodeURIComponent(repo.lastUpdatedAt ?? repo.importedAt);
  const separator = repo.previewUrl.includes("?") ? "&" : "?";
  return `${repo.previewUrl}${separator}v=${version}`;
}

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
  const [importCategory, setImportCategory] = useState("Imported");
  const [importing, setImporting] = useState(false);
  const [transformLevel, setTransformLevel] = useState<"strict" | "balanced" | "safe">("balanced");
  const [activatingRepoId, setActivatingRepoId] = useState<string | null>(null);
  const [deletingRepoId, setDeletingRepoId] = useState<string | null>(null);
  const [checkingRepoId, setCheckingRepoId] = useState<string | null>(null);
  const [savingCategoryRepoId, setSavingCategoryRepoId] = useState<string | null>(null);
  const [categoryDrafts, setCategoryDrafts] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setCategoryDrafts((current) => {
      const next = { ...current };
      repos.forEach((repo) => {
        if (!next[repo.id]) {
          next[repo.id] = repo.category || "Imported";
        }
      });
      return next;
    });
  }, [repos]);

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
        body: JSON.stringify({ repoUrl: trimmed, category: importCategory }),
      });

      const data = (await response.json()) as {
        imported?: ImportedRepoRecord;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Import failed.");
      }

      const healthText = data.imported?.previewHealth
        ? ` Health: ${data.imported.previewHealth.passed ? "PASS" : "WARN"} (${data.imported.previewHealth.score}%).`
        : "";
      setStatus(`Imported ${data.imported?.id ?? "repository"} successfully.${healthText}`);
      setRepoUrl("");
      setImportCategory("Imported");
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

      setStatus(`Activated ${data.activated?.name ?? repoId} as decoupled static route.`);
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

  const handleCheckUpdates = async (repo: ImportedRepoRecord) => {
    setStatus(null);
    setSubmitError(null);

    try {
      setCheckingRepoId(repo.id);
      const response = await fetch("/api/repo-import/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId: repo.id }),
      });

      const data = (await response.json()) as {
        updated?: boolean;
        upToDate?: boolean;
        repo?: ImportedRepoRecord;
        trace?: string[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Failed to check updates.");
      }

      const traceText = Array.isArray(data.trace) && data.trace.length > 0
        ? ` Steps: ${data.trace.slice(-6).join(" -> ")}`
        : "";

      if (data.updated) {
        const previewChanged = Boolean(data.repo?.previewUrl) && data.repo?.previewUrl !== repo.previewUrl;
        if (previewChanged) {
          setStatus(`Updated ${repo.name} to the latest version and refreshed preview.${traceText}`);
        } else {
          setStatus(`Updated ${repo.name} source to latest version, but preview rebuild may have failed. Use Rebuild Preview on the project page.${traceText}`);
        }
      } else if (data.upToDate) {
        setStatus(`${repo.name} is already up to date.${traceText}`);
      } else {
        setStatus(`Checked ${repo.name} successfully.${traceText}`);
      }

      await refresh();
    } catch (updateError) {
      setSubmitError(updateError instanceof Error ? updateError.message : "Failed to check updates.");
    } finally {
      setCheckingRepoId(null);
    }
  };

  const handleCategorySave = async (repo: ImportedRepoRecord) => {
    const nextCategory = (categoryDrafts[repo.id] || "Imported").trim() || "Imported";
    if ((repo.category || "Imported") === nextCategory) {
      return;
    }

    setStatus(null);
    setSubmitError(null);

    try {
      setSavingCategoryRepoId(repo.id);
      const response = await fetch("/api/repo-import", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId: repo.id, category: nextCategory }),
      });

      const data = (await response.json()) as {
        updated?: ImportedRepoRecord;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Failed to update category.");
      }

      setStatus(`Updated ${repo.name} category to ${data.updated?.category ?? nextCategory}.`);
      await refresh();
    } catch (categoryError) {
      setSubmitError(categoryError instanceof Error ? categoryError.message : "Failed to update category.");
    } finally {
      setSavingCategoryRepoId(null);
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
              <label className="text-xs font-semibold text-slate-700" htmlFor="import-category">
                Category
              </label>
              <input
                id="import-category"
                value={importCategory}
                onChange={(event) => setImportCategory(event.target.value)}
                placeholder="Imported"
                className="h-11 min-w-40 rounded-xl border-2 border-slate-300 bg-white/90 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500"
              />
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
                {repo.lastUpdatedAt ? (
                  <p className="mt-1 text-xs text-slate-600">Last updated: {formatDate(repo.lastUpdatedAt)}</p>
                ) : null}
                {repo.lastCheckedAt ? (
                  <p className="mt-1 text-xs text-slate-600">Last checked: {formatDate(repo.lastCheckedAt)}</p>
                ) : null}
                <p className="mt-2 text-xs text-slate-600">Stored at: {repo.sourcePath}</p>
                <p className="mt-1 text-xs font-semibold text-slate-700">Category: {repo.category || "Imported"}</p>
                {repo.lastSyncedCommit ? (
                  <p className="mt-1 font-mono text-[11px] text-slate-500">Commit: {repo.lastSyncedCommit.slice(0, 10)}</p>
                ) : null}
                {repo.activatedRoute ? (
                  <p className="mt-1 text-xs font-semibold text-emerald-700">
                    Active static route: {repo.activatedRoute}
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
                {repo.previewHealth ? (
                  <p className={`mt-1 text-xs font-semibold ${repo.previewHealth.passed ? "text-emerald-700" : "text-amber-700"}`}>
                    Preview health: {repo.previewHealth.passed ? "PASS" : "WARN"} ({repo.previewHealth.score}%)
                  </p>
                ) : null}
                {repo.previewHealth?.summary ? (
                  <p className="mt-1 text-xs text-slate-600">{repo.previewHealth.summary}</p>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  <input
                    value={categoryDrafts[repo.id] ?? repo.category ?? "Imported"}
                    onChange={(event) =>
                      setCategoryDrafts((current) => ({
                        ...current,
                        [repo.id]: event.target.value,
                      }))
                    }
                    aria-label={`Category for ${repo.name}`}
                    className="h-9 min-w-32 rounded-lg border-2 border-slate-300 bg-white/90 px-2 text-xs font-semibold text-slate-700 outline-none transition focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    disabled={savingCategoryRepoId === repo.id}
                    onClick={() => handleCategorySave(repo)}
                    className="rounded-lg border-2 border-indigo-300 bg-white/90 px-3 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingCategoryRepoId === repo.id ? "Saving..." : "Save Category"}
                  </button>
                  <button
                    type="button"
                    disabled={checkingRepoId === repo.id}
                    onClick={() => handleCheckUpdates(repo)}
                    className="rounded-lg border-2 border-sky-300 bg-white/90 px-3 py-2 text-xs font-semibold text-sky-700 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {checkingRepoId === repo.id ? "Checking..." : "Check Updates"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/imported/${repo.id}`)}
                    className="rounded-lg border-2 border-emerald-300 bg-white/90 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    Open Page
                  </button>
                  {repo.previewUrl ? (
                    <a
                      href={buildVersionedPreviewUrl(repo) ?? repo.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Open Static Preview
                    </a>
                  ) : null}
                  <button
                    type="button"
                    disabled={Boolean(repo.activatedRoute) || activatingRepoId === repo.id}
                    onClick={() => handleActivate(repo.id)}
                    className="rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {repo.activatedRoute
                      ? "Static Route Ready"
                      : activatingRepoId === repo.id
                        ? "Activating..."
                        : "Activate Static Route"}
                  </button>
                  {repo.activatedRoute ? (
                    <button
                      type="button"
                      onClick={() => navigate(repo.activatedRoute as string)}
                      className="rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Open Static Route
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
  const { repos, loading, error, refresh } = useImportedRepos();
  const [repairing, setRepairing] = useState(false);
  const [repairMessage, setRepairMessage] = useState<string | null>(null);
  const [repairError, setRepairError] = useState<string | null>(null);

  const repo = useMemo(() => repos.find((item) => item.id === repoId), [repos, repoId]);
  const previewHref = useMemo(() => (repo ? buildVersionedPreviewUrl(repo) : null), [repo]);

  useEffect(() => {
    if (previewHref) {
      window.location.assign(previewHref);
    }
  }, [previewHref]);

  useEffect(() => {
    logImportDebug("ImportedRepoViewer render", {
      repoId,
      loading,
      hasError: Boolean(error),
      hasRepo: Boolean(repo),
      previewUrl: previewHref,
    });
  }, [repoId, loading, error, repo, previewHref]);

  const handleRepairPreview = async () => {
    if (!repo) {
      return;
    }

    try {
      setRepairing(true);
      setRepairError(null);
      setRepairMessage(null);

      const response = await fetch("/api/repo-import/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId: repo.id }),
      });

      const data = (await response.json()) as {
        repo?: ImportedRepoRecord;
        updated?: boolean;
        upToDate?: boolean;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Failed to rebuild preview.");
      }

      const nextPreview = data.repo ? buildVersionedPreviewUrl(data.repo) : null;
      if (nextPreview) {
        window.location.assign(nextPreview);
        return;
      }

      await refresh();
      setRepairMessage("Build completed, but no static preview index.html was generated for this repo.");
    } catch (repairErr) {
      setRepairError(repairErr instanceof Error ? repairErr.message : "Failed to rebuild preview.");
    } finally {
      setRepairing(false);
    }
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

  if (!previewHref) {
    return (
      <div className="playful-bg min-h-dvh px-4 py-8">
        <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white/85 p-6">
          <h2 className="text-xl font-semibold text-slate-900">{repo.name}</h2>
          <p className="mt-2 text-sm text-slate-700">
            This repository was downloaded to {repo.sourcePath}, but no static index.html preview was detected.
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Try rebuilding preview artifacts once. If static output is generated, this page will auto-open it.
          </p>
          {repairMessage ? <p className="mt-2 text-sm text-amber-700">{repairMessage}</p> : null}
          {repairError ? <p className="mt-2 text-sm text-rose-700">{repairError}</p> : null}
          <button
            type="button"
            onClick={handleRepairPreview}
            disabled={repairing}
            className="mt-3 rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
          >
            {repairing ? "Rebuilding Preview..." : "Rebuild Preview Now"}
          </button>
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
              href={previewHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Open In New Tab
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
        <section className="glass-card rounded-2xl border border-emerald-100 p-5">
          <h3 className="text-base font-semibold text-slate-900">Opening interactive preview...</h3>
          <p className="mt-2 text-sm text-slate-700">
            Redirecting to the preview page in this tab. A back button will appear on the preview page for easy navigation.
          </p>
          <div className="mt-3">
            <a
              href={previewHref}
              className="inline-flex rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
            >
              Open Interactive Preview
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
