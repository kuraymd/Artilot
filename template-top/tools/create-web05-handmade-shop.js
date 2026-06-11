const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const outRoot = path.join(root, "web05");

const themes = [
  {
    key: "Cool",
    name: "Cool",
    mood: "clear studio mood",
    colors: {
      bg: "#eef7f8",
      paper: "#ffffff",
      ink: "#20333a",
      muted: "#667b82",
      primary: "#267985",
      accent: "#e1a86d",
      soft: "#d9eef1",
      deep: "#15343a",
      line: "#b7d7dc",
    },
  },
  {
    key: "Dark",
    name: "Dark",
    mood: "gallery night mood",
    colors: {
      bg: "#121216",
      paper: "#1d1d25",
      ink: "#f4efe7",
      muted: "#b8b0a7",
      primary: "#d8a84e",
      accent: "#69b8c0",
      soft: "#292a33",
      deep: "#0a0a0d",
      line: "#3a3a46",
    },
  },
  {
    key: "Girly",
    name: "Girly",
    mood: "soft ribbon mood",
    colors: {
      bg: "#fff4f7",
      paper: "#ffffff",
      ink: "#51323c",
      muted: "#8b6772",
      primary: "#d65f86",
      accent: "#c88d4e",
      soft: "#ffe1ea",
      deep: "#6b3245",
      line: "#f3c0cf",
    },
  },
  {
    key: "Minimal",
    name: "Minimal",
    mood: "quiet paper mood",
    colors: {
      bg: "#f6f5f0",
      paper: "#ffffff",
      ink: "#262620",
      muted: "#75746d",
      primary: "#33332d",
      accent: "#9f7f46",
      soft: "#e9e6dc",
      deep: "#181812",
      line: "#d8d4c8",
    },
  },
  {
    key: "RetroPop",
    name: "RetroPop",
    mood: "colorful market mood",
    colors: {
      bg: "#fff7d7",
      paper: "#fffdf4",
      ink: "#30264f",
      muted: "#6f628c",
      primary: "#ec5d3d",
      accent: "#1e9c8d",
      soft: "#ffd7a8",
      deep: "#312060",
      line: "#efb86f",
    },
  },
];

const files = {
  "hero-main.svg": "Online market shelf",
  "about-maker.svg": "Maker portrait corner",
  "product-01.svg": "Pearl earrings",
  "product-02.svg": "Linen pouch",
  "product-03.svg": "Botanical candle",
  "product-04.svg": "Art print set",
  "product-05.svg": "Ceramic brooch",
  "product-06.svg": "Gift card",
  "gallery-01.svg": "Packing desk",
  "gallery-02.svg": "Market display",
  "gallery-03.svg": "Handmade detail",
  "map-placeholder.svg": "Event map",
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));
}

