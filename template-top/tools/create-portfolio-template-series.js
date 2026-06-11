const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "portfolio-template-series");

const pages = [
  {
    key: "playlist",
    file: "playlist.html",
    css: "theme-playlist.css",
    label: "Playlist Style",
    eyebrow: "Now Playing",
    title: "Mika Playlist",
    lead: "作品、SNS、問い合わせ先をプレイリストのようにまとめる個人クリエイター向けテンプレート。",
    aboutTitle: "About Me",
    about:
      "イラスト、文章、配信、制作実績など、複数の活動をひとつのページで見せたい人に向けた構成です。軽やかなカードUIで、プロフィールと作品導線を自然につなげます。",
    worksTitle: "Works",
    linksTitle: "Links",
    contactTitle: "Contact",
    nav: ["About", "Works", "Links", "Contact"],
    stats: [
      ["Track 01", "Profile"],
      ["Track 02", "Works"],
      ["Track 03", "Links"],
    ],
    works: [
      ["Illustration Set", "SNSアイコン、サムネイル、グッズ用イラストの実績を掲載できます。"],
      ["Zine Project", "同人誌、展示、イベント参加履歴などをまとめられます。"],
      ["Daily Notes", "ブログ、note、制作メモなど外部記事への導線にも使えます。"],
    ],
    links: ["X", "Instagram", "Portfolio", "Shop"],
  },
  {
    key: "record",
    file: "record.html",
    css: "theme-record.css",
    label: "Record Shop Style",
    eyebrow: "New Release",
    title: "Amber Records",
    lead: "音楽活動、歌、作曲、DJ、バンドの情報をレコードショップ風に見せるテンプレート。",
    aboutTitle: "Artist Profile",
    about:
      "新譜、活動プロフィール、配信リンク、出演依頼までをアルバムのライナーノーツのように整理できます。落ち着いたヴィンテージ感で、音楽系の販売ページにも馴染みます。",
    worksTitle: "Discography",
    linksTitle: "Streaming Links",
    contactTitle: "Booking / Contact",
    nav: ["Profile", "Discography", "Links", "Booking"],
    stats: [
      ["Side A", "Release"],
      ["Side B", "Live"],
      ["RPM", "33"],
    ],
    works: [
      ["Single: Midnight Tape", "最新曲や代表曲の紹介、配信URLへの導線を配置できます。"],
      ["EP: Window Light", "アルバム、EP、参加作品をジャケットカードとして並べられます。"],
      ["Live Archive", "ライブ出演、DJイベント、配信履歴などの記録に向いています。"],
    ],
    links: ["Spotify", "Apple Music", "YouTube", "Bandcamp"],
  },
  {
    key: "game",
    file: "game.html",
    css: "theme-game.css",
    label: "Game Screen Style",
    eyebrow: "Player Data",
    title: "Player No. 07",
    lead: "VTuber、配信者、ゲーム実況者向けのステータス画面風プロフィールテンプレート。",
    aboutTitle: "Status",
    about:
      "キャラクター設定、配信ジャンル、活動時間、ハッシュタグなどをゲームUIのように整理できます。チャンネルリンクと問い合わせを目立たせたい配信者に使いやすい構成です。",
    worksTitle: "Achievements",
    linksTitle: "Channel Links",
    contactTitle: "Message",
    nav: ["Status", "Achievements", "Links", "Message"],
    stats: [
      ["LV", "24"],
      ["HP", "860"],
      ["MP", "420"],
    ],
    works: [
      ["First Stream", "初配信や周年配信など、節目の実績をカードで表示できます。"],
      ["Collaboration Quest", "コラボ実績、参加企画、イベント出演情報を掲載できます。"],
      ["Highlight Archive", "おすすめ動画、切り抜き、再生リストへの導線に使えます。"],
    ],
    links: ["YouTube", "Twitch", "X", "Marshmallow"],
  },
  {
    key: "canvas",
    file: "canvas.html",
    css: "theme-canvas.css",
    label: "Canvas / Atelier Style",
    eyebrow: "Artist Profile",
    title: "Small Atelier",
    lead: "イラストレーター、作家、ハンドメイド制作者向けのアトリエ風テンプレート。",
    aboutTitle: "Sketchbook",
    about:
      "プロフィール、制作ジャンル、コミッション受付、作品ギャラリーをやわらかい紙の質感でまとめます。作品画像が少ない段階でも、カードと余白で完成して見える設計です。",
    worksTitle: "Gallery",
    linksTitle: "Commission / Links",
    contactTitle: "Contact Sheet",
    nav: ["Sketchbook", "Gallery", "Links", "Contact"],
    stats: [
      ["Tool", "Paint"],
      ["Mood", "Soft"],
      ["Open", "Commissions"],
    ],
    works: [
      ["Character Art", "キャラクターイラストや立ち絵のサンプル掲載に向いています。"],
      ["Pattern Goods", "雑貨、布小物、紙ものなどの制作実績を紹介できます。"],
      ["Exhibition Note", "展示、イベント出展、制作記録をノート風にまとめられます。"],
    ],
    links: ["Portfolio", "Skeb", "Shop", "Instagram"],
  },
  {
    key: "cafe",
    file: "cafe.html",
    css: "theme-cafe.css",
    label: "Cafe Menu Style",
    eyebrow: "Today's Special",
    title: "Mellow Cafe",
    lead: "小さなお店、カフェ、焼き菓子屋、ハンドメイド販売者向けのメニュー表風テンプレート。",
    aboutTitle: "About Shop",
    about:
      "お店の紹介、メニュー、販売リンク、予約や問い合わせ先を一枚のショップカードのように見せられます。価格表風のカードで、サービス一覧にも応用できます。",
    worksTitle: "Menu / Works",
    linksTitle: "Shop Links",
    contactTitle: "Reservation / Contact",
    nav: ["About", "Menu", "Links", "Reserve"],
    stats: [
      ["Open", "11:00"],
      ["Blend", "House"],
      ["Takeout", "OK"],
    ],
    works: [
      ["Seasonal Cake", "季節メニュー、限定商品、人気商品の紹介に使えます。"],
      ["Drink Menu", "価格や内容を添えて、メニュー表のように並べられます。"],
      ["Gift Box", "オンラインショップ、委託販売、イベント出店情報にも対応します。"],
    ],
    links: ["Online Shop", "Instagram", "Map", "Reservation"],
  },
];

