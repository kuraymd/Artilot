/* -------- データ（全部入り） -------- */
const basicList = [
"ヒューマン","エルフ","ダークエルフ","ドワーフ","竜人","半獣人","ケモ耳種族",
"ロボット","サイボーグ","霊体","エンジェル","デーモン","スライム族","植物系","魚人","吸血鬼","妖精","巨人族",
"女性","男性","中性的","性別不明",
"少年","青年","大人","老人",
"小柄","標準","高身長","マッチョ","痩せ型","ふわふわ体型",
"長耳","尻尾あり"
];

const styleList = [
"ロングヘア","ショートヘア","ツインテール","三つ編み","外ハネ","ポニーテール","ボブ",
"アシメ","ストレート","カール","ウルフカット","オールバック","センター分け","ぱっつん",
"ローブ","鎧","学生服","スーツ","和服","パーカー","ドレス","セーラー服",
"ストリート系","メイド服","ワンピース","ミリタリー","サイバー服",
"羽モチーフ","花モチーフ","鎖モチーフ","星モチーフ","月モチーフ","獣モチーフ",
"ハートモチーフ","アイモチーフ","水属性","火属性","雷属性","機械パーツ","魔法陣"
];

const moodList = [
"ダーク","かわいい","シック","クール","ファンタジー","サイバー","パステル","レトロ",
"ダウナー","おしゃれ","神秘的","荒廃","ナチュラル","エレガント","和風","ゴシック",
"赤","黒","白","金","銀","黄","青","緑","ピンク","紫","ベージュ","ミント","ネイビー",
"黒×金","赤×黒","青×白","紫×水色","ミント×ピンク","茶×ベージュ","金×緑",
"くすみパステル3色","ハロウィン配色"
];

/* -------- 要素参照 -------- */
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const drawBtn = document.getElementById("drawBtn");
const saveImgBtn = document.getElementById("saveImgBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const historyList = document.getElementById("historyList");

const MAX_HISTORY = 20;
const STORAGE_KEY = "artilot_history_v1";

/* -------- ユーティリティ -------- */
function rand(list){ return list[Math.floor(Math.random()*list.length)]; }
function nowTimestamp(){ return new Date().toISOString(); }

/* -------- 履歴保存 / 読み込み -------- */
function loadHistory(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}
function saveHistory(arr){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }catch(e){}
}
function pushHistory(entry){
  const arr = loadHistory();
  arr.unshift(entry); // newest first
  if(arr.length>MAX_HISTORY) arr.length = MAX_HISTORY;
  saveHistory(arr);
  renderHistory();
}
function clearHistory(){
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
}

/* -------- 履歴 UI描画 -------- */
function renderHistory(){
  const arr = loadHistory();
  historyList.innerHTML = "";
  if(arr.length===0){
    historyList.innerHTML = '<div class="hSmall">履歴はまだありません</div>';
    return;
  }
  arr.forEach((it, idx)=>{
    const div = document.createElement("div");
    div.className = "historyItem";
    div.innerHTML = `
      <div><strong>${it.t1}</strong></div>
      <div class="hRow"><small class="hSmall">${it.t2}</small></div>
      <div class="hRow"><small class="hSmall">${it.t3}</small></div>
      <div style="display:flex;gap:8px;margin-top:8px;justify-content:flex-end">
        <button class="hBtn" data-idx="${idx}" data-action="restore">復元</button>
        <button class="hBtn" data-idx="${idx}" data-action="download">画像</button>
      </div>
    `;
    historyList.appendChild(div);
  });
}

/* -------- 描画アニメーション（軽い演出） -------- */
function animateCards(new1,new2,new3){
  // sequence: pop card1 -> pop card2 -> pop card3 -> settle
  const seq = [
    {el:card1, text:new1},
    {el:card2, text:new2},
    {el:card3, text:new3}
  ];
  // clear immediately
  seq.forEach(s => { s.el.classList.remove("animate-pop","animate-flip"); s.el.querySelector(".cardLabel").textContent = "…"; });

  seq.forEach((s,i) => {
    setTimeout(()=>{
      s.el.classList.add("animate-pop");
      s.el.querySelector(".cardLabel").textContent = s.text;
      setTimeout(()=> s.el.classList.add("animate-flip"), 160);
      setTimeout(()=> { s.el.classList.remove("animate-flip"); s.el.classList.remove("animate-pop"); }, 800);
    }, i*220);
  });
}