function svg(label, theme, index) {
  const c = theme.colors;
  const alt = esc(label);
  const rotate = index % 2 === 0 ? "-8" : "7";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${alt}">
  <rect width="1200" height="800" fill="${c.soft}"/>
  <rect x="70" y="70" width="1060" height="660" rx="36" fill="${c.paper}" stroke="${c.line}" stroke-width="6"/>
  <circle cx="990" cy="170" r="84" fill="${c.accent}" opacity=".28"/>
  <circle cx="210" cy="620" r="120" fill="${c.primary}" opacity=".16"/>
  <g transform="translate(600 405) rotate(${rotate})">
    <rect x="-230" y="-170" width="460" height="340" rx="30" fill="${c.bg}" stroke="${c.primary}" stroke-width="8"/>
    <path d="M-150 -55h300M-150 20h300M-150 95h205" stroke="${c.line}" stroke-width="18" stroke-linecap="round"/>
    <circle cx="-110" cy="-105" r="32" fill="${c.primary}"/>
    <circle cx="0" cy="-105" r="32" fill="${c.accent}"/>
    <circle cx="110" cy="-105" r="32" fill="${c.deep}" opacity=".75"/>
  </g>
  <text x="600" y="704" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="${c.ink}">${alt}</text>
</svg>
`;
}

function html(theme) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atelier Lumi - Handmade Shop Template ${theme.name}</title>
  <meta name="description" content="ハンドメイド作家・小さなショップ向けのHTML/CSS/JSテンプレートです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#top" aria-label="Atelier Lumi ホーム">Atelier Lumi</a>
    <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#products">Products</a>
      <a href="#about">About</a>
      <a href="#event">Event</a>
      <a href="#guide">Guide</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${theme.mood}</p>
        <h1>日々にそっと寄り添う、手しごとの小さなお店。</h1>
        <p class="lead">アクセサリー、布小物、紙もの、ギフト雑貨などを紹介できるハンドメイドショップ向けテンプレートです。</p>
        <div class="hero-actions">
          <a class="button primary" href="#products">作品を見る</a>
          <a class="button ghost" href="https://example.com/shop">オンラインショップ</a>
        </div>
      </div>
      <div class="hero-visual">
        <img src="images/hero-main.svg" alt="ハンドメイド作品が並ぶショップイメージ">
      </div>
    </section>

    <section class="notice-strip" aria-label="お知らせ">
      <span>New collection is open</span>
      <span>6/15 Tokyo Handmade Market</span>
      <span>Gift wrapping available</span>
    </section>

    <section id="products" class="section products">
      <div class="section-heading">
        <p class="eyebrow">Products</p>
        <h2>おすすめ作品</h2>
        <p>写真、価格、説明文を差し替えるだけで、販売中の作品や季節のコレクションを見せられます。</p>
      </div>
      <div class="product-grid">
        ${[
          ["product-01.svg", "淡水パールの耳飾り", "¥3,200"],
          ["product-02.svg", "リネンの巾着ポーチ", "¥2,400"],
          ["product-03.svg", "ボタニカルキャンドル", "¥1,800"],
          ["product-04.svg", "小さなアートプリント", "¥1,500"],
          ["product-05.svg", "陶器のブローチ", "¥2,900"],
          ["product-06.svg", "ギフトカードセット", "¥900"],
        ].map(([img, title, price]) => `<article class="product-card">
          <img src="images/${img}" alt="${title}">
          <div>
            <h3>${title}</h3>
            <p>一点ずつ表情の違う、暮らしに取り入れやすい作品です。</p>
            <span>${price}</span>
          </div>
        </article>`).join("\n        ")}
      </div>
    </section>

    <section id="about" class="section about">
      <div class="about-image">
        <img src="images/about-maker.svg" alt="制作風景のイメージ">
      </div>
      <div class="about-copy">
        <p class="eyebrow">About</p>
        <h2>作り手のこと</h2>
        <p>Atelier Lumiは、日常に小さな光を添える雑貨を制作する架空のハンドメイドブランドです。素材感、使いやすさ、贈りものにしたくなる佇まいを大切にしています。</p>
        <dl class="profile-list">
          <div><dt>制作内容</dt><dd>アクセサリー / 布小物 / 紙雑貨</dd></div>
          <div><dt>活動場所</dt><dd>オンラインショップ / イベント出店</dd></div>
          <div><dt>受付</dt><dd>オーダー相談・委託販売のご相談</dd></div>
        </dl>
      </div>
    </section>

    <section class="section gallery">
      <div class="section-heading">
        <p class="eyebrow">Gallery</p>
        <h2>制作とお届け</h2>
      </div>
      <div class="gallery-grid">
        <img src="images/gallery-01.svg" alt="梱包作業のイメージ">
        <img src="images/gallery-02.svg" alt="イベント出店のイメージ">
        <img src="images/gallery-03.svg" alt="作品ディテールのイメージ">
      </div>
    </section>

    <section id="event" class="section event">
      <div>
        <p class="eyebrow">Event</p>
        <h2>出店予定</h2>
        <p>イベント名や日程を差し替えて、ポップアップやマルシェの案内ページとしても使えます。</p>
      </div>
      <div class="event-card">
        <span>2026.07.20</span>
        <h3>Summer Handmade Market</h3>
        <p>東京都内イベントスペース / 11:00 - 18:00</p>
      </div>
    </section>

    <section id="guide" class="section guide">
      <div class="section-heading">
        <p class="eyebrow">Guide</p>
        <h2>ご購入の流れ</h2>
      </div>
      <ol class="step-list">
        <li><span>01</span><strong>作品を選ぶ</strong><p>オンラインショップやイベントでご希望の作品をお選びください。</p></li>
        <li><span>02</span><strong>注文する</strong><p>配送方法、ラッピング、数量を確認してご注文ください。</p></li>
        <li><span>03</span><strong>お届け</strong><p>通常3〜5営業日以内に発送します。受注制作の場合は個別にご案内します。</p></li>
      </ol>
    </section>

    <section id="contact" class="section contact">
      <div>
        <p class="eyebrow">Contact</p>
        <h2>お問い合わせ</h2>
        <p>オーダー制作、イベント出店、委託販売などのご相談はこちらから。</p>
      </div>
      <div class="contact-actions">
        <a class="button primary" href="https://example.com/contact">問い合わせる</a>
        <a class="button ghost" href="https://www.instagram.com/">Instagram</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Atelier Lumi. All rights reserved.</p>
    <a href="#top">Back to top</a>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
`;
}

