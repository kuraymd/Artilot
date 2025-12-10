/* script.js — final full (matching HTML/CSS) */

/* -------------------------
   Data (JP / EN)
------------------------- */
const DATA = {
  JP: {
    card1: { title: "キャラクター", labels: ["種族", "性別", "年齢"],
      items: { race: ["ヒューマン","エルフ","獣人","ドワーフ","鬼","天使","悪魔","ロボット","ドラゴン族"], gender:["男性","女性","中性","不明"], age:["幼い","若い","大人","中年","高齢"] }
    },
    card2: { title: "デザイン", labels: ["髪型","服","モチーフ"],
      items: { hair:["ロング","ショート","ポニーテール","ツインテール","ボブ","ぱっつん","三つ編み"], clothes:["セーラー服","和服","メイド服","鎧","スーツ","ドレス","パーカー"], motif:["魚","ハート","太陽","月","花","ドクロ","星","炎"] }
    },
    card3: { title: "雰囲気", labels: ["雰囲気","メインカラー","サブカラー"],
      items: { mood:["ホラー","ファンタジー","レトロ","未来","かわいい","ダーク","ミステリー","SF"], mainColor:["赤","青","黒","白","緑","紫","金","銀"], subColors:["赤","青","黒","白","緑","紫","金","銀"] }
    },
    ui: { draw: "カードを引く", note: "※履歴は最大20件まで保存され、古い順から消えます", history:"履歴", clear:"履歴をすべて削除", saveImg:"画像を保存", share:"シェア" }
  },

  EN: {
    card1: { title: "Character", labels:["Race","Gender","Age"],
      items: { race:["Human","Elf","Beastfolk","Dwarf","Oni","Angel","Demon","Robot","Dragonkin"], gender:["Male","Female","Neutral","Unknown"], age:["Child","Young","Adult","Senior","Unknown"] }
    },
    card2: { title: "Design", labels:["Hair","Outfit","Motif"],
      items: { hair:["Long","Short","Ponytail","Twintails","Bob","Bangs"], clothes:["Sailor","Kimono","Maid","Armor","Suit","Dress","Hoodie"], motif:["Fish","Heart","Sun","Moon","Flower","Skull","Star","Flame"] }
    },
    card3: { title: "Mood", labels:["Mood","Main Color","Sub Colors"],
      items: { mood:["Horror","Fantasy","Retro","Future","Cute","Dark","Mystery","Sci-Fi"], mainColor:["Red","Blue","Black","White","Green","Purple","Gold","Silver"], subColors:["Red","Blue","Black","White","Green","Purple","Gold","Silver"] }
    },
    ui: { draw: "Draw Cards", note: "*History keeps up to 20 entries; older items are removed.*", history:"History", clear:"Clear History", saveImg:"Save Image", share:"Share" }
  }
};

/* -------------------------
   Utils & State
------------------------- */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const rand = arr => arr[Math.floor(Math.random()*arr.length)];
const STORAGE_KEY = "artilot_final_history";
let LANG = "JP";

/* Elements */
const els = {
  btnJP: $("#btnJP"), btnEN: $("#btnEN"),
  drawBtn: $("#drawBtn"), saveImgBtn: $("#saveImgBtn"), shareBtn: $("#shareBtn"),
  clearHistoryBtn: $("#clearHistoryBtn"), noteText: $("#noteText"),
  historyList: $("#historyList"), subPaletteRow: $("#subPaletteRow"), mainColorSwatch: $("#mainColorSwatch"), mainColorText: $("#c3-value-2-text"),
  card1: $("#card1"), card2: $("#card2"), card3: $("#card3"),
  card1Title: $("#card1-title"), card2Title: $("#card2-title"), card3Title: $("#card3-title"),
  c1Label1: $("#c1-label-1"), c1Val1: $("#c1-value-1"), c1Label2: $("#c1-label-2"), c1Val2: $("#c1-value-2"), c1Label3: $("#c1-label-3"), c1Val3: $("#c1-value-3"),
  c2Label1: $("#c2-label-1"), c2Val1: $("#c2-value-1"), c2Label2: $("#c2-label-2"), c2Val2: $("#c2-value-2"), c2Label3: $("#c2-label-3"), c2Val3: $("#c2-value-3"),
  c3Label1: $("#c3-label-1"), c3Val1: $("#c3-value-1"), c3Label2: $("#c3-label-2"), c3Val2: $("#c3-value-2"), c3Label3: $("#c3-label-3"), c3Val3: $("#c3-value-3")
};

