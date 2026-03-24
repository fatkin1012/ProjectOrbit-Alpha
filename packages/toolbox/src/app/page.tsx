"use client";

import Link from "next/link";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export default function Home() {
  const features = [
    {
      id: "sap-playbook",
      icon: "Knowledge Base",
      label: "SAP Playbook",
      description: "Capture and search SAP fixes with screenshots and local-first storage.",
      href: "/app/sap",
    },
    {
      id: "project",
      icon: "Projects",
      label: "Project Manager",
      description: "Plan workstreams and track milestones in one shared workspace.",
      href: "/app/project",
      disabled: true,
    },
    {
      id: "repo-import",
      icon: "Import",
      label: "Repo Import Wizard",
      description: "Paste a GitHub URL and import the project into Toolbox as a local page.",
      href: "/app/import",
    },
  ];

  return (
    <div className="playful-bg min-h-dvh px-4 py-6 md:px-8 md:py-10">
      <main className="mx-auto w-full max-w-6xl space-y-6">
        <header className="glass-card pop-in relative overflow-hidden rounded-3xl p-6 md:p-8">
          <div className="float-slow absolute -right-8 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-emerald-300 to-green-500 opacity-70 blur-[1px]" />
          <div className="absolute -left-6 bottom-2 h-24 w-24 rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 opacity-70" />

          <div className="relative">
            <p className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
              TOOLBOX WEB APP
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Toolbox
              <span className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-500 bg-clip-text text-transparent">
                {" "}
                Platform
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700 md:text-base">
              Same visual language as SAP Playbook, now at app level. Launch tools, save workflows,
              and install it to your desktop like a standalone app.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Link
                href="/app"
                className="h-11 rounded-xl border-2 border-emerald-500 bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Open Toolbox
              </Link>
              <Link
                href="/app/sap"
                className="h-11 rounded-xl border-2 border-emerald-300 bg-white/90 px-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                Open SAP Playbook
              </Link>
              <PWAInstallPrompt />
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => {
            const cardClasses = feature.disabled
              ? "glass-card rounded-2xl p-5 opacity-65"
              : "glass-card rounded-2xl p-5 transition hover:-translate-y-0.5";

            return (
              <Link
                key={feature.id}
                href={feature.disabled ? "#" : feature.href}
                className={cardClasses}
                onClick={(event) => {
                  if (feature.disabled) {
                    event.preventDefault();
                  }
                }}
              >
                <p className="text-xs font-semibold tracking-wider text-slate-600">{feature.icon}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{feature.label}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-700">{feature.description}</p>
                <p className="mt-4 text-sm font-semibold text-emerald-700">
                  {feature.disabled ? "Coming soon" : "Open feature"}
                </p>
              </Link>
            );
          })}
        </section>

        <footer className="pb-2 text-center text-xs font-semibold text-slate-600">
          Built with Next.js, React, TypeScript and local-first architecture.
        </footer>
      </main>
    </div>
  );
}
