/* ==========================================================
   ARTLOT — script.js (sync with index.html)
   - Language JP/EN
   - Draw cards (3)
   - Main color + Sub colors (3)
   - History (max 20)
   - Save image (capture 3 cards area) & Share
========================================================== */

/* -----------------------------
   Data: JP / EN arrays
------------------------------*/
const DATA = {
  JP: {
    card1: {
      title: "キャラクター",
      labels: ["種族", "性別", "性格"],
      race: ["ヒューマン","エルフ","ドワーフ","鬼","天使","悪魔","ロボット","獣人","ドラゴン族"],
      gender: ["男性","女性","中性","不明"],
      personality: ["優しい","冷静","元気","クール","熱血","陰キャ","陽キャ"]
    },
    card2: {
      title: "デザイン",
      labels: ["髪型","服","モチーフ"],
      hair: ["ショート","ロング","ポニーテール","ツインテール","パッツン","ボブ","三つ編み"],
      clothes: ["鎧","セーラー服","和服","メイド服","スーツ","カジュアル"],
      motif: ["ハート","太陽","魚","月","星","花"]
    },
    card3: {
      title: "雰囲気",
      labels: ["雰囲気","メインカラー","サブカラー"],
      mood: ["ファンタジー","ホラー","サイバー","レトロ","和風","ダーク"],
      colors: ["#ff4b4b","#ffd93d","#4b7bff","#34a853","#bb84ff","#ff884b","#ff77b5","#00c2c7","#444444","#ffffff"]
    },
    ui: {
      draw: "カードを引く",
      subtitle: "インスピレーションカード",
      note: "※結果は自動で履歴に保存されます（最大20件）",
      history: "履歴",
      clear: "履歴をすべて削除",
      saveImg: "画像を保存",
      share: "シェア"
    }
  },
  EN: {
    card1: {
      title: "Character",
      labels: ["Race","Gender","Personality"],
      race: ["Human","Elf","Dwarf","Oni","Angel","Demon","Robot","Beastfolk","Dragon"],
      gender: ["Male","Female","Androgynous","Unknown"],
      personality: ["Kind","Calm","Energetic","Cool","Hotblooded","Introvert","Extrovert"]
    },
    card2: {
      title: "Design",
      labels: ["Hair","Outfit","Motif"],
      hair: ["Short","Long","Ponytail","Twintail","Bang-cut","Bob","Braids"],
      clothes: ["Armor","Sailor uniform","Kimono","Maid outfit","Suit","Casual"],
      motif: ["Heart","Sun","Fish","Moon","Star","Flower"]
    },
    card3: {
      title: "Mood",
      labels: ["Mood","Main Color","Sub Colors"],
      mood: ["Fantasy","Horror","Cyber","Retro","Japanese","Dark"],
      colors: ["#ff4b4b","#ffd93d","#4b7bff","#34a853","#bb84ff","#ff884b","#ff77b5","#00c2c7","#444444","#ffffff"]
    },
    ui: {
      draw: "Draw Cards",
      subtitle: "Inspiration Cards",
      note: "*Results are automatically saved (max 20 items)",
      history: "History",
      clear: "Clear History",
      saveImg: "Save Image",
      share: "Share"
    }
  }
};

/* -----------------------------
   Utility
------------------------------*/
const $ = sel => document.querySelector(sel);
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const STORAGE_KEY = "artilot_history_v3";

/* -----------------------------
   Elements
------------------------------*/
const btnJP = $("#btnJP");
const btnEN = $("#btnEN");
const drawBtn = $("#drawBtn");
const saveBtn = $("#saveImgBtn");
const shareBtn = $("#shareBtn");
const clearHistoryBtn = $("#clearHistoryBtn");

const subtitleEl = $(".subtitle");
const noteText = $("#noteText");
const historyTitle = $("#historyTitle");
const historyList = $("#historyList");

const cardEls = {
  card1: $("#card1"),
  card2: $("#card2"),
  card3: $("#card3")
};

