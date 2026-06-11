const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const outRoot = path.join(root, "web09");

const themes = [
  { key: "Cool", mood: "paper craft studio", c: { bg: "#edf7f6", paper: "#fffdf8", ink: "#20353a", muted: "#687b7d", primary: "#2d7f83", accent: "#c99355", soft: "#dcefee", deep: "#18383d", line: "#b9d8d6" } },
  { key: "Dark", mood: "night atelier notes", c: { bg: "#111216", paper: "#1e1f26", ink: "#f4efe5", muted: "#b9b1a8", primary: "#d5a451", accent: "#69b7bb", soft: "#2a2c34", deep: "#08090c", line: "#3d4048" } },
  { key: "Girly", mood: "soft paper bouquet", c: { bg: "#fff5f8", paper: "#fffdfb", ink: "#51343f", muted: "#8a6973", primary: "#d76286", accent: "#bd8b4f", soft: "#ffe4ed", deep: "#71364b", line: "#efc2d2" } },
  { key: "Minimal", mood: "quiet handmade journal", c: { bg: "#f7f5ef", paper: "#fffdf8", ink: "#282821", muted: "#73726b", primary: "#33342d", accent: "#9c7d44", soft: "#e9e5da", deep: "#181812", line: "#d8d2c5" } },
  { key: "RetroPop", mood: "paper market colors", c: { bg: "#fff6d5", paper: "#fffdf4", ink: "#30264f", muted: "#70628b", primary: "#e95e3f", accent: "#1f9b8e", soft: "#ffd9a7", deep: "#30205f", line: "#efba70" } },
];

const imageLabels = {
  "hero-main.svg": "Paper craft collection",
  "maker-desk.svg": "Maker desk",
  "item-01.svg": "Letter set",
  "item-02.svg": "Wrapping paper",
  "item-03.svg": "Sticker sheet",
  "item-04.svg": "Mini card",
  "journal-01.svg": "Packaging scene",
  "journal-02.svg": "Paper texture",
  "journal-03.svg": "Market table",
};

