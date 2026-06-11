const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const root = path.join(repoRoot, "portfolio-template-series");

const themes = [
  {
    key: "playlist",
    file: "playlist.html",
    css: "theme-playlist.css",
    title: "IHYLI Playlist",
    label: "Playlist Style",
    nav: ["About", "Gallery", "Tool", "Goods", "Link"],
    sectionNo: "01 / About",
    sectionTitle: "About",
    intro: "作品、SNS、制作ツール、販売リンクをプレイリストのようにまとめる個人クリエイター向けテンプレート。",
    cardText: "イラストや制作ツールを作っています。",
    worksTitle: "Gallery",
    linksTitle: "Tool / Goods / Link",
    contactTitle: "Contact",
    works: [
      ["Gallery 01", "作品サンプルや制作実績をカードとして掲載できます。"],
      ["Tool Note", "制作ツール、配布物、記事などの導線をまとめられます。"],
      ["Goods List", "ショップや販売ページへのリンクを置けます。"],
    ],
    links: ["Portfolio", "Shop", "X", "Contact"],
  },
  {
    key: "record",
    file: "record.html",
    css: "theme-record.css",
    title: "Amber Records",
    label: "Record Shop Style",
    nav: ["Profile", "Discography", "Live", "Shop", "Contact"],
    sectionNo: "01 / Artist",
    sectionTitle: "Artist Profile",
    intro: "音楽活動者、歌い手、作曲家、DJ向けのレコードショップ風ポートフォリオ。",
    cardText: "New release and artist notes.",
    worksTitle: "Discography",
    linksTitle: "Streaming / Shop",
    contactTitle: "Booking",
    works: [
      ["Single Release", "代表曲や新曲、配信リンクへの導線を掲載できます。"],
      ["Album Notes", "アルバム、EP、参加作品をジャケット風に並べられます。"],
      ["Live Archive", "ライブ、DJイベント、配信履歴をまとめられます。"],
    ],
    links: ["Spotify", "YouTube", "Bandcamp", "Booking"],
  },
  {
    key: "game",
    file: "game.html",
    css: "theme-game.css",
    title: "Player No. 07",
    label: "Game Screen Style",
    nav: ["Status", "Quest", "Archive", "Links", "Message"],
    sectionNo: "01 / Status",
    sectionTitle: "Player Data",
    intro: "VTuber、配信者、ゲーム実況者向けのゲームメニュー画面風テンプレート。",
    cardText: "Streaming status and channel data.",
    worksTitle: "Achievements",
    linksTitle: "Channel Links",
    contactTitle: "Message",
    works: [
      ["Quest Log", "配信企画、コラボ、イベント参加履歴を掲載できます。"],
      ["Highlight", "おすすめ動画や切り抜きへの導線を置けます。"],
      ["Schedule", "配信予定や活動時間の案内にも使えます。"],
    ],
    links: ["YouTube", "Twitch", "X", "Contact"],
  },
  {
    key: "canvas",
    file: "canvas.html",
    css: "theme-canvas.css",
    title: "Small Atelier",
    label: "Canvas / Atelier Style",
    nav: ["Profile", "Gallery", "Order", "Shop", "Contact"],
    sectionNo: "01 / Sketch",
    sectionTitle: "Artist Profile",
    intro: "イラストレーター、作家、ハンドメイド制作者向けのキャンバス風テンプレート。",
    cardText: "Works, notes and commission info.",
    worksTitle: "Gallery",
    linksTitle: "Commission / Shop",
    contactTitle: "Contact Sheet",
    works: [
      ["Character Art", "イラスト、立ち絵、キャラクターデザインを紹介できます。"],
      ["Sketchbook", "制作メモや展示記録をノート風にまとめられます。"],
      ["Commission", "依頼受付、料金表、注意事項への導線に使えます。"],
    ],
    links: ["Portfolio", "Skeb", "Shop", "Instagram"],
  },
  {
    key: "cafe",
    file: "cafe.html",
    css: "theme-cafe.css",
    title: "Mellow Cafe",
    label: "Cafe Menu Style",
    nav: ["About", "Menu", "News", "Shop", "Reserve"],
    sectionNo: "01 / Shop",
    sectionTitle: "About Shop",
    intro: "カフェ、焼き菓子屋、小さなお店、ハンドメイド販売者向けのメニュー表風テンプレート。",
    cardText: "Today's special menu and shop links.",
    worksTitle: "Menu / Works",
    linksTitle: "Shop Links",
    contactTitle: "Reservation",
    works: [
      ["Seasonal Menu", "季節の商品、限定メニュー、人気商品を掲載できます。"],
      ["Price List", "メニュー表やサービス一覧として使えます。"],
      ["Event Shop", "出店情報、オンライン販売、予約導線をまとめられます。"],
    ],
    links: ["Online Shop", "Instagram", "Map", "Reserve"],
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(file, body) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, body, "utf8");
}

