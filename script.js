/* ==================================================
   ARTLILOT — script.js (final)
   - Draw cards (3) with "label / value" layout
   - History (max 20)
   - Save image: capture current card layout (white bg) -> PNG
   - Share: Web Share API when possible (image file)
   - JP/EN toggles
   ================================================= */

/* -------------------------
   1. Data (JP / EN)
   ------------------------- */
const DATA = {
  JP: {
    card1: {
      title: "キャラクター",
      labels: ["種族", "性別", "年齢"],
      items: {
        race: ["ヒューマン", "エルフ", "鬼", "ロボット", "獣人", "ドラゴン族", "吸血鬼", "天使", "悪魔"],
        gender: ["男性", "女性", "中性", "不明"],
        age: ["若い", "子ども", "大人", "老人", "不明"]
      }
    },
    card2: {
      title: "デザイン",
      labels: ["髪型", "服", "モチーフ"],
      items: {
        hair: ["ロング", "ショート", "ポニーテール", "ツインテール", "ぱっつん", "ボブ", "三つ編み", "ウェーブ"],
        clothes: ["セーラー服", "和服", "メイド服", "鎧", "学生服", "フォーマル", "ドレス", "パーカー"],
        motif: ["魚", "ハート", "太陽", "月", "花", "骨", "星", "炎", "氷", "鳥"]
      }
    },
    card3: {
      title: "雰囲気",
      labels: ["雰囲気", "色"],
      items: {
        mood: ["ホラー", "ファンタジー", "レトロ", "未来", "かわいい", "ダーク", "ミステリー", "SF"],
        color: ["赤", "青", "黒", "白", "緑", "紫", "金", "銀"]
      }
    },
    ui: {
      draw: "カードを引く",
      note: "※履歴は最大20件まで保存され、古い順から消えます",
      history: "履歴",
      clear: "履歴をすべて削除",
      saveImg: "画像を保存",
      share: "シェア"
    }
  },

  EN: {
    card1: {
      title: "Character",
      labels: ["Race", "Gender", "Age"],
      items: {
        race: ["Human", "Elf", "Oni", "Robot", "Beastfolk", "Dragonkin", "Vampire", "Angel", "Demon"],
        gender: ["Male", "Female", "Neutral", "Unknown"],
        age: ["Child", "Young", "Adult", "Senior", "Unknown"]
      }
    },
    card2: {
      title: "Design",
      labels: ["Hair", "Outfit", "Motif"],
      items: {
        hair: ["Long", "Short", "Ponytail", "Twintails", "Bangs", "Bob", "Braids", "Wave"],
        clothes: ["Sailor", "Kimono", "Maid", "Armor", "Uniform", "Formal", "Dress", "Hoodie"],
        motif: ["Fish", "Heart", "Sun", "Moon", "Flower", "Bone", "Star", "Flame", "Ice", "Bird"]
      }
    },
    card3: {
      title: "Mood",
      labels: ["Mood", "Color"],
      items: {
        mood: ["Horror", "Fantasy", "Retro", "Future", "Cute", "Dark", "Mystery", "Sci-Fi"],
        color: ["Red", "Blue", "Black", "White", "Green", "Purple", "Gold", "Silver"]
      }
    },
    ui: {
      draw: "Draw Cards",
      note: "*History keeps up to 20 entries; older items are removed.*",
      history: "History",
      clear: "Clear History",
      saveImg: "Save Image",
      share: "Share"
    }
  }
};

/* -------------------------
   2. Utils
   ------------------------- */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

const STORAGE_KEY = "artilot_v2_history";

/* -------------------------
   3. State
   ------------------------- */
let LANG = "JP"; // "JP" or "EN"

/* -------------------------
   4. Elements (defensive)
   ------------------------- */
