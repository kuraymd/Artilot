document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     基本ユーティリティ
  ================================ */

  const $ = id => document.getElementById(id);
  const rand = arr => arr[Math.floor(Math.random() * arr.length)];

  const randomColors = () =>
    Array.from({ length: 3 }, () =>
      "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
    );

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

    $("color").textContent = currentResult.color;


    saveHistory(currentResult);
  }

  /* ===============================
     シェア
  ================================ */

  function shareResult(result = currentResult) {
    if (!result) return;

    const text = `#今日のARTILOT

${Object.entries(result)
      .filter(([k]) => k !== "colors")
      .map(([_, v]) => v)
      .join("\n")}

Color: ${result.color}


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

      [
        r.race, r.gender, r.personality, r.hair,
        r.outfit, r.motif, r.mood, r.theme, r.composition, r.color
      ].forEach(v => {
        const item = document.createElement("div");
        item.className = "item";
        item.textContent = v;
        grid.appendChild(item);
      });

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
     リクエスト送信
  ================================ */

  $("requestSend")?.addEventListener("click", () => {
    const input = $("requestInput");
    const text = input.value.trim();
    if (!text) return alert("内容を入力してください");

    fetch(
      `${GAS_URL}?type=requests&request=${encodeURIComponent(text)}`,
      { mode: "no-cors" }
    );

    alert("リクエストを送信しました！");
    input.value = "";
  });

  /* ===============================
     お知らせ取得
  ================================ */

  fetch(`${GAS_URL}?type=announcements`)
    .then(res => res.json())
    .then(list => {
      const top = $("announcementCards");
      const bottom = $("announcements");

      if (top) top.innerHTML = "";
      if (bottom) bottom.innerHTML = "";

      list
        .filter(a => a.visible === true)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(a => {

          if (a.category === "update" && top) {
            const card = document.createElement("div");
            card.className = "news-card";
            card.innerHTML = `
              <time>${a.date}</time>
              <p>${a.title}</p>
            `;
            top.appendChild(card);
          }

          if (bottom) {
            const div = document.createElement("div");
            div.className = "announcement";
            div.innerHTML = `
              <time>${a.date}</time>
              <h4>${a.title}</h4>
              <p>${a.body}</p>
            `;
            bottom.appendChild(div);
          }
        });
    });

/* ===============================
   モーダル制御
=============================== */

// 開く
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("show");
}

// 閉じる
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("show");
}

// 開くボタン
document.querySelectorAll("[data-modal-open]").forEach(btn => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.modalOpen);
  });
});

// 閉じるボタン
document.querySelectorAll("[data-modal-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    closeModal(btn.dataset.modalClose);
  });
});


  
});
