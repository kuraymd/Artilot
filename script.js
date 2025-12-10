/* ==================================================
   ARTLILOT — Design Prompt Cards
   script.js（フルコード）
================================================== */

/* ---------------------------------------------
   1. 日本語 / 英語データ
--------------------------------------------- */

// ★ 日本語
const dataJP = {
  card1: {
    title: "キャラクター",
    items: {
      race: ["ヒューマン", "エルフ", "鬼", "ロボット", "獣人", "ドラゴン族", "吸血鬼", "天使", "悪魔"],
      gender: ["男性", "女性", "中性", "不明"],
      age: ["若い", "子ども", "大人", "老人", "不明"]
    }
  },

  card2: {
    title: "デザイン",
    items: {
      hair: ["ロング", "ショート", "ポニーテール", "ツインテール", "ぱっつん", "ボブ", "三つ編み", "ウェーブ"],
      clothes: ["セーラー服", "和服", "メイド服", "鎧", "学生服", "フォーマル", "ドレス", "パーカー"],
      motif: ["魚", "ハート", "太陽", "月", "花", "骨", "星", "炎", "氷", "鳥"]
    }
  },

  card3: {
    title: "雰囲気",
    items: {
      mood: ["ホラー", "ファンタジー", "レトロ", "未来", "かわいい", "ダーク", "ミステリー", "SF"],
      color: ["赤", "青", "黒", "白", "緑", "紫", "金", "銀"]
    }
  },

  ui: {
    draw: "カードを引く",
    autoSave: "※履歴は最大20件まで保存され、古い順から消えます",
    history: "履歴",
    delete: "履歴をすべて削除",
    saveImg: "画像を保存",
    share: "シェア"
  }
};

// ★ 英語
const dataEN = {
  card1: {
    title: "Character",
    items: {
      race: ["Human", "Elf", "Oni", "Robot", "Beastfolk", "Dragonkin", "Vampire", "Angel", "Demon"],
      gender: ["Male", "Female", "Neutral", "Unknown"],
      age: ["Young", "Child", "Adult", "Senior", "Unknown"]
    }
  },

  card2: {
    title: "Design",
    items: {
      hair: ["Long", "Short", "Ponytail", "Twintails", "Straight bangs", "Bob", "Braids", "Wave"],
      clothes: ["Sailor outfit", "Kimono", "Maid outfit", "Armor", "Uniform", "Formal", "Dress", "Hoodie"],
      motif: ["Fish", "Heart", "Sun", "Moon", "Flower", "Bone", "Star", "Flame", "Ice", "Bird"]
    }
  },

  card3: {
    title: "Mood",
    items: {
      mood: ["Horror", "Fantasy", "Retro", "Future", "Cute", "Dark", "Mystery", "Sci-Fi"],
      color: ["Red", "Blue", "Black", "White", "Green", "Purple", "Gold", "Silver"]
    }
  },

  ui: {
    draw: "Draw Cards",
    autoSave: "※History keeps up to 20 results. Old data will be removed automatically.",
    history: "History",
    delete: "Clear History",
    saveImg: "Save Image",
    share: "Share"
  }
};

let lang = "JP";

/* ---------------------------------------------
   2. ランダム取得
--------------------------------------------- */
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------------------------------------------
   3. カードを引く
--------------------------------------------- */
document.getElementById("drawBtn").addEventListener("click", drawCards);

function drawCards() {
  const d = lang === "JP" ? dataJP : dataEN;

  // card1
  document.getElementById("card1-title").textContent = d.card1.title;
  document.getElementById("c1-1").textContent = d.card1.items.race[Math.floor(Math.random() * d.card1.items.race.length)];
  document.getElementById("c1-2").textContent = d.card1.items.gender[Math.floor(Math.random() * d.card1.items.gender.length)];
  document.getElementById("c1-3").textContent = d.card1.items.age[Math.floor(Math.random() * d.card1.items.age.length)];

  // card2
  document.getElementById("card2-title").textContent = d.card2.title;
  document.getElementById("c2-1").textContent = d.card2.items.hair[Math.floor(Math.random() * d.card2.items.hair.length)];
  document.getElementById("c2-2").textContent = d.card2.items.clothes[Math.floor(Math.random() * d.card2.items.clothes.length)];
  document.getElementById("c2-3").textContent = d.card2.items.motif[Math.floor(Math.random() * d.card2.items.motif.length)];

  // card3
  document.getElementById("card3-title").textContent = d.card3.title;
  document.getElementById("c3-1").textContent = d.card3.items.mood[Math.floor(Math.random() * d.card3.items.mood.length)];
  document.getElementById("c3-2").textContent = d.card3.items.color[Math.floor(Math.random() * d.card3.items.color.length)];

  drawPalette();

  saveToHistory();
}

/* ---------------------------------------------
   4. カラーパレット生成
--------------------------------------------- */
function drawPalette() {
  const row = document.getElementById("paletteRow");
  row.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const c = randomColor();
    const div = document.createElement("div");
    div.className = "palette-swatch";
    div.style.background = c;
    row.appendChild(div);
  }
}