function css(theme) {
  const c = theme.colors;
  return `:root {
  --bg: ${c.bg};
  --paper: ${c.paper};
  --ink: ${c.ink};
  --muted: ${c.muted};
  --primary: ${c.primary};
  --accent: ${c.accent};
  --soft: ${c.soft};
  --deep: ${c.deep};
  --line: ${c.line};
  --shadow: 0 24px 70px rgba(0, 0, 0, 0.12);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  line-height: 1.8;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 76px;
  padding: 18px clamp(18px, 4vw, 56px);
  background: color-mix(in srgb, var(--paper) 88%, transparent);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(16px);
}

.logo {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2vw, 30px);
  font-size: 0.9rem;
  font-weight: 700;
}

.site-nav a {
  color: var(--muted);
}

.site-nav a:hover {
  color: var(--primary);
}

.nav-toggle {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  background: var(--paper);
  padding: 10px;
}

.nav-toggle span {
  display: block;
  height: 2px;
  margin: 6px 0;
  background: var(--ink);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.92fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: center;
  min-height: calc(100vh - 76px);
  padding: clamp(48px, 8vw, 110px) clamp(20px, 5vw, 76px);
}

.hero-copy {
  max-width: 720px;
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--primary);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  overflow-wrap: anywhere;
}

h1 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.5rem, 6vw, 5.8rem);
  line-height: 1.05;
  letter-spacing: 0;
}

h2 {
  margin: 0 0 18px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 4vw, 3.8rem);
  line-height: 1.15;
  letter-spacing: 0;
}

h3 {
  margin: 0 0 8px;
  font-size: 1.05rem;
  line-height: 1.5;
}

.lead {
  max-width: 620px;
  margin: 28px 0 0;
  color: var(--muted);
  font-size: 1.08rem;
}

.hero-actions,
.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 12px 22px;
  border: 1px solid var(--primary);
  font-size: 0.9rem;
  font-weight: 800;
}

.button.primary {
  background: var(--primary);
  color: var(--paper);
}

.button.ghost {
  color: var(--primary);
}

.hero-visual {
  position: relative;
}

.hero-visual::before {
  content: "";
  position: absolute;
  inset: -18px;
  border: 1px solid var(--line);
  transform: rotate(-2deg);
}

.hero-visual img {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  box-shadow: var(--shadow);
}

.notice-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-block: 1px solid var(--line);
  background: var(--deep);
  color: var(--paper);
}

.notice-strip span {
  min-height: 64px;
  display: grid;
  place-items: center;
  padding: 12px;
  border-right: 1px solid color-mix(in srgb, var(--paper) 20%, transparent);
  font-size: 0.82rem;
  font-weight: 800;
  text-align: center;
}

.section {
  padding: clamp(68px, 9vw, 120px) clamp(20px, 5vw, 76px);
}

.section-heading {
  max-width: 720px;
  margin-bottom: 38px;
}

.section-heading p:not(.eyebrow),
.about-copy p,
.event p,
.contact p {
  color: var(--muted);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.product-card {
  display: grid;
  background: var(--paper);
  border: 1px solid var(--line);
}

.product-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-bottom: 1px solid var(--line);
}

.product-card div {
  padding: 20px;
}

.product-card p {
  min-height: 58px;
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 0.92rem;
}

.product-card span {
  color: var(--primary);
  font-weight: 800;
}

.about {
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1fr);
  gap: clamp(28px, 5vw, 68px);
  align-items: center;
  background: var(--soft);
}

.about-image img {
  width: 100%;
  aspect-ratio: 5 / 4;
  object-fit: cover;
  border: 1px solid var(--line);
}

.profile-list {
  display: grid;
  gap: 12px;
  margin: 30px 0 0;
}

.profile-list div {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.profile-list dt {
  color: var(--primary);
  font-weight: 800;
}

.profile-list dd {
  margin: 0;
  color: var(--muted);
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr;
  gap: 18px;
  align-items: stretch;
}

.gallery-grid img {
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
  border: 1px solid var(--line);
}

.event {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  gap: 28px;
  align-items: end;
  background: var(--deep);
  color: var(--paper);
}

.event .eyebrow,
.event p {
  color: color-mix(in srgb, var(--paper) 72%, var(--accent));
}

.event-card {
  padding: 28px;
  background: color-mix(in srgb, var(--paper) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--paper) 26%, transparent);
}

.event-card span {
  color: var(--accent);
  font-weight: 800;
}

.step-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.step-list li {
  min-height: 220px;
  padding: 24px;
  background: var(--paper);
  border: 1px solid var(--line);
}

.step-list span {
  display: inline-flex;
  margin-bottom: 24px;
  color: var(--accent);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2rem;
  font-weight: 700;
}

.step-list p {
  margin: 10px 0 0;
  color: var(--muted);
}

.contact {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  background: var(--soft);
}

.contact-actions {
  margin-top: 0;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 26px clamp(20px, 5vw, 76px);
  background: var(--deep);
  color: var(--paper);
  font-size: 0.86rem;
}

.site-footer p {
  margin: 0;
}

@media (max-width: 900px) {
  .nav-toggle {
    display: block;
  }

  .site-nav {
    position: fixed;
    inset: 76px 0 auto 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 18px 20px 24px;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
  }

  .site-nav.is-open {
    display: flex;
  }

  .site-nav a {
    padding: 12px 0;
  }

  .hero,
  .about,
  .event,
  .contact {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
  }

  .product-grid,
  .step-list,
  .notice-strip {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .contact-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 560px) {
  .site-header {
    padding-inline: 16px;
  }

  .hero,
  .section {
    padding-inline: 16px;
  }

  .hero-actions,
  .contact-actions {
    display: grid;
  }

  .button {
    width: 100%;
  }

  .profile-list div {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .site-footer {
    flex-direction: column;
  }
}
`;
}

