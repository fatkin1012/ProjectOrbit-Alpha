"use client";

const previewUrl: string | null = null;
const repoUrl = "https://github.com/fatkin1012/SAP-Local-Wiki";
const sourcePath = "packages/imported-repos/fatkin1012-sap-local-wiki";
const title = "Sap Local Wiki";
const readmeExcerpt: string | null = "# SAP Local Wiki\r\n\r\nA local-first SAP case knowledge app for saving proven solutions, screenshots, and reusable troubleshooting notes.\r\n\r\nGoal: capture the fix once, find it fast next time.\r\n\r\n## Features\r\n\r\n1. Create SAP cases with title, requirement, and resolution steps.\r\n2. Attach multiple T-codes to one case.\r\n3. Search by T-code, title, requirement, or solution text.\r\n4. Filter by T-code chips.\r\n5. Upload or paste screenshots with Ctrl+V.\r\n6. Edit existing solutions and screenshots.\r\n7. Open screenshots in fullscreen picture viewer.\r\n8. Annotate screenshots in viewer.\r\n9. Use brush color and size controls.\r\n10. Erase parts of drawings with eraser mode.\r\n11. Undo drawing actions.\r\n12. Save annotated screenshot as a new copy.\r\n13. Export all local wiki data to JSON backup.\r\n14. Import JSON backup to restore wiki data.\r\n15. Install as a PWA app (Install App flow).\r\n16. Keep data local in browser localStorage.\r\n\r\n## Privacy Model\r\n\r\n- No backend database is used.\r\n- No cloud sync is built in.\r\n- Data is stored in browser localStorage on your machine.\r\n- GitHub receives data only if you manually commit files; localStorage data is not part of git.\r\n\r\n## Backup and Transfer\r\n\r\nUse header buttons:\r\n\r\n- Export Backup: downloads all cases to a JSON file.\r\n- Import Backup: restore from exported JSON on this browser/device.\r\n\r\nThis makes it easy to move your wiki data to another machine manually.\r\n\r\n## Run Modes\r\n\r\n### Development mode\r\n\r\n```bash\r\nnpm.cmd run dev\r\n```\r\n\r\nOpen http://localhost:3000.\r\n\r\n### Production mode (recommended for daily use)\r\n\r\nBuild once after code change";

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
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
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
