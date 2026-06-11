const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const outRoot = path.join(root, "web14");

const themes = [
  { key: "Cool", mood: "digital stream room", c: { bg: "#eef7fb", paper: "#ffffff", ink: "#1d3038", muted: "#637982", primary: "#267f92", accent: "#d69a52", soft: "#d9edf4", deep: "#123646", line: "#b7d7df" } },
  { key: "Dark", mood: "midnight stream studio", c: { bg: "#101119", paper: "#1b1c27", ink: "#f3eee7", muted: "#b6b0aa", primary: "#d5a54f", accent: "#67b8c2", soft: "#282b37", deep: "#07080d", line: "#393d4c" } },
  { key: "Girly", mood: "soft virtual stage", c: { bg: "#fff4f8", paper: "#ffffff", ink: "#513240", muted: "#8a6876", primary: "#d76189", accent: "#c58d50", soft: "#ffe2ed", deep: "#71364d", line: "#f1c1d2" } },
  { key: "Minimal", mood: "clean channel hub", c: { bg: "#f7f5ef", paper: "#fffdf7", ink: "#282822", muted: "#74716b", primary: "#33342e", accent: "#9d7d44", soft: "#e9e5da", deep: "#181812", line: "#d8d2c6" } },
  { key: "RetroPop", mood: "pop streaming arcade", c: { bg: "#fff5d1", paper: "#fffdf2", ink: "#302650", muted: "#70628b", primary: "#ed6040", accent: "#1f9c8e", soft: "#ffd7a3", deep: "#302060", line: "#efb76a" } },
];

const imageLabels = {
  "avatar.svg": "Streamer avatar",
  "hero-stage.svg": "Virtual stage",
  "thumb-01.svg": "Game stream thumbnail",
  "thumb-02.svg": "Chat stream thumbnail",
  "thumb-03.svg": "Cover song thumbnail",
  "room.svg": "Stream room",
  "schedule.svg": "Weekly schedule",
  "goods.svg": "Goods preview",
};