function js() {
  return `const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "メニューを開く");
    });
  });
}
`;
}

function readme(theme) {
  return `# Handmade Shop Template ${theme.name}

ハンドメイド作家・小さなショップ向けのWebサイトテンプレートです。
作品紹介、作家プロフィール、出店予定、ご購入の流れ、お問い合わせ導線を1ページにまとめています。

## 編集する主な場所

- \`index.html\`: 店名、文章、価格、リンク、イベント情報
- \`css/style.css\`: 色、余白、文字サイズ、レイアウト
- \`js/main.js\`: スマートフォン用メニューの開閉
- \`images/\`: 作品写真、プロフィール写真、ギャラリー画像

## 画像の差し替え

\`images\` フォルダ内のSVG画像はサンプルです。
実際に使用する場合は、同じファイル名のまま写真に差し替えるか、HTML内の画像パスを変更してください。

## 注意

このテンプレートはHTML/CSS/JavaScriptで作られた静的サイトです。
問い合わせフォームの送信処理、決済機能、カート機能、サーバー設定は含まれていません。
`;
}

const license = `LICENSE / ライセンス
====================

Copyright (c) 2026 IHYLI / kurayamad
All Rights Reserved.

This template ("the Template") is sold and distributed by IHYLI.
本テンプレートは、IHYLIが制作・販売するWebサイトテンプレートです。

PERMITTED USES / 利用可能な範囲
--------------------------------
- Personal use
  個人利用

- Commercial use for your own projects, clients, or business
  ご自身のプロジェクト、クライアント案件、事業目的での商用利用

- Modifying and customizing the Template for your own use
  ご自身の用途に合わせた編集・カスタマイズ

PROHIBITED USES / 禁止事項
---------------------------
- Redistribution of the Template, in whole or in part, for free or for payment
  本テンプレートの全部または一部を、無料・有料を問わず再配布すること

- Reselling or sublicensing the Template as a standalone product or as part of a template pack
  本テンプレートを単体または素材集・テンプレート集として転売、再販売、サブライセンスすること

- Claiming the Template as your own original work
  本テンプレートを自身のオリジナル作品として公開・販売すること

- Sharing, uploading, or making the Template publicly available for others to download
  第三者がダウンロードできる形で共有、アップロード、公開すること

- Using the Template as training data for AI systems
  AIの学習データとして使用すること

- Registering or selling the Template as an NFT
  NFTとして登録・販売すること

DISCLAIMER / 免責事項
----------------------
This Template is provided "as is" without warranty of any kind.
IHYLI is not liable for any damages arising from the use of this Template.

本テンプレートは現状有姿で提供されます。
IHYLIは本テンプレートの使用によって生じたいかなる損害についても責任を負いません。

CONTACT / お問い合わせ
-----------------------
Mail: ihyli.info@gmail.com
`;

fs.rmSync(outRoot, { recursive: true, force: true });
fs.mkdirSync(outRoot, { recursive: true });

for (const theme of themes) {
  const dir = path.join(outRoot, `Handmade-Shop-Template-${theme.key}`);
  fs.mkdirSync(path.join(dir, "css"), { recursive: true });
  fs.mkdirSync(path.join(dir, "js"), { recursive: true });
  fs.mkdirSync(path.join(dir, "images"), { recursive: true });

  fs.writeFileSync(path.join(dir, "index.html"), html(theme), "utf8");
  fs.writeFileSync(path.join(dir, "css", "style.css"), css(theme), "utf8");
  fs.writeFileSync(path.join(dir, "js", "main.js"), js(), "utf8");
  fs.writeFileSync(path.join(dir, "README_はじめにお読みください.txt"), readme(theme), "utf8");
  fs.writeFileSync(path.join(dir, "LICENSE_ライセンス.txt"), license, "utf8");

  let i = 0;
  for (const [file, label] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, "images", file), svg(label, theme, i), "utf8");
    i += 1;
  }
}

console.log(`Created ${themes.length} templates in ${outRoot}`);
