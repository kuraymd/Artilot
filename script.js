/* ======================================================
   ARTILOT 2025 — Script Full Version
   年齢 → 性格 に変更済み
   画像保存時の崩れ完全修正版
====================================================== */

/* ---------- 1. 言語データ ---------- */
const LANG = {
  jp: {
    draw: "カードを引く",
    character: "キャラクター",
    design: "デザイン",
    mood: "雰囲気",
    race: "種族",
    gender: "性別",
    personality: "性格",
    hair: "髪型",
    cloth: "服",
    motif: "モチーフ",
    atmosphere: "雰囲気",
    mainColor: "メインカラー",
    subColor: "サブカラー",
    history: "履歴",
    clearHistory: "履歴をすべて削除",
    note: "※履歴は最新20件まで保存され、古いものから自動で削除されます。",
    saveImg: "画像を保存",
    share: "シェア"
  },

  en: {
    draw: "Draw Cards",
    character: "Character",
    design: "Design",
    mood: "Mood",
    race: "Race",
    gender: "Gender",
    personality: "Personality",
    hair: "Hair",
    cloth: "Clothes",
    motif: "Motif",
    atmosphere: "Mood",
    mainColor: "Main Color",
    subColor: "Sub Color",
    history: "History",
    clearHistory: "Clear History",
    note: "※Up to 20 history items are stored. Old ones are deleted automatically.",
    saveImg: "Save Image",
    share: "Share"
  }
};

let currentLang = "jp";

/* ---------- 2. ランダム候補 ---------- */

const DATA = {
  race: ["ヒューマン", "エルフ", "オーク", "鬼", "天使", "悪魔", "ロボット"],
  gender: ["男性", "女性", "中性", "不明"],
  personality: ["優しい", "強気", "冷静", "活発", "のんびり", "ミステリアス"],

  hair: ["ショート", "ロング", "ツインテール", "ポニーテール", "パッツン", "三つ編み", "ボブ"],
  cloth: ["鎧", "パーカー", "和服", "ドレス", "メイド", "スーツ", "学生服"],
  motif: ["太陽", "ハート", "星", "魚", "花", "氷", "炎"],

  atmosphere: ["ファンタジー", "ホラー", "レトロ", "ミステリー", "未来", "和風"],
  colors: ["#000000", "#ffffff", "#ff0040", "#0080ff", "#33cc33", "#ff9900", "#9933ff", "#aaaaaa"]
};

/* ---------- 3. DOM取得 ---------- */

const btnJP = document.getElementById("btnJP");
const btnEN = document.getElementById("btnEN");
const drawBtn = document.getElementById("drawBtn");

const card1Title = document.getElementById("card1-title");
const card2Title = document.getElementById("card2-title");
const card3Title = document.getElementById("card3-title");

const c1_1 = document.getElementById("c1-1");
const c1_2 = document.getElementById("c1-2");
const c1_3 = document.getElementById("c1-3");

const c2_1 = document.getElementById("c2-1");
const c2_2 = document.getElementById("c2-2");
const c2_3 = document.getElementById("c2-3");

const c3_1 = document.getElementById("c3-1");
const c3_2 = document.getElementById("c3-2");

const paletteRowMain = document.getElementById("paletteMain");
const paletteRowSub = document.getElementById("paletteSub");

const saveImgBtn = document.getElementById("saveImgBtn");
const shareBtn = document.getElementById("shareBtn");

/* ---------- 4. 言語切替 ---------- */

function updateLang() {
  const L = LANG[currentLang];

  drawBtn.textContent = L.draw;
  card1Title.textContent = L.character;
  card2Title.textContent = L.design;
  card3Title.textContent = L.mood;

  c1_1.dataset.label = L.race;
  c1_2.dataset.label = L.gender;
  c1_3.dataset.label = L.personality;

  c2_1.dataset.label = L.hair;
  c2_2.dataset.label = L.cloth;
  c2_3.dataset.label = L.motif;

  c3_1.dataset.label = L.atmosphere;
  c3_2.dataset.label = L.mainColor;

  document.getElementById("historyTitle").textContent = L.history;
  document.getElementById("clearHistoryBtn").textContent = L.clearHistory;
  document.getElementById("noteText").textContent = L.note;
  saveImgBtn.textContent = L.saveImg;
  shareBtn.textContent = L.share;

  highlightLangButton();
}

function highlightLangButton() {
  btnJP.classList.toggle("active", currentLang === "jp");
  btnEN.classList.toggle("active", currentLang === "en");
}

btnJP.onclick = () => {
  currentLang = "jp";
  updateLang();
};
btnEN.onclick = () => {
  currentLang = "en";
  updateLang();
};