function navLinks(theme) {
  const ids = ["about", "works", "links", "contact", "top"];
  return theme.nav
    .map((label, index) => `<a href="#${ids[index]}">${label}</a>`)
    .join("\n        ");
}

function workCards(theme) {
  return theme.works
    .map(
      ([title, body]) => `<article class="work-card">
          <span class="work-thumb"></span>
          <h3>${title}</h3>
          <p>${body}</p>
        </article>`
    )
    .join("\n        ");
}

function linkList(theme) {
  return theme.links.map((label) => `<a href="https://example.com/">${label}</a>`).join("\n        ");
}

function page(theme) {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${theme.label} | Portfolio Template Series</title>
  <meta name="description" content="${theme.intro}">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/${theme.css}">
</head>
<body class="theme-${theme.key}">
  <header class="site-header" id="top">
    <nav class="site-nav" aria-label="Primary navigation">
      <a class="brand" href="../index.html"><span></span>${theme.title}</a>
      <div class="nav-links">
        ${navLinks(theme)}
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-card">
        <p class="track-label">${theme.sectionNo}</p>
        <div class="cover-art">
          <span class="avatar-face"></span>
          <span class="avatar-mark"></span>
        </div>
        <div class="card-rule"></div>
        <h1>${theme.sectionTitle}</h1>
        <p>${theme.cardText}</p>
        <div class="card-rule"></div>
      </div>

      <div class="player-controls" aria-hidden="true">
        <span class="control prev"></span>
        <span class="control play"></span>
        <span class="control next"></span>
      </div>
    </section>

    <section id="about" class="section about">
      <p class="section-kicker">${theme.label}</p>
      <h2>${theme.title}</h2>
      <p>${theme.intro}</p>
    </section>

    <section id="works" class="section works">
      <p class="section-kicker">02 / ${theme.worksTitle}</p>
      <h2>${theme.worksTitle}</h2>
      <div class="card-grid">
        ${workCards(theme)}
      </div>
    </section>

    <section id="links" class="section links">
      <p class="section-kicker">03 / ${theme.linksTitle}</p>
      <h2>${theme.linksTitle}</h2>
      <div class="link-list">
        ${linkList(theme)}
      </div>
    </section>

    <section id="contact" class="section contact">
      <p class="section-kicker">04 / ${theme.contactTitle}</p>
      <h2>${theme.contactTitle}</h2>
      <p>お問い合わせ、依頼、予約、コラボの相談はこちらから受け付けています。</p>
      <a class="button" href="mailto:hello@example.com">Contact</a>
    </section>
  </main>

  <footer class="site-footer">
    <p>© ${theme.title}</p>
    <p>HTML / CSS / JavaScript Template</p>
  </footer>
  <script src="../js/main.js"></script>
</body>
</html>
`;
}

function recordPage(theme) {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${theme.label} | Portfolio Template Series</title>
  <meta name="description" content="${theme.intro}">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/${theme.css}">
</head>
<body class="theme-record">
  <main>
    <section class="record-hero" id="top">
      <div class="record-stage">
        <header class="record-header">
          <a href="../index.html">name</a>
          <nav aria-label="Record navigation">
            <a href="#about">About</a>
            <a href="#works">Gallery</a>
            <a href="#links">Link</a>
          </nav>
        </header>

        <div class="record-layout" data-record-carousel>
          <a class="vinyl vinyl-left" href="#links" aria-label="Previous record">
            <span class="vinyl-label">Link</span>
          </a>

          <div class="turntable">
            <a class="vinyl vinyl-main" href="#about" aria-label="Current record">
              <span class="vinyl-label">About</span>
            </a>
            <span class="tonearm"></span>
          </div>

          <a class="vinyl vinyl-right" href="#works" aria-label="Next record">
            <span class="vinyl-label">Gallery</span>
          </a>
        </div>

        <div class="record-controls" aria-label="Record controls">
          <button class="record-prev" type="button" aria-label="Previous record"></button>
          <button class="record-play" type="button" aria-label="Play next record"></button>
          <button class="record-next" type="button" aria-label="Next record"></button>
        </div>
      </div>
    </section>

    <section id="about" class="section about">
      <p class="section-kicker">01 / Artist</p>
      <h2>Amber Records</h2>
      <p>音楽活動者、歌い手、作曲家、DJ向けのレコードショップ風ポートフォリオ。プロフィール、作品、配信リンク、出演依頼を1ページにまとめられます。</p>
    </section>

    <section id="works" class="section works">
      <p class="section-kicker">02 / Discography</p>
      <h2>Discography</h2>
      <div class="card-grid">
        ${workCards(theme)}
      </div>
    </section>

    <section id="links" class="section links">
      <p class="section-kicker">03 / Streaming / Shop</p>
      <h2>Streaming / Shop</h2>
      <div class="link-list">
        ${linkList(theme)}
      </div>
    </section>

    <section id="contact" class="section contact">
      <p class="section-kicker">04 / Booking</p>
      <h2>Booking</h2>
      <p>出演依頼、制作依頼、コラボ、楽曲利用についての問い合わせを受け付けています。</p>
      <a class="button" href="mailto:hello@example.com">Contact</a>
    </section>
  </main>

  <footer class="site-footer">
    <p>© Amber Records</p>
    <p>HTML / CSS / JavaScript Template</p>
  </footer>
  <script src="../js/main.js"></script>
</body>
</html>
`;
}

