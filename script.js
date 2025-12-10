/* ==================================================
   ARTLILOT — Design Prompt Cards
   script.js（FULL）
================================================== */

/* ---------------------------------------------
   1. 日本語 / 英語データ
--------------------------------------------- */

const dataJP = {
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
    autoSave: "※履歴は最大20件まで保存され、古い順から消えます",
    history: "履歴",
    delete: "履歴をすべて削除",
    saveImg: "画像を保存",
    share: "シェア"
  }
};

const dataEN = {
  card1: {
    title: "Character",
    labels: ["Race", "Gender", "Age"],
    items: {
      race: ["Human", "Elf", "Oni", "Robot", "Beastfolk", "Dragonkin", "Vampire", "Angel", "Demon"],
      gender: ["Male", "Female", "Neutral", "Unknown"],
      age: ["Young", "Child", "Adult", "Senior", "Unknown"]
    }
  },

  card2: {
    title: "Design",
    labels: ["Hair", "Clothes", "Motif"],
    items: {
      hair: ["Long", "Short", "Ponytail", "Twintails", "Straight bangs", "Bob", "Braids", "Wave"],
      clothes: ["Sailor outfit", "Kimono", "Maid outfit", "Armor", "Uniform", "Formal", "Dress", "Hoodie"],
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
    autoSave: "※History keeps up to 20 results. Old items are removed.",
    history: "History",
    delete: "Clear History",
    saveImg: "Save Image",
    share: "Share"
  }
};

let lang = "JP";

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------------------------------------------
   2. カードを引く
--------------------------------------------- */
document.getElementById("drawBtn").addEventListener("click", drawCards);

function drawCards() {
  const d = lang === "JP" ? dataJP : dataEN;

  // card1
  document.getElementById("card1-title").textContent = d.card1.title;
  document.getElementById("c1-label-1").textContent = d.card1.labels[0];
  document.getElementById("c1-label-2").textContent = d.card1.labels[1];
  document.getElementById("c1-label-3").textContent = d.card1.labels[2];

  document.getElementById("c1-value-1").textContent = rand(d.card1.items.race);
  document.getElementById("c1-value-2").textContent = rand(d.card1.items.gender);
  document.getElementById("c1-value-3").textContent = rand(d.card1.items.age);

  // card2
  document.getElementById("card2-title").textContent = d.card2.title;
  document.getElementById("c2-label-1").textContent = d.card2.labels[0];
  document.getElementById("c2-label-2").textContent = d.card2.labels[1];
  document.getElementById("c2-label-3").textContent = d.card2.labels[2];

  document.getElementById("c2-value-1").textContent = rand(d.card2.items.hair);
  document.getElementById("c2-value-2").textContent = rand(d.card2.items.clothes);
  document.getElementById("c2-value-3").textContent = rand(d.card2.items.motif);

  // card3
  document.getElementById("card3-title").textContent = d.card3.title;
  document.getElementById("c3-label-1").textContent = d.card3.labels[0];
  document.getElementById("c3-label-2").textContent = d.card3.labels[1];

  document.getElementById("c3-value-1").textContent = rand(d.card3.items.mood);
  document.getElementById("c3-value-2").textContent = rand(d.card3.items.color);

  drawPalette();

  saveToHistory();
}

/* ---------------------------------------------
   3. パレット生成
--------------------------------------------- */
function drawPalette() {
  const row = document.getElementById("paletteRow");
  row.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const div = document.createElement("div");
    div.className = "palette-swatch";
    div.style.background = randomColor();
    row.appendChild(div);
  }
}

function randomColor() {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h},70%,60%)`;
}

/* ---------------------------------------------
   4. 履歴保存
--------------------------------------------- */
function saveToHistory() {
  const list = JSON.parse(localStorage.getItem("artilotHistory") || "[]");

  const entry = {
    c11: document.getElementById("c1-value-1").textContent,
    c12: document.getElementById("c1-value-2").textContent,
    c13: document.getElementById("c1-value-3").textContent,
    c21: document.getElementById("c2-value-1").textContent,
    c22: document.getElementById("c2-value-2").textContent,
    c23: document.getElementById("c2-value-3").textContent,
    c31: document.getElementById("c3-value-1").textContent,
    c32: document.getElementById("c3-value-2").textContent
  };

  list.unshift(entry);
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
    div.textContent = `${h.c11} / ${h.c12} / ${h.c13} | ${h.c21} / ${h.c22} / ${h.c23} | ${h.c31} / ${h.c32}`;
    box.appendChild(div);
  });
}
loadHistory();

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("artilotHistory");
  loadHistory();
});

/* ---------------------------------------------
   5. 言語切替
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

  document.getElementById("btnJP").classList.toggle("active", l === "JP");
  document.getElementById("btnEN").classList.toggle("active", l === "EN");
}

/* ---------------------------------------------
   6. 画像保存（1080 × 1080 正方形）
--------------------------------------------- */
document.getElementById("saveImgBtn").addEventListener("click", saveImage);

function saveImage() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 1080;
  canvas.height = 1080;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cardWidth = 330;
  const cardHeight = 900;
  const startX = [30, 375, 720];
  const y = 60;

  const cards = [
    {
      title: document.getElementById("card1-title").textContent,
      pairs: [
        [document.getElementById("c1-label-1").textContent, document.getElementById("c1-value-1").textContent],
        [document.getElementById("c1-label-2").textContent, document.getElementById("c1-value-2").textContent],
        [document.getElementById("c1-label-3").textContent, document.getElementById("c1-value-3").textContent]
      ]
    },
    {
      title: document.getElementById("card2-title").textContent,
      pairs: [
        [document.getElementById("c2-label-1").textContent, document.getElementById("c2-value-1").textContent],
        [document.getElementById("c2-label-2").textContent, document.getElementById("c2-value-2").textContent],
        [document.getElementById("c2-label-3").textContent, document.getElementById("c2-value-3").textContent]
      ]
    },
    {
      title: document.getElementById("card3-title").textContent,
      pairs: [
        [document.getElementById("c3-label-1").textContent, document.getElementById("c3-value-1").textContent],
        [document.getElementById("c3-label-2").textContent, document.getElementById("c3-value-2").textContent]
      ],
      palette: Array.from(document.querySelectorAll("#paletteRow .palette-swatch"))
        .map(el => el.style.background)
    }
  ];

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";

  cards.forEach((c, i) => {
    const x = startX[i];

    drawRoundedRect(ctx, x, y, cardWidth, cardHeight, 20);
    ctx.stroke();

    ctx.font = "bold 28px sans-serif";
    ctx.fillText(c.title, x + 20, y + 50);

    ctx.font = "20px sans-serif";
    let offsetY = 120;
    c.pairs.forEach(p => {
      ctx.fillText(p[0], x + 20, y + offsetY);
      ctx.fillText(p[1], x + 20, y + offsetY + 32);
      offsetY += 90;
    });

    if (c.palette) {
      let px = x + 20;
      c.palette.forEach(col => {
        ctx.fillStyle = col;
        ctx.fillRect(px, y + offsetY, 50, 50);
        ctx.strokeRect(px, y + offsetY, 50, 50);
        px += 70;
      });
    }
  });

  ctx.fillStyle = "#000";
  ctx.font = "22px sans-serif";
  ctx.fillText("© 2025 Artilot", 800, 1050);

  const link = document.createElement("a");
  link.download = "artilot_cards.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

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
   7. シェア機能
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
      console.log("share canceled");
    }
  } else {
    alert("このブラウザではシェアに対応していません");
  }
});
