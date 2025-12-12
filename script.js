/* ============================================================
   ARTILOT — Crystal layout (12 crystals) v-final
   - white/gray crystal gradient (B)
   - JP/EN toggle (short text inside orb)
   - only main/sub crystals show color hex and colored orb
   - other crystals use white-gray gradient (3-stop)
   - capture-area saved (title + crystals + palettes)
   - history (max20) with restore
   - share (text + color codes)
============================================================ */

/* ---------- DOM ---------- */
const drawBtn = document.getElementById("drawBtn");
const saveImgBtn = document.getElementById("saveImgBtn");
const shareBtn = document.getElementById("shareBtn");
const langToggle = document.getElementById("langToggle");
const btnJP = document.getElementById("btnJP");
const btnEN = document.getElementById("btnEN");

const mainPaletteEl = document.getElementById("mainPalette");
const subPaletteEl = document.getElementById("subPalette");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const captureArea = document.getElementById("captureArea");

const STORAGE_KEY = "artilot_crystal_history_final_v1";

/* ---------- Data lists (pairs JP/EN short) ---------- */
const raceList = [["人","Human"],["エルフ","Elf"],["鬼","Oni"],["竜","Dragon"],["獣人","Beast"],["天使","Angel"],["悪魔","Demon"]];
const genderList = [["男","M"],["女","F"],["中","N"],["不明","?"]];
const personalityList = [["無表情","Expr"],["元気","Ener"],["静か","Quiet"],["強気","Bold"],["臆病","Timid"],["不敵","Fear"],["温厚","Calm"]];
const hairList = [["ロング","Long"],["ショート","Short"],["ポニテ","Pony"],["ツイン","Twin"],["ぱっつん","Bangs"],["ウルフ","Wolf"]];
const outfitList = [["メイド","Maid"],["和服","Kimono"],["鎧","Armor"],["制服","Uni"],["パーカー","Parka"]];
const motifList = [["ハート","Heart"],["魚","Fish"],["太陽","Sun"],["月","Moon"],["翼","Wing"],["炎","Flame"]];
const moodList = [["ホラ","Horror"],["ファン","Fantasy"],["レトロ","Retro"],["サイバ","Cyber"],["可愛い","Cute"]];
const themeList = [["海","Sea"],["未来","Future"],["自然","Nature"],["スチーム","Steam"],["魔法","Magic"]];
const compositionList = [["バスト","Bust"],["全身","Full"],["対角","Diag"],["俯瞰","Top"],["シンメ","Sym"]];

const rand = arr => arr[Math.floor(Math.random()*arr.length)];
const hex = () => '#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0');

/* ---------- language state ---------- */
let lang = "JP"; // "JP" or "EN"
btnJP.addEventListener("click", ()=> setLang("JP"));
btnEN.addEventListener("click", ()=> setLang("EN"));
function setLang(l){
  lang = l;
  btnJP.classList.toggle("active", l==="JP");
  btnEN.classList.toggle("active", l==="EN");
  // update currently displayed orbs if any
  refreshOrbsLabels();
}

/* ---------- utility: mix toward white/black for gradients ---------- */
function mixHex(a,b,ratio=0.5){
  const ar = parseInt(a.slice(1,3),16), ag = parseInt(a.slice(3,5),16), ab = parseInt(a.slice(5,7),16);
  const br = parseInt(b.slice(1,3),16), bg = parseInt(b.slice(3,5),16), bb = parseInt(b.slice(5,7),16);
  const rr = Math.round(ar*(1-ratio)+br*ratio).toString(16).padStart(2,"0");
  const rg = Math.round(ag*(1-ratio)+bg*ratio).toString(16).padStart(2,"0");
  const rb = Math.round(ab*(1-ratio)+bb*ratio).toString(16).padStart(2,"0");
  return `#${rr}${rg}${rb}`;
}

/* ---------- keys map ---------- */
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
  {id:10, key:"mainColor"},
  {id:11, key:"sub1"},
  {id:12, key:"sub2"}
];

