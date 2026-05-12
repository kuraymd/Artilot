id="u7m3x5"
const categoryArea =
  document.getElementById(
    "categoryArea"
  );

const resultArea =
  document.getElementById(
    "resultArea"
  );

const drawBtn =
  document.getElementById(
    "drawBtn"
  );

const updatesList =
  document.getElementById(
    "updatesList"
  );

const requestForm =
  document.getElementById(
    "requestForm"
  );

const requestStatus =
  document.getElementById(
    "requestStatus"
  );

const saveImageBtn =
  document.getElementById(
    "saveImageBtn"
  );

const saveImageStatus =
  document.getElementById(
    "saveImageStatus"
  );

const langButtons =
  document.querySelectorAll(
    ".lang-btn"
  );


let gachaData = {};

let lastDrawResults = [];

let currentLanguage =
  localStorage.getItem(
    "ideaSnackLanguage"
  ) || "en";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxm-zNHpZBB1MpHFEnbqNVP8fazHYPuHBCG6KzT4LB41ny-YrFP7IyJOWGxez2Axd3DsQ/exec";

const translations = {
  en: {
    "nav.draw": "Draw",
    "nav.how": "How to Use",
    "nav.updates": "Updates",
    "nav.request": "Request",
    "hero.kicker": "Illustration Inspiration Gacha",
    "hero.lead": "Random idea generator for illustrations and character designs. Choose your categories, draw a snack-sized prompt, and start sketching.",
    "hero.start": "Start Drawing",
    "hero.how": "How to Use",
    "gacha.kicker": "Gacha Setup",
    "gacha.title": "SELECT CATEGORY",
    "gacha.loading": "Loading ideas...",
    "gacha.draw": "DRAW IDEA",
    "gacha.saveImage": "Save as Image",
    "gacha.saveHint": "Draw an idea first, then save it as a PNG.",
    "gacha.saveReady": "Ready to save as a PNG.",
    "gacha.saveEmpty": "Draw an idea before saving.",
    "gacha.shareTitle": "Today's Idea Snack",
    "how.kicker": "How to Use",
    "how.title": "3 STEPS",
    "how.step1.title": "Choose categories",
    "how.step1.body": "Turn on only the categories you want. Keeping everything on makes the prompt more playful and chaotic.",
    "how.step2.title": "DRAW IDEA",
    "how.step2.body": "Press the button to randomly pick one idea from each selected category loaded from GAS.",
    "how.step3.title": "Draw and play",
    "how.step3.body": "Use the full combination as-is, or keep only the parts you like. Treat it as a small doorway into making something.",
    "updates.kicker": "Updates",
    "updates.title": "RECENT NOTES",
    "request.kicker": "Request",
    "request.title": "SEND AN IDEA",
    "request.category": "Category",
    "request.option.theme": "Theme",
    "request.option.motif": "Motif",
    "request.option.hair": "Hair",
    "request.option.outfit": "Outfit",
    "request.option.mood": "Mood",
    "request.option.other": "Other",
    "request.idea": "Your idea",
    "request.placeholder": "Example: space cream soda, a wizard on a rainy day...",
    "request.submit": "Send Request",
    "request.status.ready": "Request sending will be connected to the requests sheet later.",
    "request.status.empty": "Please enter your request idea.",
    "request.status.thanks": "Thank you. This will be sendable when the requests sheet integration is added.",
    "footer.tagline": "Snack-sized prompts for illustration and character design."
  },
  ja: {
    "nav.draw": "引く",
    "nav.how": "使い方",
    "nav.updates": "更新情報",
    "nav.request": "リクエスト",
    "hero.kicker": "イラストお題ガチャ",
    "hero.lead": "イラストやキャラクターデザインのためのランダムお題メーカー。カテゴリを選んで、小さなお題を引いて、描き始めよう。",
    "hero.start": "お題を引く",
    "hero.how": "使い方を見る",
    "gacha.kicker": "ガチャ設定",
    "gacha.title": "カテゴリを選択",
    "gacha.loading": "お題を読み込み中...",
    "gacha.draw": "お題を引く",
    "gacha.saveImage": "画像として保存",
    "gacha.saveHint": "お題を引くと、PNG画像として保存できます。",
    "gacha.saveReady": "PNG画像として保存できます。",
    "gacha.saveEmpty": "画像保存の前にお題を引いてください。",
    "gacha.shareTitle": "今日のIDEA SNACK",
    "how.kicker": "使い方",
    "how.title": "3ステップ",
    "how.step1.title": "カテゴリを選ぶ",
    "how.step1.body": "使いたいカテゴリだけをONにします。全部ONのままなら、よりカオスで楽しいお題になります。",
    "how.step2.title": "お題を引く",
    "how.step2.body": "ボタンを押すと、GASから読み込んだ各カテゴリの候補からランダムに1つずつ表示されます。",
    "how.step3.title": "描いて遊ぶ",
    "how.step3.body": "出た組み合わせをそのまま描いても、気に入った要素だけ拾ってもOK。創作の入口として使えます。",
    "updates.kicker": "更新情報",
    "updates.title": "最近のお知らせ",
    "request.kicker": "リクエスト",
    "request.title": "お題を送る",
    "request.category": "カテゴリ",
    "request.option.theme": "テーマ",
    "request.option.motif": "モチーフ",
    "request.option.hair": "髪型",
    "request.option.outfit": "服装",
    "request.option.mood": "雰囲気",
    "request.option.other": "その他",
    "request.idea": "アイデア",
    "request.placeholder": "例: 宇宙クリームソーダ、雨の日の魔法使い...",
    "request.submit": "リクエストを送る",
    "request.status.ready": "リクエスト送信は今後 requests シート連携予定です。",
    "request.status.empty": "リクエスト内容を入力してください。",
    "request.status.thanks": "ありがとうございます。requests シート連携時に送信できるようになります。",
    "footer.tagline": "イラストやキャラクターデザインのための、ひとくちサイズのお題集。"
  }
};

