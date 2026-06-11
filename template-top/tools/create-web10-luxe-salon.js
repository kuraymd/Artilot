const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const outRoot = path.join(root, "web10");

const themes = [
  { key: "Cool", mood: "refined cool salon", c: { bg: "#eef6f7", paper: "#ffffff", ink: "#1d3136", muted: "#65787e", primary: "#247987", accent: "#b68a51", soft: "#d9ecef", deep: "#12333a", line: "#b8d7dc" } },
  { key: "Dark", mood: "luxury night salon", c: { bg: "#0f1013", paper: "#1b1b22", ink: "#f4eee4", muted: "#b8b0a7", primary: "#c99a4c", accent: "#6bb5bc", soft: "#282932", deep: "#07080b", line: "#3a3b45" } },
  { key: "Girly", mood: "soft private salon", c: { bg: "#fff4f7", paper: "#fffdfd", ink: "#50323d", muted: "#896873", primary: "#c85e80", accent: "#b78a50", soft: "#ffe1ea", deep: "#6f3448", line: "#efc0cf" } },
  { key: "Minimal", mood: "quiet wellness salon", c: { bg: "#f7f5ef", paper: "#fffdf8", ink: "#282821", muted: "#74736b", primary: "#30312b", accent: "#9d7c43", soft: "#e9e5da", deep: "#171812", line: "#d8d3c6" } },
  { key: "RetroPop", mood: "modern retro beauty", c: { bg: "#fff6d8", paper: "#fffdf4", ink: "#30264f", muted: "#70628b", primary: "#d95d43", accent: "#1f9b8e", soft: "#ffd9a8", deep: "#30205f", line: "#efba70" } },
];

const imageLabels = {
  "hero-main.svg": "Salon interior",
  "treatment-room.svg": "Treatment room",
  "menu-01.svg": "Facial care",
  "menu-02.svg": "Body care",
  "menu-03.svg": "Hair treatment",
  "gallery-01.svg": "Reception",
  "gallery-02.svg": "Care products",
  "gallery-03.svg": "Private room",
  "map-placeholder.svg": "Salon map",
};

