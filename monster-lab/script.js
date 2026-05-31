document.addEventListener("DOMContentLoaded", () => {
  const GAS_URL = "";

  const themeSelect = document.getElementById("themeSelect");
  const toneSelect = document.getElementById("toneSelect");
  const generateBtn = document.getElementById("generateBtn");
  const saveBtn = document.getElementById("saveBtn");
  const result = document.getElementById("result");
  const requestForm = document.getElementById("requestForm");
  const requestStatus = document.getElementById("requestStatus");
  const newsList = document.getElementById("newsList");
  let currentMonster = null;
  let gachaSource = createFallbackSource();

  const randomItem = items => items[Math.floor(Math.random() * items.length)];
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);

  function slugify(value, prefix) {
    return `${prefix}-${String(value).trim().toLowerCase().replace(/\s+/g, "-")}`;
  }

  function toEntry(value, extra = {}) {
    if (value && typeof value === "object") {
      return {
        key: value.key || value.id || slugify(value.label || value.value || value.name, "item"),
        label: value.label || value.value || value.name || "",
        value: value.value || value.label || value.name || "",
        themeKey: value.themeKey || value.theme || "",
        toneKey: value.toneKey || value.tone || "",
        rank: value.rank || value.grade || "",
        ...extra
      };
    }

    return {
      key: slugify(value, "item"),
      label: String(value),
      value: String(value),
      ...extra
    };
  }

  function uniqueEntries(entries) {
    const seen = new Set();
    return entries.filter(entry => {
      const id = `${entry.key}:${entry.value}:${entry.themeKey || ""}:${entry.toneKey || ""}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return entry.value || entry.label;
    });
  }

  function createFallbackSource() {
    const source = {
      themes: [],
      tones: [],
      species: [],
      colors: [],
      features: [],
      abilities: [],
      scenes: [],
      nameWords: []
    };

    Object.entries(THEMES).forEach(([themeKey, theme]) => {
      source.themes.push({ key: themeKey, label: theme.label, value: theme.label });
      source.species.push(...theme.motifs.map(value => toEntry(value, { themeKey })));
      source.colors.push(...theme.colors.map(value => toEntry(value, { themeKey })));
      source.features.push(...theme.traits.map(value => toEntry(value, { themeKey })));
      source.abilities.push(...theme.abilities.map(value => toEntry(value, { themeKey })));
      source.scenes.push(...theme.habitats.map(value => toEntry(value, { themeKey })));
    });

    Object.entries(TONES).forEach(([toneKey, tone]) => {
      source.tones.push({ key: toneKey, label: tone.label, value: tone.label, rank: tone.grade });
      source.nameWords.push(...tone.nameWords.map(value => toEntry(value, { toneKey })));
      source.colors.push(...tone.colors.map(value => toEntry(value, { toneKey })));
      source.features.push(...tone.traits.map(value => toEntry(value, { toneKey })));
      source.abilities.push(...tone.abilities.map(value => toEntry(value, { toneKey })));
    });

    Object.keys(source).forEach(key => {
      source[key] = uniqueEntries(source[key]);
    });

    return source;
  }

  function normalizeCategory(value) {
    const key = String(value || "").trim().toLowerCase();
    const map = {
      theme: "themes",
      "テーマ": "themes",
      tone: "tones",
      "トーン": "tones",
      species: "species",
      "種族": "species",
      motif: "species",
      "モチーフ": "species",
      color: "colors",
      "カラー": "colors",
      "色": "colors",
      feature: "features",
      trait: "features",
      "特徴": "features",
      "性格": "features",
      ability: "abilities",
      "能力": "abilities",
      scene: "scenes",
      habitat: "scenes",
      "シーン": "scenes",
      "場所": "scenes",
      nameword: "nameWords",
      name_word: "nameWords",
      "名前": "nameWords",
      "語尾": "nameWords",
      "■■": "nameWords"
    };

    return map[key] || "";
  }

  function readCell(row, names) {
    for (const name of names) {
      if (row[name] !== undefined && row[name] !== null && String(row[name]).trim()) {
        return String(row[name]).trim();
      }
    }
    return "";
  }

  function normalizeGachaRows(rows) {
    const source = {
      themes: [],
      tones: [],
      species: [],
      colors: [],
      features: [],
      abilities: [],
      scenes: [],
      nameWords: []
    };

    rows.forEach(row => {
      const category = normalizeCategory(readCell(row, ["category", "カテゴリ", "種別"]));
      const value = readCell(row, ["value", "item", "word", "内容", "候補", "名前"]);
      if (!category || !value) {
        normalizeEasyRow(row, source);
        return;
      }

      const themeRef = readCell(row, ["theme", "themeKey", "テーマ"]);
      const toneRef = readCell(row, ["tone", "toneKey", "トーン"]);
      const rank = readCell(row, ["rank", "grade", "ランク"]);

      const entry = toEntry(value, {
        key: readCell(row, ["key", "id", "キー"]) || slugify(value, category),
        label: readCell(row, ["label", "表示名"]) || value,
        themeKey: themeRef,
        toneKey: toneRef,
        rank
      });

      source[category].push(entry);
    });

    Object.keys(source).forEach(key => {
      source[key] = uniqueEntries(source[key]);
    });

    return source;
  }

  function normalizeEasyRow(row, source) {
    const targetTheme = readCell(row, ["targetTheme", "target_theme", "対象テーマ", "絞り込みテーマ"]);
    const targetTone = readCell(row, ["targetTone", "target_tone", "対象トーン", "絞り込みトーン"]);

    const theme = readCell(row, ["theme", "テーマ"]);
    if (theme) {
      source.themes.push(toEntry(theme, {
        key: readCell(row, ["themeKey", "theme_key", "テーマkey", "テーマキー"]) || slugify(theme, "theme"),
        label: readCell(row, ["themeLabel", "theme_label", "テーマ表示名"]) || theme
      }));
    }

    const tone = readCell(row, ["tone", "トーン"]);
    if (tone) {
      source.tones.push(toEntry(tone, {
        key: readCell(row, ["toneKey", "tone_key", "トーンkey", "トーンキー"]) || slugify(tone, "tone"),
        label: readCell(row, ["toneLabel", "tone_label", "トーン表示名"]) || tone,
        rank: readCell(row, ["rank", "ランク"])
      }));
    }

    [
      ["species", "species", ["species", "種族"]],
      ["colors", "color", ["color", "カラー", "色"]],
      ["features", "feature", ["feature", "特徴", "性格"]],
      ["abilities", "ability", ["ability", "能力"]],
      ["scenes", "scene", ["scene", "シーン", "場所"]],
      ["nameWords", "nameWord", ["nameWord", "name_word", "名前", "語尾", "■■"]]
    ].forEach(([sourceKey, prefix, names]) => {
      const item = readCell(row, names);
      if (!item) return;

      source[sourceKey].push(toEntry(item, {
        key: slugify(item, prefix),
        themeKey: targetTheme,
        toneKey: targetTone
      }));
    });
  }

  function mergeWithFallback(source) {
    const fallback = createFallbackSource();
    Object.keys(fallback).forEach(key => {
      if (!source[key] || source[key].length === 0) {
        source[key] = fallback[key];
      }
    });
    return source;
  }

  function getRowsFromResponse(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.gacha)) return data.gacha;
    if (Array.isArray(data.gachaData)) return data.gachaData;
    if (Array.isArray(data["ガチャ内容"])) return data["ガチャ内容"];
    return [];
  }

  async function loadSpreadsheetData() {
    if (!GAS_URL) return;

    try {
      const url = new URL(GAS_URL);
      url.searchParams.set("action", "gacha");
      const response = await fetch(url.toString());
      const data = await response.json();
      const rows = getRowsFromResponse(data);
      if (!rows.length) return;

      gachaSource = mergeWithFallback(normalizeGachaRows(rows));
    } catch (error) {
      console.warn("Spreadsheet data could not be loaded. Fallback data is used.", error);
    }
  }

  function setupSelect(select, entries) {
    select.innerHTML = "";
    entries.forEach(entry => {
      const option = document.createElement("option");
      option.value = entry.key;
      option.textContent = entry.label || entry.value;
      select.appendChild(option);
    });
  }

  function setupControls() {
    setupSelect(themeSelect, gachaSource.themes);
    setupSelect(toneSelect, gachaSource.tones);
  }

  function matchEntry(entry, selectedTheme, selectedTone) {
    const themeOk = !entry.themeKey || entry.themeKey === selectedTheme.key || entry.themeKey === selectedTheme.label;
    const toneOk = !entry.toneKey || entry.toneKey === selectedTone.key || entry.toneKey === selectedTone.label;
    return themeOk && toneOk;
  }

  function pickFrom(category, selectedTheme, selectedTone) {
    const pool = gachaSource[category].filter(entry => matchEntry(entry, selectedTheme, selectedTone));
    return randomItem(pool.length ? pool : gachaSource[category]);
  }

  function buildMonster() {
    const selectedTheme = gachaSource.themes.find(entry => entry.key === themeSelect.value) || gachaSource.themes[0];
    const selectedTone = gachaSource.tones.find(entry => entry.key === toneSelect.value) || gachaSource.tones[0];
    const species = pickFrom("species", selectedTheme, selectedTone);
    const feature = pickFrom("features", selectedTheme, selectedTone);
    const color = pickFrom("colors", selectedTheme, selectedTone);
    const ability = pickFrom("abilities", selectedTheme, selectedTone);
    const scene = pickFrom("scenes", selectedTheme, selectedTone);
    const nameWord = pickFrom("nameWords", selectedTheme, selectedTone);
    const specimen = Math.floor(Math.random() * 900) + 100;
    const rank = selectedTone.rank || randomItem(["C", "B", "A", "S", "SS"]);
    const size = randomItem(SIZES);

    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      specimen,
      themeKey: selectedTheme.key,
      themeLabel: selectedTheme.label,
      toneKey: selectedTone.key,
      toneLabel: selectedTone.label,
      name: `${species.value}型${nameWord.value}`,
      species: species.value,
      motif: species.value,
      feature: feature.value,
      trait: feature.value,
      color: color.value,
      ability: ability.value,
      scene: scene.value,
      habitat: scene.value,
      danger: rank,
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
            <strong>${escapeHtml(monster.danger)}</strong>
          </div>
        </div>
        <dl class="data-grid">
          <div class="data-item"><dt>THEME</dt><dd>${escapeHtml(monster.themeLabel)}</dd></div>
          <div class="data-item"><dt>TONE</dt><dd>${escapeHtml(monster.toneLabel)}</dd></div>
          <div class="data-item"><dt>SPECIES</dt><dd>${escapeHtml(monster.species)}</dd></div>
          <div class="data-item"><dt>COLOR</dt><dd>${escapeHtml(monster.color)}</dd></div>
          <div class="data-item"><dt>SCALE</dt><dd>${escapeHtml(monster.size)}</dd></div>
          <div class="data-item full"><dt>FEATURE</dt><dd>${escapeHtml(monster.feature)}</dd></div>
          <div class="data-item full"><dt>ABILITY</dt><dd>${escapeHtml(monster.ability)}</dd></div>
          <div class="data-item full"><dt>SCENE</dt><dd>${escapeHtml(monster.scene)}</dd></div>
        </dl>
        <p class="description">
          ${escapeHtml(monster.themeLabel)}テーマの創作用アイデア。
          ${escapeHtml(monster.scene)}を舞台に、${escapeHtml(monster.species)}の要素と「${escapeHtml(monster.feature)}」特徴を組み合わせる。
          トーンは「${escapeHtml(monster.toneLabel)}」。
        </p>
      </article>
    `;
  }

  function normalizeNews(item) {
    return {
      date: item.date || item.day || item.month || item["日付"] || "",
      title: item.title || item.label || item["タイトル"] || item["見出し"] || "お知らせ",
      text: item.text || item.body || item.message || item["本文"] || item["内容"] || item["お知らせ"] || ""
    };
  }

  function renderNews(items = []) {
    if (!newsList) return;

    if (!items.length) {
      newsList.innerHTML = '<p class="info-empty">まだお知らせはありません。</p>';
      return;
    }

    newsList.innerHTML = items.slice(0, 5).map(normalizeNews).filter(item => item.text).map(item => `
      <article class="info-card">
        <span>${escapeHtml(item.date)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `).join("");
  }

  async function loadNews() {
    if (!GAS_URL) {
      renderNews([]);
      return;
    }

    try {
      const url = new URL(GAS_URL);
      url.searchParams.set("action", "news");
      const response = await fetch(url.toString());
      const data = await response.json();
      renderNews(Array.isArray(data) ? data : data.news || data["お知らせ"] || []);
    } catch (error) {
      renderNews([]);
    }
  }

  function setupRequestForm() {
    if (!requestForm) return;

    requestForm.addEventListener("submit", async event => {
      event.preventDefault();
      const formData = new FormData(requestForm);
      const idea = String(formData.get("idea") || "").trim();

      if (!idea) {
        requestStatus.textContent = "内容を入力してください。";
        return;
      }

      if (!GAS_URL) {
        requestStatus.textContent = "送信先URLが未設定です。";
        return;
      }

      const payload = new URLSearchParams();
      payload.set("action", "request");
      payload.set("createdAt", new Date().toISOString());
      payload.set("category", String(formData.get("category") || ""));
      payload.set("idea", idea);

      requestStatus.textContent = "送信中です...";

      try {
        await fetch(GAS_URL, {
          method: "POST",
          body: payload,
          mode: "no-cors"
        });
        requestStatus.textContent = "送信しました。ありがとうございます。";
        requestForm.reset();
      } catch (error) {
        requestStatus.textContent = "送信できませんでした。時間をおいてもう一度お試しください。";
      }
    });
  }

  window.generateMonster = function generateMonster() {
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

  async function init() {
    await loadSpreadsheetData();
    setupControls();
    setupRequestForm();
    renderArchive();
    loadNews();
  }

  init();
});
