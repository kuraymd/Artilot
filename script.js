const resultArea = document.getElementById("resultArea");
const drawBtn = document.getElementById("drawBtn");
const langBtn = document.getElementById("langBtn");
const animBtn = document.getElementById("animBtn");

let lang = "JP";
let animOn = true;

/* データ */
const data = {
  Race: [["Human", "人"], ["Elf", "エルフ"]],
  Gender: [["?", "不明"], ["Neutral", "中性"]],
  Personality: [["Energetic", "元気"], ["Quiet", "静か"]],
  Hair: [["Short", "ショート"], ["Long", "ロング"]],
  Outfit: [["Maid", "メイド"], ["Armor", "鎧"]],
  Motif: [["Moon", "月"], ["Sun", "太陽"]],
  Mood: [["Retro", "レトロ"], ["Fantasy", "ファンタジー"]],
  Theme: [["Nature", "自然"], ["Tech", "テック"]],
  Composition: [["Full Body", "全身"], ["Bust Up", "バストアップ"]],
  Main: [["Main Color", "メインカラー"]],
  Sub1: [["Sub Color 1", "サブカラー1"]],
  Sub2: [["Sub Color 2", "サブカラー2"]],
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* カード生成 */
function createCard(textPair) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    ${lang === "JP" ? textPair[1] : textPair[0]}
    <span>${lang === "JP" ? textPair[0] : textPair[1]}</span>
  `;
  return card;
}

/* シャッフル演出 */
function shuffleAnimation(cards, finalData) {
  cards.forEach(card => card.classList.add("shuffle"));

  let count = 0;
  const interval = setInterval(() => {
    cards.forEach(card => {
      const r = pick([["???", "???"], ["???", "???"]]);
      card.innerHTML = `${r[0]}<span>${r[1]}</span>`;
    });
    count++;
    if (count > 8) {
      clearInterval(interval);
      cards.forEach((card, i) => {
        card.classList.remove("shuffle");
        card.innerHTML = `
          ${lang === "JP" ? finalData[i][1] : finalData[i][0]}
          <span>${lang === "JP" ? finalData[i][0] : finalData[i][1]}</span>
        `;
      });
    }
  }, 120);
}

/* DRAW */
drawBtn.onclick = () => {
  resultArea.innerHTML = "";
  const finalData = [];
  const cards = [];

  Object.keys(data).forEach(key => {
    const v = pick(data[key]);
    finalData.push(v);

    const card = createCard(["...", "..."]);
    cards.push(card);
    resultArea.appendChild(card);
  });

  if (animOn) {
    shuffleAnimation(cards, finalData);
  } else {
    cards.forEach((card, i) => {
      card.innerHTML = `
        ${lang === "JP" ? finalData[i][1] : finalData[i][0]}
        <span>${lang === "JP" ? finalData[i][0] : finalData[i][1]}</span>
      `;
    });
  }
};

/* LANGUAGE TOGGLE */
langBtn.onclick = () => {
  lang = lang === "JP" ? "EN" : "JP";
  langBtn.textContent = lang;
};

/* ANIMATION TOGGLE */
animBtn.onclick = () => {
  animOn = !animOn;
  animBtn.textContent = animOn ? "ANIM ON" : "ANIM OFF";
};
