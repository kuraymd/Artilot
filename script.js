/* ============================================================
   ARTILOT — Inspiration Card Generator
   最新版 script.js
============================================================ */

/* ---------- データ ---------- */

// 種族 / Race
const raceList = [
  ["ヒューマン", "Human"],
  ["エルフ", "Elf"],
  ["鬼", "Ogre"],
  ["ドラゴン族", "Dragon"],
  ["獣人", "Beastfolk"],
  ["天使", "Angel"],
  ["悪魔", "Demon"]
];

// 性別 / Gender
const genderList = [
  ["男性", "Male"],
  ["女性", "Female"],
  ["中性", "Neutral"],
  ["不明", "Unknown"]
];

// 性格 / Personality
const personalityList = [
  ["無表情", "Expressionless"],
  ["元気", "Energetic"],
  ["静か", "Quiet"],
  ["強気", "Confident"],
  ["臆病", "Timid"],
  ["不敵", "Fearless"],
  ["温厚", "Calm"]
];

// 髪型 / Hair
const hairList = [
  ["ロング", "Long"],
  ["ショート", "Short"],
  ["ポニーテール", "Ponytail"],
  ["ツインテール", "Twintail"],
  ["ぱっつん", "Straight Bangs"],
  ["ウルフカット", "Wolf Cut"]
];

// 服 / Outfit
const outfitList = [
  ["メイド服", "Maid"],
  ["和服", "Kimono"],
  ["鎧", "Armor"],
  ["セーラー服", "Sailor"],
  ["パーカー", "Parka"]
];

// モチーフ / Motif
const motifList = [
  ["ハート", "Heart"],
  ["魚", "Fish"],
  ["太陽", "Sun"],
  ["月", "Moon"],
  ["翼", "Wings"],
  ["炎", "Flame"]
];

// 雰囲気 / Mood
const moodList = [
  ["ホラー", "Horror"],
  ["ファンタジー", "Fantasy"],
  ["レトロ", "Retro"],
  ["サイバーパンク", "Cyberpunk"],
  ["可愛い", "Cute"]
];

// 色（ランダムカラー）
function randomColor() {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgb(${r},${g},${b})`;
}


/* ============================================================
   カードを引く
============================================================ */

document.getElementById("drawBtn").addEventListener("click", drawCards);

function drawCards() {
  // ★ ランダム取得
  const race = pick(raceList);
  const gender = pick(genderList);
  const personality = pick(personalityList);

  const hair = pick(hairList);
  const outfit = pick(outfitList);
  const motif = pick(motifList);

  const mood = pick(moodList);

  const mainColor = randomColor();
  const subColors = [randomColor(), randomColor(), randomColor()];

  // ★ 画面へ反映
  set("c1-1", race);
  set("c1-2", gender);
  set("c1-3", personality);

  set("c2-1", hair);
  set("c2-2", outfit);
  set("c2-3", motif);

  set("c3-1", mood);
  set("c3-2", ["", ""]); // 色名は空欄でOK（チップで表示）
  set("c3-3", ["", ""]); // サブカラー名も空欄

  // パレット表示
  setPalette("mainPalette", [mainColor]);
  setPalette("subPalette", subColors);

  // 履歴に保存
  saveHistory({ race, gender, personality, hair, outfit, motif, mood, mainColor, subColors });
}

/* ---------- 便利関数 ---------- */
function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function set(id, pair) {
  document.getElementById(id).textContent = `${pair[0]} / ${pair[1]}`;
}

function setPalette(id, colors) {
  const box = document.getElementById(id);
  box.innerHTML = "";
  colors.forEach(c => {
    const div = document.createElement("div");
    div.className = "swatch";
    div.style.background = c;
    box.appendChild(div);
  });
}


/* ============================================================
   履歴 — まとめて 1 枠として保存
============================================================ */

let history = JSON.parse(localStorage.getItem("artilotHistory") || "[]");

function saveHistory(data) {
  history.unshift(data);
  if (history.length > 20) history.pop();

  localStorage.setItem("artilotHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const box = document.getElementById("historyList");
  box.innerHTML = "";

  history.forEach((h, i) => {
    const div = document.createElement("div");
    div.className = "history-item";

    div.innerHTML = `
      <strong>${i + 1}.</strong><br>
      種族: ${h.race[0]} / ${h.race[1]}<br>
      性別: ${h.gender[0]} / ${h.gender[1]}<br>
      性格: ${h.personality[0]} / ${h.personality[1]}<br>
      髪型: ${h.hair[0]} / ${h.hair[1]}<br>
      服: ${h.outfit[0]} / ${h.outfit[1]}<br>
      モチーフ: ${h.motif[0]} / ${h.motif[1]}<br>
      雰囲気: ${h.mood[0]} / ${h.mood[1]}<br>
      メインカラー: ${h.mainColor}<br>
      サブカラー: ${h.subColors.join(", ")}<br>
    `;

    box.appendChild(div);
  });
}

renderHistory();

/* 履歴削除 */
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  if (!confirm("履歴をすべて削除しますか？")) return;
  history = [];
  localStorage.setItem("artilotHistory", "[]");
  renderHistory();
});


/* ============================================================
   保存（画面をそのまま保存）
============================================================ */

document.getElementById("saveImgBtn").addEventListener("click", () => {
  html2canvas(document.body).then(canvas => {
    const link = document.createElement("a");
    link.download = "artilot_result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});


/* ============================================================
   シェア（テキストのみ / カラーコードあり）
============================================================ */

document.getElementById("shareBtn").addEventListener("click", shareText);

function shareText() {
  if (!history.length) return;

  const h = history[0];

  const msg = `
インスピレーションカードの結果  
Inspiration Card Result

種族: ${h.race[0]} / ${h.race[1]}
性別: ${h.gender[0]} / ${h.gender[1]}
性格: ${h.personality[0]} / ${h.personality[1]}
髪型: ${h.hair[0]} / ${h.hair[1]}
服: ${h.outfit[0]} / ${h.outfit[1]}
モチーフ: ${h.motif[0]} / ${h.motif[1]}
雰囲気: ${h.mood[0]} / ${h.mood[1]}

メインカラー: ${h.mainColor}
サブカラー: ${h.subColors.join(", ")}

#ARTILOT
#今日のお題

あなたもやってみてね！
ARTILOT → https://kuraymd.github.io/Artilot/
`;

  if (navigator.share) {
    navigator.share({
      title: "ARTILOT — Inspiration Cards",
      text: msg
    }).catch(() => {});
  } else {
    alert("シェア非対応の端末です\n\n下の内容をコピーして使ってください：\n\n" + msg);
  }
}
