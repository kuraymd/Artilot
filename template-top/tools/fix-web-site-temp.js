const fs = require("fs");
const path = require("path");

const ROOT = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const resolvedRoot = path.resolve(ROOT);
if (resolvedRoot !== ROOT) {
  throw new Error(`Unexpected root: ${resolvedRoot}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, text) {
  fs.writeFileSync(file, text, "utf8");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function dirs(parent) {
  if (!fs.existsSync(parent)) return [];
  return fs.readdirSync(parent, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(parent, entry.name));
}

function svgPlaceholder(label, colors = ["#f7f7f7", "#d8d8d8", "#333333"], width = 800, height = 600) {
  const [bg, accent, ink] = colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <rect width="${width}" height="${height}" rx="28" fill="${bg}"/>
  <circle cx="${Math.round(width * 0.78)}" cy="${Math.round(height * 0.24)}" r="${Math.round(Math.min(width, height) * 0.18)}" fill="${accent}" opacity="0.82"/>
  <rect x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.18)}" width="${Math.round(width * 0.52)}" height="${Math.round(height * 0.12)}" rx="12" fill="${ink}" opacity="0.82"/>
  <rect x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.36)}" width="${Math.round(width * 0.36)}" height="${Math.round(height * 0.06)}" rx="8" fill="${ink}" opacity="0.32"/>
  <rect x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.48)}" width="${Math.round(width * 0.62)}" height="${Math.round(height * 0.28)}" rx="20" fill="#fff" opacity="0.45"/>
  <text x="${Math.round(width / 2)}" y="${Math.round(height * 0.88)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(width * 0.035)}" fill="${ink}" opacity="0.65">${label}</text>
</svg>
`;
}

function copyRootLicense(targetDir) {
  const license = path.join(ROOT, "LICENSE_ライセンス.txt");
  if (fs.existsSync(license)) {
    fs.copyFileSync(license, path.join(targetDir, "LICENSE_ライセンス.txt"));
  }
}

function addCafeMenuPages() {
  const web01 = path.join(ROOT, "web01");
  for (const dir of dirs(web01).filter((d) => path.basename(d).startsWith("Cafe-Template-"))) {
    const indexPath = path.join(dir, "index.html");
    const cssPath = path.join(dir, "css", "style.css");
    const menuPath = path.join(dir, "menu.html");
    let html = read(indexPath);

    const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0];
    let header = html.match(/<header[\s\S]*?<\/header>/)?.[0];
    let menu = html.match(/<section class="menu" id="menu">[\s\S]*?<\/section>/)?.[0];
    const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] || "";
    const scripts = [...html.matchAll(/<script\s+src="[^"]+"><\/script>/g)].map((m) => m[0]);
    if (!head || !header || !menu) continue;

    const title = head.replace(/<title>(.*?)<\/title>/, "<title>Menu | $1</title>");
    header = header
      .replaceAll('href="#home"', 'href="index.html#home"')
      .replaceAll('href="#about"', 'href="index.html#about"')
      .replaceAll('href="#gallery"', 'href="index.html#gallery"')
      .replaceAll('href="#access"', 'href="index.html#access"')
      .replaceAll('href="#menu"', 'href="menu.html"');

    menu = menu
      .replace(/href="#" class="btn btn--primary">View All Menu<\/a>/g, 'href="index.html#menu" class="btn btn--primary">Back to Home</a>')
      .replace(/href="#" class="btn btn--primary">♡ 全メニューを見る<\/a>/g, 'href="index.html#menu" class="btn btn--primary">トップへ戻る</a>')
      .replace(/href="#" class="btn btn--primary">全メニューを見る<\/a>/g, 'href="index.html#menu" class="btn btn--primary">トップへ戻る</a>')
      .replace(/href="#" class="btn btn--fill">全メニューを見る<\/a>/g, 'href="index.html#menu" class="btn btn--fill">トップへ戻る</a>');

    const menuHtml = `<!DOCTYPE html>
<html lang="ja">
${title}
<body class="menu-page">
${header}
<main>
${menu}
</main>
${footer}
${scripts.join("\n")}
</body>
</html>
`;
    write(menuPath, menuHtml);

    html = html
      .replace(/href="#" class="btn btn--primary">View All Menu<\/a>/g, 'href="menu.html" class="btn btn--primary">View All Menu</a>')
      .replace(/href="#" class="btn btn--primary">♡ 全メニューを見る<\/a>/g, 'href="menu.html" class="btn btn--primary">♡ 全メニューを見る</a>')
      .replace(/href="#" class="btn btn--primary">全メニューを見る<\/a>/g, 'href="menu.html" class="btn btn--primary">全メニューを見る</a>')
      .replace(/href="#" class="btn btn--fill">全メニューを見る<\/a>/g, 'href="menu.html" class="btn btn--fill">全メニューを見る</a>')
      .replace(/href="#" class="sns-btn([^"]*)">Instagram<\/a>/g, 'href="https://www.instagram.com/" target="_blank" rel="noopener" class="sns-btn$1">Instagram</a>')
      .replace(/href="#" class="sns-link">Instagram<\/a>/g, 'href="https://www.instagram.com/" target="_blank" rel="noopener" class="sns-link">Instagram</a>')
      .replace(/href="#" class="sns-btn([^"]*)">Twitter \/ X<\/a>/g, 'href="https://x.com/" target="_blank" rel="noopener" class="sns-btn$1">Twitter / X</a>')
      .replace(/href="#" class="sns-link">Twitter \/ X<\/a>/g, 'href="https://x.com/" target="_blank" rel="noopener" class="sns-link">Twitter / X</a>');
    write(indexPath, html);

    let css = read(cssPath);
    if (!css.includes("Shared sales-template polish")) {
      css += `

/* Shared sales-template polish */
.gallery-grid {
  grid-auto-flow: dense;
}

.menu-page main {
  overflow: hidden;
}

.menu-page .menu {
  min-height: 100vh;
}
`;
      write(cssPath, css);
    }
  }
}