const c1 = { v1: $("#c1-1"), v2: $("#c1-2"), v3: $("#c1-3") };
const c2 = { v1: $("#c2-1"), v2: $("#c2-2"), v3: $("#c2-3") };
const c3 = { v1: $("#c3-1"), mainText: $("#c3-2"), subText: $("#c3-3") };

const mainPalette = $("#mainPalette");
const subPalette = $("#subPalette");

/* -----------------------------
   State
------------------------------*/
let LANG = "JP";

/* -----------------------------
   Init UI from DATA
------------------------------*/
function applyUI() {
  const ui = DATA[LANG].ui;
  subtitleEl.textContent = ui.subtitle;
  noteText.textContent = ui.note;
  historyTitle.textContent = ui.history;
  clearHistoryBtn.textContent = ui.clear;
  saveBtn.textContent = ui.saveImg;
  shareBtn.textContent = ui.share;
  drawBtn.textContent = ui.draw;

  // labels and titles: set card titles & label small spans
  const d = DATA[LANG];
  // card titles
  $("#card1-title").innerHTML = `${d.card1.title}<br><span>${d.card1.title === "キャラクター" ? "Character" : d.card1.title}</span>`;
  $("#card2-title").innerHTML = `${d.card2.title}<br><span>${d.card2.title === "デザイン" ? "Design" : d.card2.title}</span>`;
  $("#card3-title").innerHTML = `${d.card3.title}<br><span>${d.card3.title === "雰囲気" ? "Mood" : d.card3.title}</span>`;

  // label spans (we used labels directly in HTML but ensure inner small spans reflect language)
  // (we won't overwrite the main label visible lines — drawCards will update values)
}

applyUI();

/* -----------------------------
   Language toggle
------------------------------*/
btnJP.addEventListener("click", () => switchLang("JP"));
btnEN.addEventListener("click", () => switchLang("EN"));

function switchLang(to) {
  LANG = to;
  btnJP.classList.toggle("active", LANG === "JP");
  btnEN.classList.toggle("active", LANG === "EN");
  applyUI();
}

/* -----------------------------
   Draw Cards
------------------------------*/
drawBtn.addEventListener("click", generate);

function generate() {
  const D = DATA[LANG];

  // card1
  c1.v1.textContent = rand(D.card1.race);
  c1.v2.textContent = rand(D.card1.gender);
  c1.v3.textContent = rand(D.card1.personality);

  // card2
  c2.v1.textContent = rand(D.card2.hair);
  c2.v2.textContent = rand(D.card2.clothes);
  c2.v3.textContent = rand(D.card2.motif);

  // card3
  c3.v1.textContent = rand(D.card3.mood);

  // main color + subcolors(3 distinct if possible)
  const colors = D.card3.colors.slice();
  const main = rand(colors);
  // remove one instance of main from pool to increase variety
  const pool = colors.filter(c => c !== main);
  // pick 3 (allow duplicates if pool smaller)
  const sub = [];
  for (let i = 0; i < 3; i++) {
    if (pool.length === 0) pool.push(...colors);
    const idx = Math.floor(Math.random() * pool.length);
    sub.push(pool.splice(idx,1)[0]);
  }

  c3.mainText.textContent = main;
  c3.subText.textContent = sub.join(", ");

  renderPalette(mainPalette, [main]);
  renderPalette(subPalette, sub);

  pushHistoryEntry();
}

/* -----------------------------
   Palette render
------------------------------*/
function renderPalette(containerEl, arr) {
  if (!containerEl) return;
  containerEl.innerHTML = "";
  arr.forEach(col => {
    const s = document.createElement("div");
    s.className = "palette-swatch";
    s.style.background = col;
    containerEl.appendChild(s);
  });
}

