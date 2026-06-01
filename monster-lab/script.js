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
  const result = document.getElementById("result");
  const dataStatus = document.getElementById("dataStatus");
  const requestForm = document.getElementById("requestForm");
  const requestStatus = document.getElementById("requestStatus");

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
    if (!res.ok) throw new Error("データ取得に失敗しました");
    return await res.json();
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

  function normalizeMonsterData(data) {
    const normalized = {};
    REQUIRED_LISTS.forEach(key => {
      normalized[key] = normalizeList(data[key], key);
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
      status,
      danger: status,
      size,
      createdAt: new Date().toISOString()
    };
  }

  function renderMonster(monster) {
    result.innerHTML = `
      <div class="paper-stack" aria-hidden="true">
        <span class="paper-sheet sheet-a"></span>
        <span class="paper-sheet sheet-b"></span>
        <span class="paper-sheet sheet-c"></span>
        <span class="paper-sheet sheet-d"></span>
      </div>
      <article class="specimen-card">
        <div class="specimen-header">
          <span class="specimen-no">NO.${monster.specimen}</span>
          <span class="report-title">報告書</span>
        </div>
        <div class="report-subhead">
          <h2 class="monster-name">${escapeHtml(monster.name)}</h2>
          <div class="danger-box">
            <span>RANK</span>
            <strong>${escapeHtml(monster.status)}</strong>
          </div>
        </div>
        <dl class="data-grid">
          <div class="data-item"><dt>CATEGORY</dt><dd>${escapeHtml(monster.category)}</dd></div>
          <div class="data-item"><dt>SPECIES</dt><dd>${escapeHtml(monster.species)}</dd></div>
          <div class="data-item"><dt>NICKNAME</dt><dd>${escapeHtml(monster.nickname)}</dd></div>
          <div class="data-item"><dt>SCALE</dt><dd>${escapeHtml(monster.size)}</dd></div>
          <div class="data-item full"><dt>BODY</dt><dd>${escapeHtml(monster.bodyFeature)}</dd></div>
          <div class="data-item full"><dt>FACE</dt><dd>${escapeHtml(monster.faceFeature)}</dd></div>
          <div class="data-item full"><dt>BEHAVIOR</dt><dd>${escapeHtml(monster.behavior)}</dd></div>
          <div class="data-item full"><dt>ABILITY</dt><dd>${escapeHtml(monster.ability)}</dd></div>
          <div class="data-item full"><dt>SCENE</dt><dd>${escapeHtml(monster.habitat)}</dd></div>
        </dl>
        <p class="description">
          ${escapeHtml(monster.comment)}
        </p>
      </article>
    `;
  }

  function renderLoadError(error) {
    result.innerHTML = `
      <div class="placeholder">
        <div class="placeholder-icon">ERROR</div>
        <div class="placeholder-text">${escapeHtml(error.message)}</div>
      </div>
    `;
  }

  window.generateMonster = function generateMonster() {
    if (!monsterData) return null;
    currentMonster = buildMonster();
    renderMonster(currentMonster);
    saveBtn.disabled = false;
    saveBtn.textContent = "このアイデアを保存する";
    return currentMonster;
  };

  generateBtn.addEventListener("click", () => {
    window.generateMonster();
  });

  saveBtn.addEventListener("click", () => {
    if (!currentMonster) return;
    saveMonsterToArchive(currentMonster);
    saveBtn.disabled = true;
    saveBtn.textContent = "アイデアを保存しました";
  });

  function setupRequestForm() {
    if (!requestForm) return;
    requestForm.addEventListener("submit", event => {
      event.preventDefault();
      if (requestStatus) {
        requestStatus.textContent = "リクエストありがとうございます。スプレッドシートに追記して反映してください。";
      }
      requestForm.reset();
    });
  }

  async function init() {
    generateBtn.disabled = true;
    setStatus("ガチャデータを読み込み中...");
    setupRequestForm();
    renderArchive();

    try {
      monsterData = normalizeMonsterData(await loadMonsterData());
      generateBtn.disabled = false;
      setStatus("ガチャデータを読み込みました。各シートから独立抽選します。");
    } catch (error) {
      setStatus("ガチャデータを読み込めませんでした。", true);
      renderLoadError(error);
    }
  }

  init();
});
