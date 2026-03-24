# Stop all Node processes so the web app can bind to the expected port.
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Start Toolbox web app from workspace root using npm.cmd (PowerShell-safe).
Set-Location $PSScriptRoot
npm.cmd run dev --workspace=packages/toolbox