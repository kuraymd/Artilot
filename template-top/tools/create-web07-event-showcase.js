const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const outRoot = path.join(root, "web07");

const themes = [
  {
    key: "Cool",
    mood: "urban gallery event",
    c: { bg: "#edf7f8", paper: "#ffffff", ink: "#1d3339", muted: "#657b82", primary: "#247988", accent: "#e0a15a", soft: "#d8edf1", deep: "#123640", line: "#b7d8df" },
  },
  {
    key: "Dark",
    mood: "midnight showcase",
    c: { bg: "#101116", paper: "#1c1d25", ink: "#f5efe7", muted: "#b8b0aa", primary: "#d9a84c", accent: "#67b6c0", soft: "#282a34", deep: "#07080c", line: "#3a3d48" },
  },
  {
    key: "Girly",
    mood: "soft pop-up day",
    c: { bg: "#fff4f8", paper: "#ffffff", ink: "#51323f", muted: "#8b6874", primary: "#d85f86", accent: "#c78e50", soft: "#ffe2ec", deep: "#70334a", line: "#f1c1d2" },
  },
  {
    key: "Minimal",
    mood: "quiet exhibition note",
    c: { bg: "#f7f5ef", paper: "#ffffff", ink: "#282821", muted: "#74736c", primary: "#30312b", accent: "#a17e43", soft: "#e8e5da", deep: "#171812", line: "#d9d4c7" },
  },
  {
    key: "RetroPop",
    mood: "color market weekend",
    c: { bg: "#fff6d8", paper: "#fffdf4", ink: "#30264f", muted: "#71628d", primary: "#ed6040", accent: "#1f9c8e", soft: "#ffd9a8", deep: "#302060", line: "#efbb70" },
  },
];

const imageLabels = {
  "hero-main.svg": "Event key visual",
  "venue.svg": "Venue image",
  "guest-01.svg": "Guest creator",
  "guest-02.svg": "Guest performer",
  "guest-03.svg": "Guest shop",
  "gallery-01.svg": "Event scene",
  "gallery-02.svg": "Workshop table",
  "gallery-03.svg": "Market booth",
  "map-placeholder.svg": "Access map",
};