function indexHtml() {
  const cards = themes
    .map(
      (theme) => `<a class="template-card card-${theme.key}" href="templates/${theme.file}">
        <span class="mini-cover"><span></span></span>
        <strong>${theme.label}</strong>
        <small>${theme.intro}</small>
      </a>`
    )
    .join("\n      ");

  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Portfolio Template Series</title>
  <meta name="description" content="ポートフォリオ兼リンクまとめサイトのテンプレートシリーズです。">
  <link rel="stylesheet" href="css/base.css">
</head>
<body class="index-page">
  <header class="site-header">
    <nav class="site-nav" aria-label="Primary navigation">
      <a class="brand" href="index.html"><span></span>Template Series</a>
      <div class="nav-links">
        <a href="#templates">Templates</a>
        <a href="README.md">README</a>
      </div>
    </nav>
  </header>

  <main>
    <section class="index-hero">
      <p class="section-kicker">Portfolio and link templates</p>
      <h1>同じ構成で、雰囲気を選べるテンプレートシリーズ。</h1>
      <p>プレイリスト風のポートフォリオをベースに、音楽、配信、イラスト、飲食系などターゲット別のデザインに展開しています。</p>
    </section>

    <section id="templates" class="template-list" aria-label="Template list">
      ${cards}
    </section>
  </main>
</body>
</html>
`;
}

const baseCss = `:root {
  --bg: #696c67;
  --panel: #fbfaf4;
  --ink: #050505;
  --muted: #d6d4ca;
  --accent: #91b53d;
  --accent-2: #e6c64a;
  --shadow: #222;
  --grid: rgba(255, 255, 255, 0.22);
  --font: "Arial Rounded MT Bold", "Yu Gothic", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  color: var(--ink);
  font-family: var(--font);
  font-weight: 700;
  letter-spacing: 0;
  background:
    radial-gradient(circle at -9% 64%, rgba(221, 196, 91, 0.34) 0 18rem, transparent 18.1rem),
    radial-gradient(circle at 110% 70%, rgba(27, 31, 31, 0.26) 0 26rem, transparent 26.1rem),
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px),
    var(--bg);
  background-size: auto, auto, 40px 40px, 40px 40px, auto;
}