function svg(label, theme, index) {
  const c = theme.c;
  const rotate = index % 2 ? 4 : -4;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <rect width="1200" height="800" fill="${c.soft}"/>
  <rect x="72" y="68" width="1056" height="664" rx="30" fill="${c.paper}" stroke="${c.line}" stroke-width="6"/>
  <circle cx="938" cy="188" r="104" fill="${c.accent}" opacity=".26"/>
  <circle cx="240" cy="616" r="128" fill="${c.primary}" opacity=".15"/>
  <g transform="translate(600 388) rotate(${rotate})">
    <rect x="-290" y="-168" width="580" height="336" rx="28" fill="${c.bg}" stroke="${c.primary}" stroke-width="8"/>
    <rect x="-220" y="-100" width="150" height="150" rx="75" fill="${c.primary}" opacity=".74"/>
    <path d="M-22 -78h250M-22 0h196M-22 78h250" stroke="${c.line}" stroke-width="18" stroke-linecap="round"/>
    <rect x="128" y="-128" width="90" height="90" rx="24" fill="${c.accent}" opacity=".88"/>
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
  <title>Streamer Studio Template ${theme.key}</title>
  <meta name="description" content="VTuber・配信者向けのHTML/CSS/JSテンプレートです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#top">Mika Channel</a>
    <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#streams">Streams</a>
      <a href="#profile">Profile</a>
      <a href="#schedule">Schedule</a>
      <a href="#links">Links</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy reveal">
        <p class="eyebrow">${theme.mood}</p>
        <h1>This might be a virtual channel.</h1>
        <p class="lead">VTuber、ゲーム配信者、歌い手、実況者、個人クリエイター向けの大胆なチャンネル紹介テンプレートです。</p>
        <div class="hero-actions">
          <a class="button primary" href="https://www.youtube.com/">YouTube</a>
          <a class="button ghost" href="https://www.twitch.tv/">Twitch</a>
        </div>
      </div>
      <div class="hero-avatar reveal">
        <img src="images/avatar.svg" alt="配信者アバター">
      </div>
    </section>

    <section class="ticker" aria-label="配信キーワード">
      <div class="ticker-track">
        <span>Game stream</span>
        <span>Chat room</span>
        <span>Cover song</span>
        <span>Live schedule</span>
        <span>Game stream</span>
        <span>Chat room</span>
      </div>
    </section>

    <section class="intro section">
      <div class="split-title reveal">
        <p class="eyebrow">About channel</p>
        <h2>But it probably is not what you are expecting.</h2>
      </div>
      <div class="intro-copy reveal">
        <p>Mika Channelは架空の配信者サイトです。自己紹介、配信ジャンル、活動リンク、スケジュール、依頼受付を1ページにまとめられます。</p>
        <p>大きな文字、横流れテキスト、カード型の配信一覧で、チャンネルの雰囲気を強く出せます。</p>
      </div>
    </section>

    <section id="streams" class="section streams">
      <div class="section-heading reveal">
        <p class="eyebrow">Featured streams</p>
        <h2>最近の配信</h2>
      </div>
      <div class="stream-grid">
        <article class="stream-card wide reveal">
          <img src="images/thumb-01.svg" alt="ゲーム配信サムネイル">
          <div><span>Game</span><h3>Midnight Adventure Live</h3><a href="https://www.youtube.com/">Watch</a></div>
        </article>
        <article class="stream-card reveal">
          <img src="images/thumb-02.svg" alt="雑談配信サムネイル">
          <div><span>Talk</span><h3>Weekly Chat Room</h3><a href="https://www.youtube.com/">Watch</a></div>
        </article>
        <article class="stream-card reveal">
          <img src="images/thumb-03.svg" alt="歌配信サムネイル">
          <div><span>Music</span><h3>Cover Song Night</h3><a href="https://www.youtube.com/">Watch</a></div>
        </article>
      </div>
    </section>

    <section id="profile" class="section profile">
      <img class="reveal" src="images/hero-stage.svg" alt="バーチャルステージ">
      <div class="reveal">
        <p class="eyebrow">Profile</p>
        <h2>夜更かしリスナーのための、ゆるい秘密基地。</h2>
        <p>ここには配信者の設定、好きなもの、活動方針、リスナー名、ファンアートタグなどを入れられます。</p>
        <dl>
          <div><dt>Name</dt><dd>Mika</dd></div>
          <div><dt>Genre</dt><dd>Game / Talk / Singing</dd></div>
          <div><dt>Tags</dt><dd>Live tag / Fan art tag / Clip tag</dd></div>
        </dl>
      </div>
    </section>

    <section id="schedule" class="section schedule">
      <div class="section-heading reveal">
        <p class="eyebrow">Schedule</p>
        <h2>今週の予定</h2>
      </div>
      <div class="schedule-board reveal">
        <img src="images/schedule.svg" alt="配信スケジュール">
        <div class="schedule-list">
          <article><time>Mon 21:00</time><h3>Game stream</h3><p>長編ゲームを少しずつ進めます。</p></article>
          <article><time>Wed 22:00</time><h3>Chat room</h3><p>近況報告とコメント読みの時間。</p></article>
          <article><time>Sat 20:30</time><h3>Special live</h3><p>歌、企画、コラボなどのお知らせ枠。</p></article>
        </div>
      </div>
    </section>

    <section id="links" class="section links">
      <div class="section-heading reveal">
        <p class="eyebrow">Links</p>
        <h2>活動リンク</h2>
      </div>
      <div class="link-grid">
        <a class="reveal" href="https://www.youtube.com/"><span>01</span><strong>YouTube</strong><p>メイン配信、アーカイブ、ショート動画。</p></a>
        <a class="reveal" href="https://www.twitch.tv/"><span>02</span><strong>Twitch</strong><p>ゲーム配信や同時配信のリンク。</p></a>
        <a class="reveal" href="https://x.com/"><span>03</span><strong>X</strong><p>告知、日常投稿、配信開始のお知らせ。</p></a>
        <a class="reveal" href="https://example.com/shop"><span>04</span><strong>Goods</strong><p>グッズ、ボイス、デジタル販売ページ。</p></a>
      </div>
    </section>

    <section class="section room">
      <div class="room-image reveal"><img src="images/room.svg" alt="配信部屋のイメージ"></div>
      <div class="room-copy reveal">
        <p class="eyebrow">Mood</p>
        <h2>A little loud, a little dreamy, always live.</h2>
        <p>このセクションは配信の空気感や、チャンネルの世界観を見せるための場所です。</p>
      </div>
    </section>

    <section id="contact" class="section contact">
      <div class="reveal">
        <p class="eyebrow">Contact</p>
        <h2>コラボ・案件・お問い合わせ</h2>
        <p>フォーム、メール、SNS、ポートフォリオ、事務所ページなど実際の導線へ差し替えてください。</p>
      </div>
      <div class="contact-card reveal">
        <img src="images/goods.svg" alt="グッズプレビュー">
        <a class="button primary" href="https://example.com/contact">問い合わせる</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Mika Channel. All rights reserved.</p>
    <a href="#top">Back to top</a>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>
`;
}

function css(theme) {
  const c = theme.c;
  return `:root{--bg:${c.bg};--paper:${c.paper};--ink:${c.ink};--muted:${c.muted};--primary:${c.primary};--accent:${c.accent};--soft:${c.soft};--deep:${c.deep};--line:${c.line};--shadow:0 26px 76px rgba(0,0,0,.14)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;line-height:1.75;overflow-x:hidden}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}h1,h2,h3,p{overflow-wrap:anywhere}
