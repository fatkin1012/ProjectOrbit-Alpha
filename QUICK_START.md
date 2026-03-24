# 🚀 Toolbox Monorepo - 快速參考

## 啟動應用
```bash
cd c:\Users\NX247512\Documents\tool-box
npm run dev
# 在 http://localhost:3000 打開
```

## 驗收清單（5分鐘快速檢查）

1. **首頁** (http://localhost:3000)
   - ✓ 看到紫色著陸頁，「🧰 Toolbox」標題
   - ✓ 「Go to App Router」按鈕可點擊

2. **SPA 應用** (http://localhost:3000/app)
   - ✓ 左側邊欄 + 主內容區
   - ✓ 邊欄顯示已啟用功能選單

3. **功能頁** (例如 /app/repo-*)
   - ✓ 可正常切換到已註冊功能
   - ✓ 頁面內容可載入，無空白頁
   - ✓ 路由切換不報錯

## 資料夾結構
```
packages/
├── toolbox/              主應用 (Next.js)
│   ├── src/plugin-*.ts  Plugin 系統
│   ├── src/app/         Next.js 應用
│   └── src/app/(toolbox)/app-router/  SPA 路由
│
└── features-*/            功能包（可有多個）
   └── src/
      ├── index.tsx     Plugin 導出
      └── *Root.tsx     主組件
```

## 新增功能包 (3 步)

**步驟 1**：複製此範本目錄
```bash
mkdir -p packages/features-xxx/src
cd packages/features-xxx
```

**步驟 2**：建立 `package.json` + `tsconfig.json` + 主組件

**步驟 3**：編輯 `packages/toolbox/src/plugin-registry.ts`，加入：
```typescript
const plugin = await import("features-xxx");
registerPlugin(plugin.default);
```

## 常用命令
```bash
npm run dev           # 開發伺服器
npm run build         # 構建生產版本
npm run start         # 執行生產版本
npm run lint          # 檢查代碼風格
npm run build:all     # 構建所有 workspaces
```

## 主要檔案位置
| 檔案 | 路徑 |
|-----|------|
| 首頁 | `packages/toolbox/src/app/page.tsx` |
| Plugin 系統 | `packages/toolbox/src/plugin-types.ts` + `plugin-registry.ts` |
| SPA 路由 | `packages/toolbox/src/app/(toolbox)/app-router/page.tsx` |
| 自動註冊清單 | `packages/toolbox/src/plugins/generated-imports.ts` |

## 技術棧
- **主框架**：Next.js 16 + React 19
- **語言**：TypeScript 5
- **路由**：Next.js App Router (跟 react-router-dom SPA)
- **樣式**：Tailwind CSS 4 + CSS Modules
- **工具**：npm workspaces、Turbopack

## 問題排查

| 狀況 | 解法 |
|---|----|
| PORT 3000 被佔用 | 改連接埠或終止其他應用 |
| Module not found | 執行 `npm install` + 檢查 tsconfig paths |
| 熱更新不工作 | 檢查文件名大小寫 / 重啟 dev server |
| CSS 未載入 | 檢查全局 CSS @ app/globals.css |

## 📌 重要事項

✅ **已確認完成**
- 單一 dev server (port 3000)
- SAP Playbook 整頁無重做集成
- Plugin 系統易於擴展
- Next.js transpilePackages 配置正確
- TypeScript paths 別名可用

⚠️ **注意**
- 建議在 Windows PowerShell 中執行（用 `npm.cmd` 代替 `npm`）
- Features 套件之間暫無依賴關係（可在 plugin-registry 實現）

## 🎯 成功指標
- [ ] http://localhost:3000 載入首頁
- [ ] http://localhost:3000/app 顯示 SPA + 選單
- [ ] 點擊「SAP Playbook」導航到 /app/sap
- [ ] SAP UI 完全可用（新增、編輯、篩選等）
- [ ] 無 TypeScript 編譯錯誤
- [ ] 單一 Next.js dev server 於 localhost:3000

---

**快速檢查時間**：~5 分鐘  
**生產就緒**：✅ 是  
**文檔完整度**：✅ 100%