a {
  color: inherit;
}

.site-header {
  width: min(900px, calc(100% - 32px));
  margin: 14px auto 0;
  position: sticky;
  top: 12px;
  z-index: 20;
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 48px;
  padding: 0 12px;
  border: 2px solid var(--ink);
  background: var(--panel);
  box-shadow: 4px 5px 0 var(--shadow);
}

.brand,
.nav-links a {
  text-decoration: none;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.brand span {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--ink);
  display: inline-block;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(0.5rem, 2vw, 1.4rem);
  font-size: 0.9rem;
}

.hero {
  min-height: calc(100vh - 72px);
  display: grid;
  place-items: center;
  padding: clamp(4rem, 9vw, 8rem) 16px 3rem;
}

.hero-card {
  width: min(380px, calc(100vw - 36px));
  padding: 9px 10px 12px;
  border: 2px solid var(--panel);
  background: var(--ink);
  color: var(--panel);
  box-shadow: 9px 9px 0 rgba(0, 0, 0, 0.34);
}

.track-label {
  margin: 0 0 6px;
  font-size: 0.86rem;
}

.cover-art {
  position: relative;
  aspect-ratio: 1 / 1;
  border: 2px solid var(--panel);
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 35%, rgba(255, 221, 84, 0.92) 0 10%, transparent 10.3%),
    radial-gradient(circle at 42% 31%, var(--accent-2) 0 5%, transparent 5.2%),
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 78%, white 22%), color-mix(in srgb, var(--accent-2) 68%, black 8%));
}

.cover-art::before,
.cover-art::after {
  content: "";
  position: absolute;
  border-radius: 50% 50% 42% 42%;
}

.cover-art::before {
  left: 20%;
  top: 8%;
  width: 60%;
  height: 74%;
  background: color-mix(in srgb, var(--accent) 82%, black 5%);
  clip-path: polygon(0 0, 100% 0, 85% 100%, 12% 100%);
}

.cover-art::after {
  left: 29%;
  top: 22%;
  width: 42%;
  height: 52%;
  background: #f19a72;
  border-radius: 48% 48% 44% 44%;
  z-index: 1;
}

.avatar-face {
  position: absolute;
  left: 38%;
  top: 39%;
  width: 24%;
  height: 8%;
  z-index: 2;
  border-radius: 999px;
  background: var(--panel);
  box-shadow: -56px 0 0 var(--panel), 56px 0 0 var(--panel);
}

.avatar-mark {
  position: absolute;
  left: 18%;
  bottom: 22%;
  z-index: 2;
  width: 34%;
  height: 2px;
  background: var(--panel);
  transform: rotate(-28deg);
}

.card-rule {
  height: 3px;
  margin: 10px 0;
  background: var(--panel);
}

.hero-card h1 {
  margin: 0;
  text-align: center;
  color: var(--panel);
  font-size: clamp(2.6rem, 8vw, 3.2rem);
  line-height: 1;
}

.hero-card p:not(.track-label) {
  margin: 10px auto;
  max-width: 26ch;
  text-align: center;
  color: var(--muted);
  line-height: 1.55;
}

.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  min-width: 320px;
  height: 46px;
  margin-top: 76px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--panel);
  box-shadow: 4px 5px 0 var(--shadow);
}

.control {
  display: block;
  width: 52px;
  height: 28px;
  border-inline: 2px solid var(--ink);
  position: relative;
}

