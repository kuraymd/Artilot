/* ============================================================
   ARTILOT — Crystal layout (12 crystals)
   - 9 info crystals + 3 color crystals
   - gradients for orbs, gold gradient for pedestals
   - history (max 20), restore, save image, share (text with color codes)
============================================================ */

/* ---------- DOM ---------- */
const drawBtn = document.getElementById("drawBtn");
const saveImgBtn = document.getElementById("saveImgBtn");
const shareBtn = document.getElementById("shareBtn");
const mainPaletteEl = document.getElementById("mainPalette");
const subPaletteEl = document.getElementById("subPalette");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

/* ---------- Data lists (pairs JP/EN) ---------- */
const raceList = [["ヒューマン","Human"],["エルフ","Elf"],["鬼","Ogre"],["ドラゴン族","Dragon"],["獣人","Beastfolk"],["天使","Angel"],["悪魔","Demon"]];
const genderList = [["男性","Male"],["女性","Female"],["中性","Neutral"],["不明","Unknown"]];
const personalityList = [["無表情","Expressionless"],["元気","Energetic"],["静か","Quiet"],["強気","Confident"],["臆病","Timid"],["不敵","Fearless"],["温厚","Calm"]];
const hairList = [["ロング","Long"],["ショート","Short"],["ポニーテール","Ponytail"],["ツインテール","Twintail"],["ぱっつん","Straight Bangs"],["ウルフカット","Wolf Cut"]];
const outfitList = [["メイド服","Maid"],["和服","Kimono"],["鎧","Armor"],["セーラー服","Sailor"],["パーカー","Parka"]];
const motifList = [["ハート","Heart"],["魚","Fish"],["太陽","Sun"],["月","Moon"],["翼","Wings"],["炎","Flame"]];
const moodList = [["ホラー","Horror"],["ファンタジー","Fantasy"],["レトロ","Retro"],["サイバーパンク","Cyberpunk"],["可愛い","Cute"]];
const themeList = [["海","Sea"],["未来","Future"],["自然","Nature"],["スチームパンク","Steampunk"],["魔法","Magic"]];
const compositionList = [["バストアップ","Bust-up"],["全身","Fullbody"],["構図：対角線","Diagonal"],["上から俯瞰","Top-down"],["シンメトリック","Symmetric"]];

/* ---------- Storage ---------- */
const STORAGE_KEY = "artilot_crystal_history_v2";

/* ---------- helpers ---------- */
const rand = arr => arr[Math.floor(Math.random()*arr.length)];
const hex = () => {
  const h = Math.floor(Math.random()*0xffffff).toString(16).padStart(6,"0");
  return `#${h}`;
};
// mix color toward white to lighten for non-color crystals
function mixHex(a,b,ratio=0.5){
  const ar = parseInt(a.slice(1,3),16), ag = parseInt(a.slice(3,5),16), ab = parseInt(a.slice(5,7),16);
  const br = parseInt(b.slice(1,3),16), bg = parseInt(b.slice(3,5),16), bb = parseInt(b.slice(5,7),16);
  const rr = Math.round(ar*(1-ratio)+br*ratio).toString(16).padStart(2,"0");
  const rg = Math.round(ag*(1-ratio)+bg*ratio).toString(16).padStart(2,"0");
  const rb = Math.round(ab*(1-ratio)+bb*ratio).toString(16).padStart(2,"0");
  return `#${rr}${rg}${rb}`;
}

/* ---------- map crystal index to data key ---------- */
const keys = [
  {id:1, key:"race", list: raceList},
  {id:2, key:"gender", list: genderList},
  {id:3, key:"personality", list: personalityList},
  {id:4, key:"hair", list: hairList},
  {id:5, key:"outfit", list: outfitList},
  {id:6, key:"motif", list: motifList},
  {id:7, key:"mood", list: moodList},
  {id:8, key:"theme", list: themeList},
  {id:9, key:"composition", list: compositionList},
  // 10..12 are colors
  {id:10, key:"mainColor"},
  {id:11, key:"sub1"},
  {id:12, key:"sub2"}
];