function svg(label, theme, i) {
  const c = theme.c;
  const rotate = i % 2 ? 3 : -3;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <rect width="1200" height="800" fill="${c.soft}"/>
  <rect x="76" y="70" width="1048" height="660" rx="20" fill="${c.paper}" stroke="${c.line}" stroke-width="6"/>
  <circle cx="940" cy="188" r="104" fill="${c.accent}" opacity=".24"/>
  <circle cx="244" cy="620" r="126" fill="${c.primary}" opacity=".13"/>
  <g transform="translate(600 390) rotate(${rotate})">
    <rect x="-285" y="-165" width="570" height="330" rx="18" fill="${c.bg}" stroke="${c.primary}" stroke-width="8"/>
    <path d="M-178 -82h356M-178 -5h270M-178 72h328" stroke="${c.line}" stroke-width="17" stroke-linecap="round"/>
    <rect x="120" y="-110" width="86" height="190" rx="43" fill="${c.accent}" opacity=".86"/>
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
  <title>Luxe Salon Template ${theme.key}</title>
  <meta name="description" content="高級感のあるサロン・美容室・エステ向けHTML/CSS/JSテンプレートです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#top">Luxe Salon</a>
    <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#concept">Concept</a>
      <a href="#menu">Menu</a>
      <a href="#space">Space</a>
      <a href="#access">Access</a>
      <a href="#reserve">Reserve</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${theme.mood}</p>
        <h1>静かに整う、私だけのサロン時間。</h1>
        <p class="lead">エステ、ヘアサロン、スパ、プライベートサロンに使える高級感重視のWebサイトテンプレートです。</p>
        <div class="hero-actions">
          <a class="button primary" href="#reserve">予約する</a>
          <a class="button ghost" href="#menu">メニューを見る</a>
        </div>
      </div>
      <div class="hero-visual"><img src="images/hero-main.svg" alt="サロン内装のイメージ"></div>
    </section>

    <section class="status-bar" aria-label="サロン情報">
      <span>Private salon</span>
      <span>Reservation only</span>
      <span>Open 10:00 - 20:00</span>
    </section>

    <section id="concept" class="section concept">
      <img src="images/treatment-room.svg" alt="施術ルームのイメージ">
      <div>
        <p class="eyebrow">Concept</p>
        <h2>余白のある空間で、肌と心を整える。</h2>
        <p>Luxe Salonは架空のプライベートサロンです。サロンの世界観、こだわり、はじめてのお客様への安心感を伝えやすい構成にしています。</p>
        <dl>
          <div><dt>Room</dt><dd>完全予約制のプライベート空間</dd></div>
          <div><dt>Care</dt><dd>肌質や悩みに合わせたカウンセリング</dd></div>
          <div><dt>Style</dt><dd>静かで落ち着いた上質な時間</dd></div>
        </dl>
      </div>
    </section>

    <section id="menu" class="section">
      <div class="section-heading">
        <p class="eyebrow">Menu</p>
        <h2>メニュー</h2>
        <p>施術内容、所要時間、価格を差し替えるだけでサロンの料金表として使えます。</p>
      </div>
      <div class="menu-grid">
        <article><img src="images/menu-01.svg" alt="フェイシャルケア"><div><span>60 min</span><h3>Facial Treatment</h3><p>肌の状態に合わせて整えるベーシックケア。</p><strong>¥8,800</strong></div></article>
        <article><img src="images/menu-02.svg" alt="ボディケア"><div><span>90 min</span><h3>Body Relaxation</h3><p>疲れをほどき、深く休めるボディトリートメント。</p><strong>¥12,000</strong></div></article>
        <article><img src="images/menu-03.svg" alt="ヘアトリートメント"><div><span>45 min</span><h3>Hair & Scalp Care</h3><p>髪と頭皮を整える集中ケアメニュー。</p><strong>¥6,600</strong></div></article>
      </div>
    </section>

    <section id="space" class="section space">
      <div class="section-heading">
        <p class="eyebrow">Space</p>
        <h2>空間とこだわり</h2>
      </div>
      <div class="gallery-grid">
        <img src="images/gallery-01.svg" alt="受付スペース">
        <img src="images/gallery-02.svg" alt="ケア用品">
        <img src="images/gallery-03.svg" alt="プライベートルーム">
      </div>
    </section>

    <section id="access" class="section access">
      <div>
        <p class="eyebrow">Access</p>
        <h2>アクセス</h2>
        <p>東京都○○区○○ 1-2-3 / ○○駅 徒歩5分</p>
        <dl>
          <div><dt>営業時間</dt><dd>10:00 - 20:00</dd></div>
          <div><dt>定休日</dt><dd>水曜日</dd></div>
          <div><dt>予約</dt><dd>完全予約制</dd></div>
        </dl>
      </div>
      <img src="images/map-placeholder.svg" alt="サロン周辺マップ">
    </section>

    <section id="reserve" class="section reserve">
      <div>
        <p class="eyebrow">Reserve</p>
        <h2>ご予約・お問い合わせ</h2>
        <p>予約フォーム、LINE、Instagram、電話番号など実際の受付導線へ差し替えてください。</p>
      </div>
      <div class="reserve-actions">
        <a class="button primary" href="https://example.com/reserve">予約ページへ</a>
        <a class="button ghost" href="https://www.instagram.com/">Instagram</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Luxe Salon. All rights reserved.</p>
    <a href="#top">Back to top</a>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>
`;
}

function css(theme) {
  const c = theme.c;
  return `:root{--bg:${c.bg};--paper:${c.paper};--ink:${c.ink};--muted:${c.muted};--primary:${c.primary};--accent:${c.accent};--soft:${c.soft};--deep:${c.deep};--line:${c.line};--shadow:0 28px 80px rgba(0,0,0,.16)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;line-height:1.8}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}h1,h2,h3,p{overflow-wrap:anywhere}
