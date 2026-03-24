$htmlPath = 'c:\Users\NX247512\Documents\tool-box\packages\toolbox\public\imported\fatkin1012-sap-local-wiki\index.html'

# Read the HTML file
$html = Get-Content -Path $htmlPath -Raw

# Replace root-relative paths with relative paths
# This fixes /_next/*, /manifest*, /icon*, /favicon*, etc.
$html = $html -replace '(["\x27])\/([a-zA-Z_-])', '$1./$2'

# Write back the fixed HTML
Set-Content -Path $htmlPath -Value $html -NoNewline -Encoding UTF8

Write-Output 'Successfully fixed all root-relative paths in index.html'