.control::before,
.control::after {
  content: "";
  position: absolute;
  top: 6px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.control.prev::before {
  left: 8px;
  border-right: 12px solid var(--ink);
}

.control.prev::after {
  left: 20px;
  border-right: 12px solid var(--ink);
}

.control.play::before {
  left: 19px;
  border-left: 18px solid var(--ink);
}

.control.next::before {
  right: 20px;
  border-left: 12px solid var(--ink);
}

.control.next::after {
  right: 8px;
  border-left: 12px solid var(--ink);
}

.section,
.site-footer,
.index-hero,
.template-list {
  width: min(980px, calc(100% - 32px));
  margin: 0 auto;
}

.section {
  margin-bottom: 42px;
  padding: clamp(1.4rem, 4vw, 2.4rem);
  border: 2px solid var(--ink);
  background: var(--panel);
  box-shadow: 6px 7px 0 var(--shadow);
}

.section-kicker {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
}

.section h2 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 6vw, 4rem);
  line-height: 1;
}

.section p {
  line-height: 1.8;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.work-card {
  min-height: 220px;
  padding: 12px;
  border: 2px solid var(--ink);
  background: #fff;
}

.work-thumb {
  display: block;
  aspect-ratio: 1.25 / 1;
  border: 2px solid var(--ink);
  background:
    linear-gradient(135deg, var(--accent), transparent 55%),
    color-mix(in srgb, var(--accent-2) 62%, white 38%);
}

.work-card h3 {
  margin: 12px 0 6px;
  font-size: 1.1rem;
}

.work-card p {
  margin: 0;
  color: #4c4c4c;
  font-size: 0.9rem;
}

.link-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.link-list a,
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.65rem 0.8rem;
  border: 2px solid var(--ink);
  background: var(--ink);
  color: var(--panel);
  text-decoration: none;
  box-shadow: 3px 4px 0 var(--shadow);
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 24px 0 40px;
  color: var(--panel);
}

.index-hero {
  padding: clamp(4rem, 9vw, 7rem) 0 2rem;
  color: var(--panel);
}

.index-hero h1 {
  max-width: 820px;
  margin: 0;
  font-size: clamp(2.6rem, 7vw, 5.4rem);
  line-height: 1.05;
}

.index-hero p {
  max-width: 680px;
  line-height: 1.8;
}

.template-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
  padding-bottom: 56px;
}

.template-card {
  display: grid;
  gap: 12px;
  min-height: 280px;
  padding: 12px;
  border: 2px solid var(--ink);
  background: var(--panel);
  color: var(--ink);
  text-decoration: none;
  box-shadow: 5px 6px 0 var(--shadow);
}

.mini-cover {
  position: relative;
  display: block;
  aspect-ratio: 1 / 1;
  border: 2px solid var(--ink);
  background: var(--mini-bg, var(--accent));
  overflow: hidden;
}

.mini-cover span {
  position: absolute;
  inset: 26%;
  border-radius: 50%;
  background: var(--mini-accent, var(--accent-2));
}

.template-card small {
  color: #4b4b4b;
  line-height: 1.5;
}

