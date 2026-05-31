document.addEventListener("DOMContentLoaded", () => {
  const themeSelect = document.getElementById("themeSelect");
  const toneSelect = document.getElementById("toneSelect");
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

  function setupTones() {
    Object.entries(TONES).forEach(([key, tone]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = tone.label;
      toneSelect.appendChild(option);
    });
  }

  function buildMonster() {
    const themeKey = themeSelect.value || "deepsea";
    const toneKey = toneSelect.value || "cute";
    const theme = THEMES[themeKey] || THEMES.deepsea;
    const tone = TONES[toneKey] || TONES.cute;
    const specimen = Math.floor(Math.random() * 900) + 100;
    const motif = randomItem(theme.motifs);
    const trait = randomItem([...theme.traits, ...tone.traits]);
    const color = randomItem([...theme.colors, ...tone.colors]);
    const ability = randomItem([...theme.abilities, ...tone.abilities]);
    const habitat = randomItem(theme.habitats);
    const danger = tone.grade;
    const size = randomItem(SIZES);
    const nameWord = randomItem(tone.nameWords);

    const monster = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      specimen,
      themeKey,
      themeLabel: theme.label,
      toneKey,
      toneLabel: tone.label,
      name: `${motif}型${nameWord}`,
      motif,
      trait,
      color,
      ability,
      habitat,
      danger,
      size,
      createdAt: new Date().toISOString()
    };

    return monster;
  }

  function renderMonster(monster) {
    result.innerHTML = `
      <article class="specimen-card">
        <div class="specimen-header">
          <span class="specimen-no">NO.${monster.specimen}</span>
          <span class="report-title">報告書</span>
        </div>
        <div class="report-subhead">
          <h2 class="monster-name">${escapeHtml(monster.name)}</h2>
          <div class="danger-box">
            <span>危険度</span>
            <strong>${escapeHtml(monster.danger)}</strong>
          </div>
        </div>
        <dl class="data-grid">
          <div class="data-item"><dt>THEME</dt><dd>${escapeHtml(monster.themeLabel)}</dd></div>
          <div class="data-item"><dt>TONE</dt><dd>${escapeHtml(monster.toneLabel)}</dd></div>
          <div class="data-item"><dt>MOTIF</dt><dd>${escapeHtml(monster.motif)}</dd></div>
          <div class="data-item"><dt>COLOR</dt><dd>${escapeHtml(monster.color)}</dd></div>
          <div class="data-item"><dt>SCALE</dt><dd>${escapeHtml(monster.size)}</dd></div>
          <div class="data-item full"><dt>TRAIT</dt><dd>${escapeHtml(monster.trait)}</dd></div>
          <div class="data-item full"><dt>ABILITY</dt><dd>${escapeHtml(monster.ability)}</dd></div>
          <div class="data-item full"><dt>SCENE</dt><dd>${escapeHtml(monster.habitat)}</dd></div>
        </dl>
        <p class="description">
          ${escapeHtml(monster.themeLabel)}テーマの創作用アイデア。
          ${escapeHtml(monster.habitat)}を舞台に、${escapeHtml(monster.motif)}の要素と「${escapeHtml(monster.trait)}」性格を組み合わせる。
          トーンは「${escapeHtml(monster.toneLabel)}」。
        </p>
      </article>
    `;
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

  setupThemes();
  setupTones();
  renderArchive();
});
