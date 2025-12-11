/* ==================================================
   1. データセット（JP & EN）
================================================== */
const dataJP = {
  race: ["ヒューマン", "エルフ", "獣人", "鬼", "吸血鬼", "ドラゴン族", "ロボット", "スライム", "妖精"],
  gender: ["男性", "女性", "中性", "不明"],
  personality: ["優しい", "クール", "元気", "内向的", "大胆", "慎重", "気まぐれ"],
  hair: ["ロング", "ショート", "ボブ", "ポニーテール", "ツインテール", "パッツン", "巻き髪"],
  outfit: ["セーラー服", "和服", "メイド服", "鎧", "スーツ", "パーカー", "ローブ"],
  motif: ["魚", "太陽", "月", "ハート", "蝶", "炎", "氷", "花"],
  mood: ["ホラー", "ファンタジー", "レトロ", "サイバー", "可愛い", "シリアス"],
};

const dataEN = {
  race: ["Human", "Elf", "Beastkin", "Ogre", "Vampire", "Dragonfolk", "Robot", "Slime", "Fairy"],
  gender: ["Male", "Female", "Neutral", "Unknown"],
  personality: ["Kind", "Cool", "Energetic", "Shy", "Bold", "Cautious", "Whimsical"],
  hair: ["Long", "Short", "Bob", "Ponytail", "Twin-tail", "Straight bangs", "Curly"],
  outfit: ["Sailor uniform", "Kimono", "Maid", "Armor", "Suit", "Parka", "Robe"],
  motif: ["Fish", "Sun", "Moon", "Heart", "Butterfly", "Fire", "Ice", "Flower"],
  mood: ["Horror", "Fantasy", "Retro", "Cyber", "Cute", "Serious"],
};


/* ==================================================
   2. カラーパレット生成
================================================== */
function randomColor() {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h}, 70%, 55%)`;
}

function generatePalette(n = 3) {
  return Array.from({ length: n }, randomColor);
}


/* ==================================================
   3. 言語管理
================================================== */
let currentLang = "JP";

document.getElementById("btnJP").addEventListener("click", () => setLang("JP"));
document.getElementById("btnEN").addEventListener("click", () => setLang("EN"));

function setLang(lang) {
  currentLang = lang;
  document.getElementById("btnJP").classList.toggle("active", lang === "JP");
  document.getElementById("btnEN").classList.toggle("active", lang === "EN");
}


/* ==================================================
   4. カード生成
================================================== */
document.getElementById("drawBtn").addEventListener("click", drawCards);

function drawCards() {
  const d = currentLang === "JP" ? dataJP : dataEN;

  /* --- Card 1 --- */
  setValue("c1-1", d.race);
  setValue("c1-2", d.gender);
  setValue("c1-3", d.personality);

  /* --- Card 2 --- */
  setValue("c2-1", d.hair);
  setValue("c2-2", d.outfit);
  setValue("c2-3", d.motif);

  /* --- Card 3 --- */
  setValue("c3-1", d.mood);

  const mainP = generatePalette(3);
  const subP = generatePalette(3);

  updatePalette("mainPalette", mainP);
  updatePalette("subPalette", subP);

  document.getElementById("c3-2").textContent = mainP.join(", ");
  document.getElementById("c3-3").textContent = subP.join(", ");

  saveToHistory();
}

function setValue(id, array) {
  document.getElementById(id).textContent =
    array[Math.floor(Math.random() * array.length)];
}

function updatePalette(id, colors) {
  const box = document.getElementById(id);
  box.innerHTML = "";
  colors.forEach(color => {
    const d = document.createElement("div");
    d.className = "palette-swatch";
    d.style.background = color;
    box.appendChild(d);
  });
}


/* ==================================================
   5. 履歴管理
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
  list.innerHTML = history.map(item => `<div class="history-item">${item}</div>`).join("");
}

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("artilotHistory");
  renderHistory();
});

renderHistory();


/* ==================================================
   6. 画像保存（2段レイアウトそのまま）
================================================== */
document.getElementById("saveImgBtn").addEventListener("click", saveImage);

function saveImage() {
  const target = document.getElementById("cards");

  html2canvas(target, { backgroundColor: "#ffffff", scale: 2 }).then(canvas => {
    const link = document.createElement("a");
    link.download = "artilot_cards.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}


/* ==================================================
   7. シェア（2段レイアウトそのまま）
================================================== */
document.getElementById("shareBtn").addEventListener("click", shareImage);

function shareImage() {
  const target = document.getElementById("cards");

  html2canvas(target, { backgroundColor: "#ffffff", scale: 2 }).then(canvas => {
    canvas.toBlob(async blob => {
      const file = new File([blob], "artilot_cards.png", { type: "image/png" });

      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
            title: "ARTILOT",
            text: "今日のインスピレーションカード",
          });
        } catch (e) {
          console.log("share canceled", e);
        }
      } else {
        alert("この端末はシェア機能に対応していません");
      }
    });
  });
}
