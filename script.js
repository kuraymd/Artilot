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
      console.log("ガチャデータ読み込み完了", gachaPool);
    })
    .catch(err => {
      console.error("ガチャデータ取得失敗", err);
      alert("ガチャデータの読み込みに失敗しました");
    });

  /* ===============================
     カード生成
  ================================ */

  function drawCards() {
    if (!gachaPool["種族"]) {
      alert("ガチャデータを読み込み中です。少し待ってください。");
      return;
    }

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

    for (const key in currentResult) {
      if ($(key)) $(key).textContent = currentResult[key];
    }

    saveHistory(currentResult);
  }

  /* ===============================
     シェア
  ================================ */

  function shareResult(result = currentResult) {
    if (!result) return;

    const text = `#今日のARTILOT

${Object.entries(result)
      .map(([_, v]) => v)
      .join("\n")}

ARTILOT
https://kuraymd.github.io/Artilot/`;

    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text).then(() =>
        alert("コピーしました")
      );
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

      const grid = document.createElement("div");
      grid.className = "result-card";

      const left = document.createElement("div");
      left.className = "col";

      const right = document.createElement("div");
      right.className = "col";

      const leftKeys  = ["race", "personality", "outfit", "mood", "composition"];
      const rightKeys = ["gender", "hair", "motif", "theme", "color"];

      leftKeys.forEach(key => {
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `<span>${LABELS[key]}</span><div>${r[key]}</div>`;
        left.appendChild(item);
      });

      rightKeys.forEach(key => {
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `<span>${LABELS[key]}</span><div>${r[key]}</div>`;
        right.appendChild(item);
      });

      grid.appendChild(left);
      grid.appendChild(right);
      card.appendChild(grid);

      const btn = document.createElement("button");
      btn.textContent = "↗︎ シェア";
      btn.onclick = () => shareResult(r);

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
     モーダル制御
  ================================ */

  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("show");
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("show");
  }

  document.querySelectorAll("[data-modal-open]").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.modalOpen));
  });

  document.querySelectorAll("[data-modal-close]").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.modalClose));
  });

  /* ===============================
     初期表示
  ================================ */

  renderHistory();

});