/* -------------------------
   Initialize UI text
------------------------- */
function applyUIText() {
  const ui = DATA[LANG].ui;
  if (els.drawBtn) els.drawBtn.textContent = ui.draw;
  if (els.saveImgBtn) els.saveImgBtn.textContent = ui.saveImg;
  if (els.shareBtn) els.shareBtn.textContent = ui.share;
  if (els.clearHistoryBtn) els.clearHistoryBtn.textContent = ui.clear;
  if (els.noteText) els.noteText.textContent = ui.note;
  if ($("#historyTitle")) $("#historyTitle").textContent = ui.history;
}
applyUIText();

/* -------------------------
   Draw / generate
------------------------- */
if (els.drawBtn) els.drawBtn.addEventListener("click", generateCards);

function generateCards(){
  const d = DATA[LANG];

  // card1
  if (els.card1Title) els.card1Title.textContent = d.card1.title;
  if (els.c1Label1) els.c1Label1.textContent = d.card1.labels[0];
  if (els.c1Label2) els.c1Label2.textContent = d.card1.labels[1];
  if (els.c1Label3) els.c1Label3.textContent = d.card1.labels[2];
  if (els.c1Val1) els.c1Val1.textContent = rand(d.card1.items.race);
  if (els.c1Val2) els.c1Val2.textContent = rand(d.card1.items.gender);
  if (els.c1Val3) els.c1Val3.textContent = rand(d.card1.items.age);

  // card2
  if (els.card2Title) els.card2Title.textContent = d.card2.title;
  if (els.c2Label1) els.c2Label1.textContent = d.card2.labels[0];
  if (els.c2Label2) els.c2Label2.textContent = d.card2.labels[1];
  if (els.c2Label3) els.c2Label3.textContent = d.card2.labels[2];
  if (els.c2Val1) els.c2Val1.textContent = rand(d.card2.items.hair);
  if (els.c2Val2) els.c2Val2.textContent = rand(d.card2.items.clothes);
  if (els.c2Val3) els.c2Val3.textContent = rand(d.card2.items.motif);

  // card3
  if (els.card3Title) els.card3Title.textContent = d.card3.title;
  if (els.c3Label1) els.c3Label1.textContent = d.card3.labels[0];
  if (els.c3Label2) els.c3Label2.textContent = d.card3.labels[1];
  if (els.c3Label3) els.c3Label3.textContent = d.card3.labels[2];
  if (els.c3Val1) els.c3Val1.textContent = rand(d.card3.items.mood);

  // main color (choose color name and show swatch)
  const mainName = rand(d.card3.items.mainColor);
  if (els.mainColorText) els.mainColorText.textContent = mainName;
  if (els.mainColorSwatch) els.mainColorSwatch.style.background = colorNameToCss(mainName);

  // sub palette
  renderSubPalette();

  // save
  pushHistory();
}

/* -------------------------
   Palette handling
------------------------- */
function renderSubPalette(){
  if (!els.subPaletteRow) return;
  els.subPaletteRow.innerHTML = "";
  const colors = DATA[LANG].card3.items.subColors;
  // choose 3 distinct if possible
  const pool = colors.slice();
  for (let i=0;i<3;i++){
    const idx = Math.floor(Math.random()*pool.length);
    const name = pool.splice(idx,1)[0];
    const sw = document.createElement("div");
    sw.className = "palette-swatch";
    sw.style.background = colorNameToCss(name);
    sw.title = name;
    els.subPaletteRow.appendChild(sw);
  }
}

