const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const outRoot = path.join(root, "web11");

const themes = [
  { key: "Cool", mood: "clear airy beauty", c: { bg: "#f0f8f8", paper: "#ffffff", ink: "#213238", muted: "#657a80", primary: "#3a8991", accent: "#c9a071", soft: "#dff1f2", deep: "#183940", line: "#bedbdf" } },
  { key: "Dark", mood: "soft night beauty", c: { bg: "#121216", paper: "#1f2028", ink: "#f5eee8", muted: "#b9b0aa", primary: "#d7a760", accent: "#78b8bf", soft: "#2b2d36", deep: "#08090c", line: "#3d404b" } },
  { key: "Girly", mood: "milky pink salon", c: { bg: "#fff6f9", paper: "#ffffff", ink: "#51323e", muted: "#8d6975", primary: "#d9658b", accent: "#c79a64", soft: "#ffe5ee", deep: "#74364d", line: "#f1c3d2" } },
  { key: "Minimal", mood: "clean beauty note", c: { bg: "#f8f6f1", paper: "#fffdf8", ink: "#292822", muted: "#74716a", primary: "#383731", accent: "#a78751", soft: "#ebe6dc", deep: "#181812", line: "#d9d2c5" } },
  { key: "RetroPop", mood: "sweet retro beauty", c: { bg: "#fff7db", paper: "#fffdf5", ink: "#312750", muted: "#71638d", primary: "#e86252", accent: "#279c90", soft: "#ffd9ad", deep: "#31215f", line: "#efba72" } },
];

const imageLabels = {
  "hero-main.svg": "Beauty salon mood",
  "salon-chair.svg": "Salon chair",
  "menu-01.svg": "Nail care",
  "menu-02.svg": "Eyelash care",
  "menu-03.svg": "Brow styling",
  "gallery-01.svg": "Nail design",
  "gallery-02.svg": "Beauty tools",
  "gallery-03.svg": "Salon interior",
  "gallery-04.svg": "Care detail",
  "map-placeholder.svg": "Salon map",
};

