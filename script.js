/* ============================
 ARTILOT — 修正版 UI配置＋バグ修正
 ============================*/

/* ---------- Data (JP + EN, same as before but concise for demo) ---------- */
const JP = {
  species: ["ヒューマン","エルフ","ドワーフ","鬼","天使","悪魔","ロボット","猫耳","獣人","スライム族","植物系","魚人","吸血鬼","妖精","巨人族","霊体","機械族","サイボーグ","影の民","砂の民"],
  gender:  ["男性","女性","中性","不明","流動的"],
  age:     ["幼い","若い","大人","中年","高齢"],
  hair:    ["ロング","ショート","ボブ","ポニーテール","ツインテール","三つ編み","スキンヘッド","パッツン","ウェーブ","アップスタイル","アシンメトリー","姫カット","ウルフカット","ドレッド","ハーフアップ"],
  cloth:   ["セーラー服","和服","メイド服","ローブ","スーツ","鎧","ドレス","パーカー","ゴシック","ミリタリー","ワンピース","魔法使い","サイバースーツ","ジャケット","祭服"],
  motif:   ["ハート","星","太陽","魚","花","月","蝶","剣","炎","鍵","宝石","鎖","魔法陣","雷","目","羽","獣モチーフ","ドクロ","翼","植物文様"],
  mood:    ["ホラー","ファンタジー","可愛い","レトロ","SF","ダーク","神秘的","爽やか","サイバー","アンティーク","ゴシック","おしゃれ","ロマンチック","クール","淡色パステル","スチームパンク","エレガント","自然派","魔導風","影系"],
  colors:  ["#B00020","#1E40AF","#F2C94C","#2F855A","#7C3AED","#111827","#FFFFFF","#F2994A","#8B5CF6","#BCAAA4","#00B4D8","#3A7CA5","#F7A8B8","#2D6A4F","#6B7280","#FFD166","#8338EC","#FF6B6B","#4CC9F0","#E9C46A"]
};

const EN = {
  species: ["Human","Elf","Dwarf","Oni","Angel","Demon","Automaton","Cat-eared","Beastfolk","Slime","Plantkin","Fishfolk","Vampire","Fey","Giant","Wraith","Clockwork","Cyborg","Shadowfolk","Sandsoul"],
  gender:  ["Male","Female","Androgynous","Unknown","Fluid"],
  age:     ["Child","Young","Adult","Middle-aged","Elder"],
  hair:    ["Long","Short","Bob","Ponytail","Twin tails","Braids","Shaved","Bangs","Wavy","Updo","Asymmetric","Hime cut","Wolf cut","Dreadlocks","Half-up"],
  cloth:   ["Sailor","Kimono","Maid","Robe","Suit","Armor","Dress","Hoodie","Gothic","Military","One-piece","Mage","Cyber suit","Jacket","Festival wear"],
  motif:   ["Heart","Star","Sun","Fish","Flower","Moon","Butterfly","Sword","Flame","Key","Gem","Chain","Sigil","Lightning","Eye","Feather","Beast motif","Skull","Wings","Floral"],
  mood:    ["Horror","Fantasy","Cute","Retro","Sci-Fi","Dark","Mystic","Fresh","Cyber","Antique","Gothic","Chic","Romantic","Cool","Pastel","Steampunk","Elegant","Natural","Arcane","Shadow"],
  colors:  ["#B00020","#1E40AF","#F2C94C","#2F855A","#7C3AED","#111827","#FFFFFF","#F2994A","#8B5CF6","#BCAAA4","#00B4D8","#3A7CA5","#F7A8B8","#2D6A4F","#6B7280","#FFD166","#8338EC","#FF6B6B","#4CC9F0","#E9C46A"]
};