/* ---------- 5. ランダムカード生成 ---------- */

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function drawCards() {
  const race = rand(DATA.race);
  const gender = rand(DATA.gender);
  const personality = rand(DATA.personality);

  const hair = rand(DATA.hair);
  const cloth = rand(DATA.cloth);
  const motif = rand(DATA.motif);

  const atmosphere = rand(DATA.atmosphere);
  const mainColor = rand(DATA.colors);
  const subColor = rand(DATA.colors);

  c1_1.innerHTML = `${c1_1.dataset.label}<br><strong>${race}</strong>`;
  c1_2.innerHTML = `${c1_2.dataset.label}<br><strong>${gender}</strong>`;
  c1_3.innerHTML = `${c1_3.dataset.label}<br><strong>${personality}</strong>`;

  c2_1.innerHTML = `${c2_1.dataset.label}<br><strong>${hair}</strong>`;
  c2_2.innerHTML = `${c2_2.dataset.label}<br><strong>${cloth}</strong>`;
  c2_3.innerHTML = `${c2_3.dataset.label}<br><strong>${motif}</strong>`;

  c3_1.innerHTML = `${c3_1.dataset.label}<br><strong>${atmosphere}</strong>`;
  c3_2.innerHTML = `${c3_2.dataset.label}<br><strong>${mainColor}</strong>`;

  paletteRowMain.style.background = mainColor;
  paletteRowSub.style.background = subColor;

  saveHistory();
}

drawBtn.onclick = drawCards;

/* ---------- 6. 履歴（20件まで） ---------- */

function saveHistory() {
  let history = JSON.parse(localStorage.getItem("history") || "[]");

  const item = {
    card1: [c1_1.innerHTML, c1_2.innerHTML, c1_3.innerHTML],
    card2: [c2_1.innerHTML, c2_2.innerHTML, c2_3.innerHTML],
    card3: [c3_1.innerHTML, c3_2.innerHTML],
    main: paletteRowMain.style.background,
    sub: paletteRowSub.style.background
  };

  history.unshift(item);
  if (history.length > 20) history.pop();

  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("history") || "[]");

  history.forEach(h => {
    const box = document.createElement("div");
    box.className = "historyBox";

    box.innerHTML = `
      <div class="h-row">${h.card1.join("<br>")}</div>
      <div class="h-row">${h.card2.join("<br>")}</div>
      <div class="h-row">${h.card3.join("<br>")}</div>
    `;

    list.appendChild(box);
  });
}

document.getElementById("clearHistoryBtn").onclick = () => {
  localStorage.removeItem("history");
  renderHistory();
};

renderHistory();

/* ---------- 7. 保存画像（完全修正版） ---------- */

saveImgBtn.addEventListener("click", saveImage);

function saveImage() {
  const w = 900;
  const h = 600;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);

  const cardW = 260;
  const cardH = 500;
  const startX = [30, 320, 610];
  const startY = 50;

  drawOneCard(ctx, startX[0], startY, cardW, cardH, "キャラクター", c1_1, c1_2, c1_3);
  drawOneCard(ctx, startX[1], startY, cardW, cardH, "デザイン", c2_1, c2_2, c2_3);
  drawOneCardColor(ctx, startX[2], startY, cardW, cardH);

  ctx.fillStyle = "#000";
  ctx.font = "18px sans-serif";
  ctx.fillText("© 2025 Artilot", w - 200, h - 20);

  const link = document.createElement("a");
  link.download = "artilot_cards.png";
  link.href = canvas.toDataURL();
  link.click();
}

function drawOneCard(ctx, x, y, w, h, title, l1, l2, l3) {
  drawRound(ctx, x, y, w, h, 15);

  ctx.font = "bold 22px sans-serif";
  ctx.fillStyle = "#000";
  ctx.fillText(title, x + 20, y + 40);

  ctx.font = "18px sans-serif";
  ctx.fillText(stripHTML(l1.innerHTML), x + 20, y + 120);
  ctx.fillText(stripHTML(l2.innerHTML), x + 20, y + 200);
  ctx.fillText(stripHTML(l3.innerHTML), x + 20, y + 280);
}

function drawOneCardColor(ctx, x, y, w, h) {
  drawRound(ctx, x, y, w, h, 15);

  ctx.font = "bold 22px sans-serif";
  ctx.fillText("雰囲気", x + 20, y + 40);

  ctx.font = "18px sans-serif";
  ctx.fillText(stripHTML(c3_1.innerHTML), x + 20, y + 120);
  ctx.fillText(stripHTML(c3_2.innerHTML), x + 20, y + 200);

  ctx.fillStyle = paletteRowMain.style.background;
  ctx.fillRect(x + 20, y + 260, 50, 50);

  ctx.fillStyle = paletteRowSub.style.background;
  ctx.fillRect(x + 90, y + 260, 50, 50);

  ctx.strokeStyle = "#000";
  ctx.strokeRect(x + 20, y + 260, 50, 50);
  ctx.strokeRect(x + 90, y + 260, 50, 50);
}

function drawRound(ctx, x, y, w, h, r) {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000";
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
  ctx.stroke();
}

function stripHTML(str) {
  return str.replace(/<[^>]+>/g, "");
}
