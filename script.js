/* --------------------------------------------------
   ARTILOT — 3 Card Inspiration Generator
-------------------------------------------------- */

/* ---------- DOM ---------- */
const drawBtn = document.getElementById("drawBtn");
const saveImgBtn = document.getElementById("saveImgBtn");
const shareBtn = document.getElementById("shareBtn");

const mainPalette = document.getElementById("mainPalette");
const subPalette = document.getElementById("subPalette");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const STORAGE_KEY = "artilot_history";

/* ---------- Data ---------- */
const raceList = [
  "ヒューマン / Human",
  "エルフ / Elf",
  "ドワーフ / Dwarf",
  "竜族 / Dragonborn",
  "獣人 / Beastfolk",
  "鬼 / Oni",
  "天使 / Angel",
  "悪魔 / Demon"
];

const genderList = [
  "男性 / Male",
  "女性 / Female",
  "中性 / Androgynous",
  "不明 / Unknown"
];

const personalityList = [
  "優しい / Kind",
  "クール / Cool",
  "元気 / Energetic",
  "無表情 / Expressionless",
  "陽気 / Cheerful",
  "内向的 / Introverted",
  "大胆 / Bold"
];

const hairList = [
  "ショート / Short",
  "ロング / Long",
  "ポニーテール / Ponytail",
  "ツインテール / Twin Tail",
  "三つ編み / Braid",
  "ボブ / Bob",
  "ストレート / Straight",
  "カール / Curl"
];

const outfitList = [
  "制服 / Uniform",
  "鎧 / Armor",
  "私服 / Casual",
  "和服 / Kimono",
  "メイド服 / Maid",
  "スーツ / Suit"
];

const motifList = [
  "星 / Star",
  "月 / Moon",
  "太陽 / Sun",
  "魚 / Fish",
  "花 / Flower",
  "心臓 / Heart",
  "炎 / Flame",
  "氷 / Ice"
];

const moodList = [
  "幻想的 / Fantasy",
  "ホラー / Horror",
  "レトロ / Retro",
  "ダーク / Dark",
  "ポップ / Pop",
  "神秘的 / Mystic"
];

/* カラーパレットセット */
const paletteSets = [
  ["#c76f6f", "#fff3e0", "#2d2d2d"],
  ["#6fa8dc", "#f4cccc", "#1c4587"],
  ["#93c47d", "#d9ead3", "#274e13"],
  ["#f6b26b", "#ffe599", "#783f04"],
  ["#b4a7d6", "#d9d2e9", "#351c75"]
];

/* ---------- Utilities ---------- */
function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomPalette() {
  return choice(paletteSets);
}

/* ---------- Update Cards ---------- */
function drawCards() {
  // Card1
  document.getElementById("c1-1").textContent = choice(raceList);
  document.getElementById("c1-2").textContent = choice(genderList);
  document.getElementById("c1-3").textContent = choice(personalityList);

  // Card2
  document.getElementById("c2-1").textContent = choice(hairList);
  document.getElementById("c2-2").textContent = choice(outfitList);
  document.getElementById("c2-3").textContent = choice(motifList);

  // Card3
  document.getElementById("c3-1").textContent = choice(moodList);

  const pal = randomPalette();

  // main (1色)
  mainPalette.innerHTML = "";
  const mainChip = document.createElement("div");
  mainChip.className = "palette-chip";
  mainChip.style.background = pal[0];
  mainPalette.appendChild(mainChip);

  // sub (3色)
  subPalette.innerHTML = "";
  for (let i = 1; i < 4; i++) {
    const chip = document.createElement("div");
    chip.className = "palette-chip";
    chip.style.background = pal[i] || "#ccc";
    subPalette.appendChild(chip);
  }

  pushHistory();
}

/* ---------- History (3 cards saved as 1 set) ---------- */
function pushHistory() {
  try {
    const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const snapshot = `
      <div class="history-set">
        ${document.getElementById("card1").outerHTML}
        ${document.getElementById("card2").outerHTML}
        ${document.getElementById("card3").outerHTML}
      </div>
    `;

    arr.unshift(snapshot);
    if (arr.length > 20) arr.length = 20;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    renderHistory();
  } catch (e) { console.error(e); }
}

function renderHistory() {
  const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  historyList.innerHTML = "";

  if (arr.length === 0) {
    historyList.innerHTML = `<div class="history-item">まだ履歴はありません</div>`;
    return;
  }

  arr.forEach(html => {
    const wrapper = document.createElement("div");
    wrapper.className = "history-item";
    wrapper.innerHTML = html;
    historyList.appendChild(wrapper);
  });
}

/* ---------- Clear ---------- */
clearHistoryBtn.addEventListener("click", () => {
  if (confirm("履歴をすべて削除しますか？")) {
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
  }
});

/* --------------------------------------------------
   SAVE IMAGE（画面そのまま）
-------------------------------------------------- */
saveImgBtn.addEventListener("click", () => {
  html2canvas(document.querySelector(".cards-wrapper")).then(canvas => {
    const link = document.createElement("a");
    link.download = "artilot_cards.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

/* --------------------------------------------------
   SHARE — テキスト方式（カラーコード入り）
-------------------------------------------------- */
shareBtn.addEventListener("click", () => {

  // Card values
  const race = document.getElementById("c1-1").textContent;
  const gender = document.getElementById("c1-2").textContent;
  const personality = document.getElementById("c1-3").textContent;

  const hair = document.getElementById("c2-1").textContent;
  const outfit = document.getElementById("c2-2").textContent;
  const motif = document.getElementById("c2-3").textContent;

  const mood = document.getElementById("c3-1").textContent;

  // Colors
  const mainChip = document.querySelector("#mainPalette .palette-chip");
  const mainColor = rgbToHex(mainChip.style.background);

  const subChips = document.querySelectorAll("#subPalette .palette-chip");
  const subColors = Array.from(subChips).map(c => rgbToHex(c.style.background));
  const subColorText = `${subColors[0]} / ${subColors[1]} / ${subColors[2]}`;

  // Share text
  const shareText =
`インスピレーションカードの結果
——————————————
種族: ${race}
性別: ${gender}
性格: ${personality}

髪型: ${hair}
服: ${outfit}
モチーフ: ${motif}

雰囲気: ${mood}

メインカラー:
${mainColor}

サブカラー:
${subColorText}

——————————————
#ARTILOT
#今日のお題
#InspirationCards

あなたもやってみてね！
ARTILOT → https://kuraymd.github.io/Artilot/
`;

  if (navigator.share) {
    navigator.share({ title: "ARTILOT", text: shareText })
      .catch(() => alert("共有に失敗しました"));
  } else {
    navigator.clipboard.writeText(shareText);
    alert("共有非対応のため、テキストをコピーしました！");
  }
});

/* --------------------------------------------------
   RGB → HEX
-------------------------------------------------- */
function rgbToHex(rgb) {
  if (!rgb) return "#000000";
  const result = rgb.match(/\d+/g);
  if (!result) return "#000000";
  return "#" + result
    .slice(0, 3)
    .map(x => ("0" + parseInt(x).toString(16)).slice(-2))
    .join("");
}

/* Init */
drawBtn.addEventListener("click", drawCards);
renderHistory();
