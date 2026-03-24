# Toolbox (TypeScript WebApp)

Toolbox 是一個以 TypeScript 開發的本地 Web 應用平台，目標是把「多個工具型功能」整合到同一個入口，避免每個小工具都要獨立啟動、獨立部署、獨立維護。

## 為什麼要開發 Toolbox

1. 減少工具分散問題：把常用的內部工具收斂到同一個工作台，降低切換成本。
2. 降低整合成本：透過 plugin 架構，把功能模組化，新增或移除功能不需要重寫整個網站。
3. 加速 PoC 驗證：可以快速把既有 GitHub 專案匯入到 Toolbox 內測試與展示。
4. 維持本地開發效率：統一使用同一套 TypeScript/React/Next.js 開發體驗與指令流程。

## 核心功能

1. Plugin-based 架構
	- 功能以插件形式註冊，Toolbox 負責路由與入口整合。
2. 單一入口的工具路由
	- 所有已啟用工具可在同一個 App 入口中切換。
3. Repo Import Wizard
	- 支援輸入 GitHub repository URL，將工具專案匯入 Toolbox 工作流。
4. 自動化插件載入
	- 已註冊的功能可透過自動匯入清單整合到主應用。
5. Monorepo 管理
	- 使用 npm workspaces 管理主應用與各功能包。

## 使用範例

1. 匯入既有工具專案
	- 例如可將 https://github.com/fatkin1012/SAP-Local-Wiki 匯入到 Toolbox，集中在同一個入口中使用與管理。
2. 團隊內部工具整合
	- 可把不同成員維護的工具功能逐步納入 Toolbox，避免每個工具各自獨立運作。
3. 快速展示與驗證
	- 新工具先以插件方式接入，快速完成展示、回饋與迭代。

## 快速開始

1. 安裝依賴

```bash
npm.cmd run bootstrap
```

2. 啟動開發環境

```bash
npm.cmd run dev
```

3. 建置與啟動正式模式

```bash
npm.cmd run build
npm.cmd run start
```

預設開啟位址：http://localhost:3000

## 技術棧

1. Next.js
2. React
3. TypeScript
4. Tailwind CSS
5. npm workspaces