/* -----------------------------
   History (max 20)
------------------------------*/
function pushHistoryEntry() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || "[]";
    const arr = JSON.parse(raw);

    const entry = {
      t: Date.now(),
      lang: LANG,
      c1: [c1.v1.textContent, c1.v2.textContent, c1.v3.textContent],
      c2: [c2.v1.textContent, c2.v2.textContent, c2.v3.textContent],
      c3: [c3.v1.textContent, c3.mainText.textContent, c3.subText.textContent],
      mainPalette: Array.from(mainPalette.querySelectorAll(".palette-swatch")).map(s => s.style.background),
      subPalette: Array.from(subPalette.querySelectorAll(".palette-swatch")).map(s => s.style.background)
    };

    arr.unshift(entry);
    if (arr.length > 20) arr.length = 20;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    renderHistory();
  } catch (e) {
    console.error("history push error", e);
  }
}

function renderHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || "[]";
    const arr = JSON.parse(raw);
    historyList.innerHTML = "";
    if (arr.length === 0) {
      const d = document.createElement("div");
      d.className = "history-item";
      d.textContent = LANG === "JP" ? "履歴はまだありません" : "No history yet";
      historyList.appendChild(d);
      return;
    }
    arr.forEach(item => {
      const box = document.createElement("div");
      box.className = "history-item";
      box.innerHTML = `
        <div style="font-weight:700;margin-bottom:6px;">${new Date(item.t).toLocaleString()}</div>
        <div style="font-size:13px">${item.c1.join(" / ")}</div>
        <div style="font-size:13px;margin-top:6px">${item.c2.join(" / ")}</div>
        <div style="font-size:13px;margin-top:6px">${item.c3.join(" / ")}</div>
      `;
      historyList.appendChild(box);
    });
  } catch (e) {
    console.error("renderHistory error", e);
  }
}

clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
});

renderHistory();

/* -----------------------------
   Save image (capture visible 3 cards area)
   - create canvas sized to bounding rect of cards section
   - draw white background, draw each card's content
------------------------------*/
saveBtn.addEventListener("click", saveImage);
shareBtn.addEventListener("click", shareImage);

function saveImage() {
  captureCardsToCanvas().then(({canvas, blob}) => {
    // download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `artilot_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }).catch(err => {
    console.error(err);
    alert(LANG === "JP" ? "画像の生成に失敗しました" : "Failed to generate image");
  });
}

async function shareImage() {
  try {
    const { blob } = await captureCardsToCanvas();
    const file = new File([blob], `artilot_${Date.now()}.png`, { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: LANG === "JP" ? "ARTILOT — インスピレーションカード" : "ARTILOT — Inspiration Cards",
        text: LANG === "JP" ? "私の生成結果です" : "Here is my ARTILOT result"
      });
      return;
    }

    // fallback: attempt navigator.share with url
    const url = URL.createObjectURL(blob);
    if (navigator.share) {
      try {
        await navigator.share({
          title: LANG === "JP" ? "ARTILOT — インスピレーションカード" : "ARTILOT — Inspiration Cards",
          text: LANG === "JP" ? "私の生成結果です" : "Here is my ARTILOT result",
          url
        });
        URL.revokeObjectURL(url);
        return;
      } catch (e) {
        // ignore and fallback to download
      }
    }

    // final fallback: download
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

  } catch (e) {
    console.error("share error", e);
    alert(LANG === "JP" ? "共有に失敗しました" : "Failed to share");
  }
}

