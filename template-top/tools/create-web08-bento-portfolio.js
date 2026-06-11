const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const outRoot = path.join(root, "web08");

const themes = [
  { key: "Cool", mood: "structured creative profile", c: { bg: "#eef7f8", paper: "#ffffff", ink: "#1d3138", muted: "#667980", primary: "#247c8b", accent: "#df9f57", soft: "#d8edf1", deep: "#123640", line: "#b8d8df" } },
  { key: "Dark", mood: "editorial dark portfolio", c: { bg: "#101116", paper: "#1c1d25", ink: "#f5efe7", muted: "#b8b0aa", primary: "#d8a64d", accent: "#67b6c0", soft: "#292b35", deep: "#07080c", line: "#3a3d48" } },
  { key: "Girly", mood: "soft creator board", c: { bg: "#fff4f8", paper: "#ffffff", ink: "#50323f", muted: "#8a6874", primary: "#d75f86", accent: "#c78e50", soft: "#ffe2ec", deep: "#70334a", line: "#f1c1d2" } },
  { key: "Minimal", mood: "quiet case study grid", c: { bg: "#f7f5ef", paper: "#ffffff", ink: "#282821", muted: "#74736c", primary: "#30312b", accent: "#a17e43", soft: "#e8e5da", deep: "#171812", line: "#d9d4c7" } },
  { key: "RetroPop", mood: "playful portfolio board", c: { bg: "#fff6d8", paper: "#fffdf4", ink: "#30264f", muted: "#71628d", primary: "#ed6040", accent: "#1f9c8e", soft: "#ffd9a8", deep: "#302060", line: "#efbb70" } },
];

const imageLabels = {
  "portrait.svg": "Creator portrait",
  "work-01.svg": "Brand design work",
  "work-02.svg": "Website work",
  "work-03.svg": "Illustration work",
  "work-04.svg": "Product visual work",
  "case-study.svg": "Case study preview",
  "studio.svg": "Studio desk",
};