const announcementsFallback = [
  {
    date: "2026.05",
    label: {
      en: "NEW",
      ja: "NEW"
    },
    text: {
      en: "Added How to Use, Updates, and Request sections.",
      ja: "How to Use / Updates / Request セクションを追加しました。"
    }
  },
  {
    date: "2026.05",
    label: {
      en: "TIP",
      ja: "TIP"
    },
    text: {
      en: "Try turning off a few categories when you want a simpler prompt.",
      ja: "シンプルなお題にしたいときは、いくつかのカテゴリをOFFにしてみてください。"
    }
  },
  {
    date: "NEXT",
    label: {
      en: "PLAN",
      ja: "予定"
    },
    text: {
      en: "Prepared for future loading from the announcements sheet.",
      ja: "announcements シートから更新情報を取得できる構造に拡張予定です。"
    }
  }
];

if(!translations[currentLanguage]){

  currentLanguage =
    "en";

}


function text(key){

  return translations[currentLanguage][key] ||
    translations.en[key] ||
    "";

}


function localized(value){

  if(
    value &&
    typeof value === "object"
  ){

    return value[currentLanguage] ||
      value.en ||
      value.ja ||
      "";

  }

  return value;

}


function applyTranslations(){

  document.documentElement.lang =
    currentLanguage;

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element=>{

      element.textContent =
        text(
          element.dataset.i18n
        );

    });

  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element=>{

      element.placeholder =
        text(
          element.dataset.i18nPlaceholder
        );

    });

  langButtons.forEach(button=>{

    button.classList.toggle(
      "is-active",
      button.dataset.lang === currentLanguage
    );

  });

  renderUpdates(
    announcementsFallback
  );

  if(saveImageStatus){

    saveImageStatus.textContent =
      lastDrawResults.length === 0 ?
        text("gacha.saveHint") :
        text("gacha.saveReady");

  }

}


function setLanguage(language){

  currentLanguage =
    language;

  localStorage.setItem(
    "ideaSnackLanguage",
    currentLanguage
  );

  applyTranslations();

}


// category generation
function createCategories(){

  categoryArea.innerHTML = "";

  Object.keys(gachaData)
    .forEach(category=>{

      const button =
        document.createElement(
          "button"
        );

      button.className =
        "category-chip active";

      button.dataset.category =
        category;

      button.textContent =
        category.toUpperCase();

      button.addEventListener(
        "click",
        ()=>{

          button.classList.toggle(
            "active"
          );

        }
      );

      categoryArea.appendChild(
        button
      );

    });

}


// random
function randomItem(array){

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];

}


// gacha
function drawIdea(){

  resultArea.innerHTML = "";
  lastDrawResults = [];

  const activeCategories =
    document.querySelectorAll(
      ".category-chip.active"
    );

  activeCategories.forEach(button=>{

    const category =
      button.dataset.category;

    const item =
      randomItem(
        gachaData[category]
      );

    lastDrawResults.push({
      category,
      item
    });

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "result-card";

    card.innerHTML = `
      <p class="result-title">
        ${category}
      </p>

      <p class="result-value">
        ${item}
      </p>
    `;

    resultArea.appendChild(card);

  });

  if(saveImageBtn){

    saveImageBtn.disabled =
      lastDrawResults.length === 0;

  }

  if(saveImageStatus){

    saveImageStatus.textContent =
      lastDrawResults.length === 0 ?
        text("gacha.saveEmpty") :
        text("gacha.saveReady");

  }

}


function drawRoundRect(ctx, x, y, width, height, radius){

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

}


function wrapText(ctx, textValue, maxWidth){

  const words =
    String(textValue).split("");

  const lines = [];
  let line = "";

  words.forEach(char=>{

    const testLine =
      line + char;

    if(
      ctx.measureText(testLine).width > maxWidth &&
      line
    ){

      lines.push(line);
      line = char;

      return;

    }

    line = testLine;

  });

  if(line){
    lines.push(line);
  }

  return lines;

}