function svg(label, theme, i) {
  const c = theme.c;
  const rotate = i % 2 ? 4 : -4;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <rect width="1200" height="800" fill="${c.soft}"/>
  <rect x="76" y="70" width="1048" height="660" rx="34" fill="${c.paper}" stroke="${c.line}" stroke-width="6"/>
  <circle cx="940" cy="182" r="106" fill="${c.accent}" opacity=".22"/>
  <circle cx="250" cy="622" r="128" fill="${c.primary}" opacity=".13"/>
  <g transform="translate(600 390) rotate(${rotate})">
    <rect x="-270" y="-160" width="540" height="320" rx="34" fill="${c.bg}" stroke="${c.primary}" stroke-width="8"/>
    <path d="M-172 -72h344M-172 4h280M-172 80h326" stroke="${c.line}" stroke-width="17" stroke-linecap="round"/>
    <circle cx="142" cy="-58" r="46" fill="${c.accent}" opacity=".85"/>
    <circle cx="182" cy="36" r="34" fill="${c.primary}" opacity=".72"/>
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
  <title>Airy Beauty Template ${theme.key}</title>
  <meta name="description" content="ネイル・まつげ・眉毛・美容サロン向けHTML/CSS/JSテンプレートです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#top">Airy Beauty</a>
    <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#concept">Concept</a>
      <a href="#menu">Menu</a>
      <a href="#gallery">Gallery</a>
      <a href="#voice">Voice</a>
      <a href="#reserve">Reserve</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${theme.mood}</p>
        <h1>指先から、毎日を少し軽やかに。</h1>
        <p class="lead">ネイル、アイラッシュ、眉毛サロン、小さな美容サロンに使える淡色ガーリーなテンプレートです。</p>
        <div class="hero-actions">
          <a class="button primary" href="#reserve">予約する</a>
          <a class="button ghost" href="#gallery">デザインを見る</a>
        </div>
      </div>
      <div class="hero-visual"><img src="images/hero-main.svg" alt="美容サロンのイメージ"></div>
    </section>

    <section class="info-strip" aria-label="サロン情報">
      <span>Private salon</span>
      <span>First visit welcome</span>
      <span>Online reservation</span>
    </section>

    <section id="concept" class="section concept">
      <img src="images/salon-chair.svg" alt="サロンチェアのイメージ">
      <div>
        <p class="eyebrow">Concept</p>
        <h2>自然体のかわいさを、丁寧に整える。</h2>
        <p>Airy Beautyは架空の美容サロンです。初めての方にも伝わりやすいよう、雰囲気、施術の流れ、こだわりをコンパクトにまとめています。</p>
        <dl>
          <div><dt>Tone</dt><dd>淡色でやわらかい世界観</dd></div>
          <div><dt>Care</dt><dd>カウンセリング重視の施術</dd></div>
          <div><dt>Style</dt><dd>日常になじむデザイン提案</dd></div>
        </dl>
      </div>
    </section>

    <section id="menu" class="section">
      <div class="section-heading">
        <p class="eyebrow">Menu</p>
        <h2>メニュー</h2>
        <p>施術内容、時間、価格を差し替えて、ネイル・まつげ・眉毛などに調整できます。</p>
      </div>
      <div class="menu-grid">
        <article><img src="images/menu-01.svg" alt="ネイルケア"><div><span>70 min</span><h3>Gel Nail Design</h3><p>ワンカラーから季節のデザインまで対応。</p><strong>¥7,700</strong></div></article>
        <article><img src="images/menu-02.svg" alt="まつげケア"><div><span>60 min</span><h3>Eyelash Lift</h3><p>自然なカールで目元をすっきり見せます。</p><strong>¥6,600</strong></div></article>
        <article><img src="images/menu-03.svg" alt="眉毛スタイリング"><div><span>45 min</span><h3>Brow Styling</h3><p>顔立ちに合わせて眉の形を整えます。</p><strong>¥5,500</strong></div></article>
      </div>
    </section>

    <section id="gallery" class="section gallery">
      <div class="section-heading">
        <p class="eyebrow">Gallery</p>
        <h2>デザインギャラリー</h2>
      </div>
      <div class="gallery-grid">
        <img src="images/gallery-01.svg" alt="ネイルデザイン">
        <img src="images/gallery-02.svg" alt="美容ツール">
        <img src="images/gallery-03.svg" alt="サロン内装">
        <img src="images/gallery-04.svg" alt="施術ディテール">
      </div>
    </section>

    <section id="voice" class="section voice">
      <div class="section-heading">
        <p class="eyebrow">Voice</p>
        <h2>お客様の声</h2>
      </div>
      <div class="voice-grid">
        <blockquote>相談しながら決められるので、初めてでも安心でした。</blockquote>
        <blockquote>派手すぎず、日常に合うデザインにしてもらえました。</blockquote>
        <blockquote>サロンの雰囲気が落ち着いていて、毎月通うのが楽しみです。</blockquote>
      </div>
    </section>

    <section id="reserve" class="section reserve">
      <div>
        <p class="eyebrow">Reserve</p>
        <h2>ご予約・お問い合わせ</h2>
        <p>予約フォーム、LINE、Instagram、電話番号など実際の受付導線へ差し替えてください。</p>
      </div>
      <div class="reserve-card">
        <img src="images/map-placeholder.svg" alt="サロン周辺マップ">
        <div>
          <p>東京都○○区○○ 1-2-3 / ○○駅 徒歩5分</p>
          <a class="button primary" href="https://example.com/reserve">予約ページへ</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Airy Beauty. All rights reserved.</p>
    <a href="#top">Back to top</a>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>
`;
}

function css(theme) {
  const c = theme.c;
  return `:root{--bg:${c.bg};--paper:${c.paper};--ink:${c.ink};--muted:${c.muted};--primary:${c.primary};--accent:${c.accent};--soft:${c.soft};--deep:${c.deep};--line:${c.line};--shadow:0 24px 70px rgba(0,0,0,.12)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;line-height:1.8}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}h1,h2,h3,p{overflow-wrap:anywhere}
