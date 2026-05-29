document.addEventListener("DOMContentLoaded", () => {
  const themeSelect = document.getElementById("themeSelect");
  const generateBtn = document.getElementById("generateBtn");
  const saveBtn = document.getElementById("saveBtn");
  const result = document.getElementById("result");
  let currentMonster = null;

  const randomItem = items => items[Math.floor(Math.random() * items.length)];
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);

  function setupThemes() {
    Object.entries(THEMES).forEach(([key, theme]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = theme.label;
      themeSelect.appendChild(option);
    });
  }

  function chooseWagara(monster) {
    if (monster.themeKey !== "deepsea") return null;

    const source = [
      monster.motif,
      monster.trait,
      monster.color,
      monster.ability,
      monster.habitat,
      monster.themeLabel
    ].join(" ");

    const matches = WAGARA_PATTERNS.filter(pattern =>
      pattern.tags.some(tag => source.includes(tag))
    );

    return randomItem(matches.length > 0 ? matches : WAGARA_PATTERNS);
  }

  function buildMonster() {
    const themeKey = themeSelect.value || "deepsea";
    const theme = THEMES[themeKey] || THEMES.deepsea;
    const specimen = Math.floor(Math.random() * 900) + 100;
    const motif = randomItem(theme.motifs);
    const trait = randomItem(theme.traits);
    const color = randomItem(theme.colors);
    const ability = randomItem(theme.abilities);
    const habitat = randomItem(theme.habitats);
    const danger = randomItem(DANGER_LEVELS);
    const size = randomItem(SIZES);

    const monster = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      specimen,
      themeKey,
      themeLabel: theme.label,
      name: `${motif}型異常体`,
      motif,
      trait,
      color,
      ability,
      habitat,
      danger,
      size,
      createdAt: new Date().toISOString()
    };

    monster.wagara = chooseWagara(monster);
    return monster;
  }

  function renderMonster(monster) {
    const wagaraHtml = monster.wagara ? `
      <section class="wagara-section">
        <div class="wagara-title">ASSOCIATED PATTERN - 和柄診断</div>
        <div class="wagara-name">${escapeHtml(monster.wagara.name)}</div>
        <p>${escapeHtml(monster.wagara.description)}</p>
      </section>
    ` : "";

    result.innerHTML = `
      <article class="specimen-card">
        <div class="specimen-header">
          <span class="specimen-no">SPECIMEN NO.${monster.specimen}</span>
          <span class="danger-badge">DANGER: ${monster.danger}</span>
        </div>
        <h2 class="monster-name">${escapeHtml(monster.name)}</h2>
        <dl class="data-grid">
          <div class="data-item"><dt>THEME</dt><dd>${escapeHtml(monster.themeLabel)}</dd></div>
          <div class="data-item"><dt>SIZE</dt><dd>${escapeHtml(monster.size)}</dd></div>
          <div class="data-item"><dt>MOTIF</dt><dd>${escapeHtml(monster.motif)}</dd></div>
          <div class="data-item"><dt>COLOR</dt><dd>${escapeHtml(monster.color)}</dd></div>
          <div class="data-item full"><dt>TRAIT</dt><dd>${escapeHtml(monster.trait)}</dd></div>
          <div class="data-item full"><dt>ABILITY</dt><dd>${escapeHtml(monster.ability)}</dd></div>
          <div class="data-item full"><dt>HABITAT</dt><dd>${escapeHtml(monster.habitat)}</dd></div>
        </dl>
        <p class="description">
          ${escapeHtml(monster.habitat)}で確認された${escapeHtml(monster.themeLabel)}系異常標本。
          ${escapeHtml(monster.motif)}に類似した体構造と、${escapeHtml(monster.trait)}性質を併せ持つ。
        </p>
        ${wagaraHtml}
      </article>
    `;
  }

  window.generateMonster = function generateMonster() {
    currentMonster = buildMonster();
    renderMonster(currentMonster);
    saveBtn.disabled = false;
    saveBtn.textContent = "この標本を標本庫に登録する";
    return currentMonster;
  };

  generateBtn.addEventListener("click", () => {
    window.generateMonster();
  });

  saveBtn.addEventListener("click", () => {
    if (!currentMonster) return;
    saveMonsterToArchive(currentMonster);
    saveBtn.disabled = true;
    saveBtn.textContent = "標本庫に登録しました";
  });

  setupThemes();
  renderArchive();
});
