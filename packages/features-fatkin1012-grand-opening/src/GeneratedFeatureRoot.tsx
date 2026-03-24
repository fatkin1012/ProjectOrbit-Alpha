"use client";

import { useEffect, useRef, useState } from "react";

const previewUrl: string | null = "/imported/fatkin1012-grand-opening/index.html";
const repoUrl = "https://github.com/fatkin1012/Grand_Opening";
const sourcePath = "packages/imported-repos/fatkin1012-grand-opening";
const title = "Grand Opening";
const readmeExcerpt: string | null = "Pomodoro\r\nHabit tracker\r\ncalender view\r\nSOP assit\r\nAutomation??\r\n\r\nHow to make this more business worthy\r\n\r\n\r\nMicro-Habit Builder: an app that helps users build tiny habits (30s–5min). Uses streaks, gentle nudges, context triggers (location, time, weather), and micro-rewards. Offers customizable habit templates and habit chains (e.g., \"after brushing -> 1min stretch\").\r\n\r\nSkill Snack Marketplace: short, focused lessons (2–8 minutes) for practical skills: speed reading, Excel trick, basic car maintenance, quick recipes. Users buy or trade \"snack packs.\" Includes progress badges and a “practice timer” to keep sessions tiny and consistent.\r\n\r\nQuiet Commute: ambient-sound + productivity app that turns commute time into micro-work sessions without stress. Offers curated playlists, single-task prompts (read one article, reply to 2 emails), and commute-safe activities like vocabulary flashcards or mindfulness.\r\n\r\nShared Pantry: community app for neighbors to share surplus food and household items. Simple posting, pickup scheduling, swap credits, safety checks, and an automatic grocery-match feature that suggests who might want an item.\r\n\r\nFocus Friend: pair users together for timed co-working sprints with built-in accountability. Option for anonymous partners, optional voice check-ins at start/end, and a leaderboard for consistency. Integrates with calendars and has Pomodoro, ultradian, and custom modes.\r\n\r\nSecond-Brain Clips: capture short notes (text, voice, photo) and auto-summarize into searchable “clips.” Smart tags, link suggestions, and daily review prompts turn loose ideas";

function logGeneratedFeatureDebug(event: string, payload?: Record<string, unknown>): void {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  if (payload) {
    console.log(`[GeneratedFeatureDebug] ${event}`, payload);
    return;
  }

  console.log(`[GeneratedFeatureDebug] ${event}`);
}

export default function GeneratedFeatureRoot() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const readinessTimeoutRef = useRef<number | null>(null);
  const [embedState, setEmbedState] = useState<"loading" | "ready" | "failed">("loading");
  const [embedIssue, setEmbedIssue] = useState<string | null>(null);
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null);

  const clearReadinessTimeout = () => {
    if (readinessTimeoutRef.current !== null) {
      window.clearTimeout(readinessTimeoutRef.current);
      readinessTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    logGeneratedFeatureDebug("mounted", {
      title,
      previewUrl,
      sourcePath,
    });
  }, []);

  useEffect(() => {
    if (!previewUrl) {
      clearReadinessTimeout();
      setEmbedIssue("No preview URL is available for this repository.");
      setCanEmbed(false);
      setEmbedState("failed");
      return;
    }

    setEmbedState("loading");
    setEmbedIssue(null);
    setCanEmbed(null);

    void fetch(previewUrl, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          const issue = `Preview URL returned HTTP ${response.status}.`;
          logGeneratedFeatureDebug("preview preflight HTTP failure", { title, previewUrl, status: response.status });
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
          logGeneratedFeatureDebug("preview preflight detected source entry", { title, previewUrl });
          clearReadinessTimeout();
          setEmbedIssue(issue);
          setCanEmbed(false);
          setEmbedState("failed");
          return;
        }

        logGeneratedFeatureDebug("preview preflight passed", { title, previewUrl });
        setCanEmbed(true);
      })
      .catch((preflightError) => {
        const issue = preflightError instanceof Error ? preflightError.message : String(preflightError);
        logGeneratedFeatureDebug("preview preflight error", { title, previewUrl, issue });
        clearReadinessTimeout();
        setEmbedIssue(`Preview preflight failed: ${issue}`);
        setCanEmbed(false);
        setEmbedState("failed");
      });

    clearReadinessTimeout();
    readinessTimeoutRef.current = window.setTimeout(() => {
      logGeneratedFeatureDebug("iframe readiness timeout", { title, previewUrl });
      setEmbedIssue((existing) => existing ?? "Iframe rendered no visible content before timeout.");
      setEmbedState("failed");
    }, 9000);

    return () => {
      clearReadinessTimeout();
    };
  }, []);

  const inspectFrame = () => {
    const frame = iframeRef.current;
    if (!frame) {
      logGeneratedFeatureDebug("iframe ref missing", { title });
      return;
    }

    try {
      const doc = frame.contentDocument;
      const body = doc?.body;
      const root = body?.querySelector("#root, #app, #__next") as HTMLElement | null;
      const textLength = body?.textContent?.replace(/\s+/g, "").length ?? 0;
      const rootChildCount = root?.childElementCount ?? 0;
      const bodyChildCount = body?.childElementCount ?? 0;

      logGeneratedFeatureDebug("iframe DOM stats", {
        title,
        frameUrl: frame.src,
        textLength,
        rootChildCount,
        bodyChildCount,
      });

      if (textLength === 0 && rootChildCount === 0) {
        logGeneratedFeatureDebug("iframe appears blank", { title, frameUrl: frame.src });
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
        message: inspectError instanceof Error ? inspectError.message : String(inspectError),
      });
      clearReadinessTimeout();
      setEmbedState("ready");
    }
  };

  return (
    <div className="-m-6 flex h-[calc(100dvh-4.25rem)] min-h-[calc(100dvh-4.25rem)] w-[calc(100%+3rem)] flex-col bg-white">
      <main className="flex h-full min-h-0 w-full flex-1 flex-col">
        {previewUrl ? (
          <div className="flex min-h-0 flex-1 overflow-hidden bg-white">
            {embedState === "failed" ? (
              <section className="h-full w-full overflow-auto p-5">
                <h3 className="text-base font-semibold text-slate-900">Preview could not be rendered inline.</h3>
                <p className="mt-2 text-sm text-slate-700">
                  {embedIssue ?? "This repo likely needs a build/dev server and cannot be shown as a raw static iframe."}
                </p>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex rounded-lg border-2 border-emerald-500 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                >
                  Open Raw Imported Index
                </a>
              </section>
            ) : canEmbed === null ? (
              <section className="h-full w-full overflow-auto p-5">
                <h3 className="text-base font-semibold text-slate-900">Checking preview compatibility...</h3>
                <p className="mt-2 text-sm text-slate-700">Verifying whether this imported project can be rendered safely in an iframe.</p>
              </section>
            ) : (
              <iframe
                ref={iframeRef}
                src={previewUrl}
                onLoad={() => {
                  logGeneratedFeatureDebug("iframe loaded", { title, previewUrl });
                  window.setTimeout(inspectFrame, 600);
                }}
                onError={() => {
                  logGeneratedFeatureDebug("iframe error event", { title, previewUrl });
                  clearReadinessTimeout();
                  setCanEmbed(false);
                  setEmbedState("failed");
                }}
                title={title + " preview"}
                style={{ width: "100%", height: "100%", border: 0, backgroundColor: "#fff" }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            )}
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