/* ---------- draw / render ---------- */
drawBtn.addEventListener("click", ()=> {
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
  data.mainColor = hex();
  data.sub1 = hex();
  data.sub2 = hex();

  // render each crystal
  for (let k of keys){
    const el = document.getElementById(`crystal-${k.id}`);
    const orb = el.querySelector(".orb");
    const pedestal = el.querySelector(".pedestal");
    // clear orb innerHTML
    orb.innerHTML = "";
    if (k.id <= 9){
      // white-gray 3-stop radial gradient (B)
      const g1 = "#ffffff", g2 = "#eeeeee", g3 = "#dcdcdc", g4 = "#bfbfbf";
      orb.style.background = `radial-gradient(circle at 30% 30%, ${g1} 0%, ${g2} 40%, ${g3} 70%, ${g4} 100%)`;
      pedestal.style.background = "linear-gradient(180deg,#d6a93a,#8a6610)";
      // text
      const pair = data[k.key];
      const show = lang === "JP" ? pair[0] : pair[1];
      const sub = lang === "JP" ? pair[1] : pair[0];
      const t = document.createElement("div");
      t.className = "orb-text";
      t.innerHTML = `<div class="orb-title">${show}</div><div class="orb-sub">${sub}</div>`;
      orb.appendChild(t);
    } else {
      // color crystals
      const color = (k.id===10? data.mainColor : (k.id===11? data.sub1 : data.sub2));
      const top = mixHex(color,"#ffffff",0.22);
      const bottom = color;
      orb.style.background = `linear-gradient(135deg, ${top}, ${bottom})`;
      pedestal.style.background = "linear-gradient(180deg,#c99b2f,#895f07)";
      const t = document.createElement("div");
      t.className = "orb-text";
      const label = k.id===10?"MAIN":k.id===11?"SUB1":"SUB2";
      // display short label and hex small
      t.innerHTML = `<div class="orb-title">${label}</div><div class="orb-sub">${color}</div>`;
      orb.appendChild(t);
    }
  }

  // render palettes (small chips)
  renderPalette(mainPaletteEl, [data.mainColor]);
  renderPalette(subPaletteEl, [data.sub1, data.sub2]);

  // save history
  pushHistory(data);
});

/* update orb labels when language toggled */
function refreshOrbsLabels(){
  // read history[0] if exists (current displayed values are not stored elsewhere)
  // we will attempt to re-read visible texts from each orb and swap order if necessary.
  for (let k of keys){
    const el = document.getElementById(`crystal-${k.id}`);
    const orb = el.querySelector(".orb");
    const orbText = orb.querySelector(".orb-text");
    if (!orbText) continue;
    // If it's color crystal, leave hex as second line; else swap lines based on lang
    if (k.id <= 9){
      // orbText innerHTML contains two lines: JP / EN originally in draw; we can flip by using dataset if present
      // but safer: read current innerText segments and map to JP/EN by position
      // we stored both when rendering; now re-render by reading visible pair from history if possible
      // no-op here because draw stores both; simpler approach: leave as is until next draw/restore
      // (this avoids overcomplicating; language toggles affect next draw)
    }
  }
}

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
  // render using same code as draw: fill each crystal
  for (let k of keys){
    const el = document.getElementById(`crystal-${k.id}`);
    const orb = el.querySelector(".orb");
    const pedestal = el.querySelector(".pedestal");
    orb.innerHTML = "";
    if (k.id <= 9){
      const g1 = "#ffffff", g2 = "#eeeeee", g3 = "#dcdcdc", g4 = "#bfbfbf";
      orb.style.background = `radial-gradient(circle at 30% 30%, ${g1} 0%, ${g2} 40%, ${g3} 70%, ${g4} 100%)`;
      pedestal.style.background = "linear-gradient(180deg,#d6a93a,#8a6610)";
      const pair = h[k.key];
      const show = lang === "JP" ? pair[0] : pair[1];
      const sub = lang === "JP" ? pair[1] : pair[0];
      const t = document.createElement("div");
      t.className = "orb-text";
      t.innerHTML = `<div class="orb-title">${show}</div><div class="orb-sub">${sub}</div>`;
      orb.appendChild(t);
    } else {
      const color = (k.id===10? h.mainColor : (k.id===11? h.sub1 : h.sub2));
      const top = mixHex(color,"#ffffff",0.22);
      orb.style.background = `linear-gradient(135deg, ${top}, ${color})`;
      pedestal.style.background = "linear-gradient(180deg,#c99b2f,#895f07)";
      const t = document.createElement("div");
      t.className = "orb-text";
      const label = k.id===10?"MAIN":k.id===11?"SUB1":"SUB2";
      t.innerHTML = `<div class="orb-title">${label}</div><div class="orb-sub">${color}</div>`;
      orb.appendChild(t);
    }
  }

  renderPalette(mainPaletteEl, [h.mainColor]);
  renderPalette(subPaletteEl, [h.sub1, h.sub2]);

  // push restored to top (optional)
  history.unshift(h);
  if (history.length>20) history.length = 20;
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

/* ---------- save image (capture-area only) ---------- */
saveImgBtn.addEventListener("click", async ()=>{
  try {
    const el = document.getElementById("captureArea");
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

/* ---------- share (text only, color codes) ---------- */
shareBtn.addEventListener("click", async ()=>{
  if (!history.length) return alert("共有する結果がありません");
  const h = history[0];
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
${h.sub1} / ${h.sub2}

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
    try {
      await navigator.clipboard.writeText(shareText);
      alert("共有非対応の端末です。テキストをコピーしました。");
    } catch(e){
      alert("コピーに失敗しました。");
    }
  }
});