const baseCss = `:root {
  color-scheme: light;
  --bg: #f7f1e7;
  --surface: #fffaf0;
  --surface-2: #ffffff;
  --ink: #2f2a35;
  --muted: #746b7a;
  --primary: #d85f4a;
  --accent: #287e88;
  --line: rgba(47, 42, 53, 0.18);
  --shadow: 0 22px 60px rgba(47, 42, 53, 0.12);
  --radius: 8px;
  --font-heading: Georgia, "Yu Mincho", "Hiragino Mincho ProN", serif;
  --font-body: "Yu Gothic", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
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
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.6), transparent 34rem),
    var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.75;
  letter-spacing: 0;
}

a {
  color: inherit;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 88%, white 12%);
  backdrop-filter: blur(16px);
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: min(1120px, calc(100% - 32px));
  min-height: 72px;
  margin: 0 auto;
}

.brand {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  text-decoration: none;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;
}

.nav-links a {
  min-height: 40px;
  padding: 0.45rem 0.8rem;
  border: 1px solid transparent;
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.9rem;
  text-decoration: none;
}

.nav-links a:hover,
.nav-links a:focus-visible {
  border-color: var(--line);
  color: var(--ink);
  outline: none;
}

main {
  overflow: hidden;
}

.hero,
.section,
.site-footer {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
  min-height: calc(100vh - 72px);
  padding: clamp(3rem, 8vw, 6.5rem) 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  margin: 0 0 1.1rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--primary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  overflow-wrap: anywhere;
}

h1,
h2,
h3 {
  font-family: var(--font-heading);
  line-height: 1.06;
}

h1 {
  max-width: 11ch;
  margin: 0;
  font-size: clamp(3rem, 8vw, 6.8rem);
}

.lead {
  max-width: 42rem;
  margin: 1.4rem 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 2vw, 1.22rem);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 2rem;
}

.button,
.link-list a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--ink);
  border-radius: var(--radius);
  background: var(--ink);
  color: var(--surface);
  font-weight: 700;
  text-decoration: none;
}

.button.secondary {
  background: transparent;
  color: var(--ink);
}

.template-visual {
  position: relative;
  min-height: 480px;
}

.visual-board {
  position: relative;
  min-height: 440px;
  border: 2px solid var(--ink);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.visual-board::before,
.visual-board::after {
  content: "";
  position: absolute;
  border: 2px solid var(--ink);
}

.visual-title {
  position: absolute;
  left: 28px;
  right: 28px;
  top: 28px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
}

.visual-main {
  position: absolute;
  left: 36px;
  right: 36px;
  top: 92px;
  min-height: 180px;
  border: 2px solid var(--line);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--primary) 12%, var(--surface) 88%);
}

.visual-main::before {
  content: "";
  position: absolute;
  inset: 28px auto auto 28px;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background: var(--primary);
}

.visual-lines {
  position: absolute;
  left: 168px;
  right: 28px;
  top: 48px;
  display: grid;
  gap: 18px;
}

.visual-lines span {
  display: block;
  height: 16px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 40%, var(--surface) 60%);
}

.visual-lines span:nth-child(2) {
  width: 74%;
}

.visual-lines span:nth-child(3) {
  width: 88%;
}

.visual-items {
  position: absolute;
  left: 36px;
  right: 36px;
  bottom: 34px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.visual-items span {
  min-height: 86px;
  border: 2px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface-2);
}

.section {
  padding: clamp(3.8rem, 8vw, 6.5rem) 0;
  border-top: 1px solid var(--line);
}

.section-header {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 2rem;
  align-items: start;
  margin-bottom: 2rem;
}

.section h2 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 4.2rem);
}

.section-text {
  margin: 0;
  color: var(--muted);
  font-size: 1.05rem;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  margin-top: 2rem;
}

.stat {
  min-height: 104px;
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.stat span {
  display: block;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
}

.stat strong {
  display: block;
  margin-top: 0.3rem;
  font-family: var(--font-heading);
  font-size: 1.45rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.work-card {
  min-height: 220px;
  padding: 1.25rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: 0 12px 30px rgba(47, 42, 53, 0.06);
}

.work-card h3 {
  margin: 0;
  font-size: 1.45rem;
}

.work-card p {
  margin: 1rem 0 0;
  color: var(--muted);
}

.link-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
}

.link-list a {
  background: var(--surface);
  color: var(--ink);
}

.contact-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  padding: clamp(1.4rem, 4vw, 2.2rem);
  border: 2px solid var(--ink);
  border-radius: var(--radius);
  background: var(--surface);
}

.contact-panel p {
  margin: 0;
  color: var(--muted);
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 0 3rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.index-page .hero {
  grid-template-columns: 1fr;
  min-height: auto;
  padding-bottom: 3rem;
}

.template-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto clamp(4rem, 8vw, 6rem);
}

.template-card {
  display: grid;
  gap: 1rem;
  min-height: 260px;
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  text-decoration: none;
}

.template-card:hover,
.template-card:focus-visible {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  outline: none;
}

.template-swatch {
  min-height: 110px;
  border: 2px solid var(--ink);
  border-radius: var(--radius);
  background:
    linear-gradient(135deg, var(--card-primary), transparent 50%),
    var(--card-bg);
}

.template-card h2 {
  margin: 0;
  font-size: 1.25rem;
}

.template-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}

@media (max-width: 980px) {
  .hero,
  .section-header,
  .contact-panel {
    grid-template-columns: 1fr;
  }

  .template-visual {
    min-height: 420px;
  }

  .card-grid,
  .template-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .link-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .site-nav {
    align-items: flex-start;
    flex-direction: column;
    padding: 0.8rem 0;
  }

  .nav-links {
    justify-content: flex-start;
  }

  .hero {
    min-height: auto;
  }

  .visual-board {
    min-height: 360px;
  }

  .visual-main {
    left: 24px;
    right: 24px;
  }

  .visual-lines {
    left: 142px;
  }

  .visual-items {
    grid-template-columns: 1fr;
  }

  .visual-items span:nth-child(n + 2) {
    display: none;
  }

  .stat-row,
  .card-grid,
  .link-list,
  .template-list {
    grid-template-columns: 1fr;
  }

  .site-footer {
    flex-direction: column;
  }
}
`;

