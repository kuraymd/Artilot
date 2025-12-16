const $ = id => document.getElementById(id);

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

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomColors() {
  return Array.from({ length: 3 }, () =>
    "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
  );
}

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
    card.textContent = r.race + " / " + r.mood;

    const btn = document.createElement("button");
    btn.textContent = "↗︎ シェア";
    btn.onclick = () => shareResult(r);

    card.appendChild(btn);
    wrap.appendChild(card);
  });
}

$("drawBtn").onclick = drawCards;
$("shareBtn").onclick = () => shareResult();

renderHistory();