.card-playlist { --mini-bg: #93bd38; --mini-accent: #f1a070; }
.card-record { --mini-bg: #f0d8a9; --mini-accent: #17120f; }
.card-game { --mini-bg: #16243d; --mini-accent: #54d6ff; }
.card-canvas { --mini-bg: #f7eadc; --mini-accent: #d48192; }
.card-cafe { --mini-bg: #354530; --mini-accent: #e8d1a7; }

@media (max-width: 860px) {
  .site-nav {
    align-items: flex-start;
    flex-direction: column;
    padding: 10px 12px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .card-grid,
  .template-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .link-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  body {
    background-size: auto, auto, 28px 28px, 28px 28px, auto;
  }

  .hero {
    padding-top: 3rem;
  }

  .player-controls {
    min-width: min(320px, calc(100vw - 36px));
    margin-top: 42px;
  }

  .card-grid,
  .template-list,
  .link-list {
    grid-template-columns: 1fr;
  }

  .site-footer {
    flex-direction: column;
  }
}
`;

const themeCss = {
  playlist: `:root {
  --bg: #686d67;
  --panel: #fffef7;
  --ink: #050505;
  --muted: #d8d8d0;
  --accent: #88bd38;
  --accent-2: #e7d255;
  --shadow: #343434;
  --grid: rgba(255, 255, 255, 0.24);
}
`,
  record: `:root {
  --bg: #eb6c00;
  --panel: #fffdf3;
  --ink: #090704;
  --muted: #e7d8b9;
  --accent: #ef7100;
  --accent-2: #8fc34a;
  --shadow: #232323;
  --grid: rgba(255, 255, 255, 0.16);
}

.theme-record {
  background: #eb6c00;
}

.theme-record .record-hero {
  min-height: 100vh;
  display: block;
  padding: 20px 0 64px;
  overflow: hidden;
}

.theme-record .record-stage {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 84px);
  padding: 0 0 52px;
  background: transparent;
  --turntable-size: clamp(360px, 50vw, 645px);
  --record-size: clamp(330px, 44vw, 570px);
  --record-gap: clamp(44px, 7vw, 90px);
}

.theme-record .record-stage::before {
  display: none;
}

.theme-record .record-header {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: calc(100vw - 54px);
  min-height: 54px;
  margin: 0 auto;
  padding: 0 clamp(28px, 4vw, 50px);
  background: #fffdf3;
  font-family: "Arial Rounded MT Bold", "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif;
  font-weight: 800;
}

.theme-record .record-header a {
  color: #050505;
  text-decoration: none;
}

.theme-record .record-header nav {
  display: flex;
  gap: clamp(34px, 4vw, 58px);
  font-size: clamp(1.55rem, 2.7vw, 2.55rem);
}

.theme-record .record-header > a {
  font-size: clamp(1.55rem, 2.7vw, 2.55rem);
}

.theme-record .record-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: var(--record-size) var(--turntable-size) var(--record-size);
  align-items: center;
  justify-content: center;
  gap: var(--record-gap);
  width: max-content;
  margin: clamp(92px, 12vh, 132px) 50% 0;
  transform: translateX(-50%);
}

.theme-record .turntable {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--turntable-size);
  height: var(--turntable-size);
  background: #6b5029;
  box-shadow: inset 0 0 0 2px rgba(9, 7, 4, 0.18);
}

.theme-record .vinyl {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: clamp(18px, 3vw, 40px) solid #050505;
  background:
    radial-gradient(circle, #050505 0 9%, #8fc34a 9.4% 22%, transparent 22.4%),
    repeating-radial-gradient(circle, #fffdf3 0 9px, #1a1a1a 9.5px 11px, #fffdf3 11.5px 16px);
  color: #ef7100;
  font-family: "Arial Rounded MT Bold", "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif;
  font-size: clamp(3rem, 6.4vw, 5.7rem);
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
}

.theme-record .vinyl-left,
.theme-record .vinyl-right {
  width: var(--record-size);
}

.theme-record .vinyl-main {
  width: calc(var(--turntable-size) * 0.88);
}

.theme-record .vinyl::before,
.theme-record .vinyl::after {
  content: "";
  position: absolute;
  inset: clamp(18px, 3vw, 40px);
  border-radius: 50%;
  border: 1px solid rgba(5, 5, 5, 0.75);
}

.theme-record .vinyl::after {
  inset: clamp(28px, 4.4vw, 58px);
}

.theme-record .vinyl-label {
  position: relative;
  z-index: 2;
  transform: rotate(-2deg);
  text-shadow:
    2px 2px 0 #fffdf3,
    -1px -1px 0 rgba(255, 253, 243, 0.65);
}

.theme-record .record-layout.is-spinning .vinyl-main {
  animation: record-spin 420ms ease;
}

@keyframes record-spin {
  0% {
    transform: rotate(0deg) scale(1);
  }

  55% {
    transform: rotate(24deg) scale(1.04);
  }

  100% {
    transform: rotate(0deg) scale(1);
  }
}

.theme-record .tonearm {
  position: absolute;
  right: 15%;
  top: 9%;
  z-index: 4;
  width: clamp(116px, 15vw, 205px);
  height: 7px;
  border-radius: 999px;
  background: #f0bd14;
  transform: rotate(-42deg);
  transform-origin: right center;
}

.theme-record .tonearm::after {
  content: "";
  position: absolute;
  left: -10px;
  top: 1px;
  width: 18px;
  height: 54px;
  border-left: 7px solid #f0bd14;
  border-radius: 999px;
  transform: rotate(20deg);
}

.theme-record .record-controls {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(48px, 6vw, 78px);
  width: clamp(430px, 36vw, 520px);
  height: 54px;
  margin: 44px auto 0;
  background: #fffdf3;
}

.theme-record .record-controls button {
  position: relative;
  display: block;
  width: 54px;
  height: 38px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.theme-record .record-prev::before,
.theme-record .record-prev::after,
.theme-record .record-play::before,
.theme-record .record-next::before,
.theme-record .record-next::after {
  content: "";
  position: absolute;
  top: 3px;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
}

.theme-record .record-prev::before {
  left: 0;
  border-right: 28px solid #050505;
}

.theme-record .record-prev::after {
  left: 24px;
  border-right: 28px solid #050505;
}

.theme-record .record-play::before {
  left: 10px;
  border-left: 36px solid #050505;
}

.theme-record .record-next::before {
  right: 24px;
  border-left: 28px solid #050505;
}

.theme-record .record-next::after {
  right: 0;
  border-left: 28px solid #050505;
}

.theme-record .section,
.theme-record .site-footer {
  width: min(614px, calc(100% - 32px));
}

.theme-record .section {
  background: #fffdf3;
}

@media (max-width: 720px) {
  .theme-record .record-stage {
    min-height: auto;
    padding: 22px 24px 34px;
  }

  .theme-record .record-stage::before {
    inset: 22px 24px 34px;
  }

  .theme-record .record-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 8px 12px;
  }

  .theme-record .record-header nav {
    flex-wrap: wrap;
    gap: 12px;
  }

  .theme-record .record-layout {
    grid-template-columns: 1fr;
    gap: 18px;
    width: 100%;
    margin: 26px 0 0;
    transform: none;
  }

  .theme-record .vinyl-left,
  .theme-record .vinyl-right,
  .theme-record .vinyl-main,
  .theme-record .turntable {
    width: min(260px, calc(100vw - 110px));
    height: auto;
    margin: 0 auto;
  }

  .theme-record .turntable {
    height: min(260px, calc(100vw - 110px));
  }
}
`,
  game: `:root {
  --bg: #101826;
  --panel: #eef9ff;
  --ink: #07111f;
  --muted: #b7d2e3;
  --accent: #46d7ff;
  --accent-2: #80ff9f;
  --shadow: #000;
  --grid: rgba(70, 215, 255, 0.2);
}

.theme-game .hero-card {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--ink), 10px 10px 0 #000;
}

.theme-game .cover-art {
  background:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px),
    #16263d;
  background-size: 22px 22px;
}

.theme-game .cover-art::before {
  border-radius: 0;
  background: var(--accent);
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}
`,
  canvas: `:root {
  --bg: #cbbba8;
  --panel: #fffaf0;
  --ink: #372d29;
  --muted: #e8ded4;
  --accent: #d47c91;
  --accent-2: #8ab0bb;
  --shadow: #6b5f56;
  --grid: rgba(55, 45, 41, 0.14);
}

.theme-canvas .hero-card {
  transform: rotate(-1.5deg);
}

.theme-canvas .cover-art {
  background:
    linear-gradient(90deg, rgba(55, 45, 41, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(55, 45, 41, 0.08) 1px, transparent 1px),
    #fffaf0;
  background-size: 26px 26px;
}
`,
  cafe: `:root {
  --bg: #796653;
  --panel: #fff8e7;
  --ink: #2f241a;
  --muted: #e9dbc5;
  --accent: #5f7d51;
  --accent-2: #c78344;
  --shadow: #3d3025;
  --grid: rgba(255, 248, 231, 0.16);
}

.theme-cafe .cover-art {
  background: #304030;
}

.theme-cafe .cover-art::before {
  left: 12%;
  top: 20%;
  width: 76%;
  height: 4px;
  border-radius: 0;
  background: repeating-linear-gradient(90deg, var(--panel) 0 28px, transparent 28px 40px);
  box-shadow: 0 64px 0 var(--panel), 0 128px 0 var(--panel), 0 192px 0 var(--panel);
}

.theme-cafe .cover-art::after,
.theme-cafe .avatar-face,
.theme-cafe .avatar-mark {
  display: none;
}
`,
};

const js = `document.querySelectorAll(".nav-links a[href^='#']").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-links a").forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
  });
});

