/* ==================================================
   1. データセット（日本語 & 英語）
================================================== */
const dataJP = {
  race: ["ヒューマン", "エルフ", "獣人", "鬼", "吸血鬼", "ドラゴン族", "ロボット", "スライム", "妖精"],
  gender: ["男性", "女性", "中性", "不明"],
  personality: ["優しい", "クール", "元気", "内向的", "大胆", "慎重", "気まぐれ"],
  hair: ["ロング", "ショート", "ポニーテール", "ツインテール", "ボブ", "パッツン", "巻き髪"],
  outfit: ["セーラー服", "和服", "メイド服", "鎧", "スーツ", "パーカー", "ローブ"],
  motif: ["魚", "太陽", "月", "ハート", "蝶", "炎", "氷", "花"],
  mood: ["ホラー", "ファンタジー", "レトロ", "サイバー", "可愛い", "シリアス"],
};

const dataEN = {
  race: ["Human", "Elf", "Beastkin", "Ogre", "Vampire", "Dragonfolk", "Robot", "Slime", "Fairy"],
  gender: ["Male", "Female", "Neutral", "Unknown"],
  personality: ["Kind", "Cool", "Energetic", "Shy", "Bold", "Cautious", "Whimsical"],
  hair: ["Long", "Short", "Ponytail", "Twin-tail", "Bob", "Straight Bangs", "Curly"],
  outfit: ["Sailor uniform", "Kimono", "Maid outfit", "Armor", "Suit", "Parka", "Robe"],
  motif: ["Fish", "Sun", "Moon", "Heart", "Butterfly", "Fire", "Ice", "Flower"],
  mood: ["Horror", "Fantasy", "Retro", "Cyber", "Cute", "Serious"],
};

/* ==================================================
   2. カラーパレット
================================================== */
function randomColor() {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h}, 70%, 55%)`;
}

function generatePalette(count = 3) {
  return Array.from({ length: count }, () => randomColor());
}

/* ==================================================
   3. 現在言語
================================================== */
let currentLang = "JP";

/* ==================================================
   4. クリックイベント
================================================== */
document.getElementById("btnJP").addEventListener("click", () => setLang("JP"));
document.getElementById("btnEN").addEventListener("click", () => setLang("EN"));

document.getElementById("drawBtn").addEventListener("click", drawCards);
document.getElementById("clearHistoryBtn").addEventListener("click", clearHistory);

document.getElementById("saveImgBtn").addEventListener("click", saveImage);
document.getElementById("shareBtn").addEventListener("click", shareImage);

/* ==================================================
   5. 言語切り替え
================================================== */
function setLang(lang) {
  currentLang = lang;

  document.getElementById("btnJP").classList.toggle("active", lang === "JP");
  document.getElementById("btnEN").classList.toggle("active", lang === "EN");
}

/* ==================================================
   6. カード生成
================================================== */
function drawCards() {
  const d = currentLang === "JP" ? dataJP : dataEN;

  /* ------ カード1 ------ */
  setValue("c1-1", d.race);
  setValue("c1-2", d.gender);
  setValue("c1-3", d.personality);

  /* ------ カード2 ------ */
  setValue("c2-1", d.hair);
  setValue("c2-2", d.outfit);
  setValue("c2-3", d.motif);

  /* ------ カード3 ------ */
  setValue("c3-1", d.mood);

  const mainP = generatePalette(3);
  const subP = generatePalette(3);

  updatePalette("mainPalette", mainP);
  updatePalette("subPalette", subP);

  document.getElementById("c3-2").textContent = mainP.join(", ");
  document.getElementById("c3-3").textContent = subP.join(", ");

  saveToHistory();
}

/* テキストセット */
function setValue(id, arr) {
  document.getElementById(id).textContent = arr[Math.floor(Math.random() * arr.length)];
}

/* パレット更新 */
function updatePalette(containerId, colors) {
  const box = document.getElementById(containerId);
  box.innerHTML = "";
  colors.forEach(col => {
    const div = document.createElement("div");
    div.className = "palette-swatch";
    div.style.background = col;
    box.appendChild(div);
  });
}

/* ==================================================
   7. 履歴管理
================================================== */
function saveToHistory() {
  const history = JSON.parse(localStorage.getItem("artilotHistory") || "[]");

  const entry = document.getElementById("cards").innerHTML;

  history.unshift(entry);

  if (history.length > 20) history.pop();

  localStorage.setItem("artilotHistory", JSON.stringify(history));

  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("artilotHistory") || "[]");
  const list = document.getElementById("historyList");
  list.innerHTML = history.map(h => `<div class="history-item">${h}</div>`).join("");
}

function clearHistory() {
  localStorage.removeItem("artilotHistory");
  renderHistory();
}

/* 初期表示 */
renderHistory();

/* ==================================================
   8. 画像保存（画面そのままキャプチャ）
================================================== */
function saveImage() {
  html2canvas(document.querySelector(".cards")).then(canvas => {
    const link = document.createElement("a");
    link.download = "artilot_cards.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

/* ==================================================
   9. シェア（画面キャプチャを送信）
================================================== */
function shareImage() {
  html2canvas(document.querySelector(".cards")).then(canvas => {
    canvas.toBlob(async blob => {
      const file = new File([blob], "artilot_cards.png", { type: "image/png" });
      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
            title: "ARTILOT",
            text: "今日のインスピレーションカード！",
          });
        } catch (e) {}
      } else {
        alert("シェア機能がこの端末で対応していません");
      }
    });
  });
}
