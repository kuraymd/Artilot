const $ = id => document.getElementById(id);

/* ===== データ ===== */
const data = {
  race: ["ヒューマン / Human", "エルフ / Elf", "獣人 / Beastfolk", "アンドロイド / Android"],
  gender: ["男性 / Male", "女性 / Female", "中性 / Androgynous"],
  personality: [
    "無表情 / Expressionless",
    "静か / Quiet",
    "冷静 / Calm",
    "情熱的 / Passionate"
  ],
  hair: ["ウルフカット / Wolf Cut", "ロング / Long", "ショート / Short"],
  outfit: ["メイド服 / Maid", "スーツ / Suit", "カジュアル / Casual"],
  motif: ["ハート / Heart", "月 / Moon", "鎖 / Chain"],
  mood: ["ホラー / Horror", "ファンタジー / Fantasy", "ダーク / Dark"],
  theme: ["記憶 / Memory", "夢 / Dream", "孤独 / Solitude"],
  composition: ["バストアップ / Bust", "全身 / Full Body", "俯瞰 / Bird’s-eye"]
};

let currentResult = null;

/* ===== ユーティリティ ===== */
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

const randomColors = () =>
  Array.from({ length: 3 }, () =>
    "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
  );

/* ===== カード生成 ===== */
function drawCards() {
  currentResult = {
    race: rand(data.race),
    gender: rand(data.gender),
    personality: rand(data.personality),
    hair: rand(data.hair),
    outfit: rand(data.outfit),
    motif: rand(data.motif),
    mood: rand(data.mood),
    theme: rand(data.theme),
    composition: rand(data.composition),
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

/* ===== シェア ===== */
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

/* ===== 履歴 ===== */
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

/* ===== モーダル ===== */
const howtoBtn = $("howtoBtn");
const historyHelpBtn = $("historyHelpBtn");
const howtoModal = $("howtoModal");
const historyModal = $("historyModal");

howtoBtn?.addEventListener("click", () => howtoModal.classList.add("show"));
historyHelpBtn?.addEventListener("click", () => historyModal.classList.add("show"));

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

/* ===== About ARTILOT modal ===== */
const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");

if (aboutBtn && aboutModal) {
  aboutBtn.onclick = () => aboutModal.classList.add("show");
}

/* ===== 初期化 ===== */
$("drawBtn").onclick = drawCards;
$("shareBtn").onclick = () => shareResult();
renderHistory();

/* ===== リクエスト ===== */
const requestBtn = document.getElementById("requestSend");

if (requestBtn) {
  requestBtn.onclick = () => {
    const text = document.getElementById("requestInput").value.trim();
    if (!text) return alert("内容を入力してください");

    const url =
  "https://script.google.com/macros/s/AKfycbw8ID0l6NsJTesuwNGgxojQSYN8E4z_kjN-MItX199J7nKDrED6Ka7MBJ55QEuhRzcvlQ/exec" +
  "?type=requests" +
  "&request=" + encodeURIComponent(text) +
  "&ua=" + encodeURIComponent(navigator.userAgent);

fetch(url, { mode: "no-cors" });

alert("リクエストを送信しました！");
document.getElementById("requestInput").value = "";

  };
}