const recordCarousel = document.querySelector("[data-record-carousel]");
if (recordCarousel) {
  const records = [
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#works" },
    { label: "Link", href: "#links" },
  ];
  let currentIndex = 0;
  const leftRecord = recordCarousel.querySelector(".vinyl-left");
  const mainRecord = recordCarousel.querySelector(".vinyl-main");
  const rightRecord = recordCarousel.querySelector(".vinyl-right");
  const prevButton = document.querySelector(".record-prev");
  const playButton = document.querySelector(".record-play");
  const nextButton = document.querySelector(".record-next");

  const mod = (value) => (value + records.length) % records.length;

  const applyRecord = (element, record) => {
    element.href = record.href;
    element.setAttribute("aria-label", record.label);
    element.querySelector(".vinyl-label").textContent = record.label;
  };

  const renderRecords = () => {
    applyRecord(leftRecord, records[mod(currentIndex - 1)]);
    applyRecord(mainRecord, records[currentIndex]);
    applyRecord(rightRecord, records[mod(currentIndex + 1)]);
  };

  const move = (direction) => {
    currentIndex = mod(currentIndex + direction);
    recordCarousel.classList.remove("is-spinning");
    void recordCarousel.offsetWidth;
    recordCarousel.classList.add("is-spinning");
    renderRecords();
  };

  prevButton?.addEventListener("click", () => move(-1));
  playButton?.addEventListener("click", () => move(1));
  nextButton?.addEventListener("click", () => move(1));
  leftRecord?.addEventListener("click", (event) => {
    event.preventDefault();
    move(-1);
  });
  rightRecord?.addEventListener("click", (event) => {
    event.preventDefault();
    move(1);
  });

  renderRecords();
}
`;

const readme = `# Portfolio Template Series

