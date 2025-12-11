/* ==========================================================
   ARTILOT — Script  (Full Version)
========================================================== */

/* ---------------------------------------------------------
   1. データセット
---------------------------------------------------------- */

// ★ キャラクターカード
const raceJP = ["ヒューマン", "エルフ", "ドワーフ", "鬼", "天使", "悪魔", "ロボット", "獣人", "ドラゴン族"];
const raceEN = ["Human", "Elf", "Dwarf", "Oni", "Angel", "Demon", "Robot", "Beastfolk", "Dragon"];

const genderJP = ["男性", "女性", "中性", "不明"];
const genderEN = ["Male", "Female", "Androgynous", "Unknown"];

const personalityJP = ["優しい", "冷静", "元気", "クール", "熱血", "陰キャ", "陽キャ"];
const personalityEN = ["Kind", "Calm", "Energetic", "Cool", "Hotblooded", "Introvert", "Extrovert"];

// ★ デザインカード
const hairJP = ["ショート", "ロング", "ポニーテール", "ツインテール", "パッツン", "ボブ"];
const hairEN = ["Short", "Long", "Ponytail", "Twintail", "Bang-cut", "Bob"];

const outfitJP = ["鎧", "セーラー服", "和服", "メイド服", "スーツ", "カジュアル"];
const outfitEN = ["Armor", "Sailor uniform", "Kimono", "Maid outfit", "Suit", "Casual"];

const motifJP = ["ハート", "太陽", "魚", "月", "星", "花"];
const motifEN = ["Heart", "Sun", "Fish", "Moon", "Star", "Flower"];

// ★ 雰囲気カード
const moodJP = ["ファンタジー", "ホラー", "サイバー", "レトロ", "和風", "ダーク"];
const moodEN = ["Fantasy", "Horror", "Cyber", "Retro", "Japanese", "Dark"];

// ★ カラー
const colors = [
  "#ff4b4b", "#ffd93d", "#4b7bff", "#34a853", "#bb84ff",
  "#ff884b", "#ff77b5", "#00c2c7", "#444444", "#ffffff"
];