/* map color names to CSS */
function colorNameToCss(name){
  const map = {
    "赤":"hsl(0,70%,60%)","青":"hsl(220,70%,60%)","黒":"#222","#黒":"#222","白":"#fff","緑":"hsl(120,70%,45%)","紫":"hsl(270,65%,55%)","金":"#d4a000","銀":"#c0c0c0",
    "Red":"hsl(0,70%,60%)","Blue":"hsl(220,70%,60%)","Black":"#222","White":"#fff","Green":"hsl(120,70%,45%)","Purple":"hsl(270,65%,55%)","Gold":"#d4a000","Silver":"#c0c0c0"
  };
  return map[name] || (name.startsWith('#')?name:'#ddd');
}

/* -------------------------
   History (max 20)
------------------------- */
function pushHistory(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY) || "[]";
    const arr = JSON.parse(raw);
    const entry = {
      t: Date.now(),
      lang: LANG,
      c11: els.c1Val1 ? els.c1Val1.textContent : "",
      c12: els.c1Val2 ? els.c1Val2.textContent : "",
      c13: els.c1Val3 ? els.c1Val3.textContent : "",
      c21: els.c2Val1 ? els.c2Val1.textContent : "",
      c22: els.c2Val2 ? els.c2Val2.textContent : "",
      c23: els.c2Val3 ? els.c2Val3.textContent : "",
      c31: els.c3Val1 ? els.c3Val1.textContent : "",
      c32: els.c3Val2 ? els.c3Val2.textContent : "",
      mainColor: els.mainColorText ? els.mainColorText.textContent : "",
      subPalette: Array.from(document.querySelectorAll("#subPaletteRow .palette-swatch")).map(s=>s.style.background)
    };
    arr.unshift(entry);
    if (arr.length>20) arr.length=20;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    renderHistory();
  }catch(e){ console.error(e) }
}

function renderHistory(){
  const raw = localStorage.getItem(STORAGE_KEY) || "[]";
  const arr = JSON.parse(raw);
  if (!els.historyList) return;
  els.historyList.innerHTML = "";
  if (arr.length===0){
    const d = document.createElement("div"); d.className="historyItem";
    d.textContent = (LANG==="JP") ? "履歴はまだありません" : "No history yet";
    els.historyList.appendChild(d); return;
  }
  arr.forEach(it=>{
    const box = document.createElement("div"); box.className="historyItem";
    box.innerHTML = `<div style="font-weight:700;margin-bottom:6px">${new Date(it.t).toLocaleString()}</div>
      <div style="font-size:13px">${it.c11} / ${it.c12} / ${it.c13}</div>
      <div style="font-size:13px">${it.c21} / ${it.c22} / ${it.c23}</div>
      <div style="font-size:13px">Main: ${it.mainColor} ・ Sub: ${it.subPalette.join(", ")}</div>`;
    els.historyList.appendChild(box);
  });
}
if (els.clearHistoryBtn) els.clearHistoryBtn.addEventListener("click", ()=>{
  localStorage.removeItem(STORAGE_KEY); renderHistory();
});
renderHistory();

/* -------------------------
   Language toggle
------------------------- */
if (els.btnJP) els.btnJP.addEventListener("click", ()=>switchLang("JP"));
if (els.btnEN) els.btnEN.addEventListener("click", ()=>switchLang("EN"));

