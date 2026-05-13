const ARCHIVE_STORAGE_KEY = "monsterLabArchive";

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
  count.textContent = archive.length > 0 ? `${archive.length} 件` : "";

  if (archive.length === 0) {
    list.innerHTML = '<div class="archive-empty">NO SPECIMENS REGISTERED</div>';
    return;
  }

  list.innerHTML = archive.map(monster => `
    <article class="archive-card">
      <div class="archive-card-info">
        <div class="archive-card-name">${monster.name}</div>
        <div class="archive-card-meta">
          No.${monster.specimen} / ${monster.themeLabel} / DANGER:${monster.danger}<br>
          ${monster.motif} - ${monster.trait}<br>
          ${monster.habitat}
        </div>
        ${monster.wagara ? `<div class="archive-card-wagara">和柄: ${monster.wagara.name}</div>` : ""}
      </div>
      <button class="btn-delete" type="button" data-delete-id="${monster.id}" aria-label="${monster.name}を削除">DELETE</button>
    </article>
  `).join("");

  list.querySelectorAll("[data-delete-id]").forEach(button => {
    button.addEventListener("click", () => deleteMonsterFromArchive(button.dataset.deleteId));
  });
}
