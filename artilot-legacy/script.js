document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     基本ユーティリティ
  ================================ */

  const $ = id => document.getElementById(id);
  const rand = arr => arr[Math.floor(Math.random() * arr.length)];

  /* ===============================
     GAS 設定
  ================================ */

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbw8ID0l6NsJTesuwNGgxojQSYN8E4z_kjN-MItX199J7nKDrED6Ka7MBJ55QEuhRzcvlQ/exec";

  /* ===============================
     グローバル状態
  ================================ */

  let currentResult = null;
  let gachaPool = {};

  /* ===============================
     ガチャデータ取得
  ================================ */

  fetch(`${GAS_URL}?type=gacha_data`)
    .then(res => res.json())
    .then(data => {
      gachaPool = data;
    });

  /* ===============================
     カード生成
  ================================ */

  function drawCards() {
    if (!gachaPool["種族"]) return;

    currentResult = {
      race: rand(gachaPool["種族"]),
      gender: rand(gachaPool["性別"]),
      personality: rand(gachaPool["性格"]),
      hair: rand(gachaPool["髪型"]),
      outfit: rand(gachaPool["服装"]),
      motif: rand(gachaPool["モチーフ"]),
      mood: rand(gachaPool["雰囲気"]),
      theme: rand(gachaPool["テーマ"]),
      composition: rand(gachaPool["構図"]),
      color: rand(gachaPool["カラー"])
    };

    Object.keys(currentResult).forEach(key => {
      if ($(key)) $(key).textContent = currentResult[key];
    });

    saveHistory(currentResult);
  }

  /* ===============================
   シェア
=============================== */

function shareResult(result = currentResult) {
  if (!result) return;

  const SITE_NAME = "ARTILOT";
  const SITE_URL = "https://ihyli.com/";

  const text =
    `${SITE_NAME}\n` +
    Object.values(result).join("\n") +
    "\n\n" +
    SITE_URL;

  if (navigator.share) {
    navigator.share({
      text,
      url: SITE_URL
    });
  } else {
    navigator.clipboard.writeText(text);
    alert("コピーしました");
  }
}

  /* ===============================
     履歴
  ================================ */

  const LABELS = {
    race: "種族 / Race",
    gender: "性別 / Gender",
    personality: "性格 / Personality",
    hair: "髪型 / Hair",
    outfit: "服装 / Outfit",
    motif: "モチーフ / Motif",
    mood: "雰囲気 / Mood",
    theme: "テーマ / Theme",
    composition: "構図 / Composition",
    color: "カラー / Color"
  };

  function saveHistory(result) {
    const list = JSON.parse(localStorage.getItem("artilotHistory") || "[]");
    list.unshift(result);
    localStorage.setItem("artilotHistory", JSON.stringify(list.slice(0, 10)));
    renderHistory();
  }

  function renderHistory() {
    const list = JSON.parse(localStorage.getItem("artilotHistory") || "[]");
    const wrap = $("historyList");
    if (!wrap) return;

    wrap.innerHTML = "";

    list.forEach(r => {
      const card = document.createElement("div");
      card.className = "history-card";

      Object.keys(LABELS).forEach(key => {
        const div = document.createElement("div");
        div.innerHTML = `<small>${LABELS[key]}</small><div>${r[key]}</div>`;
        card.appendChild(div);
      });

      const btn = document.createElement("button");
      btn.textContent = "↗︎ シェア";
      btn.addEventListener("click", () => shareResult(r));

      card.appendChild(btn);
      wrap.appendChild(card);
    });
  }

  /* ===============================
     ボタン
  ================================ */

  $("drawBtn")?.addEventListener("click", drawCards);
  $("shareBtn")?.addEventListener("click", () => shareResult());

  /* ===============================
     モーダル
  ================================ */

  document.querySelectorAll("[data-modal-open]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.modalOpen)?.classList.add("show");
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.modalClose)?.classList.remove("show");
    });
  });

 /* ===============================
   リクエスト送信
================================ */

$("requestSend")?.addEventListener("click", () => {
  const input = $("requestInput");
  const text = input.value.trim();
  if (!text) {
    alert("内容を入力してください");
    return;
  }

  fetch(GAS_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      request: text,
      ua: navigator.userAgent
    })
  });

  alert("リクエストを送信しました！");
  input.value = "";
});



  
  /* ===============================
     初期表示
  ================================ */

  renderHistory();
});
