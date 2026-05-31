const TEMPLATE_CONFIG = {
  site: {
    name: "CREATOR NAME",
    title: "CREATOR NAME | Portfolio Template",
    description: "Illustration, commissions, goods, projects, and social links.",
    footer: "Thank you for visiting. © 2026 CREATOR NAME.",
  },
  hero: {
    kicker: "ILLUSTRATION / GOODS / LINKS",
    name: "CREATOR NAME",
    tagline: "Portfolio Template",
    lead:
      "イラスト、制作依頼、グッズ販売、SNSリンクをまとめられるクリエイター向けポートフォリオテンプレートです。",
  },
  about: {
    name: "Creator Name",
    role: "Illustrator",
    body:
      "ここには自己紹介を入れます。得意な制作ジャンル、世界観、依頼で対応できることなどを短くまとめると読みやすくなります。",
    tags: ["Illustration", "Character", "Goods", "Commission", "Portfolio", "SNS"],
  },
  commission: {
    body:
      "アイコン、立ち絵、グッズ用イラスト、素材制作など、受付中の制作内容に合わせて文章を編集してください。",
    links: [
      { label: "依頼フォーム", url: "#", style: "primary" },
      { label: "料金表", url: "#", style: "ghost" },
      { label: "実績を見る", url: "#works", style: "ghost" },
    ],
  },
  movie: {
    body: "制作過程やタイムラプスを公開している場合は、動画チャンネルへの導線として使えます。",
    label: "動画を見る",
    url: "#",
  },
  shop: {
    body: "BOOTH、SUZURI、BASE、Etsyなど、使っているショップへのリンクを置けます。",
    links: [
      { label: "Shop 01", url: "#", style: "primary" },
      { label: "Shop 02", url: "#", style: "ghost" },
      { label: "Shop 03", url: "#", style: "ghost" },
    ],
  },
  projects: [
    {
      title: "Project One",
      displayTitle: ["Project", "One"],
      description: "制作実績、Webツール、販売ページなどを紹介できます。",
      url: "#",
    },
    {
      title: "Project Two",
      displayTitle: ["Project", "Two"],
      description: "リンクが未公開の場合は Coming Soon カードとして表示できます。",
      status: "Coming Soon",
      url: "",
    },
    {
      title: "Project Three",
      displayTitle: ["Project", "Three"],
      description: "カードタイトルは短い単語に分けるとポップに見えます。",
      url: "#",
    },
  ],
  works: [
    { title: "Gallery 01", tag: "Character", colors: ["#41d9ff", "#ff5fb8"] },
    { title: "Gallery 02", tag: "Illustration", colors: ["#b8ff4f", "#7d5cff"] },
    { title: "Gallery 03", tag: "Pattern", colors: ["#ffb84d", "#41d9ff"] },
    { title: "Gallery 04", tag: "Artwork", colors: ["#ff5fb8", "#b8ff4f"] },
    { title: "Gallery 05", tag: "Goods", colors: ["#7d5cff", "#ffb84d"] },
    { title: "Gallery 06", tag: "Design", colors: ["#41d9ff", "#b8ff4f"] },
  ],
  goods: [
    { title: "Goods 01", tag: "Sticker", colors: ["#ffb84d", "#ff5fb8"] },
    { title: "Goods 02", tag: "Acrylic", colors: ["#41d9ff", "#7d5cff"] },
    { title: "Goods 03", tag: "Material", colors: ["#b8ff4f", "#ffb84d"] },
    { title: "Goods 04", tag: "Download", colors: ["#ff5fb8", "#41d9ff"] },
  ],
  socialLinks: [
    { name: "Portfolio", label: "Works", icon: "PF", url: "#", color: "#41d9ff" },
    { name: "Commission", label: "Order", icon: "CM", url: "#commission", color: "#b8ff4f" },
    { name: "Shop", label: "Goods", icon: "SH", url: "#goods", color: "#ffb84d" },
    { name: "Instagram", label: "SNS", icon: "IG", url: "#", color: "#ff7ad9" },
    { name: "YouTube", label: "Movie", icon: "YT", url: "#movie", color: "#ff3b5c" },
    { name: "Contact", label: "Mail / Form", icon: "CT", url: "#commission", color: "#7d9cff" },
  ],
};

const toolsGrid = document.querySelector("#toolsGrid");
const worksGrid = document.querySelector("#worksGrid");
const goodsGrid = document.querySelector("#goodsGrid");
const bannerGrid = document.querySelector("#bannerGrid");
const commissionLinks = document.querySelector("#commissionLinks");
const shopLinks = document.querySelector("#shopLinks");
const nav = document.querySelector("#site-nav");
const menuToggle = document.querySelector(".menu-toggle");

