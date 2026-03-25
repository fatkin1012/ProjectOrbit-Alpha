import React, { useEffect } from "react";
import type { ToolboxPlugin } from "./plugin-types";
import repoImporterPlugin from "./plugins/repo-importer";

/**
 * Plugin Registry
 * 中央位置管理和載入所有工具箱功能包
 * 每個 feature-* 套件都應該匯出一個 ToolboxPlugin 物件
 */

const registeredPlugins: ToolboxPlugin[] = [];
let pluginsInitialized = false;

type ImportedRepoRecord = {
  id: string;
  name: string;
  category?: string;
  previewUrl: string | null;
  importedAt: string;
  lastUpdatedAt?: string;
  activatedRoute?: string;
};

function buildVersionedPreviewUrl(repo: ImportedRepoRecord): string | null {
  if (!repo.previewUrl) {
    return null;
  }

  const version = encodeURIComponent(repo.lastUpdatedAt ?? repo.importedAt);
  const separator = repo.previewUrl.includes("?") ? "&" : "?";
  return `${repo.previewUrl}${separator}v=${version}`;
}

function StaticRepoRoute(props: { previewUrl: string | null; name: string }) {
  const { previewUrl, name } = props;

  useEffect(() => {
    if (previewUrl) {
      window.location.assign(previewUrl);
    }
  }, [previewUrl]);

  if (!previewUrl) {
    return React.createElement(
      "div",
      { style: { padding: "1rem", color: "#475569" } },
      `No static preview available for ${name}.`,
    );
  }

  return React.createElement(
    "div",
    { style: { padding: "1rem", color: "#475569" } },
    `Opening static preview for ${name}...`,
  );
}

async function loadImportedRepoPlugins(): Promise<ToolboxPlugin[]> {
  try {
    const response = await fetch("/api/repo-import", {
      method: "GET",
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as { repos?: ImportedRepoRecord[] };
    const repos = Array.isArray(data.repos) ? data.repos : [];

    return repos
      .filter((repo) => Boolean(repo.previewUrl))
      .map((repo) => {
        const routePath = repo.activatedRoute || `/repo-${repo.id}`;
        const previewUrl = buildVersionedPreviewUrl(repo);

        return {
          id: `imported-static-${repo.id}`,
          name: repo.name,
          version: "static-preview",
          routes: [
            {
              path: `${routePath}/*`,
              element: React.createElement(StaticRepoRoute, {
                previewUrl,
                name: repo.name,
              }),
            },
          ],
          menu: [
            {
              label: repo.name,
              to: routePath,
              category: repo.category || "Imported",
            },
          ],
        } satisfies ToolboxPlugin;
      });
  } catch {
    return [];
  }
}

/**
 * 取得所有已註冊的外掛程式
 */
export function getPlugins(): ToolboxPlugin[] {
  return registeredPlugins;
}

/**
 * 註冊單個外掛程式
 */
export function registerPlugin(plugin: ToolboxPlugin): void {
  const exists = registeredPlugins.some((p) => p.id === plugin.id);
  if (exists) {
    return;
  }
  registeredPlugins.push(plugin);
}

/**
 * 初始化所有內置外掛程式
 * 動態導入 features-* 套件
 */
export async function initializePlugins(): Promise<void> {
  if (pluginsInitialized) {
    return;
  }

  try {
    registerPlugin(repoImporterPlugin);
    const importedRepoPlugins = await loadImportedRepoPlugins();
    importedRepoPlugins.forEach((plugin) => {
      registerPlugin(plugin);
    });

    // 這裡可以動態添加更多功能包
    // const projectModule = await import("features-project");
    // if (projectModule.default) registerPlugin(projectModule.default);

    pluginsInitialized = true;
    console.log(`✓ Initialized ${registeredPlugins.length} plugin(s)`);
  } catch (error) {
    console.warn("Failed to initialize some plugins:", error);
  }
}
