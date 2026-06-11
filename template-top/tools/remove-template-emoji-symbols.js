const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const exts = new Set([".html", ".css", ".js", ".txt", ".md", ".svg"]);

const replacements = new Map([
  ["✦", ""],
  ["♡", ""],
  ["♦", ""],
  ["✓", "OK"],
  ["❀", ""],
  ["✿", ""],
  ["★", ""],
  ["♪", ""],
  ["✏", ""],
  ["✉", "Mail"],
]);

const emojiPattern = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;

let changed = 0;
let removed = 0;

function cleanText(input) {
  let output = input;
  for (const [from, to] of replacements) {
    if (output.includes(from)) {
      const count = output.split(from).length - 1;
      removed += count;
      output = output.split(from).join(to);
    }
  }
  output = output.replace(emojiPattern, (match) => {
    removed += 1;
    return "";
  });
  return output;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(target);
      continue;
    }
    if (!exts.has(path.extname(target).toLowerCase())) continue;
    const before = fs.readFileSync(target, "utf8");
    const after = cleanText(before);
    if (after !== before) {
      fs.writeFileSync(target, after, "utf8");
      changed += 1;
    }
  }
}

walk(root);
console.log(JSON.stringify({ changedFiles: changed, removedSymbols: removed }, null, 2));