const themeCss = {
  playlist: `:root {
  --bg: #fff0d9;
  --surface: #fff8ec;
  --surface-2: #ffffff;
  --ink: #31284e;
  --muted: #786a89;
  --primary: #e85f72;
  --accent: #23a0a4;
  --line: rgba(49, 40, 78, 0.2);
  --radius: 8px;
}

.theme-playlist .visual-board {
  transform: rotate(-1deg);
}

.theme-playlist .visual-board::before {
  right: 34px;
  bottom: 120px;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: repeating-radial-gradient(circle, var(--ink) 0 8px, var(--primary) 9px 18px, var(--surface) 19px 28px);
}

.theme-playlist .work-card:nth-child(2) {
  transform: translateY(18px);
}
`,
  record: `:root {
  --bg: #efe3c9;
  --surface: #fff8e5;
  --surface-2: #f8ebce;
  --ink: #271c16;
  --muted: #755f4a;
  --primary: #c9682c;
  --accent: #d8a83b;
  --line: rgba(39, 28, 22, 0.24);
  --radius: 4px;
  --font-heading: Georgia, "Yu Mincho", serif;
}

.theme-record .visual-board::before {
  left: 46px;
  bottom: 68px;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--surface) 0 18px, var(--ink) 19px 26px, #1c1713 27px 56px, var(--primary) 57px 72px, #1c1713 73px);
}

.theme-record .visual-board::after {
  right: 54px;
  top: 96px;
  width: 36px;
  height: 230px;
  border-width: 0 0 0 3px;
  transform: rotate(18deg);
}

.theme-record .eyebrow,
.theme-record .button {
  border-radius: 0;
}
`,
  game: `:root {
  --bg: #111827;
  --surface: #18243a;
  --surface-2: #101828;
  --ink: #e9f8ff;
  --muted: #9cb8ca;
  --primary: #45d6ff;
  --accent: #7cff9b;
  --line: rgba(69, 214, 255, 0.34);
  --shadow: 0 24px 70px rgba(0, 0, 0, 0.38);
  --radius: 4px;
  --font-heading: "Trebuchet MS", "Yu Gothic", sans-serif;
}

.theme-game body,
body.theme-game {
  background:
    linear-gradient(rgba(69, 214, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(69, 214, 255, 0.05) 1px, transparent 1px),
    var(--bg);
  background-size: 28px 28px;
}

.theme-game .visual-board::before {
  left: 34px;
  bottom: 64px;
  width: 78%;
  height: 18px;
  background: linear-gradient(90deg, var(--accent) 0 64%, rgba(255, 255, 255, 0.1) 64%);
}

.theme-game .visual-board::after {
  right: 34px;
  top: 94px;
  width: 96px;
  height: 96px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}

.theme-game .button,
.theme-game .link-list a {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}
`,
  canvas: `:root {
  --bg: #f5eadc;
  --surface: #fffdf4;
  --surface-2: #f0dcbf;
  --ink: #3e342f;
  --muted: #806f66;
  --primary: #cf7186;
  --accent: #7daab3;
  --line: rgba(62, 52, 47, 0.18);
  --radius: 6px;
  --font-heading: Georgia, "Yu Mincho", serif;
}

.theme-canvas .visual-board {
  background:
    linear-gradient(90deg, rgba(207, 113, 134, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(125, 170, 179, 0.08) 1px, transparent 1px),
    var(--surface);
  background-size: 24px 24px;
}

.theme-canvas .visual-board::before {
  left: 64px;
  top: 78px;
  width: 170px;
  height: 38px;
  background: color-mix(in srgb, var(--primary) 28%, white 72%);
  transform: rotate(-6deg);
}

.theme-canvas .visual-board::after {
  right: 72px;
  bottom: 84px;
  width: 118px;
  height: 118px;
  border-radius: 42% 58% 48% 52%;
  background: color-mix(in srgb, var(--accent) 36%, white 64%);
}

.theme-canvas .work-card:nth-child(1) {
  transform: rotate(-1deg);
}

.theme-canvas .work-card:nth-child(3) {
  transform: rotate(1deg);
}
`,
  cafe: `:root {
  --bg: #eadcc6;
  --surface: #fff8e9;
  --surface-2: #2f3b2e;
  --ink: #38281d;
  --muted: #7a6653;
  --primary: #5c7a52;
  --accent: #b46d3b;
  --line: rgba(56, 40, 29, 0.22);
  --radius: 4px;
  --font-heading: Georgia, "Yu Mincho", serif;
}

.theme-cafe .visual-board {
  background: var(--surface-2);
  color: #fff8e9;
}

.theme-cafe .visual-main {
  background: var(--surface);
}

.theme-cafe .visual-board::before {
  left: 52px;
  bottom: 72px;
  width: 72%;
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--surface) 0 24px, transparent 24px 34px);
}

.theme-cafe .visual-board::after {
  right: 42px;
  top: 78px;
  width: 118px;
  height: 158px;
  background: var(--surface);
  box-shadow: 0 10px 0 rgba(255, 248, 233, 0.24);
}

.theme-cafe .work-card {
  border-style: dashed;
}
`,
};

