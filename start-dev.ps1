# 終止所有 node 進程
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# 清除快取
cd packages/toolbox
Remove-Item -Path './.next' -Recurse -Force -ErrorAction SilentlyContinue

# 啟動開發伺服器
npx next dev -p 3002