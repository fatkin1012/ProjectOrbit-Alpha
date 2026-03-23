import type { ToolboxPlugin } from "./plugin-types";

/**
 * Plugin Registry
 * 中央位置管理和載入所有工具箱功能包
 * 每個 feature-* 套件都應該匯出一個 ToolboxPlugin 物件
 */

let registeredPlugins: ToolboxPlugin[] = [];

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
    console.warn(`Plugin with id "${plugin.id}" already registered, skipping.`);
    return;
  }
  registeredPlugins.push(plugin);
}

/**
 * 初始化所有內置外掛程式
 * 動態導入 features-* 套件
 */
export async function initializePlugins(): Promise<void> {
  try {
    // 導入 SAP Playbook 功能包
    const sapPlaybookModule = await import("features-sap-playbook");
    if (sapPlaybookModule.default) {
      registerPlugin(sapPlaybookModule.default);
    }

    // 這裡可以動態添加更多功能包
    // const projectModule = await import("features-project");
    // if (projectModule.default) registerPlugin(projectModule.default);

    console.log(`✓ Initialized ${registeredPlugins.length} plugin(s)`);
  } catch (error) {
    console.warn("Failed to initialize some plugins:", error);
  }
}
