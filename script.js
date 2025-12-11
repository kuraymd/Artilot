/* ==================================================
   ARTI LOT — script.js (2段レイアウト)
   - 日本語+英語併記ラベル
   - カラーはチップ表示のみ
   - 履歴20件
   - html2canvas を使って画面をそのまま保存/共有
================================================== */

const STORAGE_KEY = "artilot_history_v_final";

/* ---------- Data (JP + EN shown as values are single-language strings) ---------- */
const JP = {
  race: ["ヒューマン / Human","エルフ / Elf","獣人 / Beastkin","鬼 / Oni","吸血鬼 / Vampire","ドラゴン族 / Dragonfolk","ロボット / Robot","スライム / Slime","妖精 / Fairy"],
  gender: ["男性 / Male","女性 / Female","中性 / Neutral","不明 / Unknown"],
  personality: ["優しい / Kind","クール / Cool","元気 / Energetic","内向的 / Shy","大胆 / Bold","慎重 / Cautious","気まぐれ / Whimsical"],
  hair: ["ロング / Long","ショート / Short","ボブ / Bob","ポニーテール / Ponytail","ツインテール / Twin-tail","パッツン / Bangs","巻き髪 / Curly"],
  outfit: ["セーラー服 / Sailor","和服 / Kimono","メイド服 / Maid","鎧 / Armor","スーツ / Suit","パーカー / Parka","ローブ / Robe"],
  motif: ["魚 / Fish","太陽 / Sun","月 / Moon","ハート / Heart","蝶 / Butterfly","炎 / Fire","氷 / Ice","花 / Flower"],
  mood: ["ホラー / Horror","ファンタジー / Fantasy","レトロ / Retro","サイバー / Cyber","可愛い / Cute","シリアス / Serious"]
};

/* ---------- Palette util ---------- */
function randColor() {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h} 70% 55%)`.replace(/ /g, ", "); // produce 'hsl(h, 70%, 55%)' but safari compatibility will be okay
}
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* ---------- Elements ---------- */
const btnDraw = document.getElementById("drawBtn");
const btnSave = document.getElementById("saveImgBtn");
const btnShare = document.getElementById("shareBtn");
const btnClear = document.getElementById("clearHistoryBtn");

const c1_1 = document.getElementById("c1-1");
const c1_2 = document.getElementById("c1-2");
const c1_3 = document.getElementById("c1-3");

const c2_1 = document.getElementById("c2-1");
const c2_2 = document.getElementById("c2-2");
const c2_3 = document.getElementById("c2-3");

const c3_1 = document.getElementById("c3-1");
const c3_2 = document.getElementById("c3-2");
const c3_3 = document.getElementById("c3-3");

const mainPalette = document.getElementById("mainPalette");
const subPalette = document.getElementById("subPalette");

const historyList = document.getElementById("historyList");

/* ---------- Draw action ---------- */
btnDraw.addEventListener("click", () => {
  drawCards();
});

/* ---------- Draw implementation ---------- */
function drawCards(){
  // Card1
  c1_1.textContent = pick(JP.race);
  c1_2.textContent = pick(JP.gender);
  c1_3.textContent = pick(JP.personality);

  // Card2
  c2_1.textContent = pick(JP.hair);
  c2_2.textContent = pick(JP.outfit);
  c2_3.textContent = pick(JP.motif);

  // Card3
  c3_1.textContent = pick(JP.mood);

  // Palettes (main:1 chip visually, but generate 3 variations and show first as main)
  const main = generateDistinctColors(1);
  const sub = generateDistinctColors(3);

  renderPalette(mainPalette, main);
  renderPalette(subPalette, sub);

  // set hidden text values (we keep no color codes visible)
  c3_2.textContent = ""; // no codes shown
  c3_3.textContent = "";

  pushHistory(); // save snapshot
}

/* ---------- Palette helpers ---------- */
function generateDistinctColors(n){
  const out = [];
  const seen = new Set();
  let attempts = 0;
  while(out.length < n && attempts < 50){
    const col = randColor();
    if(!seen.has(col)){ out.push(col); seen.add(col); }
    attempts++;
  }
  if(out.length < n){
    for(let i=out.length;i<n;i++) out.push(randColor());
  }
  return out;
}

function renderPalette(container, colors){
  container.innerHTML = "";
  colors.forEach(c=>{
    const el = document.createElement("div");
    el.className = "palette-swatch";
    el.style.background = c;
    container.appendChild(el);
  });
}

/* ---------- History (save HTML snapshot) ---------- */
function pushHistory(){
  try{
    const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const snapshot = document.getElementById("cards").innerHTML;
    arr.unshift(snapshot);
    if(arr.length > 20) arr.length = 20;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    renderHistory();
  }catch(e){
    console.error(e);
  }
}

function renderHistory(){
  const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  historyList.innerHTML = "";
  if(arr.length === 0){
    historyList.innerHTML = `<div class="history-item">${(document.getElementById("noteText")?.textContent) || "No history"}</div>`;
    return;
  }
  arr.forEach(html => {
    const wrapper = document.createElement("div");
    wrapper.className = "history-item";
    wrapper.innerHTML = html;
    historyList.appendChild(wrapper);
  });
}

btnClear.addEventListener("click", ()=>{
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
});

/* ---------- Save image (html2canvas) ---------- */
btnSave.addEventListener("click", async () => {
  const target = document.getElementById("cards");
  try{
    const canvas = await html2canvas(target, { backgroundColor:"#ffffff", scale:2 });
    // add footer overlay
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.font = "14px sans-serif";
    const text = "© 2025 Artilot";
    ctx.fillText(text, canvas.width - (ctx.measureText(text).width + 20), canvas.height - 20);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `artilot_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }catch(e){
    console.error(e);
    alert("画像の生成に失敗しました");
  }
});

/* ---------- Share (try native share with file) ---------- */
btnShare.addEventListener("click", async () => {
  const target = document.getElementById("cards");
  try{
    const canvas = await html2canvas(target, { backgroundColor:"#ffffff", scale:2 });
    const blob = await new Promise(res => canvas.toBlob(res, "image/png"));
    const file = new File([blob], `artilot_${Date.now()}.png`, { type: "image/png" });
    if(navigator.canShare && navigator.canShare({ files: [file] })){
      await navigator.share({ files: [file], title: "ARTILOT", text: "今日のインスピレーションカード" });
      return;
    }
    // fallback: download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = file.name; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }catch(e){
    console.error(e);
    alert("共有に失敗しました");
  }
});

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  renderHistory();
});