function svg(label, theme, i) {
  const c = theme.c;
  const rotate = i % 2 ? 4 : -4;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <rect width="1200" height="800" fill="${c.soft}"/>
  <path d="M78 86c180-22 332 10 516-2 192-12 350-36 528-4v642c-172 20-340-4-516 4-184 8-350 32-528 0z" fill="${c.paper}" stroke="${c.line}" stroke-width="6"/>
  <g opacity=".28" stroke="${c.line}" stroke-width="3">
    <path d="M118 166h964M118 246h964M118 326h964M118 406h964M118 486h964M118 566h964M118 646h964"/>
  </g>
  <circle cx="930" cy="190" r="96" fill="${c.accent}" opacity=".26"/>
  <circle cx="250" cy="620" r="118" fill="${c.primary}" opacity=".14"/>
  <g transform="translate(600 392) rotate(${rotate})">
    <rect x="-235" y="-158" width="470" height="316" rx="18" fill="${c.bg}" stroke="${c.primary}" stroke-width="8"/>
    <path d="M-150 -70h300M-150 0h240M-150 70h295" stroke="${c.line}" stroke-width="17" stroke-linecap="round"/>
    <rect x="78" y="-120" width="92" height="92" rx="46" fill="${c.accent}" opacity=".82"/>
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
  <title>Paper Craft Shop Template ${theme.key}</title>
  <meta name="description" content="紙雑貨・ハンドメイド作家向けのHTML/CSS/JSテンプレートです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#top">Paper Atelier</a>
    <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#items">Items</a>
      <a href="#story">Story</a>
      <a href="#journal">Journal</a>
      <a href="#order">Order</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${theme.mood}</p>
        <h1>紙と余白でつくる、小さな贈りもの。</h1>
        <p class="lead">紙雑貨、ステッカー、カード、ラッピング用品、手仕事ブランドに使える紙もの風テンプレートです。</p>
        <div class="hero-actions">
          <a class="button primary" href="#items">作品を見る</a>
          <a class="button ghost" href="https://example.com/shop">ショップへ</a>
        </div>
      </div>
      <div class="hero-visual"><img src="images/hero-main.svg" alt="紙雑貨コレクション"></div>
    </section>

    <section class="paper-note" aria-label="ブランドメモ">
      <p>Letter sets, wrapping papers, cards and small printed things for everyday gifts.</p>
    </section>

    <section id="items" class="section">
      <div class="section-heading">
        <p class="eyebrow">Items</p>
        <h2>紙ものと小さな雑貨</h2>
        <p>商品写真、価格、説明文を差し替えるだけで、オンライン販売やイベント出店の案内に使えます。</p>
      </div>
      <div class="item-grid">
        <article><img src="images/item-01.svg" alt="レターセット"><span>01</span><h3>Botanical Letter Set</h3><p>便箋と封筒のセット。贈りものに添える一枚にも。</p><strong>¥1,200</strong></article>
        <article><img src="images/item-02.svg" alt="ラッピングペーパー"><span>02</span><h3>Wrapping Paper</h3><p>小さなギフトを包むためのオリジナル包装紙。</p><strong>¥900</strong></article>
        <article><img src="images/item-03.svg" alt="ステッカーシート"><span>03</span><h3>Sticker Sheet</h3><p>手帳やラッピングに使えるステッカーシート。</p><strong>¥650</strong></article>
        <article><img src="images/item-04.svg" alt="ミニカード"><span>04</span><h3>Mini Message Cards</h3><p>短い言葉を添えるためのミニカードセット。</p><strong>¥700</strong></article>
      </div>
    </section>

    <section id="story" class="section story">
      <img src="images/maker-desk.svg" alt="制作机のイメージ">
      <div>
        <p class="eyebrow">Story</p>
        <h2>手に取ったときの静かなうれしさを大切に。</h2>
        <p>Paper Atelierは架空の紙雑貨ブランドです。素材のこだわり、制作背景、作家プロフィールをやさしく伝えるためのセクションです。</p>
        <dl>
          <div><dt>Material</dt><dd>ざらりとした紙、落ち着いた印刷、余白のあるデザイン</dd></div>
          <div><dt>Scene</dt><dd>手紙、ギフト、手帳、イベント販売</dd></div>
          <div><dt>Order</dt><dd>名入れ、ショップカード、委託販売の相談</dd></div>
        </dl>
      </div>
    </section>

    <section id="journal" class="section journal">
      <div class="section-heading">
        <p class="eyebrow">Journal</p>
        <h2>制作の記録</h2>
      </div>
      <div class="journal-grid">
        <article><img src="images/journal-01.svg" alt="梱包風景"><h3>梱包に使う紙を選ぶ</h3><p>発送時の印象までブランドらしく整えます。</p></article>
        <article><img src="images/journal-02.svg" alt="紙の質感"><h3>紙の質感について</h3><p>写真では伝わりにくい手触りを言葉で補います。</p></article>
        <article><img src="images/journal-03.svg" alt="イベント出店"><h3>次回の出店予定</h3><p>イベントやポップアップのお知らせにも使えます。</p></article>
      </div>
    </section>

    <section id="order" class="section order">
      <div>
        <p class="eyebrow">Order</p>
        <h2>ご注文・お問い合わせ</h2>
        <p>オンラインショップ、問い合わせフォーム、Instagramなどの実際のリンクへ差し替えてください。</p>
      </div>
      <div class="order-actions">
        <a class="button primary" href="https://example.com/shop">オンラインショップ</a>
        <a class="button ghost" href="https://www.instagram.com/">Instagram</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Paper Atelier. All rights reserved.</p>
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
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;line-height:1.8;background-image:linear-gradient(var(--line) 1px,transparent 1px);background-size:100% 42px}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}h1,h2,h3,p{overflow-wrap:anywhere}
.site-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:76px;padding:18px clamp(18px,4vw,56px);background:color-mix(in srgb,var(--paper) 92%,transparent);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}.logo{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;font-weight:700;letter-spacing:0}.site-nav{display:flex;align-items:center;gap:clamp(14px,2vw,30px);font-size:.9rem;font-weight:900}.site-nav a{color:var(--muted)}.site-nav a:hover{color:var(--primary)}.nav-toggle{display:none;width:44px;height:44px;border:1px solid var(--line);background:var(--paper);padding:10px}.nav-toggle span{display:block;height:2px;margin:6px 0;background:var(--ink)}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.9fr);gap:clamp(30px,5vw,76px);align-items:center;min-height:calc(100vh - 76px);padding:clamp(48px,8vw,110px) clamp(20px,5vw,76px)}.eyebrow{margin:0 0 12px;color:var(--primary);font-size:.76rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}h1{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.7rem,6.5vw,6.4rem);line-height:1.02;letter-spacing:0}h2{margin:0 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,4vw,3.7rem);line-height:1.15;letter-spacing:0}h3{margin:0 0 8px;font-size:1.06rem;line-height:1.5}.lead{max-width:640px;margin:28px 0 0;color:var(--muted);font-size:1.08rem}.hero-actions,.order-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}.button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 22px;border:1px solid var(--primary);font-size:.9rem;font-weight:900}.button.primary{background:var(--primary);color:var(--paper)}.button.ghost{background:var(--paper);color:var(--primary)}
.hero-visual{position:relative}.hero-visual:before{content:"";position:absolute;inset:-18px;border:1px solid var(--line);transform:rotate(-2deg)}.hero-visual img{position:relative;width:100%;aspect-ratio:4/3;object-fit:cover;box-shadow:var(--shadow)}.paper-note{padding:24px clamp(20px,5vw,76px);background:var(--deep);color:var(--paper);border-block:1px solid var(--line);text-align:center}.paper-note p{max-width:900px;margin:0 auto;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.1rem,2vw,1.7rem)}
.section{padding:clamp(68px,9vw,120px) clamp(20px,5vw,76px)}.section-heading{max-width:760px;margin-bottom:38px}.section-heading p:not(.eyebrow),.story p,.order p{color:var(--muted)}.item-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.item-grid article{display:grid;background:var(--paper);border:1px solid var(--line);box-shadow:0 12px 34px rgba(0,0,0,.06)}.item-grid img{width:100%;aspect-ratio:4/3;object-fit:cover;border-bottom:1px solid var(--line)}.item-grid article>*:not(img){margin-inline:20px}.item-grid span{margin-top:20px;color:var(--accent);font-family:Georgia,"Times New Roman",serif;font-size:1.8rem;font-weight:700}.item-grid p{color:var(--muted);min-height:78px}.item-grid strong{margin-bottom:22px;color:var(--primary)}
.story{display:grid;grid-template-columns:minmax(280px,.82fr) minmax(0,1fr);gap:clamp(28px,5vw,68px);align-items:center;background:var(--soft)}.story img{width:100%;aspect-ratio:5/4;object-fit:cover;border:1px solid var(--line)}.story dl{display:grid;gap:12px;margin:30px 0 0}.story dl div{display:grid;grid-template-columns:100px 1fr;gap:14px;padding:14px 0;border-bottom:1px solid var(--line)}.story dt{color:var(--primary);font-weight:900}.story dd{margin:0;color:var(--muted)}
.journal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.journal-grid article{background:var(--paper);border:1px solid var(--line)}.journal-grid img{width:100%;aspect-ratio:4/3;object-fit:cover;border-bottom:1px solid var(--line)}.journal-grid h3,.journal-grid p{margin-inline:22px}.journal-grid h3{margin-top:20px}.journal-grid p{margin-bottom:24px;color:var(--muted)}.order{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;background:var(--deep);color:var(--paper)}.order p,.order .eyebrow{color:color-mix(in srgb,var(--paper) 72%,var(--accent))}.order-actions{margin-top:0}.order .button.ghost{border-color:color-mix(in srgb,var(--paper) 40%,transparent);background:transparent;color:var(--paper)}
.site-footer{display:flex;justify-content:space-between;gap:16px;padding:26px clamp(20px,5vw,76px);background:var(--deep);color:var(--paper);font-size:.86rem}.site-footer p{margin:0}
@media(max-width:1000px){.item-grid{grid-template-columns:repeat(2,1fr)}.hero,.story,.order{grid-template-columns:1fr}.hero{min-height:auto}.journal-grid{grid-template-columns:1fr}}
@media(max-width:760px){.nav-toggle{display:block}.site-nav{position:fixed;inset:76px 0 auto 0;display:none;flex-direction:column;align-items:stretch;padding:18px 20px 24px;background:var(--paper);border-bottom:1px solid var(--line)}.site-nav.is-open{display:flex}.site-nav a{padding:12px 0}.item-grid{grid-template-columns:1fr}.hero-actions,.order-actions{display:grid}.button{width:100%}}
@media(max-width:560px){.site-header{padding-inline:16px}.hero,.section,.paper-note{padding-inline:16px}.story dl div{grid-template-columns:1fr;gap:4px}.site-footer{flex-direction:column}}
`;
}

function js() {
  return `const navToggle=document.querySelector(".nav-toggle");const siteNav=document.querySelector(".site-nav");if(navToggle&&siteNav){navToggle.addEventListener("click",()=>{const isOpen=siteNav.classList.toggle("is-open");navToggle.setAttribute("aria-expanded",String(isOpen));navToggle.setAttribute("aria-label",isOpen?"メニューを閉じる":"メニューを開く")});siteNav.querySelectorAll("a").forEach(link=>{link.addEventListener("click",()=>{siteNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","メニューを開く")})})}
`;
}

function readme(theme) {
  return `# Paper Craft Shop Template ${theme.key}

紙雑貨・ハンドメイド作家向けのWebサイトテンプレートです。
商品紹介、制作ストーリー、制作記録、注文導線を1ページにまとめています。

## 編集する主な場所

- index.html: ブランド名、商品、価格、文章、ショップリンク
- css/style.css: 色、余白、文字サイズ、紙もの風の雰囲気
- js/main.js: スマートフォン用メニューの開閉
- images/: 商品写真や制作風景

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
  const dir = path.join(outRoot, `Paper-Craft-Shop-Template-${theme.key}`);
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
