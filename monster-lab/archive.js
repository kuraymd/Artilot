const ARCHIVE_STORAGE_KEY = "monsterLabArchive";

function escapeArchiveHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}

function getArchive() {
  try {
    const archive = JSON.parse(localStorage.getItem(ARCHIVE_STORAGE_KEY) || "[]");
    return Array.isArray(archive) ? archive : [];
  } catch (error) {
    return [];
  }
}

function setArchive(archive) {
  localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(archive));
}

function saveMonsterToArchive(monster) {
  const archive = getArchive();
  archive.unshift(monster);
  setArchive(archive);
  renderArchive();
}

function deleteMonsterFromArchive(id) {
  setArchive(getArchive().filter(monster => monster.id !== id));
  renderArchive();
}

function renderArchive() {
  const list = document.getElementById("archiveList");
  const count = document.getElementById("archiveCount");
  if (!list || !count) return;

  const archive = getArchive();
  count.textContent = archive.length > 0 ? `${archive.length}件` : "";

  if (archive.length === 0) {
    list.innerHTML = '<div class="archive-empty">NO IDEAS SAVED</div>';
    return;
  }

  list.innerHTML = archive.map(monster => {
    const name = monster.name || "未命名の標本";
    const category = monster.category || monster.themeLabel || "未分類";
    const rank = monster.status || monster.danger || "-";
    const species = monster.species || monster.motif || "-";
    const body = monster.bodyFeature || monster.feature || monster.trait || "-";
    const habitat = monster.habitat || monster.scene || "-";

    return `
      <article class="archive-card">
        <div class="archive-card-info">
          <div class="archive-card-name">${escapeArchiveHtml(name)}</div>
          <div class="archive-card-meta">
            No.${escapeArchiveHtml(monster.specimen)} / ${escapeArchiveHtml(category)} / RANK:${escapeArchiveHtml(rank)}<br>
            ${escapeArchiveHtml(species)} - ${escapeArchiveHtml(body)}<br>
            ${escapeArchiveHtml(habitat)}
          </div>
        </div>
        <button class="btn-delete" type="button" data-delete-id="${escapeArchiveHtml(monster.id)}" aria-label="${escapeArchiveHtml(name)}を削除">DELETE</button>
      </article>
    `;
  }).join("");

  list.querySelectorAll("[data-delete-id]").forEach(button => {
    button.addEventListener("click", () => deleteMonsterFromArchive(button.dataset.deleteId));
  });
}