.site-header{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:76px;padding:18px clamp(18px,4vw,56px);background:color-mix(in srgb,var(--paper) 90%,transparent);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}.logo{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;font-weight:700;letter-spacing:0}.site-nav{display:flex;align-items:center;gap:clamp(14px,2vw,30px);font-size:.86rem;font-weight:900;text-transform:uppercase}.site-nav a{color:var(--muted)}.site-nav a:hover{color:var(--primary)}.nav-toggle{display:none;width:44px;height:44px;border:1px solid var(--line);background:var(--paper);padding:10px}.nav-toggle span{display:block;height:2px;margin:6px 0;background:var(--ink)}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.72fr);gap:clamp(30px,5vw,82px);align-items:center;min-height:calc(100vh - 76px);padding:clamp(54px,8vw,112px) clamp(20px,5vw,76px);background:radial-gradient(circle at 78% 20%,var(--accent),transparent 24%),linear-gradient(135deg,var(--bg),var(--soft))}.eyebrow{margin:0 0 12px;color:var(--primary);font-size:.76rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}h1{max-width:980px;margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(3rem,8vw,7.4rem);line-height:.94;letter-spacing:0;text-transform:uppercase}h2{margin:0 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.1rem,5vw,5rem);line-height:1;letter-spacing:0}h3{margin:0 0 8px;font-size:1.08rem;line-height:1.45}.lead{max-width:650px;margin:28px 0 0;color:var(--muted);font-size:1.08rem}.hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}.button{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:12px 22px;border:1px solid var(--ink);font-size:.88rem;font-weight:900;text-transform:uppercase}.button.primary{background:var(--ink);color:var(--paper)}.button.ghost{background:var(--paper);color:var(--ink)}.hero-avatar img{width:100%;aspect-ratio:1/1;object-fit:cover;border:1px solid var(--ink);box-shadow:var(--shadow);animation:floatAvatar 5s ease-in-out infinite}@keyframes floatAvatar{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-16px) rotate(1deg)}}
.ticker{overflow:hidden;background:var(--deep);color:var(--paper);border-block:1px solid var(--ink)}.ticker-track{display:flex;width:max-content;animation:ticker 24s linear infinite}.ticker span{display:inline-flex;align-items:center;min-height:76px;padding:0 42px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.4rem,3vw,3rem);font-weight:700;white-space:nowrap;text-transform:uppercase}@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.section{padding:clamp(76px,10vw,132px) clamp(20px,5vw,76px)}.section-heading{max-width:860px;margin-bottom:42px}.section-heading p:not(.eyebrow),.intro-copy p,.profile p,.room-copy p,.contact p{color:var(--muted)}.intro{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.74fr);gap:clamp(28px,5vw,76px);align-items:end;background:var(--paper)}.stream-grid{display:grid;grid-template-columns:1.2fr .9fr .9fr;gap:18px}.stream-card{position:relative;min-height:300px;overflow:hidden;background:var(--paper);border:1px solid var(--ink);box-shadow:0 12px 34px rgba(0,0,0,.08)}.stream-card.wide{min-height:380px}.stream-card img{width:100%;height:100%;min-height:300px;object-fit:cover}.stream-card div{position:absolute;inset:auto 18px 18px 18px;padding:18px;background:color-mix(in srgb,var(--paper) 88%,transparent);border:1px solid var(--line);backdrop-filter:blur(14px)}.stream-card span,.link-grid span{color:var(--primary);font-size:.78rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.stream-card a{font-weight:900;color:var(--primary);text-transform:uppercase}
.profile,.room{display:grid;grid-template-columns:minmax(300px,.86fr) minmax(0,1fr);gap:clamp(28px,5vw,76px);align-items:center;background:var(--soft)}.profile img,.room img,.contact-card img{width:100%;aspect-ratio:5/4;object-fit:cover;border:1px solid var(--ink);box-shadow:var(--shadow)}.profile dl{display:grid;gap:12px;margin:30px 0 0}.profile dl div{display:grid;grid-template-columns:100px 1fr;gap:14px;padding:14px 0;border-bottom:1px solid var(--line)}.profile dt{color:var(--primary);font-weight:900}.profile dd{margin:0;color:var(--muted)}
.schedule{background:var(--deep);color:var(--paper)}.schedule .eyebrow{color:var(--accent)}.schedule-board{display:grid;grid-template-columns:minmax(280px,.7fr) 1fr;gap:20px;align-items:stretch}.schedule-board img{width:100%;height:100%;object-fit:cover;border:1px solid color-mix(in srgb,var(--paper) 24%,transparent)}.schedule-list{display:grid;gap:14px}.schedule-list article{padding:22px;border:1px solid color-mix(in srgb,var(--paper) 24%,transparent);background:color-mix(in srgb,var(--paper) 8%,transparent)}time{color:var(--accent);font-weight:900}.schedule-list p{color:color-mix(in srgb,var(--paper) 76%,var(--accent))}
.links{background:var(--bg)}.link-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.link-grid a{min-height:220px;padding:24px;background:var(--paper);border:1px solid var(--ink);transition:transform .3s ease,box-shadow .3s ease}.link-grid a:hover{transform:translateY(-8px);box-shadow:0 20px 54px rgba(0,0,0,.14)}.link-grid strong{display:block;margin:18px 0 10px;font-size:1.25rem}.link-grid p{color:var(--muted)}
.contact{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,430px);gap:28px;align-items:center;background:var(--primary);color:var(--paper)}.contact .eyebrow,.contact p{color:color-mix(in srgb,var(--paper) 78%,var(--accent))}.contact-card{display:grid;gap:18px}.contact .button.primary{background:var(--paper);color:var(--primary);border-color:var(--paper)}.site-footer{display:flex;justify-content:space-between;gap:16px;padding:26px clamp(20px,5vw,76px);background:var(--deep);color:var(--paper);font-size:.86rem}.site-footer p{margin:0}.reveal{opacity:0;transform:translateY(34px);transition:opacity .8s ease,transform .8s ease}.reveal.is-visible{opacity:1;transform:translateY(0)}
@media(max-width:1050px){.hero,.intro,.profile,.room,.contact,.schedule-board{grid-template-columns:1fr}.hero{min-height:auto}.stream-grid,.link-grid{grid-template-columns:1fr 1fr}.stream-card.wide{min-height:300px}}
@media(max-width:760px){.nav-toggle{display:block}.site-nav{position:fixed;inset:76px 0 auto 0;display:none;flex-direction:column;align-items:stretch;padding:18px 20px 24px;background:var(--paper);border-bottom:1px solid var(--line)}.site-nav.is-open{display:flex}.site-nav a{padding:12px 0}.hero-actions{display:grid}.button{width:100%}.stream-grid,.link-grid{grid-template-columns:1fr}}
@media(max-width:560px){.site-header{padding-inline:16px}.hero,.section{padding-inline:16px}.profile dl div{grid-template-columns:1fr;gap:4px}.site-footer{flex-direction:column}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}.reveal{opacity:1;transform:none}}
`;
}

function js() {
  return `const navToggle=document.querySelector(".nav-toggle");const siteNav=document.querySelector(".site-nav");if(navToggle&&siteNav){navToggle.addEventListener("click",()=>{const isOpen=siteNav.classList.toggle("is-open");navToggle.setAttribute("aria-expanded",String(isOpen));navToggle.setAttribute("aria-label",isOpen?"メニューを閉じる":"メニューを開く")});siteNav.querySelectorAll("a").forEach(link=>{link.addEventListener("click",()=>{siteNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","メニューを開く")})})}
const reveals=document.querySelectorAll(".reveal");const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}})},{threshold:.18});reveals.forEach(el=>observer.observe(el));
`;
}

function readme(theme) {
  return `# Streamer Studio Template ${theme.key}