function svg(label, theme, i) {
  const c = theme.c;
  const rotate = i % 2 ? 5 : -5;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <rect width="1200" height="800" fill="${c.soft}"/>
  <rect x="76" y="70" width="1048" height="660" rx="34" fill="${c.paper}" stroke="${c.line}" stroke-width="6"/>
  <circle cx="940" cy="180" r="102" fill="${c.accent}" opacity=".28"/>
  <circle cx="230" cy="620" r="130" fill="${c.primary}" opacity=".14"/>
  <g transform="translate(600 390) rotate(${rotate})">
    <rect x="-285" y="-165" width="570" height="330" rx="28" fill="${c.bg}" stroke="${c.primary}" stroke-width="8"/>
    <path d="M-200 -78h400M-200 0h315M-200 78h238" stroke="${c.line}" stroke-width="18" stroke-linecap="round"/>
    <path d="M165 -118l58 52v160h-116v-160z" fill="${c.accent}" opacity=".9"/>
    <circle cx="165" cy="-20" r="30" fill="${c.paper}"/>
  </g>
  <text x="600" y="704" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="${c.ink}">${label}</text>
</svg>
`;
}

function html(theme) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Showcase Template ${theme.key}</title>
  <meta name="description" content="イベント・展示会・ワークショップ告知向けのHTML/CSS/JSテンプレートです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#top">Weekend Showcase</a>
    <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#about">About</a>
      <a href="#guests">Guests</a>
      <a href="#schedule">Schedule</a>
      <a href="#access">Access</a>
      <a href="#ticket">Ticket</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${theme.mood}</p>
        <h1>Weekend Showcase 2026</h1>
        <p class="lead">展示会、ポップアップ、ワークショップ、ライブ、マルシェ告知に使えるイベント向けテンプレートです。</p>
        <div class="event-meta">
          <span>2026.08.22 Sat</span>
          <span>11:00 - 18:00</span>
          <span>Tokyo Gallery Hall</span>
        </div>
        <div class="hero-actions">
          <a class="button primary" href="#ticket">予約する</a>
          <a class="button ghost" href="#schedule">タイムテーブル</a>
        </div>
      </div>
      <div class="hero-visual"><img src="images/hero-main.svg" alt="イベントキービジュアル"></div>
    </section>

    <section class="marquee" aria-label="イベント概要">
      <span>Exhibition</span><span>Workshop</span><span>Market</span><span>Live Talk</span>
    </section>

    <section id="about" class="section about">
      <div>
        <p class="eyebrow">About</p>
        <h2>ものづくりと出会う週末。</h2>
        <p>Weekend Showcaseは架空のイベント告知サイトです。イベントのコンセプト、会場の雰囲気、参加方法を1ページで見せられるように設計しています。</p>
      </div>
      <img src="images/venue.svg" alt="会場イメージ">
    </section>

    <section id="guests" class="section">
      <div class="section-heading">
        <p class="eyebrow">Guests</p>
        <h2>出演・出展者</h2>
        <p>作家、講師、ショップ、出演者の紹介カードとして使えます。</p>
      </div>
      <div class="guest-grid">
        <article><img src="images/guest-01.svg" alt="出展者1"><span>Creator</span><h3>Atelier Lumi</h3><p>紙ものとアクセサリーの小さなブランド。</p></article>
        <article><img src="images/guest-02.svg" alt="出展者2"><span>Talk</span><h3>Studio Note</h3><p>制作の裏側を話すミニトークを開催。</p></article>
        <article><img src="images/guest-03.svg" alt="出展者3"><span>Shop</span><h3>Market Table</h3><p>季節の雑貨とギフトアイテムを販売。</p></article>
      </div>
    </section>

    <section id="schedule" class="section schedule">
      <div class="section-heading">
        <p class="eyebrow">Schedule</p>
        <h2>タイムテーブル</h2>
      </div>
      <div class="timeline">
        <article><time>11:00</time><div><h3>Open / Market Start</h3><p>展示・販売エリアがオープンします。</p></div></article>
        <article><time>13:00</time><div><h3>Mini Workshop</h3><p>予約制のワークショップを開催します。</p></div></article>
        <article><time>15:30</time><div><h3>Creator Talk</h3><p>制作や活動についてのトークイベント。</p></div></article>
        <article><time>18:00</time><div><h3>Close</h3><p>イベント終了。ありがとうございました。</p></div></article>
      </div>
    </section>

    <section class="section gallery">
      <div class="gallery-grid">
        <img src="images/gallery-01.svg" alt="イベント風景">
        <img src="images/gallery-02.svg" alt="ワークショップ風景">
        <img src="images/gallery-03.svg" alt="マーケットブース">
      </div>
    </section>

    <section id="access" class="section access">
      <div>
        <p class="eyebrow">Access</p>
        <h2>会場案内</h2>
        <p>東京都○○区○○ 1-2-3 Tokyo Gallery Hall</p>
        <dl>
          <div><dt>最寄駅</dt><dd>○○駅 徒歩5分</dd></div>
          <div><dt>入場</dt><dd>事前予約優先 / 当日受付あり</dd></div>
          <div><dt>支払い</dt><dd>現金 / キャッシュレス対応</dd></div>
        </dl>
      </div>
      <img src="images/map-placeholder.svg" alt="会場マップ">
    </section>

    <section id="ticket" class="section ticket">
      <div>
        <p class="eyebrow">Ticket</p>
        <h2>予約・参加方法</h2>
        <p>フォーム、チケット販売ページ、SNSのDMなど実際の受付導線に差し替えてください。</p>
      </div>
      <div class="ticket-box">
        <span>Admission</span>
        <strong>¥1,000</strong>
        <a class="button primary" href="https://example.com/ticket">チケットを予約する</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Weekend Showcase. All rights reserved.</p>
    <a href="#top">Back to top</a>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>
`;
}