function escapeHtml(value) {
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

function setText(selector, value) {
  const target = document.querySelector(selector);
  if (target && value) target.textContent = value;
}

function applyPageMeta() {
  const { site, hero, about, commission, movie, shop } = TEMPLATE_CONFIG;
  document.title = site.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = site.description;

  setText("[data-site-brand]", site.name);
  setText("[data-footer-brand]", site.name);
  setText("[data-footer-text]", site.footer);
  setText("[data-hero-kicker]", hero.kicker);
  setText("[data-hero-name]", hero.name);
  setText("[data-hero-tagline]", hero.tagline);
  setText("[data-hero-lead]", hero.lead);
  setText("[data-about-name]", about.name);
  setText("[data-about-role]", about.role);
  setText("[data-about-body]", about.body);
  setText("[data-commission-body]", commission.body);
  setText("[data-movie-body]", movie.body);
  setText("[data-shop-body]", shop.body);

  const movieLink = document.querySelector("[data-movie-link]");
  if (movieLink) {
    movieLink.textContent = movie.label;
    movieLink.href = movie.url || "#";
    if (movie.url === "#") movieLink.removeAttribute("target");
  }
}

function createButtonLink(link) {
  const anchor = document.createElement("a");
  anchor.className = `button ${link.style || "ghost"}`;
  anchor.href = link.url || "#";
  anchor.textContent = link.label;
  if (link.url && !link.url.startsWith("#")) {
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
  }
  return anchor;
}

function createToolCard(tool) {
  const card = document.createElement(tool.url ? "a" : "article");
  card.className = `tool-card${tool.url ? "" : " is-coming-soon"}`;

  if (tool.url) {
    card.href = tool.url;
    if (!tool.url.startsWith("#")) {
      card.target = "_blank";
      card.rel = "noreferrer";
    }
  }

  card.setAttribute("aria-label", tool.url ? `${tool.title}を開く` : `${tool.title}は準備中です`);

  const titleArt = (tool.displayTitle || tool.title.split(" "))
    .map((line) => `<span>${escapeHtml(line)}</span>`)
    .join("");
  const safeStatus = tool.status ? `<span class="tool-status">${escapeHtml(tool.status)}</span>` : "";

  card.innerHTML = `
    <div class="tool-thumb">
      <div class="tool-title-art" aria-hidden="true">${titleArt}</div>
    </div>
    <h3>${escapeHtml(tool.title)}</h3>
    ${safeStatus}
    <p>${escapeHtml(tool.description)}</p>
  `;

  return card;
}

function createPlaceholderImage(item, index) {
  const colors = item.colors || ["#41d9ff", "#ff5fb8"];
  const label = escapeHtml(item.title);
  return `
    <div class="template-card-art" style="--art-a: ${escapeHtml(colors[0])}; --art-b: ${escapeHtml(colors[1] || colors[0])};">
      <span class="template-card-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="template-card-label">${label}</span>
    </div>
  `;
}

function createPolaroidCard(item, className, index) {
  const card = document.createElement("article");
  card.className = className;

  const imageMarkup = item.images
    ? item.images
        .map(
          (image, imageIndex) =>
            `<img class="polaroid-art is-${imageIndex + 1}" src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" loading="lazy" />`
        )
        .join("")
    : createPlaceholderImage(item, index);

  card.innerHTML = `
    <div class="polaroid-image-stack">${imageMarkup}</div>
    <div class="work-caption">
      <strong>${escapeHtml(item.title)}</strong>
      ${item.tag ? `<span>${escapeHtml(item.tag)}</span>` : ""}
    </div>
  `;
  return card;
}

function createSocialBanner(link) {
  const banner = document.createElement("a");
  banner.className = "link-banner";
  banner.href = link.url || "#";
  banner.style.setProperty("--banner-color", link.color || "#41d9ff");
  banner.setAttribute("aria-label", `${link.name}を開く`);

  if (link.url && !link.url.startsWith("#")) {
    banner.target = "_blank";
    banner.rel = "noreferrer";
  }

  banner.innerHTML = `
    <span class="banner-icon" aria-hidden="true">${escapeHtml(link.icon)}</span>
    <span class="banner-main">
      <strong>${escapeHtml(link.name)}</strong>
      <span>${escapeHtml(link.label)}</span>
    </span>
    <span class="banner-arrow" aria-hidden="true">VIEW</span>
  `;

  return banner;
}

function renderList(target, items, factory) {
  if (!target) return;
  target.textContent = "";
  const fragment = document.createDocumentFragment();
  items.forEach((item, index) => {
    const element = factory(item, index);
    element.style.setProperty("--stack-index", index);
    fragment.appendChild(element);
  });
  target.appendChild(fragment);
}

function renderTags() {
  const tags = TEMPLATE_CONFIG.about.tags;
  const tagTrack = document.querySelector("#tagTrack");
  const tagText = document.querySelector("#tagText");
  if (!tagTrack) return;

  const repeatedTags = [...tags, ...tags];
  tagTrack.innerHTML = repeatedTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  if (tagText) tagText.textContent = tags.join(", ");
}

function renderButtons(target, links) {
  if (!target) return;
  target.textContent = "";
  const fragment = document.createDocumentFragment();
  links.forEach((link) => fragment.appendChild(createButtonLink(link)));
  target.appendChild(fragment);
}

function setupMenu() {
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

applyPageMeta();
renderTags();
renderButtons(commissionLinks, TEMPLATE_CONFIG.commission.links);
renderButtons(shopLinks, TEMPLATE_CONFIG.shop.links);
renderList(toolsGrid, TEMPLATE_CONFIG.projects, createToolCard);
renderList(worksGrid, TEMPLATE_CONFIG.works, (item, index) => createPolaroidCard(item, "work-card", index));
renderList(goodsGrid, TEMPLATE_CONFIG.goods, (item, index) => createPolaroidCard(item, "goods-card", index));
renderList(bannerGrid, TEMPLATE_CONFIG.socialLinks, createSocialBanner);
setupMenu();
setupReveal();