const js = `const links = document.querySelectorAll(".nav-links a[href^='#']");
const sections = [...links]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = () => {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= 140)
    .at(-1);

  links.forEach((link) => {
    const isActive = current && link.getAttribute("href") === "#" + current.id;
    link.toggleAttribute("aria-current", Boolean(isActive));
  });
};

document.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();
`;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(file, body) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, body, "utf8");
}

function layout(page) {
  const nav = page.nav
    .map((item, index) => {
      const ids = ["about", "works", "links", "contact"];
      return `          <a href="#${ids[index]}">${item}</a>`;
    })
    .join("\n");
  const stats = page.stats
    .map(([k, v]) => `          <div class="stat"><span>${k}</span><strong>${v}</strong></div>`)
    .join("\n");
  const works = page.works
    .map(
      ([title, body]) => `          <article class="work-card">
            <h3>${title}</h3>
            <p>${body}</p>
          </article>`
    )
    .join("\n");
  const links = page.links
    .map((label) => `          <a href="https://example.com/">${label}</a>`)
    .join("\n");

  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.label} | Portfolio Template Series</title>
  <meta name="description" content="${page.lead}">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/${page.css}">
</head>
<body class="theme-${page.key}">
  <header class="site-header">
    <nav class="site-nav" aria-label="Primary navigation">
      <a class="brand" href="../index.html">Portfolio Template Series</a>
      <div class="nav-links">
