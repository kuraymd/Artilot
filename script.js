/* ===============================
   基本ユーティリティ
================================ */

const $ = id => document.getElementById(id);
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

const randomColors = () =>
  Array.from({ length: 3 }, () =>
    "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
  );

/* ===============================
   GAS 設定
================================ */

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbw8ID0l6NsJTesuwNGgxojQSYN8E4z_kjN-MItX199J7nKDrED6Ka7MBJ55QEuhRzcvlQ/exec";

/* ===============================
   グローバル状態
================================ */

let currentResult = null;
let gachaPool = {};

/* ===============================
   ガチャデータ取得
================================ */

let gachaPool = {};

fetch("https://script.google.com/macros/s/AKfycbw8ID0l6NsJTesuwNGgxojQSYN8E4z_kjN-MItX199J7nKDrED6Ka7MBJ55QEuhRzcvlQ/exec=gacha_data")
  .then(res => res.json())
  .then(data => {
    gachaPool = data;
  });


/* ===============================
   カード生成
================================ */

function drawCards() {
  if (!gachaPool["種族"]) {
    alert("ガチャデータを読み込み中です");
    return;
  }

  currentResult = {
    race: rand(gachaPool["種族"]),
    gender: rand(gachaPool["性別"]),
    personality: rand(gachaPool["性格"]),
    hair: rand(gachaPool["髪型"]),
    outfit: rand(gachaPool["服装"]),
    motif: rand(gachaPool["モチーフ"]),
    mood: rand(gachaPool["雰囲気"]),
    theme: rand(gachaPool["テーマ"]),
    composition: rand(gachaPool["構図"]),
    colors: randomColors()
  };

  for (const key in currentResult) {
    if ($(key)) $(key).textContent = currentResult[key];
  }

  const box = $("colorBox");
  box.innerHTML = "";
  currentResult.colors.forEach(c => {
    const d = document.createElement("div");
    d.className = "color-chip";
    d.style.background = c;
    box.appendChild(d);
  });

  saveHistory(currentResult);
}


/* ===============================
   シェア
================================ */

function shareResult(result = currentResult) {
  if (!result) return;

  const text = `#今日のARTILOT

インスピレーションカードの結果
${Object.entries(result)
    .filter(([k]) => k !== "colors")
    .map(([_, v]) => v)
    .join("\n")}
Colors: ${result.colors.join(", ")}

#ARTILOT
#今日のお題

あなたもやってみてね！
ARTILOT : https://kuraymd.github.io/Artilot/`;

  navigator.share
    ? navigator.share({ text })
    : navigator.clipboard.writeText(text).then(() => alert("コピーしました"));
}

/* ===============================
   履歴
================================ */

function saveHistory(result) {
  const list = JSON.parse(localStorage.getItem("artilotHistory") || "[]");
  list.unshift(result);
  localStorage.setItem("artilotHistory", JSON.stringify(list.slice(0, 10)));
  renderHistory();
}

function renderHistory() {
  const list = JSON.parse(localStorage.getItem("artilotHistory") || "[]");
  const wrap = $("historyList");
  wrap.innerHTML = "";

  list.forEach(r => {
    const card = document.createElement("div");
    card.className = "history-card";

    const grid = document.createElement("div");
    grid.className = "result-card";

    const fields = [
      ["種族 / Race", r.race],
      ["性別 / Gender", r.gender],
      ["性格 / Personality", r.personality],
      ["髪型 / Hair", r.hair],
      ["服装 / Outfit", r.outfit],
      ["モチーフ / Motif", r.motif],
      ["雰囲気 / Mood", r.mood],
      ["テーマ / Theme", r.theme],
      ["構図 / Composition", r.composition]
    ];

    fields.forEach(([label, value]) => {
      const item = document.createElement("div");
      item.className = "item";
      item.innerHTML = `${value}<span>${label}</span>`;
      grid.appendChild(item);
    });

    const colorItem = document.createElement("div");
    colorItem.className = "item color";
    colorItem.innerHTML = `<span>Color Palette</span>`;

    const colors = document.createElement("div");
    colors.className = "colors";

    r.colors.forEach(c => {
      const chip = document.createElement("div");
      chip.className = "color-chip";
      chip.style.background = c;
      colors.appendChild(chip);
    });

    colorItem.appendChild(colors);
    grid.appendChild(colorItem);

    card.appendChild(grid);

    const btn = document.createElement("button");
    btn.textContent = "↗︎ シェア";
    btn.onclick = () => shareResult(r);

    card.appendChild(btn);
    wrap.appendChild(card);
  });
}

/* ===============================
   モーダル
================================ */

$("howtoBtn")?.addEventListener("click", () => $("howtoModal")?.classList.add("show"));
$("historyHelpBtn")?.addEventListener("click", () => $("historyModal")?.classList.add("show"));

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal")?.classList.remove("show");
  });
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
  });
});

$("aboutBtn")?.addEventListener("click", () => $("aboutModal")?.classList.add("show"));

/* ===============================
   初期化
================================ */

$("drawBtn")?.addEventListener("click", drawCards);
$("shareBtn")?.addEventListener("click", () => shareResult());
renderHistory();

/* ===============================
   リクエスト送信
================================ */

$("requestSend")?.addEventListener("click", () => {
  const input = $("requestInput");
  const text = input.value.trim();
  if (!text) return alert("内容を入力してください");

  const url =
    `${GAS_URL}?type=requests` +
    `&request=${encodeURIComponent(text)}` +
    `&ua=${encodeURIComponent(navigator.userAgent)}`;

  fetch(url, { mode: "no-cors" });

  alert("リクエストを送信しました！");
  input.value = "";
});

/* ===============================
   お知らせ取得
================================ */

fetch("https://script.google.com/macros/s/AKfycbw8ID0l6NsJTesuwNGgxojQSYN8E4z_kjN-MItX199J7nKDrED6Ka7MBJ55QEuhRzcvlQ/exec=announcements")
  .then(res => res.json())
  .then(list => {
    const area = document.getElementById("announcements");
    area.innerHTML = "";

    list
      .filter(a => a.visible === true)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach(a => {
        const div = document.createElement("div");
        div.className = "announcement";
        div.innerHTML = `
          <time>${a.date}</time>
          <h4>${a.title}</h4>
          <p>${a.body}</p>
        `;
        area.appendChild(div);
      });
  });