function css(theme) {
  const c = theme.c;
  return `:root{--bg:${c.bg};--paper:${c.paper};--ink:${c.ink};--muted:${c.muted};--primary:${c.primary};--accent:${c.accent};--soft:${c.soft};--deep:${c.deep};--line:${c.line};--shadow:0 24px 70px rgba(0,0,0,.13)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;line-height:1.8}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}h1,h2,h3,p{overflow-wrap:anywhere}
.site-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:76px;padding:18px clamp(18px,4vw,56px);background:color-mix(in srgb,var(--paper) 90%,transparent);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}.logo{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;font-weight:700;letter-spacing:0}.site-nav{display:flex;align-items:center;gap:clamp(14px,2vw,30px);font-size:.9rem;font-weight:900}.site-nav a{color:var(--muted)}.site-nav a:hover{color:var(--primary)}.nav-toggle{display:none;width:44px;height:44px;border:1px solid var(--line);background:var(--paper);padding:10px}.nav-toggle span{display:block;height:2px;margin:6px 0;background:var(--ink)}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.9fr);gap:clamp(30px,5vw,76px);align-items:center;min-height:calc(100vh - 76px);padding:clamp(48px,8vw,110px) clamp(20px,5vw,76px)}.hero-copy{max-width:760px}.eyebrow{margin:0 0 12px;color:var(--primary);font-size:.76rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}h1{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(3rem,8vw,7.2rem);line-height:.96;letter-spacing:0}h2{margin:0 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,4vw,3.7rem);line-height:1.15;letter-spacing:0}h3{margin:0 0 8px;font-size:1.08rem;line-height:1.5}.lead{max-width:640px;margin:28px 0 0;color:var(--muted);font-size:1.08rem}.event-meta{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}.event-meta span{padding:9px 13px;background:var(--paper);border:1px solid var(--line);font-weight:900;font-size:.86rem}
.hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}.button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 22px;border:1px solid var(--primary);font-size:.9rem;font-weight:900}.button.primary{background:var(--primary);color:var(--paper)}.button.ghost{color:var(--primary);background:transparent}.hero-visual{position:relative}.hero-visual:before{content:"";position:absolute;inset:-18px;border:1px solid var(--line);transform:rotate(-2deg)}.hero-visual img{position:relative;width:100%;aspect-ratio:4/3;object-fit:cover;box-shadow:var(--shadow)}
.marquee{display:grid;grid-template-columns:repeat(4,1fr);border-block:1px solid var(--line);background:var(--deep);color:var(--paper)}.marquee span{min-height:64px;display:grid;place-items:center;padding:12px;border-right:1px solid color-mix(in srgb,var(--paper) 20%,transparent);font-size:.82rem;font-weight:900;text-align:center}
.section{padding:clamp(68px,9vw,120px) clamp(20px,5vw,76px)}.section-heading{max-width:760px;margin-bottom:38px}.section-heading p:not(.eyebrow),.about p,.access p,.ticket p{color:var(--muted)}.about,.access,.ticket{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.82fr);gap:clamp(28px,5vw,68px);align-items:center}.about img,.access img{width:100%;aspect-ratio:5/4;object-fit:cover;border:1px solid var(--line)}
.guest-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.guest-grid article{background:var(--paper);border:1px solid var(--line)}.guest-grid img{width:100%;aspect-ratio:4/3;object-fit:cover;border-bottom:1px solid var(--line)}.guest-grid article>*:not(img){margin-inline:22px}.guest-grid span{display:inline-block;margin-top:20px;color:var(--accent);font-weight:900}.guest-grid p{margin-bottom:22px;color:var(--muted)}
.schedule{background:var(--deep);color:var(--paper)}.schedule .eyebrow,.schedule p{color:color-mix(in srgb,var(--paper) 72%,var(--accent))}.timeline{display:grid;gap:14px}.timeline article{display:grid;grid-template-columns:110px 1fr;gap:20px;padding:22px;background:color-mix(in srgb,var(--paper) 10%,transparent);border:1px solid color-mix(in srgb,var(--paper) 26%,transparent)}time{color:var(--accent);font-weight:900}
.gallery-grid{display:grid;grid-template-columns:1fr 1.1fr .9fr;gap:18px}.gallery-grid img{width:100%;height:100%;min-height:280px;object-fit:cover;border:1px solid var(--line)}.access{background:var(--soft)}.access dl{display:grid;gap:12px;margin:30px 0 0}.access dl div{display:grid;grid-template-columns:92px 1fr;gap:14px;padding:14px 0;border-bottom:1px solid var(--line)}.access dt{color:var(--primary);font-weight:900}.access dd{margin:0;color:var(--muted)}
.ticket{grid-template-columns:minmax(0,1fr) minmax(280px,420px)}.ticket-box{display:grid;gap:16px;padding:30px;background:var(--paper);border:1px solid var(--line);box-shadow:var(--shadow)}.ticket-box span{color:var(--accent);font-weight:900}.ticket-box strong{font-family:Georgia,"Times New Roman",serif;font-size:3.2rem;line-height:1}.site-footer{display:flex;justify-content:space-between;gap:16px;padding:26px clamp(20px,5vw,76px);background:var(--deep);color:var(--paper);font-size:.86rem}.site-footer p{margin:0}
@media(max-width:900px){.nav-toggle{display:block}.site-nav{position:fixed;inset:76px 0 auto 0;display:none;flex-direction:column;align-items:stretch;padding:18px 20px 24px;background:var(--paper);border-bottom:1px solid var(--line)}.site-nav.is-open{display:flex}.site-nav a{padding:12px 0}.hero,.about,.access,.ticket{grid-template-columns:1fr}.hero{min-height:auto}.guest-grid,.marquee,.gallery-grid{grid-template-columns:1fr}.timeline article{grid-template-columns:1fr}}
@media(max-width:560px){.site-header{padding-inline:16px}.hero,.section{padding-inline:16px}.hero-actions{display:grid}.button{width:100%}.event-meta{display:grid}.access dl div{grid-template-columns:1fr;gap:4px}.site-footer{flex-direction:column}}
`;
}