function randomColor() {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h},70%,60%)`;
}

/* ---------------------------------------------
   5. 履歴
--------------------------------------------- */
function saveToHistory() {
  const list = JSON.parse(localStorage.getItem("artilotHistory") || "[]");

  const entry = {
    time: Date.now(),
    c11: c1_1 = document.getElementById("c1-1").textContent,
    c12: c1_2 = document.getElementById("c1-2").textContent,
    c13: c1_3 = document.getElementById("c1-3").textContent,
    c21: document.getElementById("c2-1").textContent,
    c22: document.getElementById("c2-2").textContent,
    c23: document.getElementById("c2-3").textContent,
    c31: document.getElementById("c3-1").textContent,
    c32: document.getElementById("c3-2").textContent
  };

  list.unshift(entry);

  // ★ 最大20件
  if (list.length > 20) list.pop();

  localStorage.setItem("artilotHistory", JSON.stringify(list));

  loadHistory();
}

function loadHistory() {
  const list = JSON.parse(localStorage.getItem("artilotHistory") || "[]");
  const box = document.getElementById("historyList");
  box.innerHTML = "";

  list.forEach(h => {
    const div = document.createElement("div");
    div.className = "historyItem";
    div.textContent =
      `${h.c11} / ${h.c12} / ${h.c13} | ${h.c21} / ${h.c22} / ${h.c23} | ${h.c31} / ${h.c32}`;
    box.appendChild(div);
  });
}

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("artilotHistory");
  loadHistory();
});
loadHistory();

/* ---------------------------------------------
   6. 言語切替
--------------------------------------------- */
document.getElementById("btnJP").addEventListener("click", () => switchLang("JP"));
document.getElementById("btnEN").addEventListener("click", () => switchLang("EN"));

function switchLang(l) {
  lang = l;

  const d = lang === "JP" ? dataJP : dataEN;

  document.getElementById("drawBtn").textContent = d.ui.draw;
  document.getElementById("noteText").textContent = d.ui.autoSave;
  document.getElementById("historyTitle").textContent = d.ui.history;
  document.getElementById("clearHistoryBtn").textContent = d.ui.delete;
  document.getElementById("saveImgBtn").textContent = d.ui.saveImg;
  document.getElementById("shareBtn").textContent = d.ui.share;

  // ボタンの選択中スタイル
  document.getElementById("btnJP").classList.toggle("active", l === "JP");
  document.getElementById("btnEN").classList.toggle("active", l === "EN");
}

/* ---------------------------------------------
   7. シェア画像（白背景・コンパクト版）
--------------------------------------------- */
document.getElementById("saveImgBtn").addEventListener("click", saveImage);

function saveImage() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 750;
  canvas.height = 300;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // カード情報
  const cardData = [
    {
      title: document.getElementById("card1-title").textContent,
      lines: [
        document.getElementById("c1-1").textContent,
        document.getElementById("c1-2").textContent,
        document.getElementById("c1-3").textContent
      ]
    },
    {
      title: document.getElementById("card2-title").textContent,
      lines: [
        document.getElementById("c2-1").textContent,
        document.getElementById("c2-2").textContent,
        document.getElementById("c2-3").textContent
      ]
    },
    {
      title: document.getElementById("card3-title").textContent,
      lines: [
        document.getElementById("c3-1").textContent,
        document.getElementById("c3-2").textContent
      ],
      palette: Array.from(
        document.querySelectorAll("#paletteRow .palette-swatch")
      ).map(s => s.style.background)
    }
  ];

  const cardWidth = 220;
  const cardHeight = 260;
  const posX = [10, 260, 510];

  ctx.lineWidth = 2;

  cardData.forEach((c, i) => {
    const x = posX[i];
    const y = 20;

    drawRoundedRect(ctx, x, y, cardWidth, cardHeight, 6);
    ctx.strokeStyle = "#000";
    ctx.stroke();

    ctx.fillStyle = "#000";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(c.title, x + 12, y + 34);

    ctx.font = "14px sans-serif";
    c.lines.forEach((t, idx) => {
      ctx.fillText(t, x + 12, y + 70 + idx * 24);
    });

    if (c.palette) {
      c.palette.forEach((col, j) => {
        ctx.fillStyle = col;
        ctx.fillRect(x + 12 + j * 30, y + 160, 26, 26);
        ctx.strokeRect(x + 12 + j * 30, y + 160, 26, 26);
      });
    }
  });

  ctx.fillStyle = "#000";
  ctx.font = "12px sans-serif";
  ctx.fillText("© 2025 Artilot", canvas.width - 140, canvas.height - 10);

  const link = document.createElement("a");
  link.download = "artilot_cards.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/* ---- 角丸 ---- */
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

/* ---------------------------------------------
   8. シェア機能（シンプル版）
--------------------------------------------- */
document.getElementById("shareBtn").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Artilot Cards",
        text: "今日のデザインお題カード！",
        url: location.href
      });
    } catch (e) {
      alert("シェアがキャンセルされました");
    }
  } else {
    alert("このブラウザではシェアに対応していません");
  }
});