/* ---------- UI refs ---------- */
const el = {
  btnJP: document.getElementById("btnJP"),
  btnEN: document.getElementById("btnEN"),
  drawBtn: document.getElementById("drawBtn"),
  saveImgBtn: document.getElementById("saveImgBtn"),
  shareBtn: document.getElementById("shareBtn"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  card1Lines: document.getElementById("card1-lines"),
  card2Lines: document.getElementById("card2-lines"),
  card3Lines: document.getElementById("card3-lines"),
  card1Title: document.getElementById("card1-title"),
  card2Title: document.getElementById("card2-title"),
  card3Title: document.getElementById("card3-title"),
  paletteRow: document.getElementById("paletteRow"),
  cards: document.querySelectorAll(".card"),
  historyList: document.getElementById("historyList"),
  noteText: document.getElementById("noteText"),
  historyTitle: document.getElementById("historyTitle"),
  resultActions: document.getElementById("resultActions")
};

/* ---------- State & Storage ---------- */
const STORAGE_KEY = "artilot_v3_history";
const LANG_KEY = "artilot_v3_lang";
let LANG = localStorage.getItem(LANG_KEY) || "JP"; // "JP" or "EN"

/* ---------- Helpers ---------- */
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function pickN(arr,n){ const copy = [...arr]; const out=[]; for(let i=0;i<n;i++){ if(copy.length===0) break; const idx=Math.floor(Math.random()*copy.length); out.push(copy.splice(idx,1)[0]); } return out; }
function nowISO(){ return new Date().toISOString(); }

/* ---------- Language UI apply ---------- */
function applyLanguageUI(){
  if(LANG==="JP"){
    el.btnJP.classList.add("active"); el.btnEN.classList.remove("active");
    el.drawBtn.textContent = "カードを引く";
    el.saveImgBtn.textContent = "画像を保存";
    el.shareBtn.textContent = "シェア";
    el.clearHistoryBtn.textContent = "履歴をすべて削除";
    el.card1Title.textContent = "キャラクター";
    el.card2Title.textContent = "デザイン";
    el.card3Title.textContent = "ムード";
    el.noteText.textContent = "※結果は自動で履歴に保存されます（localStorage）";
    el.historyTitle.textContent = "履歴";
  } else {
    el.btnEN.classList.add("active"); el.btnJP.classList.remove("active");
    el.drawBtn.textContent = "Draw Cards";
    el.saveImgBtn.textContent = "Save Image";
    el.shareBtn.textContent = "Share";
    el.clearHistoryBtn.textContent = "Clear All History";
    el.card1Title.textContent = "Race / Aspect";
    el.card2Title.textContent = "Hair / Garment";
    el.card3Title.textContent = "Atmosphere / Palette";
    el.noteText.textContent = "Results are automatically saved to history (localStorage).";
    el.historyTitle.textContent = "History";
  }
}
applyLanguageUI();

/* ---------- Generate / render ---------- */
function generateResult(){
  const colorsJP = pickN(JP.colors,3);
  const colorsEN = pickN(EN.colors,3);
  return {
    jp: {
      species: rand(JP.species), gender: rand(JP.gender), age: rand(JP.age),
      hair: rand(JP.hair), cloth: rand(JP.cloth), motif: rand(JP.motif),
      mood: rand(JP.mood), colors: colorsJP
    },
    en: {
      species: rand(EN.species), gender: rand(EN.gender), age: rand(EN.age),
      hair: rand(EN.hair), cloth: rand(EN.cloth), motif: rand(EN.motif),
      mood: rand(EN.mood), colors: colorsEN
    },
    at: nowISO()
  };
}

function renderResultToUI(result){
  const data = (LANG==="JP") ? result.jp : result.en;

  el.card1Lines.querySelector("#c1-1").textContent = (LANG==="JP" ? "種族：" : "Race:") + data.species;
  el.card1Lines.querySelector("#c1-2").textContent = (LANG==="JP" ? "性別：" : "Aspect:") + data.gender;
  el.card1Lines.querySelector("#c1-3").textContent = (LANG==="JP" ? "年齢：" : "Lifespan:") + data.age;

  el.card2Lines.querySelector("#c2-1").textContent = (LANG==="JP" ? "髪型：" : "Hair Style:") + data.hair;
  el.card2Lines.querySelector("#c2-2").textContent = (LANG==="JP" ? "服：" : "Garment:") + data.cloth;
  el.card2Lines.querySelector("#c2-3").textContent = (LANG==="JP" ? "モチーフ：" : "Symbol:") + data.motif;

  el.card3Lines.querySelector("#c3-1").textContent = (LANG==="JP" ? "雰囲気：" : "Atmosphere:") + data.mood;
  el.card3Lines.querySelector("#c3-2").textContent = (LANG==="JP" ? "色：" : "Palette:") + data.colors.join("  ");

  // palette squares
  el.paletteRow.innerHTML = "";
  data.colors.forEach(hex=>{
    const sw = document.createElement("div");
    sw.className = "palette-swatch";
    sw.style.background = hex;
    sw.title = hex;
    el.paletteRow.appendChild(sw);
  });

  // show result actions
  el.resultActions.style.display = "flex";
  el.resultActions.setAttribute("aria-hidden", "false");

  // animation
  el.cards.forEach(c=>c.classList.remove("show"));
  setTimeout(()=> el.cards.forEach((c,i)=> setTimeout(()=> c.classList.add("show"), i*140)), 40);
}

/* ---------- History ---------- */
function loadHistory(){ try{ const raw = localStorage.getItem(STORAGE_KEY); return raw?JSON.parse(raw):[] }catch(e){return []} }
function saveHistory(arr){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }catch(e){} }
function pushHistory(entry){
  const arr = loadHistory();
  arr.unshift(entry);
  if(arr.length>20) arr.length = 20;
  saveHistory(arr);
  renderHistory();
}
function renderHistory(){
  const arr = loadHistory();
  el.historyList.innerHTML = "";
  if(arr.length===0){
    const d=document.createElement("div"); d.className="historyItem"; d.textContent = (LANG==="JP"? "履歴はまだありません" : "No history yet");
    el.historyList.appendChild(d); return;
  }
  arr.forEach((it, idx)=>{
    const view = LANG==="JP" ? it.jp : it.en;
    const div = document.createElement("div"); div.className="historyItem";
    div.innerHTML = `
      <div><strong>${LANG==="JP"? "種族" : "Race"}:</strong> ${view.species}　<strong>${LANG==="JP"? "性別" : "Aspect"}:</strong> ${view.gender}</div>
      <div><strong>${LANG==="JP"? "髪型" : "Hair Style"}:</strong> ${view.hair}　<strong>${LANG==="JP"? "服" : "Garment"}:</strong> ${view.cloth}</div>
      <div><strong>${LANG==="JP"? "雰囲気" : "Atmosphere"}:</strong> ${view.mood}　<strong>${LANG==="JP"? "色" : "Palette"}:</strong> ${view.colors.join(" " )}</div>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">
        <button class="hBtn" data-idx="${idx}" data-action="restore">${LANG==="JP"? "復元" : "Restore"}</button>
        <button class="hBtn" data-idx="${idx}" data-action="download">${LANG==="JP"? "画像" : "Image"}</button>
      </div>
    `;
    el.historyList.appendChild(div);
  });
}