${nav}
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div>
        <p class="eyebrow">${page.eyebrow}</p>
        <h1>${page.title}</h1>
        <p class="lead">${page.lead}</p>
        <div class="hero-actions">
          <a href="#works" class="button">View Works</a>
          <a href="#links" class="button secondary">Links</a>
        </div>
      </div>
      <div class="template-visual" aria-hidden="true">
        <div class="visual-board">
          <div class="visual-title"><span>${page.label}</span><span>Sample</span></div>
          <div class="visual-main"><div class="visual-lines"><span></span><span></span><span></span></div></div>
          <div class="visual-items"><span></span><span></span><span></span></div>
        </div>
      </div>
    </section>

    <section id="about" class="section about">
      <div class="section-header">
        <h2>${page.aboutTitle}</h2>
        <p class="section-text">${page.about}</p>
      </div>
      <div class="stat-row">
${stats}
      </div>
    </section>

    <section id="works" class="section works">
      <div class="section-header">
        <h2>${page.worksTitle}</h2>
        <p class="section-text">作品、メニュー、活動履歴などをカード形式で掲載できます。画像がない状態でも使えるよう、テキストだけで見栄えする余白にしています。</p>
      </div>
      <div class="card-grid">
${works}
      </div>
    </section>

    <section id="links" class="section links">
      <div class="section-header">
        <h2>${page.linksTitle}</h2>
        <p class="section-text">SNS、ショップ、動画、予約ページなど、必要なリンクを差し替えて使えます。</p>
      </div>
      <div class="link-list">
${links}
      </div>
    </section>

    <section id="contact" class="section contact">
      <div class="contact-panel">
        <div>
          <h2>${page.contactTitle}</h2>
          <p>お仕事の相談、コラボ、予約、制作依頼などはこちらからお問い合わせください。</p>
        </div>
        <a class="button" href="mailto:hello@example.com">Contact</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>© ${page.title}</p>
    <p>HTML / CSS / JavaScript Template</p>
  </footer>
  <script src="../js/main.js"></script>
</body>
</html>
`;
}

function indexHtml() {
  const cards = pages
    .map(
      (page) => `      <a class="template-card" href="templates/${page.file}" style="--card-primary: var(--${page.key}-primary); --card-bg: var(--${page.key}-bg);">
        <span class="template-swatch"></span>
        <span>
          <h2>${page.label}</h2>
          <p>${page.lead}</p>
        </span>
      </a>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Portfolio Template Series</title>
  <meta name="description" content="ポートフォリオ兼リンクまとめサイトのHTML/CSS/JavaScriptテンプレート集です。">
  <link rel="stylesheet" href="css/base.css">
  <style>
    :root {
      --playlist-primary: #e85f72;
      --playlist-bg: #fff0d9;
      --record-primary: #c9682c;
      --record-bg: #efe3c9;
      --game-primary: #45d6ff;
      --game-bg: #111827;
      --canvas-primary: #cf7186;
      --canvas-bg: #f5eadc;
      --cafe-primary: #5c7a52;
      --cafe-bg: #eadcc6;
    }
  </style>