function js() {
  return `const navToggle=document.querySelector(".nav-toggle");const siteNav=document.querySelector(".site-nav");if(navToggle&&siteNav){navToggle.addEventListener("click",()=>{const isOpen=siteNav.classList.toggle("is-open");navToggle.setAttribute("aria-expanded",String(isOpen));navToggle.setAttribute("aria-label",isOpen?"メニューを閉じる":"メニューを開く")});siteNav.querySelectorAll("a").forEach(link=>{link.addEventListener("click",()=>{siteNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","メニューを開く")})})}
`;
}

function readme(theme) {
  return `# Event Showcase Template ${theme.key}

イベント・展示会・ワークショップ告知向けのWebサイトテンプレートです。
日時、会場、出演・出展者、タイムテーブル、アクセス、チケット導線を1ページにまとめています。

## 編集する主な場所

- index.html: イベント名、日時、会場、出展者、予約リンク
- css/style.css: 色、余白、文字サイズ、レイアウト
- js/main.js: スマートフォン用メニューの開閉
- images/: キービジュアルや会場写真

## 注意

フォーム送信、チケット決済、予約管理、サーバー設定は含まれていません。
実際に使用する場合は、予約ボタンやSNSリンクを運用中のURLへ差し替えてください。
`;
}

const license = `LICENSE / ライセンス
====================

Copyright (c) 2026 IHYLI / kurayamad
All Rights Reserved.

This template is sold and distributed by IHYLI.
本テンプレートは、IHYLIが制作・販売するWebサイトテンプレートです。

利用可能: 個人利用、商用利用、ご自身またはクライアント案件での編集・カスタマイズ。
禁止事項: 再配布、転売、素材集やテンプレート集への収録、自作発言、第三者がダウンロードできる形での公開、AI学習データ利用、NFT化。

本テンプレートは現状有姿で提供されます。使用によって生じた損害について、IHYLIは責任を負いません。

Contact: ihyli.info@gmail.com
`;

fs.rmSync(outRoot, { recursive: true, force: true });
fs.mkdirSync(outRoot, { recursive: true });

for (const theme of themes) {
  const dir = path.join(outRoot, `Event-Showcase-Template-${theme.key}`);
  fs.mkdirSync(path.join(dir, "css"), { recursive: true });
  fs.mkdirSync(path.join(dir, "js"), { recursive: true });
  fs.mkdirSync(path.join(dir, "images"), { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html(theme), "utf8");
  fs.writeFileSync(path.join(dir, "css", "style.css"), css(theme), "utf8");
  fs.writeFileSync(path.join(dir, "js", "main.js"), js(), "utf8");
  fs.writeFileSync(path.join(dir, "README_はじめにお読みください.txt"), readme(theme), "utf8");
  fs.writeFileSync(path.join(dir, "LICENSE_ライセンス.txt"), license, "utf8");
  let i = 0;
  for (const [file, label] of Object.entries(imageLabels)) {
    fs.writeFileSync(path.join(dir, "images", file), svg(label, theme, i), "utf8");
    i += 1;
  }
}

console.log(`Created ${themes.length} templates in ${outRoot}`);
