/* ARTILOT — 修正版 安定版 script.js
   - JP/EN 言語切替
   - 3枚カード生成（詳細）
   - 履歴保存（localStorage）
   - 画像保存 / シェア（Web Share APIフォールバック）
   - 防御的に要素存在チェック・コンソールログ追加
*/

(function(){
  'use strict';
  console.log("[ARTILOT] script loaded");

  /* ---------- Data (JP + EN) ---------- */
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

  /* ---------- UI refs (defensive) ---------- */
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const els = {
    btnJP: $("#btnJP"),
    btnEN: $("#btnEN"),
    drawBtn: $("#drawBtn"),
    saveImgBtn: $("#saveImgBtn"),
    shareBtn: $("#shareBtn"),
    clearHistoryBtn: $("#clearHistoryBtn"),
    card1Title: $("#card1-title"),
    card2Title: $("#card2-title"),
    card3Title: $("#card3-title"),
    c1_1: $("#c1-1"),
    c1_2: $("#c1-2"),
    c1_3: $("#c1-3"),
    c2_1: $("#c2-1"),
    c2_2: $("#c2-2"),
    c2_3: $("#c2-3"),
    c3_1: $("#c3-1"),
    c3_2: $("#c3-2"),
    paletteRow: $("#paletteRow"),
    cards: $$(".card"),
    historyList: $("#historyList"),
    noteText: $("#noteText"),
    resultActions: $("#resultActions")
  };

  // check essential elements
  const missing = Object.entries(els).filter(([,v])=>v==null).map(([k])=>k);
  if(missing.length){
    console.warn("[ARTILOT] Missing elements in DOM:", missing);
    // we proceed but some features may be no-op
  }

  /* ---------- Storage / State ---------- */
  const STORAGE_KEY = "artilot_v3_history";
  const LANG_KEY = "artilot_v3_lang";
  let LANG = localStorage.getItem(LANG_KEY) || "JP";

  /* ---------- Helpers ---------- */
  function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function pickN(arr,n){
    const copy = arr.slice();
    const out = [];
    for(let i=0;i<n && copy.length>0;i++){
      const idx = Math.floor(Math.random()*copy.length);
      out.push(copy.splice(idx,1)[0]);
    }
    return out;
  }
  function nowISO(){ return new Date().toISOString(); }

  /* ---------- Language UI ---------- */
  function applyLanguageUI(){
    if(els.btnJP) els.btnJP.classList.toggle("active", LANG==="JP");
    if(els.btnEN) els.btnEN.classList.toggle("active", LANG==="EN");

    if(els.drawBtn) els.drawBtn.textContent = (LANG==="JP" ? "カードを引く" : "Draw Cards");
    if(els.saveImgBtn) els.saveImgBtn.textContent = (LANG==="JP" ? "画像を保存" : "Save Image");
    if(els.shareBtn) els.shareBtn.textContent = (LANG==="JP" ? "シェア" : "Share");
    if(els.clearHistoryBtn) els.clearHistoryBtn.textContent = (LANG==="JP" ? "履歴をすべて削除" : "Clear All History");
    if(els.card1Title) els.card1Title.textContent = (LANG==="JP" ? "キャラクター" : "Race / Aspect");
    if(els.card2Title) els.card2Title.textContent = (LANG==="JP" ? "デザイン" : "Hair / Garment");
    if(els.card3Title) els.card3Title.textContent = (LANG==="JP" ? "ムード" : "Atmosphere / Palette");
    if(els.noteText) els.noteText.textContent = (LANG==="JP" ? "※結果は自動で履歴に保存されます" : "Results are automatically saved to history (localStorage).");
    // re-render history labels
    renderHistory();
  }

  /* ---------- History helpers ---------- */
  function loadHistory(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ console.error(e); return []; }
  }
  function saveHistory(arr){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }catch(e){ console.error(e); }
  }
  function pushHistory(entry){
    const arr = loadHistory();
    arr.unshift(entry);
    if(arr.length>20) arr.length = 20;
    saveHistory(arr);
    renderHistory();
  }

  /* ---------- Generate / Render ---------- */
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

  function renderPaletteSwatches(colors){
    if(!els.paletteRow) return;
    els.paletteRow.innerHTML = "";
    colors.forEach(hex=>{
      const d = document.createElement("div");
      d.className = "palette-swatch";
      d.style.background = hex;
      d.title = hex;
      els.paletteRow.appendChild(d);
    });
  }

  function renderResultToUI(result){
    const data = (LANG==="JP") ? result.jp : result.en;
    if(els.c1_1) els.c1_1.textContent = (LANG==="JP"? "種族：" : "Race:") + data.species;
    if(els.c1_2) els.c1_2.textContent = (LANG==="JP"? "性別：" : "Aspect:") + data.gender;
    if(els.c1_3) els.c1_3.textContent = (LANG==="JP"? "年齢：" : "Lifespan:") + data.age;

    if(els.c2_1) els.c2_1.textContent = (LANG==="JP"? "髪型：" : "Hair Style:") + data.hair;
    if(els.c2_2) els.c2_2.textContent = (LANG==="JP"? "服：" : "Garment:") + data.cloth;
    if(els.c2_3) els.c2_3.textContent = (LANG==="JP"? "モチーフ：" : "Symbol:") + data.motif;

    if(els.c3_1) els.c3_1.textContent = (LANG==="JP"? "雰囲気：" : "Atmosphere:") + data.mood;
    if(els.c3_2) els.c3_2.textContent = (LANG==="JP"? "色：" : "Palette:") + data.colors.join("  ");

    renderPaletteSwatches(data.colors);

    // show result actions if present
    if(els.resultActions) {
      els.resultActions.style.display = "flex";
      els.resultActions.setAttribute("aria-hidden","false");
    }

    // card animation
    (els.cards||[]).forEach(c=>c.classList.remove("show"));
    setTimeout(()=> (els.cards||[]).forEach((c,i)=> setTimeout(()=> c.classList.add("show"), i*120)), 40);
  }

  /* ---------- Render history ---------- */
  function renderHistory(){
    if(!els.historyList) return;
    const arr = loadHistory();
    els.historyList.innerHTML = "";
    if(arr.length===0){
      const d = document.createElement("div"); d.className = "historyItem";
      d.textContent = (LANG==="JP") ? "履歴はまだありません" : "No history yet";
      els.historyList.appendChild(d);
      return;
    }
    arr.forEach((it, idx)=>{
      const view = (LANG==="JP") ? it.jp : it.en;
      const div = document.createElement("div"); div.className = "historyItem";
      div.innerHTML = `
        <div><strong>${LANG==="JP" ? "種族" : "Race"}:</strong> ${view.species}　<strong>${LANG==="JP" ? "性別" : "Aspect"}:</strong> ${view.gender}</div>
        <div><strong>${LANG==="JP" ? "髪型" : "Hair Style"}:</strong> ${view.hair}　<strong>${LANG==="JP" ? "服" : "Garment"}:</strong> ${view.cloth}</div>
        <div><strong>${LANG==="JP" ? "雰囲気" : "Atmosphere"}:</strong> ${view.mood}　<strong>${LANG==="JP" ? "色" : "Palette"}:</strong> ${view.colors.join(" " )}</div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">
          <button class="hBtn" data-idx="${idx}" data-action="restore">${LANG==="JP"? "復元" : "Restore"}</button>
          <button class="hBtn" data-idx="${idx}" data-action="download">${LANG==="JP"? "画像" : "Image"}</button>
        </div>
      `;
      els.historyList.appendChild(div);
    });
  }

  /* ---------- PNG generation ---------- */
  function roundRect(ctx,x,y,w,h,r,fill,stroke){
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
    if(fill) ctx.fill();
    if(stroke) ctx.stroke();
  }

  function generatePNGFromEntry(entry, filename){
    try{
      const view = (LANG==="JP") ? entry.jp : entry.en;
      const w = 1200, h = 700, pad = 60;
      const canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0,0,w,h);

      // Title
      ctx.fillStyle = "#111"; ctx.font = "28px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(LANG==="JP" ? "ARTILOT — デザインお題カード" : "ARTILOT — Design Prompt Cards", w/2, 48);

      const cardW = (w - pad*2 - 40) / 3; const cardH = h - pad*2 - 160;
      const xs = [pad, pad + cardW + 20, pad + (cardW+20)*2];
      const titleY = 90; const textStartY = titleY + 50;

      for(let i=0;i<3;i++){
        const x=xs[i], y=titleY;
        ctx.fillStyle = "#ffffff"; roundRect(ctx,x,y,cardW,cardH,14,true,false);
        ctx.lineWidth = 4; ctx.strokeStyle = "#111"; roundRect(ctx,x,y,cardW,cardH,14,false,true);

        ctx.fillStyle = "#111"; ctx.textAlign = "left"; ctx.font = "bold 20px sans-serif";
        const leftPad = x + 28; let curY = textStartY;
        if(i===0){
          ctx.fillText(LANG==="JP"? "種族：" : "Race:", leftPad, curY); ctx.fillText(view.species, leftPad+110, curY); curY+=34;
          ctx.fillText(LANG==="JP"? "性別：" : "Aspect:", leftPad, curY); ctx.fillText(view.gender, leftPad+110, curY); curY+=34;
          ctx.fillText(LANG==="JP"? "年齢：" : "Lifespan:", leftPad, curY); ctx.fillText(view.age, leftPad+110, curY); curY+=34;
        } else if(i===1){
          ctx.fillText(LANG==="JP"? "髪型：" : "Hair Style:", leftPad, curY); ctx.fillText(view.hair, leftPad+140, curY); curY+=34;
          ctx.fillText(LANG==="JP"? "服：" : "Garment:", leftPad, curY); ctx.fillText(view.cloth, leftPad+140, curY); curY+=34;
          ctx.fillText(LANG==="JP"? "モチーフ：" : "Symbol:", leftPad, curY); ctx.fillText(view.motif, leftPad+140, curY); curY+=34;
        } else {
          ctx.fillText(LANG==="JP"? "雰囲気：" : "Atmosphere:", leftPad, curY); ctx.fillText(view.mood, leftPad+170, curY); curY+=44;
          ctx.fillText(LANG==="JP"? "色：" : "Palette:", leftPad, curY);
          const swX = leftPad + 100, swY = curY - 18, swW = 40, swH = 24, swGap = 12;
          for(let k=0;k<view.colors.length;k++){
            ctx.fillStyle = view.colors[k]; roundRect(ctx, swX + (swW+swGap)*k, swY, swW, swH, 6, true, false);
            ctx.strokeStyle = "#666"; ctx.lineWidth = 1; roundRect(ctx, swX + (swW+swGap)*k, swY, swW, swH, 6, false, true);
          }
        }
      }

      ctx.fillStyle = "#444"; ctx.font = "16px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("© 2025 Artilot", w/2, h - 36);

      canvas.toBlob(function(blob){
        if(!blob) { console.error("PNG blob failed"); return; }
        const url = URL.createObjectURL(blob);
        if(filename){
          const a = document.createElement("a"); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        } else {
          // fallback: open image
          window.open(url, "_blank");
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    }catch(e){
      console.error("generatePNGFromEntry error:", e);
    }
  }

  /* ---------- Share (Web Share API with fallback) ---------- */
  async function shareCurrentImage(){
    const hist = loadHistory();
    const entry = hist[0];
    if(!entry){
      alert(LANG==="JP" ? "まずカードを引いてください。" : "Please draw cards first.");
      return false;
    }
    return new Promise((resolve)=>{
      try{
        const w=1200,h=700,pad=60;
        const canvas=document.createElement("canvas"); canvas.width=w; canvas.height=h;
        const ctx=canvas.getContext("2d");
        ctx.fillStyle="#fff"; ctx.fillRect(0,0,w,h);
        ctx.fillStyle="#111"; ctx.font="28px sans-serif"; ctx.textAlign="center";
        ctx.fillText(LANG==="JP"? "ARTILOT — デザインお題カード" : "ARTILOT — Design Prompt Cards", w/2, 48);
        // draw simplified three cards and palette (reuse generatePNGFromEntry structure)
        generatePNGFromEntry(entry, null); // this will open the image in a new tab as fallback
        // Note: Web Share with files is not supported in all browsers reliably here; we fallback to download/open
        resolve(false);
      }catch(e){
        console.error("shareCurrentImage error:", e);
        resolve(false);
      }
    });
  }

  /* ---------- Event wiring (defensive) ---------- */
  if(els.btnJP) els.btnJP.addEventListener("click", ()=>{ LANG="JP"; localStorage.setItem(LANG_KEY, LANG); applyLanguageUI(); });
  if(els.btnEN) els.btnEN.addEventListener("click", ()=>{ LANG="EN"; localStorage.setItem(LANG_KEY, LANG); applyLanguageUI(); });

  if(els.drawBtn) els.drawBtn.addEventListener("click", ()=> {
    try{
      const res = generateResult();
      renderResultToUI(res);
      pushHistory(res);
      console.log("[ARTILOT] Drawn:", res);
    }catch(e){ console.error("draw error:", e); }
  });

  if(els.saveImgBtn) els.saveImgBtn.addEventListener("click", ()=> {
    const hist = loadHistory();
    const entry = hist[0];
    if(!entry){ alert(LANG==="JP"? "まずカードを引いてください" : "Draw cards first"); return; }
    generatePNGFromEntry(entry, `artilot_${LANG}_${Date.now()}.png`);
  });

  if(els.shareBtn) els.shareBtn.addEventListener("click", async ()=> {
    try{
      await shareCurrentImage();
    }catch(e){ console.error("share error:", e); }
  });

  if(els.clearHistoryBtn) els.clearHistoryBtn.addEventListener("click", ()=> {
    if(confirm(LANG==="JP"? "履歴をすべて削除しますか？" : "Clear all history?")){
      localStorage.removeItem(STORAGE_KEY);
      renderHistory();
    }
  });

  // history restore/download delegation
  if(els.historyList) els.historyList.addEventListener("click", (ev)=>{
    const btn = ev.target.closest("button");
    if(!btn) return;
    const action = btn.dataset.action;
    const idx = Number(btn.dataset.idx);
    const arr = loadHistory();
    const item = arr[idx];
    if(!item) return;
    if(action === "restore"){
      renderResultToUI(item);
      pushHistory(item);
    } else if(action === "download"){
      generatePNGFromEntry(item, `artilot_history_${idx+1}.png`);
    }
  });

  /* ---------- Init ---------- */
  applyLanguageUI();
  renderHistory();

  console.log("[ARTILOT] initialized. LANG=", LANG);
})();