</head>
<body class="index-page">
  <header class="site-header">
    <nav class="site-nav" aria-label="Primary navigation">
      <a class="brand" href="index.html">Portfolio Template Series</a>
      <div class="nav-links">
        <a href="#templates">Templates</a>
        <a href="README.md">README</a>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div>
        <p class="eyebrow">Template Catalog</p>
        <h1>Portfolio links, five moods.</h1>
        <p class="lead">ポートフォリオとリンクまとめを兼ねた静的サイトテンプレートです。構成は共通のまま、用途別に5つの雰囲気を選べます。</p>
      </div>
    </section>

    <section id="templates" class="template-list" aria-label="Template list">
${cards}
    </section>
  </main>

  <footer class="site-footer">
    <p>© Portfolio Template Series</p>
    <p>Static HTML / CSS / JavaScript</p>
  </footer>
</body>
</html>
`;
}

const readme = `# Portfolio Template Series

ポートフォリオ兼リンクまとめサイトとして使える、HTML / CSS / JavaScript 製の静的サイトテンプレート集です。

既存サイトの構成や考え方を参考にしつつ、完全コピーではなく販売用テンプレートとして汎用的に使える形に整えています。

## 入っているテンプレート

- Playlist Style: 個人クリエイター、イラストレーター、雑多に活動している人向け
- Record Shop Style: 音楽活動者、歌い手、作曲家、DJ、バンド向け
- Game Screen Style: VTuber、配信者、ゲーム実況者向け
- Canvas / Atelier Style: イラストレーター、作家、ハンドメイド制作者向け
- Cafe Menu Style: カフェ、焼き菓子屋、小さなお店、ハンドメイド販売者向け

## ファイル構成

\`\`\`txt
portfolio-template-series/
├── index.html
├── templates/
│   ├── playlist.html
│   ├── record.html
│   ├── game.html
│   ├── canvas.html
│   └── cafe.html
├── css/
│   ├── base.css
│   ├── theme-playlist.css
│   ├── theme-record.css
│   ├── theme-game.css
│   ├── theme-canvas.css
│   └── theme-cafe.css
├── js/
│   └── main.js
└── README.md
\`\`\`

## 編集方法

各テンプレートページの文章を書き換えるだけで、自分用のサイトとして使えます。

- サイト名や見出し: \`templates/xxxx.html\` の \`h1\` や本文を編集
- 作品やメニュー: \`.work-card\` の中身を編集
- SNSリンク: HTML内の \`https://example.com/\` を自分のURLに変更
- メール: \`mailto:hello@example.com\` を自分のメールアドレスに変更

## 色や雰囲気の変更

共通レイアウトは \`css/base.css\` に入っています。

テーマごとの色や装飾は以下のファイルを編集してください。

- \`css/theme-playlist.css\`
- \`css/theme-record.css\`
- \`css/theme-game.css\`
- \`css/theme-canvas.css\`
- \`css/theme-cafe.css\`

CSS上部の \`:root\` にある \`--bg\`、\`--surface\`、\`--ink\`、\`--primary\`、\`--accent\` を変更すると、全体の色を調整できます。

## 公開方法

GitHub Pages、Netlify、自分のサーバーなど、静的HTMLが置ける場所で公開できます。

GitHub Pagesで公開する場合は、リポジトリにこのフォルダ一式をアップロードし、Pages設定で公開ブランチを選んでください。

## 注意

このテンプレートは購入者が編集して使うことを想定したサンプルです。画像素材は含めず、CSS装飾だけでも見栄えするように作っています。
`;

fs.rmSync(root, { recursive: true, force: true });
ensureDir(root);
write(path.join(root, "index.html"), indexHtml());
write(path.join(root, "css", "base.css"), baseCss);
write(path.join(root, "js", "main.js"), js);
for (const page of pages) {
  write(path.join(root, "templates", page.file), layout(page));
  write(path.join(root, "css", page.css), themeCss[page.key]);
}
write(path.join(root, "README.md"), readme);

console.log(`created ${pages.length} templates in ${root}`);