/* -------- 画像生成（Canvas） -------- */
function generatePNG(t1,t2,t3, filename = "artilot_result.png"){
  // canvas size: 1200x700 for good quality (will be downloaded)
  const w = 1200, h = 700;
  const padding = 40;
  const cardW = (w - padding*2 - 40) / 3;
  const cardH = h - padding*2 - 120;

  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d");

  // background white
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0,0,w,h);

  // title
  ctx.fillStyle = "#111";
  ctx.font = "28px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🔮 ARTILOT — デザインお題カード", w/2, 48);

  // draw 3 cards
  const xs = [padding, padding + cardW + 20, padding + (cardW+20)*2];
  const colors = ["#fff8b1","#b7ecff","#ffc6eb"];
  const textColor = "#222";

  for(let i=0;i<3;i++){
    const x = xs[i], y = 90;
    // card rect with border
    ctx.fillStyle = colors[i];
    roundRect(ctx, x, y, cardW, cardH, 18, true, false);
    ctx.lineWidth = 6; ctx.strokeStyle = "#e7d9b4";
    roundRect(ctx, x, y, cardW, cardH, 18, false, true);

    // inner text: use wrapping
    ctx.fillStyle = textColor;
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    wrapText(ctx, i===0?t1:(i===1?t2:t3), x + cardW/2, y + 60, cardW - 40, 30);
  }

  // footer with copyright
  ctx.fillStyle = "#333";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("© 2025 Artilot", w/2, h - 24);

  // download
  c.toBlob(function(blob){
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    a.remove(); URL.revokeObjectURL(url);
  }, "image/png");
}

/* helper: rounded rect */
function roundRect(ctx,x,y,w,h,r,fill,stroke){
  if (typeof r === 'undefined') r = 5;
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
  if(fill) ctx.fill();
  if(stroke) ctx.stroke();
}

/* helper: wrapText */
function wrapText(ctx, text, x, y, maxWidth, lineHeight){
  const words = text.split(/\s|\/|,|・|×/).filter(Boolean);
  let line = "";
  let curY = y;
  for(let n=0;n<words.length;n++){
    const testLine = line + (line? " " : "") + words[n];
    const metrics = ctx.measureText(testLine);
    if(metrics.width > maxWidth && line){
      ctx.fillText(line, x, curY);
      line = words[n];
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if(line) ctx.fillText(line, x, curY);
}

/* -------- ボタン動作 -------- */
drawBtn.addEventListener("click", ()=>{
  const t1 = rand(basicList);
  const t2 = rand(styleList);
  const t3 = rand(moodList);

  animateCards(t1,t2,t3);

  // push history entry
  const entry = { t1, t2, t3, at: nowTimestamp() };
  pushHistory(entry);
});

saveImgBtn.addEventListener("click", ()=>{
  // read current displayed text (if placeholder, fallback to rand)
  const t1 = card1.querySelector(".cardLabel").textContent || rand(basicList);
  const t2 = card2.querySelector(".cardLabel").textContent || rand(styleList);
  const t3 = card3.querySelector(".cardLabel").textContent || rand(moodList);
  generatePNG(t1,t2,t3);
});

/* history button actions (delegation) */
historyList.addEventListener("click", (e)=>{
  const btn = e.target.closest("button");
  if(!btn) return;
  const action = btn.dataset.action;
  const idx = Number(btn.dataset.idx);
  const arr = loadHistory();
  const item = arr[idx];
  if(!item) return;
  if(action === "restore"){
    animateCards(item.t1,item.t2,item.t3);
    // also push as new (restore counts as new)
    pushHistory({ t1:item.t1, t2:item.t2, t3:item.t3, at: nowTimestamp() });
  } else if(action === "download"){
    generatePNG(item.t1,item.t2,item.t3, `artilot_${idx+1}.png`);
  }
});

/* clear */
clearHistoryBtn.addEventListener("click", ()=>{
  if(confirm("履歴をすべて削除しますか？")) clearHistory();
});

/* init */
renderHistory();

/* expose for debugging (optional) */
window._artilot = { generatePNG, loadHistory, clearHistory };