.site-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:76px;padding:18px clamp(18px,4vw,56px);background:color-mix(in srgb,var(--paper) 90%,transparent);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}.logo{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;font-weight:700;letter-spacing:0}.site-nav{display:flex;align-items:center;gap:clamp(14px,2vw,30px);font-size:.9rem;font-weight:900}.site-nav a{color:var(--muted)}.site-nav a:hover{color:var(--primary)}.nav-toggle{display:none;width:44px;height:44px;border:1px solid var(--line);background:var(--paper);padding:10px}.nav-toggle span{display:block;height:2px;margin:6px 0;background:var(--ink)}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.88fr);gap:clamp(30px,5vw,76px);align-items:center;min-height:calc(100vh - 76px);padding:clamp(48px,8vw,112px) clamp(20px,5vw,76px);background:linear-gradient(135deg,var(--bg),var(--soft))}.eyebrow{margin:0 0 12px;color:var(--primary);font-size:.76rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}h1{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.8rem,6.8vw,6.8rem);line-height:1.02;letter-spacing:0}h2{margin:0 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,4vw,3.8rem);line-height:1.15;letter-spacing:0}h3{margin:0 0 8px;font-size:1.08rem;line-height:1.5}.lead{max-width:640px;margin:28px 0 0;color:var(--muted);font-size:1.08rem}.hero-actions,.reserve-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}.button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 22px;border:1px solid var(--primary);font-size:.9rem;font-weight:900}.button.primary{background:var(--primary);color:var(--paper)}.button.ghost{background:transparent;color:var(--primary)}.hero-visual{position:relative}.hero-visual:before{content:"";position:absolute;inset:-18px;border:1px solid var(--accent);transform:rotate(2deg);opacity:.6}.hero-visual img{position:relative;width:100%;aspect-ratio:4/3;object-fit:cover;box-shadow:var(--shadow)}
.status-bar{display:grid;grid-template-columns:repeat(3,1fr);border-block:1px solid var(--line);background:var(--deep);color:var(--paper)}.status-bar span{min-height:64px;display:grid;place-items:center;padding:12px;border-right:1px solid color-mix(in srgb,var(--paper) 20%,transparent);font-size:.82rem;font-weight:900;text-align:center}
.section{padding:clamp(68px,9vw,120px) clamp(20px,5vw,76px)}.section-heading{max-width:760px;margin-bottom:38px}.section-heading p:not(.eyebrow),.concept p,.access p,.reserve p{color:var(--muted)}.concept,.access,.reserve{display:grid;grid-template-columns:minmax(280px,.86fr) minmax(0,1fr);gap:clamp(28px,5vw,68px);align-items:center}.concept{background:var(--deep);color:var(--paper)}.concept .eyebrow,.concept p{color:color-mix(in srgb,var(--paper) 72%,var(--accent))}.concept img,.access img{width:100%;aspect-ratio:5/4;object-fit:cover;border:1px solid var(--line)}
.concept dl,.access dl{display:grid;gap:12px;margin:30px 0 0}.concept dl div,.access dl div{display:grid;grid-template-columns:100px 1fr;gap:14px;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--line) 70%,transparent)}.concept dt,.access dt{color:var(--accent);font-weight:900}.concept dd,.access dd{margin:0;color:color-mix(in srgb,var(--paper) 74%,var(--accent))}.access dd{color:var(--muted)}
.menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.menu-grid article{background:var(--paper);border:1px solid var(--line);box-shadow:0 12px 40px rgba(0,0,0,.07)}.menu-grid img{width:100%;aspect-ratio:4/3;object-fit:cover;border-bottom:1px solid var(--line)}.menu-grid div{padding:22px}.menu-grid span{color:var(--accent);font-size:.78rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.menu-grid p{min-height:70px;color:var(--muted)}.menu-grid strong{color:var(--primary);font-size:1.1rem}
.space{background:var(--soft)}.gallery-grid{display:grid;grid-template-columns:1fr 1.1fr .9fr;gap:18px}.gallery-grid img{width:100%;height:100%;min-height:280px;object-fit:cover;border:1px solid var(--line)}.access{background:var(--bg)}.reserve{grid-template-columns:minmax(0,1fr) auto;background:var(--deep);color:var(--paper)}.reserve p,.reserve .eyebrow{color:color-mix(in srgb,var(--paper) 72%,var(--accent))}.reserve-actions{margin-top:0}.reserve .button.ghost{border-color:color-mix(in srgb,var(--paper) 40%,transparent);color:var(--paper)}
.site-footer{display:flex;justify-content:space-between;gap:16px;padding:26px clamp(20px,5vw,76px);background:var(--deep);color:var(--paper);font-size:.86rem}.site-footer p{margin:0}
@media(max-width:980px){.hero,.concept,.access,.reserve{grid-template-columns:1fr}.hero{min-height:auto}.menu-grid,.status-bar,.gallery-grid{grid-template-columns:1fr}.reserve-actions{justify-content:flex-start}}
@media(max-width:760px){.nav-toggle{display:block}.site-nav{position:fixed;inset:76px 0 auto 0;display:none;flex-direction:column;align-items:stretch;padding:18px 20px 24px;background:var(--paper);border-bottom:1px solid var(--line)}.site-nav.is-open{display:flex}.site-nav a{padding:12px 0}.hero-actions,.reserve-actions{display:grid}.button{width:100%}}
@media(max-width:560px){.site-header{padding-inline:16px}.hero,.section{padding-inline:16px}.concept dl div,.access dl div{grid-template-columns:1fr;gap:4px}.site-footer{flex-direction:column}}
`;
}

function js() {
  return `const navToggle=document.querySelector(".nav-toggle");const siteNav=document.querySelector(".site-nav");if(navToggle&&siteNav){navToggle.addEventListener("click",()=>{const isOpen=siteNav.classList.toggle("is-open");navToggle.setAttribute("aria-expanded",String(isOpen));navToggle.setAttribute("aria-label",isOpen?"メニューを閉じる":"メニューを開く")});siteNav.querySelectorAll("a").forEach(link=>{link.addEventListener("click",()=>{siteNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","メニューを開く")})})}
`;
}

function readme(theme) {
  return `# Luxe Salon Template ${theme.key}

高級感のあるサロン・美容室・エステ向けWebサイトテンプレートです。
コンセプト、メニュー、空間紹介、アクセス、予約導線を1ページにまとめています。

## 編集する主な場所

- index.html: サロン名、メニュー、料金、住所、予約リンク
- css/style.css: 色、余白、文字サイズ、上質感の調整
- js/main.js: スマートフォン用メニューの開閉
- images/: 内装写真、施術写真、地図画像

## 注意

予約システム、フォーム送信、決済、サーバー設定は含まれていません。
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
  const dir = path.join(outRoot, `Luxe-Salon-Template-${theme.key}`);
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
