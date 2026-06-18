document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://script.google.com/macros/s/AKfycbz6wMfIMZtVen0zPwaL6nvUAWhYP1h0muLTnJLANuROJUevpL7RTepQovEzIWXLhGMS/exec";
  const REQUIRED_LISTS = [
    "categories",
    "habitats",
    "species",
    "body_features",
    "face_features",
    "behaviors",
    "abilities",
    "comments",
    "nicknames",
    "statuses"
  ];
  const SIZES = ["手のひらサイズ", "30cm", "80cm", "1.5m", "3m", "7m", "12m", "20m", "ビル1階分", "測定不能"];

  const generateBtn = document.getElementById("generateBtn");
  const saveBtn = document.getElementById("saveBtn");
  const imageSaveBtn = document.getElementById("imageSaveBtn");
  const result = document.getElementById("result");
  const dataStatus = document.getElementById("dataStatus");
  const requestForm = document.getElementById("requestForm");
  const requestStatus = document.getElementById("requestStatus");
  const newsList = document.getElementById("newsList");

  let monsterData = null;
  let currentMonster = null;

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  async function loadMonsterData() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("報告データの取得に失敗しました");
    return await res.json();
  }

  async function postRequest(payload) {
    await fetch(API_URL, {
      method: "POST",
      body: payload,
      mode: "no-cors"
    });
  }

  function valueFromObject(item, key) {
    const fieldMap = {
      categories: ["category", "value", "label", "name", "text"],
      habitats: ["habitat", "value", "label", "name", "text"],
      species: ["species", "value", "label", "name", "text"],
      body_features: ["body_feature", "feature", "value", "label", "name", "text"],
      face_features: ["face_feature", "feature", "value", "label", "name", "text"],
      behaviors: ["behavior", "value", "label", "name", "text"],
      abilities: ["ability", "value", "label", "name", "text"],
      comments: ["comment", "value", "label", "name", "text"],
      statuses: ["status", "rank", "status_type", "capture_status", "value", "label", "name", "text"]
    };

    if (key === "nicknames") {
      const prefix = String(item.nickname_prefix || item.prefix || "").trim();
      const suffix = String(item.nickname_suffix || item.suffix || "").trim();
      if (prefix || suffix) return `${prefix}${suffix}`;
    }

    for (const field of fieldMap[key] || []) {
      if (item[field] !== undefined && item[field] !== null && String(item[field]).trim()) {
        return item[field];
      }
    }

    const firstValue = Object.values(item).find(entry => entry !== undefined && entry !== null && String(entry).trim());
    return firstValue || "";
  }

  function normalizeList(value, key) {
    if (!Array.isArray(value)) return [];
    return value
      .map(item => {
        if (item && typeof item === "object") {
          return valueFromObject(item, key);
        }
        return item;
      })
      .map(item => String(item ?? "").trim())
      .filter(Boolean);
  }

  function normalizeStatuses(value) {
    if (!Array.isArray(value)) return [];

    return value.map(item => {
      if (item && typeof item === "object") {
        const type = String(item.status_type || item.type || item.status || "").trim();
        const detail = String(item.capture_status || item.detail || item.label || "").trim();
        return { type: type || detail, detail: detail || type };
      }

      const label = String(item || "").trim();
      return { type: label, detail: label };
    }).filter(item => item.type || item.detail);
  }

  function normalizeMonsterData(data) {
    const normalized = {};
    REQUIRED_LISTS.forEach(key => {
      normalized[key] = key === "statuses"
        ? normalizeStatuses(data[key])
        : normalizeList(data[key], key);
    });

    const missing = REQUIRED_LISTS.filter(key => normalized[key].length === 0);
    if (missing.length > 0) {
      throw new Error(`データが空です: ${missing.join(", ")}`);
    }

    return normalized;
  }

  function setStatus(message, isError = false) {
    if (!dataStatus) return;
    dataStatus.textContent = message;
    dataStatus.classList.toggle("is-error", isError);
  }

  function buildMonster() {
    const category = pick(monsterData.categories);
    const habitat = pick(monsterData.habitats);
    const species = pick(monsterData.species);
    const bodyFeature = pick(monsterData.body_features);
    const faceFeature = pick(monsterData.face_features);
    const behavior = pick(monsterData.behaviors);
    const ability = pick(monsterData.abilities);
    const comment = pick(monsterData.comments);
    const nickname = pick(monsterData.nicknames);
    const status = pick(monsterData.statuses);
    const size = pick(SIZES);
    const specimen = Math.floor(Math.random() * 900) + 100;

    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      specimen,
      name: `${species}型${nickname}`,
      category,
      themeLabel: category,
      habitat,
      scene: habitat,
      species,
      motif: species,
      bodyFeature,
      faceFeature,
      behavior,
      ability,
      comment,
      nickname,
      status: status.type,
      statusDetail: status.detail,
      danger: status.type,
      size,
      createdAt: new Date().toISOString()
    };
  }

  function renderMonster(monster) {
    const rankClass = /^(SSS|SS|S|AA|A|B|C|D|E)$/i.test(monster.status)
      ? " rank-code"
      : " rank-word";

    result.innerHTML = `
      <div class="paper-stack" aria-hidden="true">
        <span class="paper-sheet sheet-a"></span>
        <span class="paper-sheet sheet-b"></span>
        <span class="paper-sheet sheet-c"></span>
        <span class="paper-sheet sheet-d"></span>
      </div>
      <article class="specimen-card">
        <div class="report-band">MONSTER RESEARCH REPORT</div>
        <div class="specimen-header">
          <span class="specimen-no">No.${monster.specimen}</span>
          <span class="report-title">異常存在報告書</span>
        </div>
        <div class="report-subhead">
          <h2 class="monster-name">${escapeHtml(monster.name)}</h2>
          <div class="danger-box${rankClass}">
            <span>判定</span>
            <strong>${escapeHtml(monster.status)}</strong>
            <small>${escapeHtml(monster.statusDetail)}</small>
          </div>
        </div>
        <dl class="data-grid basic-data">
          <div class="data-item"><dt>CATEGORY</dt><dd>${escapeHtml(monster.category)}</dd></div>
          <div class="data-item"><dt>SPECIES</dt><dd>${escapeHtml(monster.species)}</dd></div>
          <div class="data-item"><dt>NICKNAME</dt><dd>${escapeHtml(monster.nickname)}</dd></div>
          <div class="data-item"><dt>SCALE</dt><dd>${escapeHtml(monster.size)}</dd></div>
        </dl>
        <dl class="observation-grid">
          <div class="observation-item">
            <dt><i data-lucide="dna"></i><span>BODY</span></dt>
            <dd>${escapeHtml(monster.bodyFeature)}</dd>
          </div>
          <div class="observation-item">
            <dt><i data-lucide="smile"></i><span>FACE</span></dt>
            <dd>${escapeHtml(monster.faceFeature)}</dd>
          </div>
          <div class="observation-item">
            <dt><i data-lucide="route"></i><span>BEHAVIOR</span></dt>
            <dd>${escapeHtml(monster.behavior)}</dd>
          </div>
          <div class="observation-item">
            <dt><i data-lucide="sparkles"></i><span>ABILITY</span></dt>
            <dd>${escapeHtml(monster.ability)}</dd>
          </div>
          <div class="observation-item">
            <dt><i data-lucide="map-pin"></i><span>SCENE</span></dt>
            <dd>${escapeHtml(monster.habitat)}</dd>
          </div>
        </dl>
        <div class="report-note">
          <span>RESEARCH NOTE</span>
          <p>${escapeHtml(monster.comment)}</p>
        </div>
        <div class="report-footer-mark">IHYLI · MONSTER LAB</div>
      </article>
    `;

    if (window.lucide) {
      window.lucide.createIcons({
        attrs: { "stroke-width": 1.5 }
      });
    }
  }

  function renderLoadError(error) {
    result.innerHTML = `
      <div class="placeholder">
        <div class="placeholder-icon">ERROR</div>
        <div class="placeholder-text">${escapeHtml(error.message)}</div>
      </div>
    `;
  }

  function normalizeAnnouncement(item) {
    if (typeof item === "string") {
      return { date: "", title: "お知らせ", text: item };
    }

    return {
      date: item.date || item.createdAt || item.day || "",
      title: item.title || item.label || item.heading || "お知らせ",
      text: item.text || item.body || item.message || item.comment || ""
    };
  }

  function getAnnouncements(data) {
    const candidates = [
      data.announcements,
      data.news,
      data.information,
      data.notices,
      data["お知らせ"]
    ];
    const source = candidates.find(Array.isArray);
    return source ? source.map(normalizeAnnouncement).filter(item => item.text || item.title) : [];
  }

  function renderAnnouncements(items) {
    if (!newsList) return;

    if (!items.length) {
      newsList.innerHTML = '<p class="info-empty">まだお知らせはありません。</p>';
      return;
    }

    newsList.innerHTML = items.slice(0, 5).map(item => `
      <article class="info-card">
        ${item.date ? `<span>${escapeHtml(item.date)}</span>` : ""}
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `).join("");
  }

  window.generateMonster = function generateMonster() {
    if (!monsterData) return null;
    currentMonster = buildMonster();
    renderMonster(currentMonster);
    saveBtn.disabled = false;
    saveBtn.textContent = "報告記録に保存する";
    imageSaveBtn.disabled = false;
    imageSaveBtn.textContent = "PNG画像で保存する";
    return currentMonster;
  };

  generateBtn.addEventListener("click", () => {
    window.generateMonster();
  });

  saveBtn.addEventListener("click", () => {
    if (!currentMonster) return;
    saveMonsterToArchive(currentMonster);
    saveBtn.disabled = true;
    saveBtn.textContent = "報告を保存しました";
  });

  imageSaveBtn.addEventListener("click", async () => {
    const card = result.querySelector(".specimen-card");
    if (!card || !currentMonster) return;

    if (typeof html2canvas !== "function") {
      setStatus("画像保存機能を読み込めませんでした。", true);
      return;
    }

    imageSaveBtn.disabled = true;
    imageSaveBtn.textContent = "画像を作成中...";
    result.classList.add("is-exporting");

    try {
      if (document.fonts?.ready) await document.fonts.ready;

      const canvas = await html2canvas(card, {
        backgroundColor: "#e8dfd2",
        scale: 2,
        useCORS: true,
        logging: false
      });

      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("画像を作成できませんでした");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `monster-lab-report-NO-${currentMonster.specimen}.png`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      imageSaveBtn.textContent = "PNG画像を保存しました";
    } catch (error) {
      console.error(error);
      imageSaveBtn.textContent = "画像保存に失敗しました";
    } finally {
      result.classList.remove("is-exporting");
      window.setTimeout(() => {
        imageSaveBtn.disabled = false;
        imageSaveBtn.textContent = "PNG画像で保存する";
      }, 1400);
    }
  });

  function setupRequestForm() {
    if (!requestForm) return;
    requestForm.addEventListener("submit", async event => {
      event.preventDefault();
      const formData = new FormData(requestForm);
      const idea = String(formData.get("idea") || "").trim();

      if (!idea) {
        if (requestStatus) requestStatus.textContent = "調査メモを入力してください。";
        return;
      }

      const payload = new URLSearchParams();
      payload.set("action", "request");
      payload.set("createdAt", new Date().toISOString());
      payload.set("category", String(formData.get("category") || "other"));
      payload.set("idea", idea);

      if (requestStatus) requestStatus.textContent = "調査依頼を送信中です...";

      try {
        await postRequest(payload);
        if (requestStatus) requestStatus.textContent = "調査依頼を受け付けました。ありがとうございます。";
        requestForm.reset();
      } catch (error) {
        if (requestStatus) requestStatus.textContent = "通信に失敗しました。時間をおいてもう一度お試しください。";
      }
    });
  }

  async function init() {
    generateBtn.disabled = true;
    setStatus("研究端末を起動しています...");
    setupRequestForm();
    renderArchive();

    try {
      const data = await loadMonsterData();
      monsterData = normalizeMonsterData(data);
      renderAnnouncements(getAnnouncements(data));
      generateBtn.disabled = false;
      setStatus("報告書作成プロトコル、起動可能です。");
    } catch (error) {
      setStatus("報告データへの接続に失敗しました。", true);
      renderLoadError(error);
    }
  }

  init();
});
