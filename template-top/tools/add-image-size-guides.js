const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const webDirPattern = /^web\d+$/i;
const sectionStart = "## 画像差し替えサイズ目安";
const sectionEnd = "## 画像サイズ表ここまで";

function listTemplateDirs() {
  const dirs = [];
  for (const webEntry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!webEntry.isDirectory() || !webDirPattern.test(webEntry.name)) continue;
    const webPath = path.join(root, webEntry.name);
    for (const entry of fs.readdirSync(webPath, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const dir = path.join(webPath, entry.name);
      if (fs.existsSync(path.join(dir, "index.html"))) dirs.push(dir);
    }
  }
  return dirs;
}

function classifyImage(file) {
  const name = file.toLowerCase();
  if (name.includes("avatar") || name.includes("portrait")) {
    return ["1200x1200px", "正方形。顔・アバター・プロフィール用。"];
  }
  if (name.includes("map")) {
    return ["1200x720px", "横長。地図・アクセス案内用。"];
  }
  if (
    name.includes("about") ||
    name.includes("maker") ||
    name.includes("teacher") ||
    name.includes("profile") ||
    name.includes("room") ||
    name.includes("chair") ||
    name.includes("venue") ||
    name.includes("front") ||
    name.includes("desk") ||
    name.includes("process")
  ) {
    return ["1200x960px", "やや縦長。紹介・プロフィール・空間写真用。"];
  }
  if (name.includes("hero")) {
    return ["1600x1200px", "メイン画像用。中央に見せたいものを置くと扱いやすいです。"];
  }
  if (name.includes("pack")) {
    return ["1600x1200px", "商品メイン画像用。余白ありの写真がおすすめです。"];
  }
  if (name.includes("work") || name.includes("case")) {
    return ["1600x1200px", "制作実績用。横長にもトリミングされます。"];
  }
  if (name.includes("thumb")) {
    return ["1280x720px", "動画サムネイル用。YouTube比率に近い横長。"];
  }
  if (name.includes("gallery") || name.includes("scene") || name.includes("booth")) {
    return ["1200x900px", "ギャラリー用。4:3の写真が扱いやすいです。"];
  }
  if (
    name.includes("menu") ||
    name.includes("item") ||
    name.includes("product") ||
    name.includes("course") ||
    name.includes("fruit") ||
    name.includes("guest")
  ) {
    return ["1200x900px", "カード画像用。商品・メニュー・作品を中央に配置してください。"];
  }
  if (name.includes("schedule")) {
    return ["1200x900px", "スケジュール画像用。文字を入れる場合は大きめ推奨。"];
  }
  if (name.includes("goods")) {
    return ["1200x900px", "グッズ・販売物のプレビュー用。"];
  }
  return ["1200x900px", "汎用画像。迷ったら4:3で用意してください。"];
}

function getReadmePath(dir) {
  const files = fs.readdirSync(dir);
  const existing = files.find((file) => /^README/i.test(file));
  return path.join(dir, existing || "README_はじめにお読みください.txt");
}

function buildSection(dir) {
  const imagesDir = path.join(dir, "images");
  let lines = [
    sectionStart,
    "",
    "下記は差し替え時の推奨サイズです。実際の表示ではCSSによりトリミングされる場合があります。",
    "人物・商品・ロゴなど、見せたい要素は画像の中央付近に配置してください。",
    "",
  ];

  if (!fs.existsSync(imagesDir)) {
    lines.push("- このテンプレートには差し替え用画像フォルダがありません。画像を追加する場合は 1200x900px を目安にしてください。");
    lines.push("", sectionEnd);
    return lines.join("\n");
  }

  const images = fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(svg|png|jpe?g|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b));

  if (images.length === 0) {
    lines.push("- このテンプレートは画像なしでも使える構成です。画像を追加する場合は 1200x900px を目安にしてください。");
    lines.push("", sectionEnd);
    return lines.join("\n");
  }

  for (const image of images) {
    const [size, note] = classifyImage(image);
    lines.push(`- images/${image}: ${size} / ${note}`);
  }

  lines.push(
    "",
    "補足:",
    "- 画像形式は jpg / png / webp / svg が使えます。",
    "- 写真は大きめに用意し、ファイル名を既存画像と同じにすると差し替えが簡単です。",
    "- スマートフォンでは上下左右が少し切れる場合があるため、重要な文字や顔は端に置かないでください。",
    "",
    sectionEnd
  );

  return lines.join("\n");
}

function upsertSection(readmePath, section) {
  let before = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : "";
  const start = before.indexOf(sectionStart);
  const end = before.indexOf(sectionEnd);
  if (start !== -1 && end !== -1 && end >= start) {
    const afterEnd = end + sectionEnd.length;
    before = before.slice(0, start).trimEnd() + "\n\n" + section + before.slice(afterEnd);
  } else {
    before = before.trimEnd() + "\n\n" + section + "\n";
  }
  fs.writeFileSync(readmePath, before, "utf8");
}

let updated = 0;
for (const dir of listTemplateDirs()) {
  const readmePath = getReadmePath(dir);
  upsertSection(readmePath, buildSection(dir));
  updated += 1;
}

console.log(JSON.stringify({ updatedReadmes: updated }, null, 2));
