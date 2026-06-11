const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const outRoot = path.join(root, "web12");

const themes = [
  { key: "Cool", mood: "cool retro market", c: { bg: "#edf8f6", paper: "#fffdf4", ink: "#1f3439", muted: "#657a7d", primary: "#247e88", accent: "#e2a052", soft: "#d8eeed", deep: "#163840", line: "#b8d7d8" } },
  { key: "Dark", mood: "night retro pop", c: { bg: "#101116", paper: "#1e1e27", ink: "#f6eee5", muted: "#b9b0a8", primary: "#d9a548", accent: "#6cb8bd", soft: "#292b35", deep: "#07080c", line: "#3c3f49" } },
  { key: "Girly", mood: "sweet pop market", c: { bg: "#fff5f8", paper: "#fffdf7", ink: "#513241", muted: "#8c6875", primary: "#d86286", accent: "#e0a24e", soft: "#ffe3ec", deep: "#71364c", line: "#f0c2d1" } },
  { key: "Minimal", mood: "clean retro shop", c: { bg: "#f8f5ee", paper: "#fffdf5", ink: "#282821", muted: "#74716a", primary: "#34342e", accent: "#a77e3f", soft: "#e9e4d8", deep: "#181812", line: "#d8d2c4" } },
  { key: "RetroPop", mood: "bright weekend bazaar", c: { bg: "#fff4c7", paper: "#fffdf0", ink: "#302650", muted: "#71618c", primary: "#ed6040", accent: "#159c8e", soft: "#ffd49a", deep: "#302060", line: "#efb565" } },
];

const imageLabels = {
  "hero-main.svg": "Retro market display",
  "shop-front.svg": "Shop front",
  "item-01.svg": "Poster goods",
  "item-02.svg": "Cup set",
  "item-03.svg": "Tote bag",
  "item-04.svg": "Sticker pack",
  "booth-01.svg": "Market booth",
  "booth-02.svg": "Food counter",
  "booth-03.svg": "Display shelf",
  "map-placeholder.svg": "Market map",
};