.site-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:76px;padding:18px clamp(18px,4vw,56px);background:color-mix(in srgb,var(--paper) 90%,transparent);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}.logo{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;font-weight:700;letter-spacing:0}.site-nav{display:flex;align-items:center;gap:clamp(14px,2vw,30px);font-size:.9rem;font-weight:900}.site-nav a{color:var(--muted)}.site-nav a:hover{color:var(--primary)}.nav-toggle{display:none;width:44px;height:44px;border:1px solid var(--line);background:var(--paper);padding:10px}.nav-toggle span{display:block;height:2px;margin:6px 0;background:var(--ink)}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.88fr);gap:clamp(30px,5vw,76px);align-items:center;min-height:calc(100vh - 76px);padding:clamp(48px,8vw,112px) clamp(20px,5vw,76px);background:linear-gradient(135deg,var(--bg),var(--soft))}.eyebrow{margin:0 0 12px;color:var(--primary);font-size:.76rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}h1{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.7rem,6.4vw,6.2rem);line-height:1.03;letter-spacing:0}h2{margin:0 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,4vw,3.7rem);line-height:1.15;letter-spacing:0}h3{margin:0 0 8px;font-size:1.08rem;line-height:1.5}.lead{max-width:640px;margin:28px 0 0;color:var(--muted);font-size:1.08rem}.hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}.button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 22px;border:1px solid var(--primary);font-size:.9rem;font-weight:900}.button.primary{background:var(--primary);color:var(--paper)}.button.ghost{background:var(--paper);color:var(--primary)}.hero-visual{position:relative}.hero-visual:before{content:"";position:absolute;inset:-18px;border:1px solid var(--accent);transform:rotate(-2deg);opacity:.62}.hero-visual img{position:relative;width:100%;aspect-ratio:4/3;object-fit:cover;box-shadow:var(--shadow)}
.info-strip{display:grid;grid-template-columns:repeat(3,1fr);border-block:1px solid var(--line);background:var(--paper);color:var(--primary)}.info-strip span{min-height:64px;display:grid;place-items:center;padding:12px;border-right:1px solid var(--line);font-size:.82rem;font-weight:900;text-align:center}.section{padding:clamp(68px,9vw,120px) clamp(20px,5vw,76px)}.section-heading{max-width:760px;margin-bottom:38px}.section-heading p:not(.eyebrow),.concept p,.reserve p{color:var(--muted)}
.concept{display:grid;grid-template-columns:minmax(280px,.86fr) minmax(0,1fr);gap:clamp(28px,5vw,68px);align-items:center;background:var(--soft)}.concept img{width:100%;aspect-ratio:5/4;object-fit:cover;border:1px solid var(--line)}.concept dl{display:grid;gap:12px;margin:30px 0 0}.concept dl div{display:grid;grid-template-columns:100px 1fr;gap:14px;padding:14px 0;border-bottom:1px solid var(--line)}.concept dt{color:var(--primary);font-weight:900}.concept dd{margin:0;color:var(--muted)}
.menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.menu-grid article{background:var(--paper);border:1px solid var(--line);box-shadow:0 12px 40px rgba(0,0,0,.06)}.menu-grid img{width:100%;aspect-ratio:4/3;object-fit:cover;border-bottom:1px solid var(--line)}.menu-grid div{padding:22px}.menu-grid span{color:var(--accent);font-size:.78rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.menu-grid p{min-height:70px;color:var(--muted)}.menu-grid strong{color:var(--primary);font-size:1.1rem}
.gallery{background:var(--deep);color:var(--paper)}.gallery .eyebrow{color:var(--accent)}.gallery-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.gallery-grid img{width:100%;min-height:280px;aspect-ratio:4/3;object-fit:cover;border:1px solid color-mix(in srgb,var(--paper) 24%,transparent)}.voice-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.voice-grid blockquote{margin:0;min-height:180px;padding:26px;background:var(--paper);border:1px solid var(--line);color:var(--muted)}
.reserve{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,460px);gap:28px;align-items:center;background:var(--soft)}.reserve-card{display:grid;background:var(--paper);border:1px solid var(--line);box-shadow:var(--shadow)}.reserve-card img{width:100%;aspect-ratio:5/3;object-fit:cover;border-bottom:1px solid var(--line)}.reserve-card div{padding:22px}.reserve-card p{margin-top:0}.site-footer{display:flex;justify-content:space-between;gap:16px;padding:26px clamp(20px,5vw,76px);background:var(--deep);color:var(--paper);font-size:.86rem}.site-footer p{margin:0}
@media(max-width:980px){.hero,.concept,.reserve{grid-template-columns:1fr}.hero{min-height:auto}.menu-grid,.voice-grid,.info-strip{grid-template-columns:1fr}}
@media(max-width:760px){.nav-toggle{display:block}.site-nav{position:fixed;inset:76px 0 auto 0;display:none;flex-direction:column;align-items:stretch;padding:18px 20px 24px;background:var(--paper);border-bottom:1px solid var(--line)}.site-nav.is-open{display:flex}.site-nav a{padding:12px 0}.hero-actions{display:grid}.button{width:100%}.gallery-grid{grid-template-columns:1fr}}
@media(max-width:560px){.site-header{padding-inline:16px}.hero,.section{padding-inline:16px}.concept dl div{grid-template-columns:1fr;gap:4px}.site-footer{flex-direction:column}}
`;
}

function js() {
  return `const navToggle=document.querySelector(".nav-toggle");const siteNav=document.querySelector(".site-nav");if(navToggle&&siteNav){navToggle.addEventListener("click",()=>{const isOpen=siteNav.classList.toggle("is-open");navToggle.setAttribute("aria-expanded",String(isOpen));navToggle.setAttribute("aria-label",isOpen?"メニューを閉じる":"メニューを開く")});siteNav.querySelectorAll("a").forEach(link=>{link.addEventListener("click",()=>{siteNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","メニューを開く")})})}
`;
}

function readme(theme) {
  return `# Airy Beauty Template ${theme.key}

ネイル・まつげ・眉毛・小さな美容サロン向けのWebサイトテンプレートです。
コンセプト、メニュー、ギャラリー、お客様の声、予約導線を1ページにまとめています。

## 編集する主な場所

- index.html: サロン名、メニュー、料金、住所、予約リンク
- css/style.css: 色、余白、文字サイズ、淡色の雰囲気
- js/main.js: スマートフォン用メニューの開閉
- images/: デザイン写真、内装写真、地図画像

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
  const dir = path.join(outRoot, `Airy-Beauty-Template-${theme.key}`);
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