/* ---------- draw cards ---------- */
drawBtn.addEventListener("click", () => {
  // pick values
  const data = {};
  data.race = rand(raceList);
  data.gender = rand(genderList);
  data.personality = rand(personalityList);
  data.hair = rand(hairList);
  data.outfit = rand(outfitList);
  data.motif = rand(motifList);
  data.mood = rand(moodList);
  data.theme = rand(themeList);
  data.composition = rand(compositionList);

  // color picks: main + 2 subs (hex)
  data.mainColor = hex();
  data.sub1 = hex();
  data.sub2 = hex();

  // render crystals
  for (let k of keys){
    const el = document.getElementById(`crystal-${k.id}`);
    const orb = el.querySelector(".orb");
    const pedestal = el.querySelector(".pedestal");
    const label = el.querySelector(".p-label");

    if (k.id <= 9){
      // non-color crystals: use gradient from lighter main to slightly darker main
      const top = mixHex(data.mainColor, "#ffffff", 0.25); // lighter
      const bottom = mixHex(data.mainColor, "#000000", 0.15); // darker
      orb.style.background = `linear-gradient(140deg, ${top}, ${bottom})`;
      pedestal.style.background = "linear-gradient(180deg,#d6a93a,#8a6610)";
      // set textual value inside orb as small overlay
      orb.innerHTML = `<div class="orb-text"><div class="orb-title">${k.key === "composition" ? data[k.key][0] : data[k.key][0]}</div><div class="orb-sub">${k.key === "composition" ? data[k.key][1] : data[k.key][1]}</div></div>`;
      // pedestal label already static in HTML; keep it
    } else {
      // color crystals: 10 main, 11 sub1, 12 sub2
      let c = (k.id === 10) ? data.mainColor : (k.id === 11 ? data.sub1 : data.sub2);
      // create 2-stop gradient: slightly lighter -> color
      const top = mixHex(c, "#ffffff", 0.22);
      const bottom = c;
      orb.style.background = `linear-gradient(135deg, ${top}, ${bottom})`;
      pedestal.style.background = "linear-gradient(180deg,#c99b2f,#895f07)";
      // show hex code small in orb-text
      orb.innerHTML = `<div class="orb-text"><div class="orb-title">${k.id===10?"MAIN":k.id===11?"SUB1":"SUB2"}</div><div class="orb-sub">${c}</div></div>`;
    }
  }

  // render palette blocks
  renderPalette(mainPaletteEl, [data.mainColor]);
  renderPalette(subPaletteEl, [data.sub1, data.sub2]);

  // save to history
  pushHistory(data);
});

/* ---------- palette renderer ---------- */
function renderPalette(container, colors){
  container.innerHTML = "";
  colors.forEach(c=>{
    const box = document.createElement("div");
    box.className = "swatch";
    box.style.background = c;
    container.appendChild(box);
  });
}

/* ---------- history ---------- */
let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
function pushHistory(obj){
  history.unshift(obj);
  if (history.length > 20) history.length = 20;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  renderHistory();
}