function svg(label, theme, i) {
  const c = theme.c;
  const rotate = i % 2 ? 4 : -4;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <rect width="1200" height="800" fill="${c.soft}"/>
  <rect x="76" y="70" width="1048" height="660" rx="34" fill="${c.paper}" stroke="${c.line}" stroke-width="6"/>
  <circle cx="950" cy="180" r="100" fill="${c.accent}" opacity=".25"/>
  <circle cx="230" cy="620" r="128" fill="${c.primary}" opacity=".14"/>
  <g transform="translate(600 390) rotate(${rotate})">
    <rect x="-280" y="-170" width="560" height="340" rx="30" fill="${c.bg}" stroke="${c.primary}" stroke-width="8"/>
    <rect x="-205" y="-92" width="160" height="150" rx="18" fill="${c.primary}" opacity=".72"/>
    <rect x="-10" y="-92" width="214" height="56" rx="14" fill="${c.line}"/>
    <rect x="-10" y="-12" width="166" height="56" rx="14" fill="${c.accent}" opacity=".9"/>
    <rect x="-10" y="68" width="214" height="32" rx="12" fill="${c.line}"/>
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
  <title>Bento Portfolio Template ${theme.key}</title>
  <meta name="description" content="Bento Grid風のクリエイター・デザイナー向けHTML/CSS/JSテンプレートです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#top">Aki Studio</a>
    <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#works">Works</a>
      <a href="#profile">Profile</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${theme.mood}</p>
        <h1>Designing quiet stories for brands and creators.</h1>
        <p class="lead">デザイナー、イラストレーター、写真家、制作会社の実績紹介に使えるBento Grid風ポートフォリオテンプレートです。</p>
      </div>
      <div class="hero-side">
        <img src="images/portrait.svg" alt="クリエイターポートレート">
        <a class="button primary" href="#contact">制作相談をする</a>
      </div>
    </section>

    <section class="bento-overview" aria-label="ポートフォリオ概要">
      <article class="tile large">
        <span>Selected Work</span>
        <strong>24</strong>
        <p>ブランド、Web、イラスト、ビジュアル制作の実績を整理して掲載できます。</p>
      </article>
      <article class="tile">
        <span>Focus</span>
        <h2>Brand / Web / Visual</h2>
      </article>
      <article class="tile accent">
        <span>Available</span>
        <h2>New projects open</h2>
      </article>
      <article class="tile image-tile">
        <img src="images/studio.svg" alt="制作デスク">
      </article>
    </section>

    <section id="works" class="section">
      <div class="section-heading">
        <p class="eyebrow">Works</p>
        <h2>実績一覧</h2>
        <p>カードの大きさに変化をつけて、少ない作品数でも印象的に見せられる構成です。</p>
      </div>
      <div class="work-grid">
        <article class="work-card wide"><img src="images/work-01.svg" alt="ブランドデザイン実績"><div><span>Brand Design</span><h3>Botanical Cafe Identity</h3></div></article>
        <article class="work-card"><img src="images/work-02.svg" alt="Web制作実績"><div><span>Website</span><h3>Personal Shop Launch</h3></div></article>
        <article class="work-card tall"><img src="images/case-study.svg" alt="ケーススタディ"><div><span>Case Study</span><h3>From concept to public launch</h3></div></article>
        <article class="work-card"><img src="images/work-03.svg" alt="イラスト実績"><div><span>Illustration</span><h3>Seasonal Visual Set</h3></div></article>
        <article class="work-card wide"><img src="images/work-04.svg" alt="商品ビジュアル実績"><div><span>Product Visual</span><h3>Gift Collection Photo Direction</h3></div></article>
      </div>
    </section>

    <section id="profile" class="section profile">
      <div>
        <p class="eyebrow">Profile</p>
        <h2>伝えたい空気感を、整理して形に。</h2>
        <p>Aki Studioは架空のクリエイターポートフォリオです。自己紹介、経歴、制作姿勢、受付中の仕事をコンパクトにまとめられます。</p>
      </div>
      <dl>
        <div><dt>01</dt><dd>ブランドトーンの設計</dd></div>
        <div><dt>02</dt><dd>Webサイトとビジュアル制作</dd></div>
        <div><dt>03</dt><dd>SNS・販売ページ用素材</dd></div>
      </dl>
    </section>

    <section id="services" class="section services">
      <div class="section-heading">
        <p class="eyebrow">Services</p>
        <h2>できること</h2>
      </div>
      <div class="service-grid">
        <article><span>Plan A</span><h3>Brand Starter</h3><p>ロゴ、配色、簡易ガイドラインの制作。</p></article>
        <article><span>Plan B</span><h3>Website Design</h3><p>小さなお店や個人活動向けのサイト制作。</p></article>
        <article><span>Plan C</span><h3>Visual Set</h3><p>SNSや販売ページで使える画像セット制作。</p></article>
      </div>
    </section>

    <section id="contact" class="section contact">
      <div>
        <p class="eyebrow">Contact</p>
        <h2>制作の相談を受け付けています。</h2>
        <p>問い合わせフォーム、メール、SNS、予約ページなど実際の導線へ差し替えてください。</p>
      </div>
      <div class="contact-actions">
        <a class="button primary" href="https://example.com/contact">問い合わせる</a>
        <a class="button ghost" href="https://www.instagram.com/">Instagram</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Aki Studio. All rights reserved.</p>
    <a href="#top">Back to top</a>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>
`;
}

function css(theme) {
  const c = theme.c;
  return `:root{--bg:${c.bg};--paper:${c.paper};--ink:${c.ink};--muted:${c.muted};--primary:${c.primary};--accent:${c.accent};--soft:${c.soft};--deep:${c.deep};--line:${c.line};--shadow:0 24px 70px rgba(0,0,0,.13);--radius:8px}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;line-height:1.8}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}h1,h2,h3,p{overflow-wrap:anywhere}
