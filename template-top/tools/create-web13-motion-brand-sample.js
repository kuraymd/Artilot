const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const outRoot = path.join(root, "web13");
const dir = path.join(outRoot, "Motion-Brand-Template-Sample");

const colors = {
  bg: "#fff3c7",
  paper: "#fffdf2",
  ink: "#2c2252",
  muted: "#74668d",
  primary: "#ed6040",
  accent: "#159c8e",
  yellow: "#f2b94f",
  soft: "#ffd89d",
  deep: "#2d1d5f",
  line: "#ebb667",
};

const imageLabels = {
  "hero-pack.svg": "Product package",
  "fruit-01.svg": "Mango slices",
  "fruit-02.svg": "Coconut chips",
  "fruit-03.svg": "Pineapple bites",
  "scene-01.svg": "Desk snack",
  "scene-02.svg": "Travel snack",
  "scene-03.svg": "Gift package",
  "process.svg": "Selection process",
};

function svg(label, i) {
  const c = colors;
  const rotate = i % 2 ? 5 : -5;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <rect width="1200" height="800" fill="${c.soft}"/>
  <rect x="70" y="68" width="1060" height="664" rx="28" fill="${c.paper}" stroke="${c.line}" stroke-width="6"/>
  <circle cx="944" cy="188" r="104" fill="${c.yellow}" opacity=".42"/>
  <circle cx="234" cy="620" r="128" fill="${c.accent}" opacity=".18"/>
  <g transform="translate(600 392) rotate(${rotate})">
    <rect x="-205" y="-215" width="410" height="430" rx="32" fill="${c.bg}" stroke="${c.primary}" stroke-width="10"/>
    <path d="M-142 -88h284M-142 -10h224M-142 68h284" stroke="${c.line}" stroke-width="18" stroke-linecap="round"/>
    <rect x="70" y="-170" width="84" height="84" rx="22" fill="${c.accent}" opacity=".88"/>
    <circle cx="-104" cy="150" r="42" fill="${c.yellow}" opacity=".9"/>
    <circle cx="12" cy="152" r="42" fill="${c.primary}" opacity=".82"/>
  </g>
  <text x="600" y="704" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="${c.ink}">${label}</text>
</svg>
`;
}

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Motion Brand Template Sample</title>
  <meta name="description" content="動きのある商品ブランドサイト向けHTML/CSS/JSサンプルテンプレートです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="loader" data-loader>
    <span>FRUTTA</span>
    <strong>PREMIUM DRIED FRUITS</strong>
  </div>

  <header class="site-header">
    <a class="logo" href="#top">FRUTTA</a>
    <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#about">About</a>
      <a href="#assortment">Assortment</a>
      <a href="#benefits">Benefits</a>
      <a href="#scenes">Scenes</a>
      <a href="#buy">Buy</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy reveal">
        <p class="eyebrow">Premium fruit brand sample</p>
        <h1>The taste of summer, packed for every day.</h1>
        <p class="lead">SUNTY系の動きに近い、商品ブランド向けモーションサンプルです。商品写真、文章、色を差し替えて使えます。</p>
        <div class="hero-actions">
          <a class="button primary" href="#assortment">商品を見る</a>
          <a class="button ghost" href="#about">ブランドを読む</a>
        </div>
      </div>
      <div class="hero-pack reveal">
        <img src="images/hero-pack.svg" alt="商品のパッケージ">
      </div>
    </section>

    <section class="ticker" aria-label="ブランドメッセージ">
      <div class="ticker-track">
        <span>Natural sweetness</span>
        <span>No added syrup</span>
        <span>Tropical fruit selection</span>
        <span>Ready for travel</span>
        <span>Natural sweetness</span>
        <span>No added syrup</span>
      </div>
    </section>

    <section id="about" class="section about">
      <div class="split-title reveal">
        <p class="eyebrow">About</p>
        <h2>If pleasure had a name, it would be FRUTTA.</h2>
      </div>
      <div class="about-copy reveal">
        <p>熟した果物の甘さをそのまま閉じ込めた、架空のドライフルーツブランドです。輸入食品、スイーツ、コスメ、雑貨などの商品ブランドサイトに転用できます。</p>
        <p>大きな文字、ゆっくり動く画像、横に流れるラベルで、ブランドの世界観を印象的に見せます。</p>
      </div>
    </section>

    <section id="assortment" class="section assortment">
      <div class="section-heading reveal">
        <p class="eyebrow">Assortment</p>
        <h2>Enjoyment range</h2>
      </div>
      <div class="product-row" data-drag-scroll>
        <article class="product-card reveal">
          <img src="images/fruit-01.svg" alt="マンゴーの商品画像">
          <span>01</span>
          <h3>Mango Slices</h3>
          <p>濃い甘みとやわらかな食感の定番フレーバー。</p>
          <a href="https://example.com/shop">More</a>
        </article>
        <article class="product-card reveal">
          <img src="images/fruit-02.svg" alt="ココナッツの商品画像">
          <span>02</span>
          <h3>Coconut Chips</h3>
          <p>軽い口どけとやさしい香りのココナッツ。</p>
          <a href="https://example.com/shop">More</a>
        </article>
        <article class="product-card reveal">
          <img src="images/fruit-03.svg" alt="パイナップルの商品画像">
          <span>03</span>
          <h3>Pineapple Bites</h3>
          <p>甘酸っぱさが広がる小さなトロピカルスナック。</p>
          <a href="https://example.com/shop">More</a>
        </article>
      </div>
    </section>

    <section id="benefits" class="section benefits">
      <div class="section-heading reveal">
        <p class="eyebrow">Why choose us</p>
        <h2>Made for flavor, selected with care.</h2>
      </div>
      <div class="benefit-grid">
        <article class="reveal"><span>01</span><h3>No syrup</h3><p>素材の甘さを活かした自然な味わい。</p></article>
        <article class="reveal"><span>02</span><h3>Portable</h3><p>軽くて持ち運びやすく、外出先でも楽しめます。</p></article>
        <article class="reveal"><span>03</span><h3>Gift ready</h3><p>ちょっとした贈りものにも使いやすい見せ方。</p></article>
        <article class="reveal"><span>04</span><h3>Quality checked</h3><p>ブランドの安心感を伝える説明ブロック。</p></article>
      </div>
    </section>

    <section class="section process">
      <div class="process-image reveal">
        <img src="images/process.svg" alt="選別工程のイメージ">
      </div>
      <div class="process-copy reveal">
        <p class="eyebrow">Selection</p>
        <h2>Every batch goes through a careful selection process.</h2>
        <p>商品のこだわり、製造工程、原材料、品質管理などを伝えるためのセクションです。</p>
      </div>
    </section>

    <section id="scenes" class="section scenes">
      <div class="section-heading reveal">
        <p class="eyebrow">Scenes</p>
        <h2>Made to match your rhythm</h2>
      </div>
      <div class="scene-grid">
        <article class="reveal"><img src="images/scene-01.svg" alt="デスクで食べるイメージ"><h3>Office Energy</h3><p>仕事の合間にちょうどいい軽さ。</p></article>
        <article class="reveal"><img src="images/scene-02.svg" alt="持ち運びのイメージ"><h3>Travel Ready</h3><p>バッグに入れて持ち歩ける商品紹介。</p></article>
        <article class="reveal"><img src="images/scene-03.svg" alt="ギフトのイメージ"><h3>Small Gift</h3><p>プレゼントや差し入れにも使える見せ方。</p></article>
      </div>
    </section>

    <section id="buy" class="section buy">
      <div class="reveal">
        <p class="eyebrow">Online store</p>
        <h2>Bring tropical flavor to your everyday shelf.</h2>
      </div>
      <div class="buy-actions reveal">
        <a class="button primary" href="https://example.com/shop">購入ページへ</a>
        <a class="button ghost" href="https://www.instagram.com/">Instagram</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 FRUTTA. All rights reserved.</p>
    <a href="#top">Back to top</a>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>
`;

const css = `:root{--bg:${colors.bg};--paper:${colors.paper};--ink:${colors.ink};--muted:${colors.muted};--primary:${colors.primary};--accent:${colors.accent};--yellow:${colors.yellow};--soft:${colors.soft};--deep:${colors.deep};--line:${colors.line};--shadow:0 28px 80px rgba(0,0,0,.16)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;line-height:1.75;overflow-x:hidden}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}h1,h2,h3,p{overflow-wrap:anywhere}
.loader{position:fixed;inset:0;z-index:100;display:grid;place-items:center;background:var(--deep);color:var(--paper);transition:opacity .65s ease,visibility .65s ease}.loader span{font-family:Georgia,"Times New Roman",serif;font-size:clamp(3rem,12vw,9rem);font-weight:700;line-height:1;letter-spacing:0}.loader strong{position:absolute;bottom:42px;font-size:.78rem;letter-spacing:.18em;text-transform:uppercase}.loader.is-hidden{opacity:0;visibility:hidden;pointer-events:none}
.site-header{position:fixed;top:0;left:0;right:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:76px;padding:18px clamp(18px,4vw,56px);color:var(--ink);mix-blend-mode:normal}.logo{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;font-weight:700;letter-spacing:0}.site-nav{display:flex;align-items:center;gap:clamp(14px,2vw,30px);font-size:.86rem;font-weight:900;text-transform:uppercase}.site-nav a{color:var(--ink)}.nav-toggle{display:none;width:44px;height:44px;border:1px solid var(--ink);background:var(--paper);padding:10px}.nav-toggle span{display:block;height:2px;margin:6px 0;background:var(--ink)}
.hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.86fr);gap:clamp(30px,5vw,82px);align-items:center;min-height:100vh;padding:clamp(92px,9vw,128px) clamp(20px,5vw,76px) clamp(52px,7vw,92px);background:radial-gradient(circle at 78% 20%,var(--yellow),transparent 24%),linear-gradient(135deg,var(--bg),var(--soft))}.hero:before{content:"";position:absolute;inset:18px;border:1px solid color-mix(in srgb,var(--ink) 26%,transparent);pointer-events:none}.eyebrow{margin:0 0 12px;color:var(--primary);font-size:.76rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}h1{max-width:930px;margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(3.2rem,8.8vw,8.6rem);line-height:.9;letter-spacing:0;text-transform:uppercase}h2{margin:0 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.2rem,5vw,5rem);line-height:1;letter-spacing:0}h3{margin:0 0 8px;font-size:1.08rem;line-height:1.45}.lead{max-width:640px;margin:28px 0 0;color:var(--muted);font-size:1.08rem}.hero-actions,.buy-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}.button{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:12px 22px;border:1px solid var(--ink);font-size:.88rem;font-weight:900;text-transform:uppercase}.button.primary{background:var(--ink);color:var(--paper)}.button.ghost{background:var(--paper);color:var(--ink)}.hero-pack{position:relative;will-change:transform}.hero-pack img{width:100%;aspect-ratio:4/3;object-fit:cover;border:1px solid var(--ink);box-shadow:var(--shadow);animation:floatPack 5s ease-in-out infinite}
@keyframes floatPack{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-18px) rotate(1deg)}}
.ticker{overflow:hidden;background:var(--deep);color:var(--paper);border-block:1px solid var(--ink)}.ticker-track{display:flex;width:max-content;animation:ticker 24s linear infinite}.ticker span{display:inline-flex;align-items:center;min-height:76px;padding:0 42px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.4rem,3vw,3rem);font-weight:700;white-space:nowrap;text-transform:uppercase}@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.section{padding:clamp(76px,10vw,132px) clamp(20px,5vw,76px)}.section-heading{max-width:860px;margin-bottom:42px}.section-heading p:not(.eyebrow),.about-copy p,.process-copy p,.buy p{color:var(--muted)}.about{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.72fr);gap:clamp(28px,5vw,76px);align-items:end;background:var(--paper)}.split-title h2{max-width:850px}.about-copy{font-size:1.05rem}
.assortment{background:var(--bg)}.product-row{display:grid;grid-template-columns:repeat(3,minmax(280px,1fr));gap:18px}.product-card{background:var(--paper);border:1px solid var(--ink);box-shadow:0 12px 34px rgba(0,0,0,.08);transition:transform .35s ease,box-shadow .35s ease}.product-card:hover{transform:translateY(-8px);box-shadow:0 22px 60px rgba(0,0,0,.14)}.product-card img{width:100%;aspect-ratio:4/3;object-fit:cover;border-bottom:1px solid var(--ink)}.product-card span{display:block;margin:22px 22px 0;color:var(--primary);font-family:Georgia,"Times New Roman",serif;font-size:2rem;font-weight:700}.product-card h3,.product-card p,.product-card a{margin-inline:22px}.product-card p{min-height:62px;color:var(--muted)}.product-card a{display:inline-flex;margin-bottom:24px;font-weight:900;color:var(--primary);text-transform:uppercase}
.benefits{background:var(--deep);color:var(--paper)}.benefits .eyebrow{color:var(--yellow)}.benefit-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.benefit-grid article{min-height:230px;padding:24px;border:1px solid color-mix(in srgb,var(--paper) 28%,transparent);background:color-mix(in srgb,var(--paper) 8%,transparent)}.benefit-grid span{color:var(--yellow);font-family:Georgia,"Times New Roman",serif;font-size:2rem;font-weight:700}.benefit-grid p{color:color-mix(in srgb,var(--paper) 75%,var(--yellow))}
.process{display:grid;grid-template-columns:minmax(300px,.86fr) minmax(0,1fr);gap:clamp(28px,5vw,76px);align-items:center;background:var(--paper)}.process-image img{width:100%;aspect-ratio:5/4;object-fit:cover;border:1px solid var(--ink);box-shadow:var(--shadow)}
.scenes{background:var(--soft)}.scene-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.scene-grid article{background:var(--paper);border:1px solid var(--ink)}.scene-grid img{width:100%;aspect-ratio:4/3;object-fit:cover;border-bottom:1px solid var(--ink)}.scene-grid h3,.scene-grid p{margin-inline:22px}.scene-grid h3{margin-top:20px}.scene-grid p{margin-bottom:24px;color:var(--muted)}
.buy{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;background:var(--primary);color:var(--paper)}.buy .eyebrow,.buy p{color:color-mix(in srgb,var(--paper) 78%,var(--yellow))}.buy .button.primary{background:var(--paper);color:var(--primary);border-color:var(--paper)}.buy .button.ghost{background:transparent;color:var(--paper);border-color:color-mix(in srgb,var(--paper) 48%,transparent)}.buy-actions{margin-top:0}
.site-footer{display:flex;justify-content:space-between;gap:16px;padding:26px clamp(20px,5vw,76px);background:var(--deep);color:var(--paper);font-size:.86rem}.site-footer p{margin:0}.reveal{opacity:0;transform:translateY(34px);transition:opacity .8s ease,transform .8s ease}.reveal.is-visible{opacity:1;transform:translateY(0)}
@media(max-width:1050px){.hero,.about,.process,.buy{grid-template-columns:1fr}.hero{min-height:auto}.product-row{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:12px}.product-card{min-width:min(82vw,420px);scroll-snap-align:start}.benefit-grid,.scene-grid{grid-template-columns:1fr 1fr}.buy-actions{justify-content:flex-start}}
@media(max-width:760px){.nav-toggle{display:block}.site-header{background:color-mix(in srgb,var(--paper) 92%,transparent);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}.site-nav{position:fixed;inset:76px 0 auto 0;display:none;flex-direction:column;align-items:stretch;padding:18px 20px 24px;background:var(--paper);border-bottom:1px solid var(--line)}.site-nav.is-open{display:flex}.site-nav a{padding:12px 0}.hero-actions,.buy-actions{display:grid}.button{width:100%}.benefit-grid,.scene-grid{grid-template-columns:1fr}}
@media(max-width:560px){.site-header{padding-inline:16px}.hero,.section{padding-inline:16px}.site-footer{flex-direction:column}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}.reveal{opacity:1;transform:none}}
`;

const js = `const loader=document.querySelector("[data-loader]");window.addEventListener("load",()=>{setTimeout(()=>loader?.classList.add("is-hidden"),520)});const navToggle=document.querySelector(".nav-toggle");const siteNav=document.querySelector(".site-nav");if(navToggle&&siteNav){navToggle.addEventListener("click",()=>{const isOpen=siteNav.classList.toggle("is-open");navToggle.setAttribute("aria-expanded",String(isOpen));navToggle.setAttribute("aria-label",isOpen?"メニューを閉じる":"メニューを開く")});siteNav.querySelectorAll("a").forEach(link=>{link.addEventListener("click",()=>{siteNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","メニューを開く")})})}
const reveals=document.querySelectorAll(".reveal");const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}})},{threshold:.18});reveals.forEach(el=>observer.observe(el));
const heroPack=document.querySelector(".hero-pack");window.addEventListener("scroll",()=>{if(!heroPack)return;const offset=Math.min(window.scrollY*.08,80);heroPack.style.transform="translateY("+offset+"px)"},{passive:true});
`;

const readme = `# Motion Brand Template Sample

動きのある商品ブランドサイト向けのサンプルテンプレートです。
ローディング、横流れテキスト、スクロール出現、軽い画像モーション、横スクロール商品カードを入れています。

## 編集する主な場所

- index.html: ブランド名、商品名、説明文、リンク
- css/style.css: 色、余白、文字サイズ、アニメーション速度
- js/main.js: ローディング、メニュー、スクロール出現
- images/: 商品画像、シーン画像

## 注意

このテンプレートは動きのサンプルです。
カート、決済、フォーム送信、サーバー設定は含まれていません。
実際に販売用へ展開する場合は、画像や文言を差し替えてからご利用ください。
`;

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
fs.mkdirSync(path.join(dir, "css"), { recursive: true });
fs.mkdirSync(path.join(dir, "js"), { recursive: true });
fs.mkdirSync(path.join(dir, "images"), { recursive: true });
fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
fs.writeFileSync(path.join(dir, "css", "style.css"), css, "utf8");
fs.writeFileSync(path.join(dir, "js", "main.js"), js, "utf8");
fs.writeFileSync(path.join(dir, "README_はじめにお読みください.txt"), readme, "utf8");
fs.writeFileSync(path.join(dir, "LICENSE_ライセンス.txt"), license, "utf8");
let i = 0;
for (const [file, label] of Object.entries(imageLabels)) {
  fs.writeFileSync(path.join(dir, "images", file), svg(label, i), "utf8");
  i += 1;
}

console.log(`Created sample in ${dir}`);