function drawShareCard(){

  const canvas =
    document.createElement(
      "canvas"
    );

  const size = 1200;
  const scale =
    window.devicePixelRatio || 1;

  canvas.width =
    size * scale;

  canvas.height =
    size * scale;

  canvas.style.width =
    `${size}px`;

  canvas.style.height =
    `${size}px`;

  const ctx =
    canvas.getContext(
      "2d"
    );

  ctx.scale(scale, scale);

  ctx.fillStyle = "#fff8e8";
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "#ffd84d";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(310, 0);
  ctx.lineTo(0, 310);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ff80ad";
  ctx.beginPath();
  ctx.moveTo(size, size);
  ctx.lineTo(size - 280, size);
  ctx.lineTo(size, size - 280);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#222";
  ctx.lineWidth = 8;
  ctx.strokeRect(32, 32, size - 64, size - 64);

  ctx.fillStyle = "#222";
  ctx.font = "900 42px Fredoka, sans-serif";
  ctx.fillText("IDEA SNACK", 82, 112);

  ctx.fillStyle = "#ff80ad";
  ctx.font = "900 26px Fredoka, sans-serif";
  ctx.fillText(text("gacha.shareTitle").toUpperCase(), 82, 154);

  const cardX = 82;
  const cardY = 205;
  const cardW = size - 164;
  const rowGap = 22;
  const columns = 2;
  const cellW = (cardW - rowGap) / columns;
  const cellH = 128;

  lastDrawResults.forEach((result, index)=>{

    const col =
      index % columns;

    const row =
      Math.floor(index / columns);

    const x =
      cardX + col * (cellW + rowGap);

    const y =
      cardY + row * (cellH + rowGap);

    ctx.save();
    drawRoundRect(ctx, x + 7, y + 7, cellW, cellH, 20);
    ctx.fillStyle = "#222";
    ctx.fill();

    drawRoundRect(ctx, x, y, cellW, cellH, 20);
    ctx.fillStyle =
      index % 3 === 0 ? "#ffd84d" :
      index % 3 === 1 ? "#ffffff" :
      "#ff80ad";
    ctx.fill();
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.fillStyle = "#222";
    ctx.font = "900 21px Fredoka, 'M PLUS Rounded 1c', sans-serif";
    ctx.fillText(
      String(result.category).toUpperCase(),
      x + 24,
      y + 38
    );

    ctx.font = "900 32px Fredoka, 'M PLUS Rounded 1c', sans-serif";

    const lines =
      wrapText(
        ctx,
        result.item,
        cellW - 48
      ).slice(0, 2);

    lines.forEach((line, lineIndex)=>{

      ctx.fillText(
        line,
        x + 24,
        y + 82 + lineIndex * 36
      );

    });

    ctx.restore();

  });

  ctx.fillStyle = "#222";
  ctx.font = "900 26px Fredoka, sans-serif";
  ctx.fillText("ihyli.com/idea-snack/", 82, size - 82);

  return canvas;

}


function saveResultImage(){

  if(lastDrawResults.length === 0){

    if(saveImageStatus){

      saveImageStatus.textContent =
        text("gacha.saveEmpty");

    }

    return;

  }

  const canvas =
    drawShareCard();

  canvas.toBlob(blob=>{

    if(!blob){
      return;
    }

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement(
        "a"
      );

    const stamp =
      new Date()
        .toISOString()
        .slice(0, 10)
        .replaceAll("-", "");

    link.href = url;
    link.download = `idea-snack-${stamp}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(()=>{

      URL.revokeObjectURL(url);

    }, 1000);

  }, "image/png");

}


function renderUpdates(items){

  if(!updatesList){
        return;
      }

      updatesList.innerHTML = "";

  items.forEach(item=>{

    const update =
      document.createElement(
        "article"
      );

    update.className =
      "update-item";

    update.innerHTML = `
      <div class="update-date">
        ${item.date}
      </div>

      <div class="update-body">
        <strong>${localized(item.label)}</strong>
        <p>${localized(item.text)}</p>
      </div>
    `;

    updatesList.appendChild(
      update
    );

  });

}


// Future: load from announcements sheet.
async function loadAnnouncements(){

  renderUpdates(
    announcementsFallback
  );

}


function setupRequestForm(){

  if(!requestForm){
    return;
  }

  requestForm.addEventListener(
    "submit",
    event=>{

      event.preventDefault();

      const formData =
        new FormData(
          requestForm
        );

      const idea =
        String(
          formData.get("idea") || ""
        ).trim();

      if(!idea){

        requestStatus.textContent =
          text(
            "request.status.empty"
          );

        return;

      }

      requestStatus.textContent =
        text(
          "request.status.thanks"
        );

      requestForm.reset();

    }
  );

}


// Spreadsheet load
async function loadData(){

  const response =
    await fetch(GAS_URL);

  const data =
    await response.json();

  gachaData =
    data;

  document.getElementById(
    "loadingText"
  ).remove();

  createCategories();

}

langButtons.forEach(button=>{

  button.addEventListener(
    "click",
    ()=>{

      setLanguage(
        button.dataset.lang
      );

    }
  );

});

if(saveImageBtn){

  saveImageBtn.addEventListener(
    "click",
    saveResultImage
  );

}

applyTranslations();

loadAnnouncements();

loadData();

setupRequestForm();


// button
drawBtn.addEventListener(
  "click",
  drawIdea
);