/* -----------------------------
   captureCardsToCanvas: draws cards area to canvas and returns {canvas, blob}
------------------------------*/
async function captureCardsToCanvas() {
  return new Promise((resolve, reject) => {
    try {
      const cardElsArr = [cardEls.card1, cardEls.card2, cardEls.card3].filter(Boolean);
      if (cardElsArr.length === 0) return reject("no cards");

      // compute bounding rect that covers all three cards
      const rects = cardElsArr.map(el => el.getBoundingClientRect());
      const left = Math.min(...rects.map(r => r.left));
      const top = Math.min(...rects.map(r => r.top));
      const right = Math.max(...rects.map(r => r.right));
      const bottom = Math.max(...rects.map(r => r.bottom));

      const PAD = 12;
      const cssW = (right - left) + PAD * 2;
      const cssH = (bottom - top) + PAD * 2;
      const dpr = window.devicePixelRatio || 1;

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";

      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);

      // white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cssW, cssH);

      // draw each card by reading DOM content
      const fontFamily = "sans-serif";
      cardElsArr.forEach((cardEl) => {
        const r = cardEl.getBoundingClientRect();
        const x = r.left - left + PAD;
        const y = r.top - top + PAD;
        const w = r.width;
        const h = r.height;

        // draw card rect
        drawRoundedRect(ctx, x, y, w, h, 12);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#000000";
        ctx.stroke();

        // title
        const titleEl = cardEl.querySelector(".card-title");
        const title = titleEl ? titleEl.textContent.replace(/\n/g, " ") : "";
        ctx.fillStyle = "#000";
        ctx.font = `700 ${Math.round(Math.min(20, w * 0.08))}px ${fontFamily}`;
        ctx.fillText(title, x + 14, y + 14);

        // draw content blocks (each .block)
        const blocks = Array.from(cardEl.querySelectorAll(".block"));
        let curY = y + 50;
        const maxTextWidth = w - 28;
        blocks.forEach(b => {
          const labelEl = b.querySelector(".label");
          const valueEl = b.querySelector(".value");
          if (!labelEl || !valueEl) return;

          // label (small)
          ctx.fillStyle = "#222";
          ctx.font = `700 ${Math.round(Math.min(14, w * 0.045))}px ${fontFamily}`;
          // draw label (first line)
          const labelText = labelEl.childNodes[0] ? labelEl.childNodes[0].textContent.trim() : "";
          ctx.fillText(labelText, x + 14, curY);

          curY += Math.round(w * 0.045) + 6;

          // value (bold)
          ctx.fillStyle = "#000";
          ctx.font = `700 ${Math.round(Math.min(18, w * 0.06))}px ${fontFamily}`;
          const raw = valueEl.textContent.trim();
          wrapText(ctx, raw, x + 14, curY, maxTextWidth, Math.round(w * 0.06) + 6);
          // estimate vertical move (2 lines approx)
          const lines = Math.ceil((ctx.measureText(raw).width / maxTextWidth) || 1);
          curY += (Math.round(w * 0.06) + 8) * Math.max(lines,1);
          curY += 8;
        });

        // if there are palette swatches inside this card, draw them at bottom area
        if (cardEl.id === "card3") {
          // draw main palette (first)
          const mainSwatches = Array.from(cardEl.querySelectorAll("#mainPalette .palette-swatch"));
          let px = x + 14;
          const py = y + h - 68;
          mainSwatches.forEach(s => {
            ctx.fillStyle = s.style.background || "#ddd";
            ctx.fillRect(px, py, 44, 36);
            ctx.lineWidth = 2; ctx.strokeStyle = "#000"; ctx.strokeRect(px, py, 44, 36);
            px += 54;
          });
          // draw sub swatches to the right
          const subSwatches = Array.from(cardEl.querySelectorAll("#subPalette .palette-swatch"));
          px = x + 14 + (mainSwatches.length*54);
          subSwatches.forEach(s => {
            ctx.fillStyle = s.style.background || "#ddd";
            ctx.fillRect(px, py, 44, 36);
            ctx.lineWidth = 2; ctx.strokeStyle = "#000"; ctx.strokeRect(px, py, 44, 36);
            px += 54;
          });
        }
      });

      // footer text
      const footer = "© 2025 Artilot";
      ctx.fillStyle = "#000";
      ctx.font = `12px ${fontFamily}`;
      ctx.fillText(footer, cssW - 14 - ctx.measureText(footer).width, cssH - 14);

      // toBlob
      canvas.toBlob(blob => {
        if (!blob) return reject("toBlob failed");
        resolve({ canvas, blob });
      }, "image/png");
    } catch (err) {
      reject(err);
    }
  });
}

/* -----------------------------
   Helpers
------------------------------*/
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
  if (!text) return;
  const words = text.split(/[\s,]+/);
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + (line ? " " : "") + words[n];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

/* -----------------------------
   On load: ensure language buttons state
------------------------------*/
(function init() {
  btnJP.classList.toggle("active", LANG === "JP");
  btnEN.classList.toggle("active", LANG === "EN");
  applyUI();
})();