.site-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:76px;padding:18px clamp(18px,4vw,56px);background:color-mix(in srgb,var(--paper) 90%,transparent);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}.logo{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;font-weight:700;letter-spacing:0}.site-nav{display:flex;align-items:center;gap:clamp(14px,2vw,30px);font-size:.9rem;font-weight:900}.site-nav a{color:var(--muted)}.site-nav a:hover{color:var(--primary)}.nav-toggle{display:none;width:44px;height:44px;border:1px solid var(--line);background:var(--paper);padding:10px}.nav-toggle span{display:block;height:2px;margin:6px 0;background:var(--ink)}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,420px);gap:clamp(28px,5vw,64px);align-items:end;min-height:calc(92vh - 76px);padding:clamp(54px,8vw,112px) clamp(20px,5vw,76px) 34px}.eyebrow{margin:0 0 12px;color:var(--primary);font-size:.76rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}h1{max-width:1040px;margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(3rem,7.2vw,7rem);line-height:.98;letter-spacing:0}h2{margin:0 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,4vw,3.7rem);line-height:1.15;letter-spacing:0}h3{margin:0 0 8px;font-size:1.08rem;line-height:1.5}.lead{max-width:690px;margin:28px 0 0;color:var(--muted);font-size:1.08rem}.hero-side{display:grid;gap:16px}.hero-side img{width:100%;aspect-ratio:1/1;object-fit:cover;border:1px solid var(--line);border-radius:var(--radius)}
.button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 22px;border:1px solid var(--primary);font-size:.9rem;font-weight:900;border-radius:var(--radius)}.button.primary{background:var(--primary);color:var(--paper)}.button.ghost{color:var(--primary);background:transparent}
.bento-overview{display:grid;grid-template-columns:1.2fr .8fr .8fr 1fr;gap:16px;padding:0 clamp(20px,5vw,76px) clamp(64px,8vw,96px)}.tile{min-height:180px;padding:24px;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);box-shadow:0 12px 40px rgba(0,0,0,.06)}.tile.large{grid-column:span 2}.tile span,.work-card span,.service-grid span{color:var(--accent);font-size:.78rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.tile strong{display:block;margin:12px 0;font-family:Georgia,"Times New Roman",serif;font-size:4.6rem;line-height:1}.tile p{margin:0;color:var(--muted)}.tile.accent{background:var(--deep);color:var(--paper)}.image-tile{padding:0;overflow:hidden}.image-tile img{width:100%;height:100%;object-fit:cover}
.section{padding:clamp(68px,9vw,120px) clamp(20px,5vw,76px)}.section-heading{max-width:760px;margin-bottom:38px}.section-heading p:not(.eyebrow),.profile p,.contact p{color:var(--muted)}
.work-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:minmax(220px,auto);gap:16px}.work-card{position:relative;min-height:260px;overflow:hidden;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius)}.work-card.wide{grid-column:span 2}.work-card.tall{grid-row:span 2}.work-card img{width:100%;height:100%;min-height:260px;object-fit:cover}.work-card div{position:absolute;inset:auto 16px 16px 16px;padding:16px;background:color-mix(in srgb,var(--paper) 88%,transparent);border:1px solid var(--line);border-radius:var(--radius);backdrop-filter:blur(14px)}
.profile{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,520px);gap:clamp(28px,5vw,68px);align-items:center;background:var(--soft)}.profile dl{display:grid;gap:12px;margin:0}.profile dl div{display:grid;grid-template-columns:72px 1fr;gap:16px;padding:18px;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius)}.profile dt{color:var(--accent);font-family:Georgia,"Times New Roman",serif;font-size:1.8rem;font-weight:700}.profile dd{margin:0;color:var(--muted);font-weight:800}
.service-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.service-grid article{min-height:220px;padding:24px;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius)}.service-grid p{color:var(--muted)}.contact{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;background:var(--deep);color:var(--paper)}.contact p,.contact .eyebrow{color:color-mix(in srgb,var(--paper) 72%,var(--accent))}.contact-actions{display:flex;flex-wrap:wrap;gap:14px}.contact .button.ghost{border-color:color-mix(in srgb,var(--paper) 40%,transparent);color:var(--paper)}
.site-footer{display:flex;justify-content:space-between;gap:16px;padding:26px clamp(20px,5vw,76px);background:var(--deep);color:var(--paper);font-size:.86rem}.site-footer p{margin:0}
@media(max-width:1000px){.bento-overview,.work-grid{grid-template-columns:1fr 1fr}.tile.large,.work-card.wide{grid-column:span 1}.work-card.tall{grid-row:span 1}.hero,.profile,.contact{grid-template-columns:1fr}.hero{min-height:auto}.service-grid{grid-template-columns:1fr}}
@media(max-width:760px){.nav-toggle{display:block}.site-nav{position:fixed;inset:76px 0 auto 0;display:none;flex-direction:column;align-items:stretch;padding:18px 20px 24px;background:var(--paper);border-bottom:1px solid var(--line)}.site-nav.is-open{display:flex}.site-nav a{padding:12px 0}.bento-overview,.work-grid{grid-template-columns:1fr}.contact-actions{display:grid}.button{width:100%}}
@media(max-width:560px){.site-header{padding-inline:16px}.hero,.section,.bento-overview{padding-inline:16px}.profile dl div{grid-template-columns:1fr}.site-footer{flex-direction:column}}
`;
}

function js() {
  return `const navToggle=document.querySelector(".nav-toggle");const siteNav=document.querySelector(".site-nav");if(navToggle&&siteNav){navToggle.addEventListener("click",()=>{const isOpen=siteNav.classList.toggle("is-open");navToggle.setAttribute("aria-expanded",String(isOpen));navToggle.setAttribute("aria-label",isOpen?"メニューを閉じる":"メニューを開く")});siteNav.querySelectorAll("a").forEach(link=>{link.addEventListener("click",()=>{siteNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","メニューを開く")})})}
`;
}

function readme(theme) {
  return `# Bento Portfolio Template ${theme.key}

Bento Grid風のクリエイター・デザイナー向けWebサイトテンプレートです。
実績、プロフィール、サービス、問い合わせ導線を1ページにまとめています。

## 編集する主な場所

- index.html: 名前、実績、プロフィール、サービス、問い合わせリンク
- css/style.css: 色、余白、文字サイズ、カードレイアウト
- js/main.js: スマートフォン用メニューの開閉
- images/: ポートレートや実績画像

## 注意

フォーム送信、決済、予約管理、サーバー設定は含まれていません。
実際に使用する場合は、問い合わせボタンやSNSリンクを運用中のURLへ差し替えてください。
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
  const dir = path.join(outRoot, `Bento-Portfolio-Template-${theme.key}`);
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