const els = {
  btnJP: $("#btnJP"),
  btnEN: $("#btnEN"),
  drawBtn: $("#drawBtn"),
  saveImgBtn: $("#saveImgBtn"),
  shareBtn: $("#shareBtn"),
  clearHistoryBtn: $("#clearHistoryBtn"),
  noteText: $("#noteText"),
  historyList: $("#historyList"),
  paletteRow: $("#paletteRow"),
  // card labels/values
  c1Label1: $("#c1-label-1"), c1Val1: $("#c1-value-1"),
  c1Label2: $("#c1-label-2"), c1Val2: $("#c1-value-2"),
  c1Label3: $("#c1-label-3"), c1Val3: $("#c1-value-3"),

  c2Label1: $("#c2-label-1"), c2Val1: $("#c2-value-1"),
  c2Label2: $("#c2-label-2"), c2Val2: $("#c2-value-2"),
  c2Label3: $("#c2-label-3"), c2Val3: $("#c2-value-3"),

  c3Label1: $("#c3-label-1"), c3Val1: $("#c3-value-1"),
  c3Label2: $("#c3-label-2"), c3Val2: $("#c3-value-2"),
  card1: $("#card1"), card2: $("#card2"), card3: $("#card3"),
  card1Title: $("#card1-title"), card2Title: $("#card2-title"), card3Title: $("#card3-title")
};

/* -------------------------
   5. Init: apply UI language text
   ------------------------- */
function applyUIText() {
  const ui = DATA[LANG].ui;
  if (els.drawBtn) els.drawBtn.textContent = ui.draw;
  if (els.saveImgBtn) els.saveImgBtn.textContent = ui.saveImg;
  if (els.shareBtn) els.shareBtn.textContent = ui.share;
  if (els.clearHistoryBtn) els.clearHistoryBtn.textContent = ui.clear;
  if (els.noteText) els.noteText.textContent = ui.note;
  if ($("#historyTitle")) $("#historyTitle").textContent = ui.history;
}
applyUIText();

/* -------------------------
   6. Draw / Generate Cards
   ------------------------- */
if (els.drawBtn) els.drawBtn.addEventListener("click", () => {
  generateCards();
});

function generateCards() {
  const d = DATA[LANG];

  // Card 1
  if (els.card1Title) els.card1Title.textContent = d.card1.title;
  if (els.c1Label1) els.c1Label1.textContent = d.card1.labels[0];
  if (els.c1Label2) els.c1Label2.textContent = d.card1.labels[1];
  if (els.c1Label3) els.c1Label3.textContent = d.card1.labels[2];

  if (els.c1Val1) els.c1Val1.textContent = rand(d.card1.items.race);
  if (els.c1Val2) els.c1Val2.textContent = rand(d.card1.items.gender);
  if (els.c1Val3) els.c1Val3.textContent = rand(d.card1.items.age);

  // Card 2
  if (els.card2Title) els.card2Title.textContent = d.card2.title;
  if (els.c2Label1) els.c2Label1.textContent = d.card2.labels[0];
  if (els.c2Label2) els.c2Label2.textContent = d.card2.labels[1];
  if (els.c2Label3) els.c2Label3.textContent = d.card2.labels[2];

  if (els.c2Val1) els.c2Val1.textContent = rand(d.card2.items.hair);
  if (els.c2Val2) els.c2Val2.textContent = rand(d.card2.items.clothes);
  if (els.c2Val3) els.c2Val3.textContent = rand(d.card2.items.motif);

  // Card 3
  if (els.card3Title) els.card3Title.textContent = d.card3.title;
  if (els.c3Label1) els.c3Label1.textContent = d.card3.labels[0];
  if (els.c3Label2) els.c3Label2.textContent = d.card3.labels[1];

  if (els.c3Val1) els.c3Val1.textContent = rand(d.card3.items.mood);
  if (els.c3Val2) els.c3Val2.textContent = rand(d.card3.items.color);

  // palette
  renderPalette();

  // save to history
  pushHistoryEntry();
}

/* -------------------------
   7. Palette render
   ------------------------- */