function fixRosePop() {
  const dir = path.join(ROOT, "web02", "Rose-Veil-Template-pop");
  const images = path.join(dir, "images");
  ensureDir(images);
  const files = [
    ["hero-main.svg", "hero-main", 900, 680],
    ["about-shop.svg", "about-shop", 700, 680],
    ["gallery-01.svg", "gallery-01", 800, 500],
    ["gallery-02.svg", "gallery-02", 500, 500],
    ["gallery-03.svg", "gallery-03", 500, 500],
    ["gallery-04.svg", "gallery-04", 500, 500],
    ["gallery-05.svg", "gallery-05", 500, 500],
    ["gallery-06.svg", "gallery-06", 800, 500],
    ["map-placeholder.svg", "map-placeholder", 800, 460],
  ];
  for (const [name, label, width, height] of files) {
    const target = path.join(images, name);
    if (!fs.existsSync(target)) {
      write(target, svgPlaceholder(label, ["#fff4f8", "#ff7eb3", "#6b3a4d"], width, height));
    }
  }
  const indexPath = path.join(dir, "index.html");
  let html = read(indexPath)
    .replace(/href="#" class="sns-btn">Instagram<\/a>/g, 'href="https://www.instagram.com/" target="_blank" rel="noopener" class="sns-btn">Instagram</a>')
    .replace(/href="#" class="sns-btn sns-btn--lavender">Twitter \/ X<\/a>/g, 'href="https://x.com/" target="_blank" rel="noopener" class="sns-btn sns-btn--lavender">Twitter / X</a>');
  write(indexPath, html);
}