/* ---------- PNG generation (white bg) ---------- */
function roundRect(ctx,x,y,w,h,r,fill,stroke){
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

function generatePNGFromEntry(entry, filename){
  const view = (LANG==="JP")? entry.jp : entry.en;
  const w=1200,h=700,pad=60;
  const canvas=document.createElement("canvas"); canvas.width=w; canvas.height=h;
  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#fff"; ctx.fillRect(0,0,w,h);
  ctx.fillStyle="#111"; ctx.font="28px sans-serif"; ctx.textAlign="center";
  ctx.fillText(LANG==="JP"? "ARTILOT — デザインお題カード" : "ARTILOT — Design Prompt Cards", w/2, 48);

  const cardW = (w - pad*2 - 40)/3;
  const cardH = h - pad*2 - 160;
  const xs = [pad, pad + cardW + 20, pad + (cardW+20)*2];
  const titleY = 90;
  const textStartY = titleY + 50;

  for(let i=0;i<3;i++){
    const x=xs[i], y=titleY;
    ctx.fillStyle = (i===0? "#fff8b1" : (i===1? "#b7ecff":"#ffc6eb"));
    roundRect(ctx,x,y,cardW,cardH,20,true,false);
    ctx.lineWidth=6; ctx.strokeStyle="#C8A34D"; roundRect(ctx,x,y,cardW,cardH,20,false,true);

    ctx.fillStyle="#111"; ctx.textAlign="left"; ctx.font="bold 20px sans-serif";
    const leftPad = x + 28; let curY = textStartY;
    if(i===0){
      ctx.fillText(LANG==="JP"? "種族：" : "Race:", leftPad, curY); ctx.fillText(view.species, leftPad+120, curY); curY+=34;
      ctx.fillText(LANG==="JP"? "性別：" : "Aspect:", leftPad, curY); ctx.fillText(view.gender, leftPad+120, curY); curY+=34;
      ctx.fillText(LANG==="JP"? "年齢：" : "Lifespan:", leftPad, curY); ctx.fillText(view.age, leftPad+120, curY); curY+=34;
    } else if(i===1){
      ctx.fillText(LANG==="JP"? "髪型：" : "Hair Style:", leftPad, curY); ctx.fillText(view.hair, leftPad+140, curY); curY+=34;
      ctx.fillText(LANG==="JP"? "服：" : "Garment:", leftPad, curY); ctx.fillText(view.cloth, leftPad+140, curY); curY+=34;
      ctx.fillText(LANG==="JP"? "モチーフ：" : "Symbol:", leftPad, curY); ctx.fillText(view.motif, leftPad+140, curY); curY+=34;
    } else {
      ctx.fillText(LANG==="JP"? "雰囲気：" : "Atmosphere:", leftPad, curY); ctx.fillText(view.mood, leftPad+170, curY); curY+=44;
      ctx.fillText(LANG==="JP"? "色：" : "Palette:", leftPad, curY);
      const swX = leftPad + 100; const swY = curY - 18; const swW = 40; const swH = 24; const swGap = 12;
      for(let k=0;k<view.colors.length;k++){
        ctx.fillStyle = view.colors[k]; roundRect(ctx, swX + (swW+swGap)*k, swY, swW, swH, 6, true, false);
        ctx.strokeStyle = "#666"; ctx.lineWidth = 1; roundRect(ctx, swX + (swW+swGap)*k, swY, swW, swH, 6, false, true);
      }
    }
  }

  ctx.fillStyle="#444"; ctx.font="16px sans-serif"; ctx.textAlign="center";
  ctx.fillText("© 2025 Artilot", w/2, h - 36);

  canvas.toBlob(function(blob){
    const url = URL.createObjectURL(blob);
    if(filename){
      const a=document.createElement("a"); a.href=url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    }
  }, "image/png");
}

/* ---------- Share (Web Share API with Blob fallback) ---------- */
async function shareCurrentImage(){
  // use last history item if available
  const hist = loadHistory();
  const entry = hist[0];
  if(!entry){
    alert(LANG==="JP" ? "まずカードを引いてください。" : "Please draw cards first.");
    return;
  }
  // generate blob
  const view = (LANG==="JP")? entry.jp : entry.en;
  const w=1200,h=700,pad=60;
  const canvas=document.createElement("canvas"); canvas.width=w; canvas.height=h;
  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#fff"; ctx.fillRect(0,0,w,h);
  ctx.fillStyle="#111"; ctx.font="28px sans-serif"; ctx.textAlign="center";
  ctx.fillText(LANG==="JP"? "ARTILOT — デザインお題カード" : "ARTILOT — Design Prompt Cards", w/2, 48);

  const cardW = (w - pad*2 - 40)/3;
  const cardH = h - pad*2 - 160;
  const xs = [pad, pad + cardW + 20, pad + (cardW+20)*2];
  const titleY = 90;
  const textStartY = titleY + 50;

  for(let i=0;i<3;i++){
    const x=xs[i], y=titleY;
    ctx.fillStyle = (i===0? "#fff8b1" : (i===1? "#b7ecff":"#ffc6eb"));
    roundRect(ctx,x,y,cardW,cardH,20,true,false);
    ctx.lineWidth=6; ctx.strokeStyle="#C8A34D"; roundRect(ctx,x,y,cardW,cardH,20,false,true);

    ctx.fillStyle="#111"; ctx.textAlign="left"; ctx.font="bold 20px sans-serif";
    const leftPad = x + 28; let curY = textStartY;
    if(i===0){
      ctx.fillText(LANG==="JP"? "種族：" : "Race:", leftPad, curY); ctx.fillText(view.species, leftPad+120, curY); curY+=34;
      ctx.fillText(LANG==="JP"? "性別：" : "Aspect:", leftPad, curY); ctx.fillText(view.gender, leftPad+120, curY); curY+=34;
      ctx.fillText(LANG==="JP"? "年齢：" : "Lifespan:", leftPad, curY); ctx.fillText(view.age, leftPad+120, curY); curY+=34;
    } else if(i===1){
      ctx.fillText(LANG==="JP"? "髪型：" : "Hair Style:", leftPad, curY); ctx.fillText(view.hair, leftPad+140, curY); curY+=34;
      ctx.fillText(LANG==="JP"? "服：" : "Garment:", leftPad, curY); ctx.fillText(view.cloth, leftPad+140, curY); curY+=34;
      ctx.fillText(LANG==="JP"? "モチーフ：" : "Symbol:", leftPad, curY); ctx.fillText(view.motif, leftPad+140, curY); curY+=34;
    } else {
      ctx.fillText(LANG==="JP"? "雰囲気：" : "Atmosphere:", leftPad, curY); ctx.fillText(view.mood, leftPad+170, curY); curY+=44;
      ctx.fillText(LANG==="JP"? "色：" : "Palette:", leftPad, curY);
      const swX = leftPad + 100; const swY = curY - 18; const swW = 40; const swH = 24; const swGap = 12;
      for(let k=0;k<view.colors.length;k++){
        ctx.fillStyle = view.colors[k]; roundRect(ctx, swX + (swW+swGap)*k, swY, swW, swH, 6, true, false);
        ctx.strokeStyle = "#666"; ctx.lineWidth = 1; roundRect(ctx, swX + (swW+swGap)*k, swY, swW, swH, 6, false, true);
      }
    }
  }

  ctx.fillStyle="#444"; ctx.font="16px sans-serif"; ctx.textAlign="center";
  ctx.fillText("© 2025 Artilot", w/2, h - 36);

  return new Promise((resolve, reject)=>{
    canvas.toBlob(async (blob)=>{
      if(!blob) return reject();
      const file = new File([blob], `artilot_${LANG}_${Date.now()}.png`, {type:"image/png"});
      // try Web Share API
      if(navigator.canShare && navigator.canShare({files:[file]})){
        try{
          await navigator.share({ files:[file], title: "ARTILOT", text: LANG==="JP"? "ARTILOT の結果です" : "ARTILOT result" });
          resolve(true);
        }catch(e){
          // user cancelled or failed; fallback to download
          const url = URL.createObjectURL(blob);
          const a=document.createElement("a"); a.href=url; a.download=file.name; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
          resolve(false);
        }
      } else {
        // fallback: download
        const url = URL.createObjectURL(blob);
        const a=document.createElement("a"); a.href=url; a.download=file.name; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        resolve(false);
      }
    }, "image/png");
  });
}

/* ---------- Event wiring ---------- */
el.btnJP.addEventListener("click", ()=>{ LANG="JP"; localStorage.setItem(LANG_KEY, LANG); applyLanguageUI(); renderHistory(); });
el.btnEN.addEventListener("click", ()=>{ LANG="EN"; localStorage.setItem(LANG_KEY, LANG); applyLanguageUI(); renderHistory(); });

el.drawBtn.addEventListener("click", ()=> {
  const res = generateResult();
  renderResultToUI(res);
  pushHistory(res);
});
el.saveImgBtn.addEventListener("click", ()=> {
  const hist = loadHistory();
  const entry = hist[0];
  if(!entry){ alert(LANG==="JP"? "まずカードを引いてください":"Draw cards first"); return; }
  generatePNGFromEntry(entry, `artilot_${LANG}_${Date.now()}.png`);
});
el.shareBtn.addEventListener("click", async ()=> {
  const ok = await shareCurrentImage();
  if(ok) { /* shared */ }
});

el.clearHistoryBtn.addEventListener("click", ()=>{ if(confirm(LANG==="JP"? "履歴をすべて削除しますか？":"Clear all history?")){ localStorage.removeItem(STORAGE_KEY); renderHistory(); }});

/* history actions (restore/download) */
el.historyList.addEventListener("click", (e)=>{
  const btn = e.target.closest("button");
  if(!btn) return;
  const action = btn.dataset.action;
  const idx = Number(btn.dataset.idx);
  const arr = loadHistory();
  const item = arr[idx];
  if(!item) return;
  if(action==="restore"){
    renderResultToUI(item);
    pushHistory(item);
  } else if(action==="download"){
    generatePNGFromEntry(item, `artilot_history_${idx+1}.png`);
  }
});

/* ---------- Init ---------- */
renderHistory();
applyLanguageUI();
