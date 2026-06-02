param(
  [string]$DemoRoot = "C:\Users\81903\Desktop\website\web-site-temp\website-template-demo-main"
)

$ErrorActionPreference = "Stop"

$resolvedRoot = (Resolve-Path -LiteralPath $DemoRoot).Path
$expectedRoot = "C:\Users\81903\Desktop\website\web-site-temp\website-template-demo-main"
if ($resolvedRoot -ne $expectedRoot) {
  throw "Unexpected target root: $resolvedRoot"
}

$cafes = Get-ChildItem -LiteralPath $resolvedRoot -Directory -Filter "Cafe-Template-*"

foreach ($cafe in $cafes) {
  $indexPath = Join-Path $cafe.FullName "index.html"
  $cssPath = Join-Path $cafe.FullName "css\style.css"
  $menuPath = Join-Path $cafe.FullName "menu.html"

  $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $indexPath
  $head = [regex]::Match($html, "<head>.*?</head>", "Singleline").Value
  $header = [regex]::Match($html, "<header.*?</header>", "Singleline").Value
  $menu = [regex]::Match($html, "<section class=""menu"" id=""menu"">.*?</section>", "Singleline").Value
  $footer = [regex]::Match($html, "<footer.*?</footer>", "Singleline").Value

  if (-not $head -or -not $header -or -not $menu) {
    throw "Could not extract menu page parts from $indexPath"
  }

  $head = $head -replace "<title>(.*?)</title>", "<title>Menu | `$1</title>"
  $header = $header -replace 'href="#home"', 'href="index.html#home"'
  $header = $header -replace 'href="#about"', 'href="index.html#about"'
  $header = $header -replace 'href="#gallery"', 'href="index.html#gallery"'
  $header = $header -replace 'href="#access"', 'href="index.html#access"'
  $header = $header -replace 'href="#menu"', 'href="menu.html"'

  $menu = $menu -replace 'href="#" class="btn btn--primary">View All Menu</a>', 'href="index.html#menu" class="btn btn--primary">Back to Home</a>'
  $menu = $menu -replace 'href="#" class="btn btn--primary">全メニューを見る</a>', 'href="index.html#menu" class="btn btn--primary">トップへ戻る</a>'
  $menu = $menu -replace 'href="#" class="btn btn--fill">全メニューを見る</a>', 'href="index.html#menu" class="btn btn--fill">トップへ戻る</a>'

  $scripts = [regex]::Matches($html, '<script\s+src="[^"]+"></script>') | ForEach-Object { $_.Value }
  if (-not $scripts) {
    $scripts = @('<script src="js/main.js"></script>')
  }

  $menuHtml = @"
<!DOCTYPE html>
<html lang="ja">
$head
<body class="menu-page">
$header
<main>
$menu
</main>
$footer
$($scripts -join "`r`n")
</body>
</html>
"@

  Set-Content -LiteralPath $menuPath -Value $menuHtml -Encoding UTF8

  $updatedHtml = $html
  $updatedHtml = $updatedHtml -replace 'href="#" class="btn btn--primary">View All Menu</a>', 'href="menu.html" class="btn btn--primary">View All Menu</a>'
  $updatedHtml = $updatedHtml -replace 'href="#" class="btn btn--primary">全メニューを見る</a>', 'href="menu.html" class="btn btn--primary">全メニューを見る</a>'
  $updatedHtml = $updatedHtml -replace 'href="#" class="btn btn--fill">全メニューを見る</a>', 'href="menu.html" class="btn btn--fill">全メニューを見る</a>'
  Set-Content -LiteralPath $indexPath -Value $updatedHtml -Encoding UTF8

  $css = Get-Content -Raw -Encoding UTF8 -LiteralPath $cssPath
  if ($css -notmatch "Shared demo polish") {
    $css += @"

/* Shared demo polish */
.gallery-grid {
  grid-auto-flow: dense;
}

.menu-page main {
  overflow: hidden;
}

.menu-page .menu {
  min-height: 100vh;
}
"@
    Set-Content -LiteralPath $cssPath -Value $css -Encoding UTF8
  }
}

Write-Output "Updated $($cafes.Count) cafe templates."