function renderHistory(){
  historyList.innerHTML = "";
  if (!history.length){
    historyList.innerHTML = `<div class="history-item">まだ履歴はありません</div>`;
    return;
  }
  history.forEach((h, idx)=>{
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <strong>#${idx+1}</strong><br>
      種族: ${h.race[0]} / ${h.race[1]}<br>
      性別: ${h.gender[0]} / ${h.gender[1]}<br>
      性格: ${h.personality[0]} / ${h.personality[1]}<br>
      髪型: ${h.hair[0]} / ${h.hair[1]}<br>
      服: ${h.outfit[0]} / ${h.outfit[1]}<br>
      モチーフ: ${h.motif[0]} / ${h.motif[1]}<br>
      雰囲気: ${h.mood[0]} / ${h.mood[1]}<br>
      テーマ: ${h.theme[0]} / ${h.theme[1]}<br>
      構図: ${h.composition[0]} / ${h.composition[1]}<br>
      メインカラー: ${h.mainColor}<br>
      サブカラー: ${h.sub1} / ${h.sub2}<br>
      <button class="restoreBtn" data-i="${idx}">この結果を復元</button>
    `;
    historyList.appendChild(div);
  });

  // attach restore handlers
  document.querySelectorAll(".restoreBtn").forEach(b=>{
    b.addEventListener("click", (e)=>{
      const i = Number(e.currentTarget.dataset.i);
      restoreHistory(i);
    });
  });
}
renderHistory();

/* ---------- restore ---------- */
function restoreHistory(i){
  const h = history[i];
  if (!h) return alert("履歴が見つかりません");
  // apply same rendering logic as draw: fill each crystal
  for (let k of keys){
    const el = document.getElementById(`crystal-${k.id}`);
    const orb = el.querySelector(".orb");
    const pedestal = el.querySelector(".pedestal");
    if (k.id <= 9){
      const top = mixHex(h.mainColor, "#ffffff", 0.25);
      const bottom = mixHex(h.mainColor, "#000000", 0.15);
      orb.style.background = `linear-gradient(140deg, ${top}, ${bottom})`;
      orb.innerHTML = `<div class="orb-text"><div class="orb-title">${h[k.key][0]}</div><div class="orb-sub">${h[k.key][1]}</div></div>`;
      pedestal.style.background = "linear-gradient(180deg,#d6a93a,#8a6610)";
    } else {
      const c = (k.id===10? h.mainColor : (k.id===11? h.sub1 : h.sub2));
      const top = mixHex(c, "#ffffff", 0.22);
      const bottom = c;
      orb.style.background = `linear-gradient(135deg, ${top}, ${bottom})`;
      orb.innerHTML = `<div class="orb-text"><div class="orb-title">${k.id===10?"MAIN":k.id===11?"SUB1":"SUB2"}</div><div class="orb-sub">${c}</div></div>`;
      pedestal.style.background = "linear-gradient(180deg,#c99b2f,#895f07)";
    }
  }
  // palette blocks
  renderPalette(mainPaletteEl, [h.mainColor]);
  renderPalette(subPaletteEl, [h.sub1, h.sub2]);

  // push to top of history again (optional)
  history.unshift(h);
  if (history.length>20) history.length=20;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  renderHistory();
  alert("履歴を復元しました");
}

/* ---------- clear history ---------- */
clearHistoryBtn.addEventListener("click", ()=>{
  if (!confirm("履歴をすべて削除しますか？")) return;
  history = [];
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
});

/* ---------- save image ---------- */
saveImgBtn.addEventListener("click", async ()=>{
  try {
    const el = document.querySelector(".wrap");
    const canvas = await html2canvas(el, {backgroundColor: "#0f2730", scale: 2});
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `artilot_${Date.now()}.png`;
    link.click();
  } catch (e) {
    console.error(e);
    alert("画像の保存に失敗しました");
  }
});

/* ---------- share text (no image) ---------- */
shareBtn.addEventListener("click", async ()=>{
  if (!history.length) return alert("共有する結果がありません");
  const h = history[0];
  const subText = `${h.sub1} / ${h.sub2}`;
  const shareText = `インスピレーションカードの結果
——————————————
種族: ${h.race[0]} / ${h.race[1]}
性別: ${h.gender[0]} / ${h.gender[1]}
性格: ${h.personality[0]} / ${h.personality[1]}

髪型: ${h.hair[0]} / ${h.hair[1]}
服: ${h.outfit[0]} / ${h.outfit[1]}
モチーフ: ${h.motif[0]} / ${h.motif[1]}

雰囲気: ${h.mood[0]} / ${h.mood[1]}
テーマ: ${h.theme[0]} / ${h.theme[1]}
構図: ${h.composition[0]} / ${h.composition[1]}

メインカラー:
${h.mainColor}

サブカラー:
${subText}

——————————————
#ARTILOT
#今日のお題
#InspirationCards

あなたもやってみてね！
ARTILOT → https://kuraymd.github.io/Artilot/
`;
  if (navigator.share) {
    try {
      await navigator.share({title:"ARTILOT", text:shareText});
    } catch(e){}
  } else {
    await navigator.clipboard.writeText(shareText);
    alert("共有非対応の端末です。テキストをコピーしました。");
  }
});