function switchLang(to){
  LANG = to;
  applyUIText();
  const d = DATA[LANG];
  // update labels/titles (if empty they'll be filled on next draw too)
  if (els.card1Title) els.card1Title.textContent = d.card1.title;
  if (els.card2Title) els.card2Title.textContent = d.card2.title;
  if (els.card3Title) els.card3Title.textContent = d.card3.title;
  if (els.c1Label1) els.c1Label1.textContent = d.card1.labels[0];
  if (els.c1Label2) els.c1Label2.textContent = d.card1.labels[1];
  if (els.c1Label3) els.c1Label3.textContent = d.card1.labels[2];
  if (els.c2Label1) els.c2Label1.textContent = d.card2.labels[0];
  if (els.c2Label2) els.c2Label2.textContent = d.card2.labels[1];
  if (els.c2Label3) els.c2Label3.textContent = d.card2.labels[2];
  if (els.c3Label1) els.c3Label1.textContent = d.card3.labels[0];
  if (els.c3Label2) els.c3Label2.textContent = d.card3.labels[1];
  if (els.c3Label3) els.c3Label3.textContent = d.card3.labels[2];
  if (els.btnJP) els.btnJP.classList.toggle("active", LANG==="JP");
  if (els.btnEN) els.btnEN.classList.toggle("active", LANG==="EN");
}

/* -------------------------
   Save image: capture visible cards area (horizontal)
   - compute bounding rect of the three cards, create canvas scaled by DPR
   - draw white background, draw each card using DOM content (text)
   - include footer © 2025 Artilot
------------------------- */
if (els.saveImgBtn) els.saveImgBtn.addEventListener("click", saveImage);

function saveImage(){
  try{
    const cardEls = [els.card1, els.card2, els.card3].filter(Boolean);
    if (!cardEls.length){ alert(LANG==="JP" ? "カードが見つかりません" : "Cards not found"); return; }

    const rects = cardEls.map(c=>c.getBoundingClientRect());
    const left = Math.min(...rects.map(r=>r.left));
    const right = Math.max(...rects.map(r=>r.right));
    const top = Math.min(...rects.map(r=>r.top));
    const bottom = Math.max(...rects.map(r=>r.bottom));
    const PAD = 8;
    const dpr = window.devicePixelRatio || 1;
    const cssW = (right - left) + PAD*2;
    const cssH = (bottom - top) + PAD*2;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = cssW + "px"; canvas.style.height = cssH + "px";
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // white bg
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,cssW,cssH);

    // draw each card
    const fontFamily = 'sans-serif';
    cardEls.forEach(cardEl=>{
      const r = cardEl.getBoundingClientRect();
      const x = r.left - left + PAD;
      const y = r.top - top + PAD;
      const w = r.width;
      const h = r.height;

      // rect
      drawRound(ctx, x, y, w, h, 8);
      ctx.fillStyle="#fff"; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle="#000"; ctx.stroke();

      // title
      const title = (cardEl.querySelector(".card-title") || {}).textContent || "";
      ctx.fillStyle="#000"; ctx.font = `700 ${Math.max(12, Math.round(w*0.09))}px ${fontFamily}`;
      ctx.fillText(title, x+10, y+8);

      // pairs
      const pairs = Array.from(cardEl.querySelectorAll(".pair"));
      let curY = y + 36;
      pairs.forEach(pair=>{
        const labelEl = pair.querySelector(".label");
        const valEl = pair.querySelector(".value");
        if (!labelEl || !valEl) return;

        ctx.fillStyle="#333";
        ctx.font = `700 ${Math.max(10, Math.round(w*0.05))}px ${fontFamily}`;
        ctx.fillText(labelEl.textContent, x+10, curY);
        curY += Math.max(10, Math.round(w*0.05)) + 4;

        ctx.fillStyle="#000";
        ctx.font = `700 ${Math.max(12, Math.round(w*0.06))}px ${fontFamily}`;
        // if main color row includes swatch, the value text may be separate; use text content
        wrapText(ctx, valEl.textContent, x+10, curY, w-20, Math.round(w*0.06)+6);
        // move down a safe amount
        curY += Math.round(w*0.06) + 16;
      });

      // palette (subPaletteRow) draw near bottom
      const sub = Array.from(cardEl.querySelectorAll(".palette-swatch"));
      if (sub && sub.length){
        let px = x + 10;
        const py = y + h - 44;
        sub.forEach(s=>{
          const col = s.style.background || "#ddd";
          ctx.fillStyle = col; ctx.fillRect(px, py, 36, 24);
          ctx.lineWidth = 1; ctx.strokeStyle="#000"; ctx.strokeRect(px, py, 36, 24);
          px += 44;
        });
      }

      // main swatch drawing handled in pairs by text extraction (if present)
      const mainSw = cardEl.querySelector("#mainColorSwatch");
      if (mainSw){
        // find position near its label value: we'll draw it at x+10, below top area (approx)
        // attempt to find displayed main color text position: fallback to top area
        const mcText = cardEl.querySelector("#c3-value-2-text");
        let mcX = x+10, mcY = y+36;
        if (mcText) {
          // we won't compute exact DOM coords; place roughly after label area
          mcY = y + 36 + 60;
        }
        // but to avoid overlapping, skip override — main swatch already drawn in pairs as sub-swatches for card3.
      }
    });

    // footer
    const footer = "© 2025 Artilot";
    ctx.fillStyle="#000"; ctx.font = `12px ${fontFamily}`;
    const tx = cssW - PAD - ctx.measureText(footer).width;
    const ty = cssH - PAD - 6;
    ctx.fillText(footer, tx, ty);

    // toBlob & share/download
    canvas.toBlob(async blob=>{
      if (!blob){ alert(LANG==="JP" ? "画像生成に失敗しました" : "Failed to generate image"); return; }
      const file = new File([blob], `artilot_${Date.now()}.png`, { type: 'image/png' });
      // try share with files
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'ARTILOT', text: LANG==="JP" ? '私の結果です' : 'My ARTILOT result' });
          return;
        }
      } catch (e){
        console.warn("share(files) failed", e);
      }
      // try share url fallback
      if (navigator.share) {
        const url = URL.createObjectURL(blob);
        try {
          await navigator.share({ title: 'ARTILOT', text: LANG==="JP" ? '私の結果です' : 'My ARTILOT result', url });
          URL.revokeObjectURL(url);
          return;
        } catch(e){
          // fallback to download
        }
      }
      // fallback download
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `artilot_${Date.now()}.png`;
      document.body.appendChild(a); a.click(); a.remove();
    }, 'image/png');

  }catch(e){
    console.error(e); alert(LANG==="JP" ? "画像保存中にエラーが発生しました" : "Error during image save");
  }
}

