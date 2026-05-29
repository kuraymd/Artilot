const galleryItems = [
  { title: "Retro Chili", tag: "Character", image: "/image/illustration/gallery/レトロチリサイン追加.JPG" },
  { title: "Crimson Cherry", tag: "Character", image: "/image/illustration/gallery/クリムゾンチェリーサイン追加.jpg" },
  { title: "Mulberry Pie", tag: "Character", image: "/image/illustration/gallery/マルベリーパイサイン追加.JPG" },
  { title: "Pina Colada", tag: "Character", image: "/image/illustration/gallery/ピニャコラーダサイン追加.JPG" },
  { title: "Sticker Character", tag: "Character", image: "/image/illustration/gallery/IMG_3203.JPG" },
  { title: "Color Mood", tag: "Pattern", image: "/image/illustration/gallery/IMG_3204.JPG" },
  { title: "Tiny World", tag: "Artwork", image: "/image/illustration/gallery/IMG_3139.JPG" },
  { title: "Illustration Mix", tag: "Artwork", image: "/image/illustration/gallery/IMG_2626.JPG" },
  { title: "Retro Pattern", tag: "Pattern", image: "/image/illustration/gallery/IMG_2719.JPG" },
  { title: "Character Study", tag: "Character", image: "/image/illustration/gallery/IMG_2723.JPG" },
  { title: "Visual Note", tag: "Artwork", image: "/image/illustration/gallery/IMG_2823.JPG" },
  { title: "Pop Motif", tag: "Pattern", image: "/image/illustration/gallery/IMG_2881.JPG" },
];

const goodsItems = [
  { title: "Goods 01", image: "/image/goods/01.png" },
  { title: "Goods 02", image: "/image/goods/02.webp" },
  { title: "Goods 03", image: "/image/goods/03.webp" },
  { title: "Goods 04", image: "/image/goods/04.png" },
  { title: "Goods 05", image: "/image/goods/05.png" },
  { title: "Goods 06", image: "/image/goods/06.webp" },
  { title: "Goods 07", image: "/image/goods/07.webp" },
  { title: "Goods 08", image: "/image/goods/08.webp" },
  { title: "Goods 09", image: "/image/goods/09.webp" },
  { title: "Goods 10", image: "/image/goods/10.webp" },
  { title: "Goods 11", image: "/image/goods/11.webp" },
  { title: "Goods 12", image: "/image/goods/12.webp" },
  { title: "Goods 13", image: "/image/goods/13.webp" },
  { title: "Goods 14", image: "/image/goods/14.webp" },
  { title: "Goods 15", image: "/image/goods/15.webp" },
  { title: "Goods 16", image: "/image/goods/16.webp" },
];

function escapeDetailHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });
}

function createDetailCard(item, type) {
  const card = document.createElement("article");
  card.className = `detail-polaroid ${type === "goods" ? "is-goods" : ""}`;
  card.innerHTML = `
    <img src="${escapeDetailHtml(item.image)}" alt="${escapeDetailHtml(item.title)}" loading="lazy" />
    <div class="detail-polaroid-caption">
      <strong>${escapeDetailHtml(item.title)}</strong>
      ${item.tag ? `<span>${escapeDetailHtml(item.tag)}</span>` : ""}
    </div>
  `;
  return card;
}

function renderDetailGrid() {
  const grid = document.querySelector("[data-detail-grid]");
  if (!grid) return;

  const type = grid.dataset.detailGrid;
  const items = type === "goods" ? goodsItems : galleryItems;
  const fragment = document.createDocumentFragment();

  items.forEach((item, index) => {
    const card = createDetailCard(item, type);
    card.style.setProperty("--stack-index", index);
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

renderDetailGrid();