VTuber・配信者向けのWebサイトテンプレートです。
プロフィール、最近の配信、スケジュール、活動リンク、コラボ・案件問い合わせ導線を1ページにまとめています。

## 編集する主な場所

- index.html: 名前、プロフィール、配信リンク、スケジュール、問い合わせリンク
- css/style.css: 色、余白、文字サイズ、チャンネルの雰囲気
- js/main.js: スマートフォン用メニューとスクロール表示
- images/: アバター、サムネイル、配信部屋、グッズ画像

## 注意

フォーム送信、予約管理、決済、サーバー設定は含まれていません。
実際に使用する場合は、YouTube、Twitch、X、販売ページなどを運用中のURLへ差し替えてください。
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
  const dir = path.join(outRoot, `Streamer-Studio-Template-${theme.key}`);
  fs.mkdirSync(path.join(dir, "css"), { recursive: true });
  fs.mkdirSync(path.join(dir, "js"), { recursive: true });
  fs.mkdirSync(path.join(dir, "images"), { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html(theme), "utf8");
  fs.writeFileSync(path.join(dir, "css", "style.css"), css(theme), "utf8");
  fs.writeFileSync(path.join(dir, "js", "main.js"), js(), "utf8");
  fs.writeFileSync(path.join(dir, "README_はじめにお読みください.txt"), readme(theme), "utf8");
  fs.writeFileSync(path.join(dir, "LICENSE_ライセンス.txt"), license, "utf8");
  let index = 0;
  for (const [file, label] of Object.entries(imageLabels)) {
    fs.writeFileSync(path.join(dir, "images", file), svg(label, theme, index), "utf8");
    index += 1;
  }
}

console.log(`Created ${themes.length} templates in ${outRoot}`);