/* ---------------------------------------------------------
   2. 便利関数
---------------------------------------------------------- */
function rnd(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


/* ---------------------------------------------------------
   3. 言語切替
---------------------------------------------------------- */

let currentLang = "JP";

const langBtnJP = document.getElementById("btnJP");
const langBtnEN = document.getElementById("btnEN");

langBtnJP.addEventListener("click", () => setLang("JP"));
langBtnEN.addEventListener("click", () => setLang("EN"));

function setLang(lang) {
  currentLang = lang;

  langBtnJP.classList.remove("active");
  langBtnEN.classList.remove("active");
  if (lang === "JP") langBtnJP.classList.add("active");
  else langBtnEN.classList.add("active");

  // サブタイトル
  document.querySelector(".subtitle").textContent =
    lang === "JP" ? "インスピレーションカード" : "Inspiration Cards";

  // UI
  document.getElementById("drawBtn").textContent =
    lang === "JP" ? "カードを引く" : "Draw Cards";

  document.getElementById("historyTitle").textContent =
    lang === "JP" ? "履歴" : "History";

  document.getElementById("clearHistoryBtn").textContent =
    lang === "JP" ? "履歴をすべて削除" : "Clear History";

  document.getElementById("noteText").textContent =
    lang === "JP"
      ? "※結果は自動で履歴に保存されます（最大20件）"
      : "*Results are automatically saved (max 20 items)";
}


/* ---------------------------------------------------------
   4. カードを引く
---------------------------------------------------------- */
document.getElementById("drawBtn").addEventListener("click", drawCards);

function drawCards() {
  const isJP = currentLang === "JP";

  /* --- Card 1 --- */
  document.getElementById("c1-1").textContent = isJP ? rnd(raceJP) : rnd(raceEN);
  document.getElementById("c1-2").textContent = isJP ? rnd(genderJP) : rnd(genderEN);
  document.getElementById("c1-3").textContent = isJP ? rnd(personalityJP) : rnd(personalityEN);

  /* --- Card 2 --- */
  document.getElementById("c2-1").textContent = isJP ? rnd(hairJP) : rnd(hairEN);
  document.getElementById("c2-2").textContent = isJP ? rnd(outfitJP) : rnd(outfitEN);
  document.getElementById("c2-3").textContent = isJP ? rnd(motifJP) : rnd(motifEN);

  /* --- Card 3 --- */
  document.getElementById("c3-1").textContent = isJP ? rnd(moodJP) : rnd(moodEN);

  // 色生成
  const mainColor = rnd(colors);
  const subColors = [rnd(colors), rnd(colors), rnd(colors)];

  document.getElementById("c3-2").textContent = mainColor;
  document.getElementById("c3-3").textContent = subColors.join(", ");

  drawPalette("mainPalette", [mainColor]);
  drawPalette("subPalette", subColors);

  saveToHistory();
}


/* ---------------------------------------------------------
   5. パレット描画
---------------------------------------------------------- */
function drawPalette(id, colorList) {
  const box = document.getElementById(id);
  box.innerHTML = "";

  colorList.forEach(col => {
    const sw = document.createElement("div");
    sw.className = "palette-swatch";
    sw.style.background = col;
    box.appendChild(sw);
  });
}


/* ---------------------------------------------------------
   6. 履歴保存（最大20件）
---------------------------------------------------------- */

function saveToHistory() {
  const item = {
    lang: currentLang,
    c1: [c1_1.textContent, c1_2.textContent, c1_3.textContent],
    c2: [c2_1.textContent, c2_2.textContent, c2_3.textContent],
    c3: [c3_1.textContent, c3_2.textContent, c3_3.textContent]
  };

  let history = JSON.parse(localStorage.getItem("artilotHistory") || "[]");

  history.unshift(item);
  if (history.length > 20) history.pop();

  localStorage.setItem("artilotHistory", JSON.stringify(history));

  renderHistory();
}


/* ---------------------------------------------------------
   7. 履歴表示
---------------------------------------------------------- */
function renderHistory() {
  const history = JSON.parse(localStorage.getItem("artilotHistory") || "[]");
  const list = document.getElementById("historyList");

  list.innerHTML = "";

  history.forEach((h) => {
    const div = document.createElement("div");
    div.className = "history-item";

    div.innerHTML = `
      <strong>${h.lang === "JP" ? "キャラクター" : "Character"}</strong><br>
      ${h.c1.join(" / ")}<br><br>

      <strong>${h.lang === "JP" ? "デザイン" : "Design"}</strong><br>
      ${h.c2.join(" / ")}<br><br>

      <strong>${h.lang === "JP" ? "雰囲気" : "Mood"}</strong><br>
      ${h.c3.join(" / ")}
    `;

    list.appendChild(div);
  });
}

renderHistory();

/* ---------------------------------------------------------
   8. 履歴削除
---------------------------------------------------------- */
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("artilotHistory");
  renderHistory();
});


/* ---------------------------------------------------------
   9. 画像保存（画面まるごとキャプチャ）
---------------------------------------------------------- */
document.getElementById("saveImgBtn").addEventListener("click", saveAsImage);

function saveAsImage() {
  html2canvas(document.body, { scale: 2 }).then(canvas => {
    const link = document.createElement("a");
    link.download = "artilot_result.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}


/* ---------------------------------------------------------
   10. シェア
---------------------------------------------------------- */
document.getElementById("shareBtn").addEventListener("click", async () => {
  if (navigator.share) {
    navigator.share({
      title: "ARTILOT — 今日のインスピレーションカード",
      url: location.href
    });
  } else {
    alert("このブラウザはシェア機能に対応していません");
  }
});