ポートフォリオ兼リンクまとめサイトとして使える、HTML / CSS / JavaScript 製の静的サイトテンプレート集です。

プレイリスト風の個人サイトをベースに、同じ情報設計のままターゲット別に見た目を変えられるシリーズとして作成しています。

## 入っているテンプレート

- Playlist Style: 個人クリエイター、イラストレーター、雑多に活動している人向け
- Record Shop Style: 音楽活動者、歌い手、作曲家、DJ、バンド向け
- Game Screen Style: VTuber、配信者、ゲーム実況者向け
- Canvas / Atelier Style: イラストレーター、作家、ハンドメイド制作者向け
- Cafe Menu Style: カフェ、焼き菓子屋、小さなお店、ハンドメイド販売者向け

## 編集方法

- 文章: \`templates/xxxx.html\` の見出しや本文を書き換えます
- 作品: \`.work-card\` の中身を書き換えます
- SNSリンク: \`https://example.com/\` を自分のURLに変更します
- メール: \`mailto:hello@example.com\` を自分のメールアドレスに変更します

## 色の変更

共通レイアウトは \`css/base.css\` に入っています。
テーマごとの色や装飾は \`css/theme-xxxx.css\` を編集してください。

## 公開方法

GitHub Pages、Netlify、自分のサーバーなど、静的HTMLが置ける場所で公開できます。
`;

write(path.join(root, "css", "base.css"), baseCss);
write(path.join(root, "js", "main.js"), js);
write(path.join(root, "index.html"), indexHtml());
write(path.join(root, "README.md"), readme);
for (const theme of themes) {
  write(path.join(root, "templates", theme.file), theme.key === "record" ? recordPage(theme) : page(theme));
  write(path.join(root, "css", theme.css), themeCss[theme.key]);
}

console.log("refined portfolio template series");
