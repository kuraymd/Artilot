/* ==========================================================
   ARTILOT 3カードガチャ（詳細版）
   - Card1：キャラ基礎
   - Card2：デザイン構成
   - Card3：雰囲気＋色
   - 履歴保存
   - PNG生成
   ==========================================================*/

/* -----------------------------
   データセット
-----------------------------*/

// 1枚目：キャラ基礎
const speciesList = ["ヒューマン", "エルフ", "ドワーフ", "鬼", "天使", "悪魔", "ロボット", "猫耳", "獣人", "スライム族"];
const genderList  = ["男性", "女性", "中性", "不明", "流動的"];
const ageList     = ["幼い", "若い", "大人", "高齢", "不詳"];

// 2枚目：デザイン構成
const hairList = ["ロング", "ショート", "ボブ", "ポニーテール", "ツインテール", "三つ編み", "スキンヘッド", "パッツン", "ウェーブ", "アップスタイル"];
const clothList = ["セーラー服", "和服", "メイド服", "ローブ", "スーツ", "鎧", "ドレス", "パーカー", "ゴシック", "ミリタリー"];
const motifList = ["ハート", "星", "太陽", "魚", "花", "月", "蝶", "剣", "炎", "鍵"];

// 3枚目：雰囲気＋色
const moodList = ["ホラー", "ファンタジー", "可愛い", "レトロ", "SF", "ダーク", "神秘的", "爽やか", "サイバー", "アンティーク"];
const colorList = ["赤", "青", "黄", "緑", "紫", "黒", "白", "オレンジ", "茶", "グレー"];


/* -----------------------------
   要素取得
-----------------------------*/
const card1Lines = document.getElementById("card1-lines");
const card2Lines = document.getElementById("card2-lines");
const card3Lines = document.getElementById("card3-lines");

const drawBtn = document.getElementById("drawBtn");
const saveImgBtn = document.getElementById("saveImgBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const cards = document.querySelectorAll(".card");
const historyList = document.getElementById("historyList");


/* -----------------------------
   ランダム抽選
-----------------------------*/
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


/* -----------------------------
   カードへ結果を反映
-----------------------------*/
function updateCards() {
  const result = {
    species: pick(speciesList),
    gender: pick(genderList),
    age:    pick(ageList),

    hair:  pick(hairList),
    cloth: pick(clothList),
    motif: pick(motifList),

    mood:  pick(moodList),
    color: pick(colorList),
  };

  // 1枚目
  card1Lines.innerHTML = `
    <div class="line">種族：${result.species}</div>
    <div class="line">性別：${result.gender}</div>
    <div class="line">年齢：${result.age}</div>
  `;

  // 2枚目
  card2Lines.innerHTML = `
    <div class="line">髪型：${result.hair}</div>
    <div class="line">服：${result.cloth}</div>
    <div class="line">モチーフ：${result.motif}</div>
  `;

  // 3枚目
  card3Lines.innerHTML = `
    <div class="line">雰囲気：${result.mood}</div>
    <div class="line">色：${result.color}</div>
  `;

  animateCards();
  saveHistory(result);
}


/* -----------------------------
   カードのアニメーション
-----------------------------*/
function animateCards() {
  cards.forEach(card => card.classList.remove("show"));
  setTimeout(() => {
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add("show"), i * 120);
    });
  }, 50);
}


/* -----------------------------
   履歴保存（localStorage）
-----------------------------*/
function saveHistory(res) {
  let history = JSON.parse(localStorage.getItem("artilotHistory") || "[]");

  history.unshift(res);
  if (history.length > 20) history.pop();

  localStorage.setItem("artilotHistory", JSON.stringify(history));
  renderHistory();
}


/* 履歴表示 */
function renderHistory() {
  let history = JSON.parse(localStorage.getItem("artilotHistory") || "[]");
  historyList.innerHTML = "";

  history.forEach(item => {
    const div = document.createElement("div");
    div.className = "historyItem";
    div.innerHTML = `
      <strong>種族:</strong> ${item.species}, 
      <strong>性別:</strong> ${item.gender}, 
      <strong>年齢:</strong> ${item.age}<br>
      <strong>髪型:</strong> ${item.hair}, 
      <strong>服:</strong> ${item.cloth}, 
      <strong>モチーフ:</strong> ${item.motif}<br>
      <strong>雰囲気:</strong> ${item.mood}, 
      <strong>色:</strong> ${item.color}
    `;
    historyList.appendChild(div);
  });
}

renderHistory();


/* -----------------------------
   PNG生成（白背景）
-----------------------------*/
saveImgBtn.addEventListener("click", () => generateShareImage());

function generateShareImage() {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");

  // 背景白
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // タイトル
  ctx.font = "34px 'Yu Gothic'";
  ctx.fillStyle = "#333";
  ctx.fillText("ARTILOT - デザインお題カード", 40, 60);

  // カード内容
  ctx.font = "22px 'Yu Gothic'";
  ctx.fillText("【キャラ基礎】", 40, 140);
  ctx.fillText(card1Lines.textContent.replace(/\s+/g, " "), 40, 180);

  ctx.fillText("【デザイン構成】", 40, 260);
  ctx.fillText(card2Lines.textContent.replace(/\s+/g, " "), 40, 300);

  ctx.fillText("【雰囲気＆色】", 40, 380);
  ctx.fillText(card3Lines.textContent.replace(/\s+/g, " "), 40, 420);

  // 著作権
  ctx.font = "18px 'Yu Gothic'";
  ctx.fillStyle = "#555";
  ctx.fillText("© 2025 Artilot", 40, 560);

  // 保存
  const link = document.createElement("a");
  link.download = "artilot_cards.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}


/* -----------------------------
   クリアボタン
-----------------------------*/
clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("artilotHistory");
  renderHistory();
});


/* -----------------------------
   メイン操作
-----------------------------*/
drawBtn.addEventListener("click", updateCards);