function fixCreatorLicensesAndLinks() {
  const web03 = path.join(ROOT, "web03");
  for (const dir of dirs(web03).filter((d) => path.basename(d).startsWith("Creator-Portfolio-Template-"))) {
    copyRootLicense(dir);
    const scriptPath = path.join(dir, "script.js");
    let js = read(scriptPath);
    js = js
      .replace('{ label: "依頼フォーム", url: "#", style: "primary" }', '{ label: "依頼フォーム", url: "https://example.com/contact", style: "primary" }')
      .replace('{ label: "料金表", url: "#", style: "ghost" }', '{ label: "料金表", url: "https://example.com/price", style: "ghost" }')
      .replace('label: "動画を見る",\n    url: "#"', 'label: "動画を見る",\n    url: "https://www.youtube.com/"')
      .replace('{ label: "Shop 01", url: "#", style: "primary" }', '{ label: "Shop 01", url: "https://example.com/shop", style: "primary" }')
      .replace('{ label: "Shop 02", url: "#", style: "ghost" }', '{ label: "Shop 02", url: "https://example.com/shop-2", style: "ghost" }')
      .replace('{ label: "Shop 03", url: "#", style: "ghost" }', '{ label: "Shop 03", url: "https://example.com/shop-3", style: "ghost" }')
      .replace('{ name: "Portfolio", label: "Works", icon: "PF", url: "#", color: "#41d9ff" }', '{ name: "Portfolio", label: "Works", icon: "PF", url: "#works", color: "#41d9ff" }')
      .replace('{ name: "Instagram", label: "SNS", icon: "IG", url: "#", color: "#ff7ad9" }', '{ name: "Instagram", label: "SNS", icon: "IG", url: "https://www.instagram.com/", color: "#ff7ad9" }');
    write(scriptPath, js);
  }
}

function fixPortfolioTemplates() {
  const web04 = path.join(ROOT, "web04");
  const urlMap = {
    YOUR_TWITTER_URL: "https://x.com/",
    YOUR_INSTAGRAM_URL: "https://www.instagram.com/",
    YOUR_PIXIV_URL: "https://www.pixiv.net/",
    YOUR_YOUTUBE_URL: "https://www.youtube.com/",
    YOUR_BOOTH_URL: "https://booth.pm/",
    YOUR_GITHUB_URL: "https://github.com/",
    YOUR_FANBOX_URL: "https://www.fanbox.cc/",
    YOUR_SOUNDCLOUD_URL: "https://soundcloud.com/",
    YOUR_SKEB_URL: "https://skeb.jp/",
    YOUR_AMAZON_WISH_URL: "https://www.amazon.co.jp/hz/wishlist/intro",
    YOUR_OTHER_URL: "https://example.com/",
  };
  for (const dir of dirs(web04).filter((d) => path.basename(d).startsWith("Portfolio-Template-"))) {
    const indexPath = path.join(dir, "index.html");
    let html = read(indexPath);
    for (const [from, to] of Object.entries(urlMap)) {
      html = html.replaceAll(from, to);
    }
    write(indexPath, html);

    const images = path.join(dir, "images");
    ensureDir(images);
    const placeholders = [
      ["avatar.png", "avatar", 500, 500],
      ["profile.jpg", "profile", 700, 900],
      ["work01.jpg", "work01", 800, 600],
      ["work02.jpg", "work02", 800, 600],
      ["work03.jpg", "work03", 800, 600],
      ["work04.jpg", "work04", 800, 600],
      ["work05.jpg", "work05", 800, 600],
      ["work06.jpg", "work06", 800, 600],
    ];
    for (const [name, label, width, height] of placeholders) {
      const target = path.join(images, name);
      if (!fs.existsSync(target)) {
        write(target, svgPlaceholder(label, ["#f6f6f6", "#b8c7ff", "#222222"], width, height));
      }
    }
  }
}

function copyTemplateTopLicense() {
  const dir = path.join(ROOT, "template-top");
  if (fs.existsSync(dir)) copyRootLicense(dir);
}

addCafeMenuPages();
fixRosePop();
fixCreatorLicensesAndLinks();
fixPortfolioTemplates();
copyTemplateTopLicense();

console.log("Applied fixes to web-site-temp.");