function renderPalette() {
  if (!els.paletteRow) return;
  els.paletteRow.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const sw = document.createElement("div");
    sw.className = "palette-swatch";
    sw.style.background = randomHsl();
    sw.title = sw.style.background;
    els.paletteRow.appendChild(sw);
  }
}
function randomHsl() {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h},70%,60%)`;
}

/* -------------------------
   8. History (max 20)
   ------------------------- */
function pushHistoryEntry() {
  try {
    const entry = {
      t: Date.now(),
      lang: LANG,
      c11: els.c1Val1 ? els.c1Val1.textContent : "",
      c12: els.c1Val2 ? els.c1Val2.textContent : "",
      c13: els.c1Val3 ? els.c1Val3.textContent : "",
      c21: els.c2Val1 ? els.c2Val1.textContent : "",
      c22: els.c2Val2 ? els.c2Val2.textContent : "",
      c23: els.c2Val3 ? els.c2Val3.textContent : "",
      c31: els.c3Val1 ? els.c3Val1.textContent : "",
      c32: els.c3Val2 ? els.c3Val2.textContent : "",
      palette: Array.from(document.querySelectorAll("#paletteRow .palette-swatch")).map(el => el.style.background)
    };

    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(entry);
    if (arr.length > 20) arr.length = 20;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    renderHistory();
  } catch (e) {
    console.error("pushHistoryEntry error", e);
  }
}

function renderHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    if (!els.historyList) return;
    els.historyList.innerHTML = "";
    if (arr.length === 0) {
      const d = document.createElement("div");
      d.className = "historyItem";
      d.textContent = (LANG === "JP") ? "履歴はまだありません" : "No history yet";
      els.historyList.appendChild(d);
      return;
    }
    arr.forEach(item => {
      const d = document.createElement("div");
      d.className = "historyItem";
      d.innerHTML = `
        <div style="font-weight:700;margin-bottom:6px;">${new Date(item.t).toLocaleString()}</div>
        <div style="font-size:13px">${item.c11} / ${item.c12} / ${item.c13}</div>
        <div style="font-size:13px">${item.c21} / ${item.c22} / ${item.c23}</div>
        <div style="font-size:13px">${item.c31} / ${item.c32}</div>
      `;
      els.historyList.appendChild(d);
    });
  } catch (e) {
    console.error("renderHistory error", e);
  }
}
if (els.clearHistoryBtn) els.clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
});
renderHistory();

/* -------------------------
   9. Language toggle
   ------------------------- */
if (els.btnJP) els.btnJP.addEventListener("click", () => switchLang("JP"));
if (els.btnEN) els.btnEN.addEventListener("click", () => switchLang("EN"));

function switchLang(to) {
  LANG = to;
  // update UI text
  applyUIText();

  // update existing labels to new language if any empty
  // We'll just refresh card titles/labels from DATA if currently empty or when switching.
  const d = DATA[LANG];
  if (els.card1Title) els.card1Title.textContent = d.card1.title;
  if (els.card2Title) els.card2Title.textContent = d.card2.title;
  if (els.card3Title) els.card3Title.textContent = d.card3.title;

  if (els.c1Label1) els.c1Label1.textContent = d.card1.labels[0];
  if (els.c1Label2) els.c1Label2.textContent = d.card1.labels[1];
  if (els.c1Label3) els.c1Label3.textContent = d.card1.labels[2];

  if (els.c2Label1) els.c2Label1.textContent = d.card2.labels[0];
  if (els.c2Label2) els.c2Label2.textContent = d.card2.labels[1];
  if (els.c2Label3) els.c2Label3.textContent = d.card2.labels[2];

  if (els.c3Label1) els.c3Label1.textContent = d.card3.labels[0];
  if (els.c3Label2) els.c3Label2.textContent = d.card3.labels[1];

  // button active states
  if (els.btnJP) els.btnJP.classList.toggle("active", LANG === "JP");
  if (els.btnEN) els.btnEN.classList.toggle("active", LANG === "EN");

  // update note text etc.
  applyUIText();
}

/* -------------------------
   10. Save image: capture "screen-like" cards
   - we compute bounding rect of cards container and cards
   - create canvas with DPR scaling
   - draw white background and cards (rounded rect + text + palette)
   ------------------------- */
if (els.saveImgBtn) els.saveImgBtn.addEventListener("click", saveImage);

async function saveImage() {
  try {
    // find cards container and each card
    const cardEls = [els.card1, els.card2, els.card3].filter(Boolean);
    if (cardEls.length === 0) {
      alert((LANG === "JP") ? "カードが見つかりません" : "Cards not found");
      return;
    }

    // compute bounding box that includes all three cards horizontally (their union)
    const rects = cardEls.map(c => c.getBoundingClientRect());
    // total leftmost and rightmost within viewport
    const left = Math.min(...rects.map(r => r.left));
    const right = Math.max(...rects.map(r => r.right));
    const top = Math.min(...rects.map(r => r.top));
    const bottom = Math.max(...rects.map(r => r.bottom));

    // desired canvas width/height: keep padding a bit (we'll use 8px padding)
    const PAD = 8;
    const viewportScale = window.devicePixelRatio || 1;
    const cssWidth = (right - left) + PAD * 2;
    const cssHeight = (bottom - top) + PAD * 2;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(cssWidth * viewportScale);
    canvas.height = Math.round(cssHeight * viewportScale);
    canvas.style.width = cssWidth + "px";
    canvas.style.height = cssHeight + "px";

    const ctx = canvas.getContext("2d");
    // scale for DPR
    ctx.scale(viewportScale, viewportScale);

    // white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    // For each card, draw a white rounded rect + border, then draw text and palette
    // We'll map each card's position relative to left/top
    const fontFamily = 'sans-serif';
    ctx.textBaseline = "top";

    cardEls.forEach((cardEl, index) => {
      const r = cardEl.getBoundingClientRect();
      const x = r.left - left + PAD;
      const y = r.top - top + PAD;
      const w = r.width;
      const h = r.height;

      // Draw rounded rect (white fill, black 2px stroke)
      drawRoundedRect(ctx, x, y, w, h, 8);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000";
      ctx.stroke();

      // Now draw title; obtain from DOM (already set by generateCards / switchLang)
      const titleEl = cardEl.querySelector(".card-title");
      const title = titleEl ? titleEl.textContent : "";

      ctx.fillStyle = "#000";
      ctx.font = `bold ${Math.max(14, Math.round(w * 0.06))}px ${fontFamily}`;
      ctx.fillText(title, x + 12, y + 12);

      // Draw pairs (label above, value below). Find pairs within cardEl
      const pairs = Array.from(cardEl.querySelectorAll(".pair"));
      let currentY = y + 46; // offset after title
      const labelFontSize = Math.max(11, Math.round(w * 0.035));
      const valueFontSize = Math.max(13, Math.round(w * 0.045));

      pairs.forEach(pair => {
        const labelEl = pair.querySelector(".label");
        const valueEl = pair.querySelector(".value");
        if (!labelEl || !valueEl) return;

        ctx.fillStyle = "#333";
        ctx.font = `700 ${labelFontSize}px ${fontFamily}`;
        ctx.fillText(labelEl.textContent, x + 12, currentY);
        currentY += labelFontSize + 4;

        ctx.fillStyle = "#000";
        ctx.font = `700 ${valueFontSize}px ${fontFamily}`;
        // wrap long text if needed (simple wrap)
        wrapText(ctx, valueEl.textContent, x + 12, currentY, w - 24, valueFontSize + 6);
        currentY += valueFontSize + 8;
        // add some vertical gap
        currentY += 6;
      });

      // If this card has palette (card3), draw palette swatches using DOM palette if present
      if (cardEl.querySelector(".palette-row")) {
        const swatches = Array.from(cardEl.querySelectorAll(".palette-swatch"));
        if (swatches.length) {
          let px = x + 12;
          const py = y + h - 64; // place near bottom
          swatches.forEach(s => {
            const col = s.style.background || "#ddd";
            ctx.fillStyle = col;
            ctx.fillRect(px, py, 40, 28);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000";
            ctx.strokeRect(px, py, 40, 28);
            px += 48;
          });
        }
      }
    });

    // Footer (© 2025 Artilot) — placed bottom-right inside canvas
    const footerText = "© 2025 Artilot";
    ctx.fillStyle = "#000";
    const footerFontSize = 12;
    ctx.font = `${footerFontSize}px ${fontFamily}`;
    // compute bottom-right coords
    const footerX = cssWidth - PAD - ctx.measureText(footerText).width;
    const footerY = cssHeight - PAD - footerFontSize;
    ctx.fillText(footerText, footerX, footerY);

    // convert to blob
    canvas.toBlob(async blob => {
      if (!blob) {
        alert((LANG === "JP") ? "画像生成に失敗しました" : "Failed to generate image");
        return;
      }

      // try share via Web Share API with files if supported
      const filename = `artilot_${Date.now()}.png`;
      const file = new File([blob], filename, { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "ARTILOT",
            text: (LANG === "JP") ? "私の生成結果です" : "Here is my result from ARTILOT"
          });
          return;
        } catch (e) {
          // user cancelled or error — fallback to download
          console.warn("share(file) failed, falling back to download", e);
        }
      }

      // If cannot share files, try to open blob in new tab (or download)
      const url = URL.createObjectURL(blob);
      // Attempt navigator.share with url (not files) for some browsers
      if (navigator.share) {
        try {
          await navigator.share({
            title: "ARTILOT",
            text: (LANG === "JP") ? "私の生成結果です" : "Here is my result from ARTILOT",
            url // some platforms accept urls to share
          });
          URL.revokeObjectURL(url);
          return;
        } catch (e) {
          // fallback
        }
      }

      // final fallback: download
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
  } catch (e) {
    console.error("saveImage error:", e);
    alert((LANG === "JP") ? "画像保存中にエラーが発生しました" : "Error while saving image");
  }
}

/* -------------------------
   11. Helpers
   ------------------------- */
function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  // try simple wrapping by breaking at spaces; if no spaces, break by chars
  if (words.length === 1 && words[0].length * (ctx.measureText('M').width) > maxWidth) {
    // break per char
    let cur = '';
    for (let ch of text) {
      cur += ch;
      if (ctx.measureText(cur).width > maxWidth) {
        ctx.fillText(cur.slice(0, -1), x, y);
        y += lineHeight;
        cur = ch;
      }
    }
    if (cur) ctx.fillText(cur, x, y);
    return;
  }

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) ctx.fillText(line, x, y);
}

/* -------------------------
   12. Share button (URL fallback)
   ------------------------- */
if (els.shareBtn) els.shareBtn.addEventListener("click", async () => {
  // If Web Share with files supported, user should prefer Save->Share step.
  // Here we share page URL as a fallback to avoid popup blocking.
  if (navigator.share) {
    try {
      await navigator.share({
        title: "ARTILOT",
        text: (LANG === "JP") ? "ARTILOT のデザインお題" : "ARTILOT design prompts",
        url: location.href
      });
    } catch (e) {
      console.log("share canceled/fallback", e);
    }
  } else {
    alert((LANG === "JP") ? "このブラウザは共有に対応していません" : "This browser does not support sharing");
  }
});

/* -------------------------
   13. On load: set initial labels (safe)
   ------------------------- */
(function init() {
  // set initial language UI
  if (els.btnJP) els.btnJP.classList.toggle("active", LANG === "JP");
  if (els.btnEN) els.btnEN.classList.toggle("active", LANG === "EN");
  applyUIText();

  // ensure small initial empty state
  if (!els.c1Val1 || !els.c1Val1.textContent) {
    // leave placeholders as-is (—)
  }
})();