function svg(label, theme, i) {
  const c = theme.c;
  const rotate = i % 2 ? 5 : -5;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <rect width="1200" height="800" fill="${c.soft}"/>
  <rect x="70" y="68" width="1060" height="664" rx="26" fill="${c.paper}" stroke="${c.line}" stroke-width="6"/>
  <circle cx="948" cy="186" r="104" fill="${c.accent}" opacity=".28"/>
  <circle cx="234" cy="620" r="128" fill="${c.primary}" opacity=".15"/>
  <g transform="translate(600 392) rotate(${rotate})">
    <rect x="-290" y="-162" width="580" height="324" rx="24" fill="${c.bg}" stroke="${c.primary}" stroke-width="8"/>
    <path d="M-210 -92h420v74h-420z" fill="${c.primary}" opacity=".78"/>
    <path d="M-170 8h120M-20 8h120M130 8h64M-170 76h364" stroke="${c.line}" stroke-width="18" stroke-linecap="round"/>
    <rect x="116" y="-118" width="78" height="78" rx="18" fill="${c.accent}" opacity=".9"/>
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
  <title>Retro Market Template ${theme.key}</title>
  <meta name="description" content="レトロポップなショップ・イベント向けHTML/CSS/JSテンプレートです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#top">Retro Market</a>
    <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#lineup">Lineup</a>
      <a href="#about">About</a>
      <a href="#booth">Booth</a>
      <a href="#access">Access</a>
      <a href="#shop">Shop</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${theme.mood}</p>
        <h1>Weekend Retro Market</h1>
        <p class="lead">雑貨店、ポップアップ、マーケット、フードイベント、展示販売に使えるレトロポップなテンプレートです。</p>
        <div class="event-meta">
          <span>2026.09.12 Sat</span>
          <span>11:00 - 19:00</span>
          <span>Tokyo Pop Hall</span>
        </div>
        <div class="hero-actions">
          <a class="button primary" href="#lineup">ラインナップを見る</a>
          <a class="button ghost" href="#shop">オンラインショップ</a>
        </div>
      </div>
      <div class="hero-visual"><img src="images/hero-main.svg" alt="レトロマーケットのイメージ"></div>
    </section>

    <section class="strip" aria-label="特徴">
      <span>Goods</span>
      <span>Food</span>
      <span>Workshop</span>
      <span>Pop-up</span>
    </section>

    <section id="lineup" class="section">
      <div class="section-heading">
        <p class="eyebrow">Lineup</p>
        <h2>販売アイテム</h2>
        <p>グッズ、雑貨、フード、イベント限定商品などを楽しく並べられます。</p>
      </div>
      <div class="item-grid">
        <article><img src="images/item-01.svg" alt="ポスターグッズ"><div><span>01</span><h3>Poster Goods</h3><p>部屋に飾りやすいレトロカラーのポスター。</p><strong>¥1,500</strong></div></article>
        <article><img src="images/item-02.svg" alt="カップセット"><div><span>02</span><h3>Cup Set</h3><p>イベント限定のカップとコースターセット。</p><strong>¥2,400</strong></div></article>
        <article><img src="images/item-03.svg" alt="トートバッグ"><div><span>03</span><h3>Tote Bag</h3><p>毎日使えるしっかり生地のトートバッグ。</p><strong>¥2,800</strong></div></article>
        <article><img src="images/item-04.svg" alt="ステッカーパック"><div><span>04</span><h3>Sticker Pack</h3><p>ノートやラッピングに使えるステッカーセット。</p><strong>¥700</strong></div></article>
      </div>
    </section>

    <section id="about" class="section about">
      <img src="images/shop-front.svg" alt="ショップ外観のイメージ">
      <div>
        <p class="eyebrow">About</p>
        <h2>少し懐かしくて、今の暮らしに似合うもの。</h2>
        <p>Retro Marketは架空のポップアップイベントです。ブランドのコンセプト、イベントの雰囲気、来場の楽しさを伝えやすい構成です。</p>
        <dl>
          <div><dt>Theme</dt><dd>レトロカラーの雑貨とフード</dd></div>
          <div><dt>Place</dt><dd>駅近のイベントスペース</dd></div>
          <div><dt>Style</dt><dd>展示販売、ワークショップ、限定グッズ</dd></div>
        </dl>
      </div>
    </section>

    <section id="booth" class="section booth">
      <div class="section-heading">
        <p class="eyebrow">Booth</p>
        <h2>会場の雰囲気</h2>
      </div>
      <div class="booth-grid">
        <img src="images/booth-01.svg" alt="マーケットブース">
        <img src="images/booth-02.svg" alt="フードカウンター">
        <img src="images/booth-03.svg" alt="ディスプレイ棚">
      </div>
    </section>

    <section id="access" class="section access">
      <div>
        <p class="eyebrow">Access</p>
        <h2>会場案内</h2>
        <p>東京都○○区○○ 1-2-3 Tokyo Pop Hall / ○○駅 徒歩4分</p>
        <dl>
          <div><dt>入場</dt><dd>予約不要 / 混雑時は整理券制</dd></div>
          <div><dt>支払い</dt><dd>現金・キャッシュレス対応</dd></div>
          <div><dt>注意</dt><dd>在庫はなくなり次第終了です</dd></div>
        </dl>
      </div>
      <img src="images/map-placeholder.svg" alt="会場マップ">
    </section>

    <section id="shop" class="section shop">
      <div>
        <p class="eyebrow">Online</p>
        <h2>オンライン販売も受付中。</h2>
        <p>BOOTH、BASE、STORES、SUZURIなどの販売ページへリンクできます。</p>
      </div>
      <div class="shop-actions">
        <a class="button primary" href="https://example.com/shop">ショップを見る</a>
        <a class="button ghost" href="https://www.instagram.com/">Instagram</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Retro Market. All rights reserved.</p>
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
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.88fr);gap:clamp(30px,5vw,76px);align-items:center;min-height:calc(100vh - 76px);padding:clamp(48px,8vw,112px) clamp(20px,5vw,76px);background:linear-gradient(135deg,var(--bg),var(--soft))}.eyebrow{margin:0 0 12px;color:var(--primary);font-size:.76rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}h1{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(3rem,8vw,7.2rem);line-height:.96;letter-spacing:0}h2{margin:0 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,4vw,3.8rem);line-height:1.15;letter-spacing:0}h3{margin:0 0 8px;font-size:1.08rem;line-height:1.5}.lead{max-width:640px;margin:28px 0 0;color:var(--muted);font-size:1.08rem}.event-meta{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}.event-meta span{padding:9px 13px;background:var(--paper);border:1px solid var(--line);font-weight:900;font-size:.86rem}.hero-actions,.shop-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}.button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 22px;border:1px solid var(--primary);font-size:.9rem;font-weight:900}.button.primary{background:var(--primary);color:var(--paper)}.button.ghost{background:var(--paper);color:var(--primary)}.hero-visual{position:relative}.hero-visual:before{content:"";position:absolute;inset:-18px;border:1px solid var(--accent);transform:rotate(-2deg);opacity:.72}.hero-visual img{position:relative;width:100%;aspect-ratio:4/3;object-fit:cover;box-shadow:var(--shadow)}
.strip{display:grid;grid-template-columns:repeat(4,1fr);background:var(--deep);color:var(--paper);border-block:1px solid var(--line)}.strip span{min-height:66px;display:grid;place-items:center;padding:12px;border-right:1px solid color-mix(in srgb,var(--paper) 20%,transparent);font-weight:900;text-transform:uppercase}.section{padding:clamp(68px,9vw,120px) clamp(20px,5vw,76px)}.section-heading{max-width:760px;margin-bottom:38px}.section-heading p:not(.eyebrow),.about p,.access p,.shop p{color:var(--muted)}
.item-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.item-grid article{background:var(--paper);border:1px solid var(--line);box-shadow:0 12px 40px rgba(0,0,0,.07)}.item-grid img{width:100%;aspect-ratio:4/3;object-fit:cover;border-bottom:1px solid var(--line)}.item-grid div{padding:22px}.item-grid span{color:var(--accent);font-family:Georgia,"Times New Roman",serif;font-size:1.8rem;font-weight:700}.item-grid p{min-height:76px;color:var(--muted)}.item-grid strong{color:var(--primary)}
.about,.access,.shop{display:grid;grid-template-columns:minmax(280px,.86fr) minmax(0,1fr);gap:clamp(28px,5vw,68px);align-items:center}.about{background:var(--soft)}.about img,.access img{width:100%;aspect-ratio:5/4;object-fit:cover;border:1px solid var(--line)}.about dl,.access dl{display:grid;gap:12px;margin:30px 0 0}.about dl div,.access dl div{display:grid;grid-template-columns:100px 1fr;gap:14px;padding:14px 0;border-bottom:1px solid var(--line)}.about dt,.access dt{color:var(--primary);font-weight:900}.about dd,.access dd{margin:0;color:var(--muted)}
.booth{background:var(--deep);color:var(--paper)}.booth .eyebrow{color:var(--accent)}.booth-grid{display:grid;grid-template-columns:1fr 1.1fr .9fr;gap:18px}.booth-grid img{width:100%;height:100%;min-height:280px;object-fit:cover;border:1px solid color-mix(in srgb,var(--paper) 24%,transparent)}.access{background:var(--bg)}.shop{grid-template-columns:minmax(0,1fr) auto;background:var(--soft)}.shop-actions{margin-top:0}.site-footer{display:flex;justify-content:space-between;gap:16px;padding:26px clamp(20px,5vw,76px);background:var(--deep);color:var(--paper);font-size:.86rem}.site-footer p{margin:0}
@media(max-width:1050px){.item-grid{grid-template-columns:repeat(2,1fr)}.hero,.about,.access,.shop{grid-template-columns:1fr}.hero{min-height:auto}.booth-grid{grid-template-columns:1fr}}
@media(max-width:760px){.nav-toggle{display:block}.site-nav{position:fixed;inset:76px 0 auto 0;display:none;flex-direction:column;align-items:stretch;padding:18px 20px 24px;background:var(--paper);border-bottom:1px solid var(--line)}.site-nav.is-open{display:flex}.site-nav a{padding:12px 0}.item-grid,.strip{grid-template-columns:1fr}.hero-actions,.shop-actions,.event-meta{display:grid}.button{width:100%}}
@media(max-width:560px){.site-header{padding-inline:16px}.hero,.section{padding-inline:16px}.about dl div,.access dl div{grid-template-columns:1fr;gap:4px}.site-footer{flex-direction:column}}
`;
}

function js() {
  return `const navToggle=document.querySelector(".nav-toggle");const siteNav=document.querySelector(".site-nav");if(navToggle&&siteNav){navToggle.addEventListener("click",()=>{const isOpen=siteNav.classList.toggle("is-open");navToggle.setAttribute("aria-expanded",String(isOpen));navToggle.setAttribute("aria-label",isOpen?"メニューを閉じる":"メニューを開く")});siteNav.querySelectorAll("a").forEach(link=>{link.addEventListener("click",()=>{siteNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","メニューを開く")})})}
`;
}

function readme(theme) {
  return `# Retro Market Template ${theme.key}

レトロポップなショップ・イベント向けWebサイトテンプレートです。
商品ラインナップ、イベント概要、会場写真、アクセス、オンライン販売導線を1ページにまとめています。

## 編集する主な場所

- index.html: イベント名、商品、価格、会場、販売リンク
- css/style.css: 色、余白、文字サイズ、レトロポップな雰囲気
- js/main.js: スマートフォン用メニューの開閉
- images/: 商品写真、会場写真、地図画像

## 注意

カート、決済、フォーム送信、サーバー設定は含まれていません。
実際に使用する場合は、ショップボタンやSNSリンクを運用中のURLへ差し替えてください。
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
  const dir = path.join(outRoot, `Retro-Market-Template-${theme.key}`);
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