/* -------------------------
   Helpers
------------------------- */
function drawRound(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath(); }
function wrapText(ctx, text, x, y, maxWidth, lineHeight){
  const words = text.split(/\s+/);
  let line=''; for (let n=0;n<words.length;n++){ const test=line + (line? ' ' : '') + words[n]; const metrics = ctx.measureText(test); if (metrics.width>maxWidth && line){ ctx.fillText(line,x,y); line = words[n]; y += lineHeight; } else { line = test; } } if (line) ctx.fillText(line,x,y);
}

/* -------------------------
   Share (URL fallback)
------------------------- */
if (els.shareBtn) els.shareBtn.addEventListener("click", async ()=>{
  if (navigator.share){
    try{
      await navigator.share({ title:'ARTILOT', text: LANG==="JP" ? 'ARTILOT のデザインお題' : 'ARTILOT design prompts', url: location.href });
    }catch(e){ console.log('share canceled', e); }
  } else {
    alert(LANG==="JP" ? "このブラウザは共有に対応していません" : "This browser does not support sharing");
  }
});

/* -------------------------
   Init
------------------------- */
(function init(){
  if (els.btnJP) els.btnJP.classList.toggle('active', LANG==="JP");
  if (els.btnEN) els.btnEN.classList.toggle('active', LANG==="EN");
  applyUIText();
})();
