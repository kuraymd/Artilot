const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const mojibakePattern = /繧|縺|譁|螟|蜿|隕|ﾂｩ|�/;
const externalPattern = /^(https?:|mailto:|tel:|#|javascript:)/i;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function findTemplateRoots() {
  return walk(root)
    .filter((file) => path.basename(file).toLowerCase() === "index.html")
    .map((file) => path.dirname(file))
    .filter((dir) => !dir.includes(`${path.sep}website-template-demo-main${path.sep}Cafe-Template-`));
}

function attrValues(html, attr) {
  const pattern = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, "gi");
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function stripHtmlComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

function lineOf(text, needle) {
  const index = text.indexOf(needle);
  if (index < 0) return 1;
  return text.slice(0, index).split(/\r?\n/).length;
}

function localTargetExists(baseDir, value) {
  const clean = value.split("#")[0].split("?")[0];
  if (!clean) return true;
  const target = path.resolve(baseDir, decodeURIComponent(clean));
  return fs.existsSync(target);
}

const issues = [];
const summaries = [];
const roots = findTemplateRoots();

for (const dir of roots) {
  const index = path.join(dir, "index.html");
  const html = read(index);
  const activeHtml = stripHtmlComments(html);
  const files = walk(dir);
  const cssFiles = files.filter((file) => file.endsWith(".css"));
  const jsFiles = files.filter((file) => file.endsWith(".js"));
  const imageFiles = files.filter((file) => /\.(svg|png|jpe?g|webp|gif)$/i.test(file));
  const hrefs = attrValues(activeHtml, "href");
  const srcs = attrValues(activeHtml, "src");

  const unresolvedLocal = [...hrefs, ...srcs].filter((value) => {
    if (externalPattern.test(value)) return false;
    return !localTargetExists(dir, value);
  });

  const hashLinks = hrefs.filter((value) => value === "#");
  const saleLooks = /Template|template/i.test(path.basename(dir));
  const hasReadme = files.some((file) => /readme/i.test(path.basename(file)));
  const hasLicense = files.some((file) => /license|ライセンス/i.test(path.basename(file)));

  if (mojibakePattern.test(html)) {
    issues.push({ severity: "high", template: rel(dir), file: rel(index), line: 1, message: "文字化けらしき文字があります。" });
  }

  for (const value of unresolvedLocal) {
    issues.push({
      severity: "high",
      template: rel(dir),
      file: rel(index),
      line: lineOf(html, value),
      message: `参照先が見つかりません: ${value}`,
    });
  }

  if (hashLinks.length) {
    issues.push({
      severity: "medium",
      template: rel(dir),
      file: rel(index),
      line: lineOf(html, 'href="#"'),
      message: `未設定リンク href="#" が ${hashLinks.length} 件あります。`,
    });
  }

  if (saleLooks && !hasReadme) {
    issues.push({ severity: "medium", template: rel(dir), file: rel(dir), line: 1, message: "READMEがテンプレートフォルダ内にありません。" });
  }

  if (saleLooks && !hasLicense) {
    issues.push({ severity: "medium", template: rel(dir), file: rel(dir), line: 1, message: "LICENSE/ライセンスがテンプレートフォルダ内にありません。" });
  }

  for (const file of [...cssFiles, ...jsFiles]) {
    const text = read(file);
    if (mojibakePattern.test(text)) {
      issues.push({ severity: "high", template: rel(dir), file: rel(file), line: 1, message: "文字化けらしき文字があります。" });
    }
    if (/Hello|Goodbye|TODO|FIXME/i.test(text)) {
      issues.push({ severity: "low", template: rel(dir), file: rel(file), line: 1, message: "開発用の文言やTODOが残っている可能性があります。" });
    }
  }

  for (const file of jsFiles) {
    try {
      new Function(read(file));
    } catch (error) {
      issues.push({ severity: "high", template: rel(dir), file: rel(file), line: error.lineNumber || 1, message: `JS構文エラー: ${error.message}` });
    }
  }

  summaries.push({
    template: rel(dir),
    css: cssFiles.length,
    js: jsFiles.length,
    images: imageFiles.length,
    hrefHash: hashLinks.length,
    missingRefs: unresolvedLocal.length,
    readme: hasReadme,
    license: hasLicense,
  });
}

const grouped = issues.reduce((acc, issue) => {
  acc[issue.severity] = (acc[issue.severity] || 0) + 1;
  return acc;
}, {});

console.log(JSON.stringify({ root, templates: roots.length, grouped, summaries, issues }, null, 2));
