const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\81903\\Desktop\\website\\web-site-temp";
const outRoot = path.join(root, "web06");

const themes = [
  {
    key: "Cool",
    mood: "clear learning studio",
    c: { bg: "#eef7fb", paper: "#ffffff", ink: "#1f3038", muted: "#647982", primary: "#287e91", accent: "#d49a54", soft: "#d9eef4", deep: "#123744", line: "#b8d7df" },
  },
  {
    key: "Dark",
    mood: "calm night lesson",
    c: { bg: "#111318", paper: "#1d2028", ink: "#f5efe6", muted: "#b8b1aa", primary: "#d6a54d", accent: "#65b5c2", soft: "#292d36", deep: "#08090c", line: "#3b404b" },
  },
  {
    key: "Girly",
    mood: "soft lesson room",
    c: { bg: "#fff4f7", paper: "#ffffff", ink: "#51323f", muted: "#8b6873", primary: "#d76088", accent: "#c99150", soft: "#ffe1ec", deep: "#71334b", line: "#f2c0d1" },
  },
  {
    key: "Minimal",
    mood: "quiet study note",
    c: { bg: "#f7f6f1", paper: "#ffffff", ink: "#282822", muted: "#75746e", primary: "#33342e", accent: "#a17f42", soft: "#e9e6dc", deep: "#171812", line: "#d9d4c8" },
  },
  {
    key: "RetroPop",
    mood: "colorful workshop",
    c: { bg: "#fff7d8", paper: "#fffdf3", ink: "#302653", muted: "#70628e", primary: "#ed6040", accent: "#1f9c8d", soft: "#ffd9a9", deep: "#302061", line: "#efba70" },
  },
];

const imageLabels = {
  "hero-main.svg": "Lesson studio",
  "about-teacher.svg": "Teacher profile",
  "course-01.svg": "Beginner class",
  "course-02.svg": "Private lesson",
  "course-03.svg": "Online course",
  "gallery-01.svg": "Classroom",
  "gallery-02.svg": "Workshop",
  "gallery-03.svg": "Study tools",
  "map-placeholder.svg": "Studio map",
};

function svg(label, theme, i) {
  const c = theme.c;
  const rotate = i % 2 ? 6 : -6;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <rect width="1200" height="800" fill="${c.soft}"/>
  <rect x="76" y="72" width="1048" height="656" rx="34" fill="${c.paper}" stroke="${c.line}" stroke-width="6"/>
  <circle cx="970" cy="188" r="96" fill="${c.accent}" opacity=".25"/>
  <circle cx="222" cy="626" r="128" fill="${c.primary}" opacity=".14"/>
  <g transform="translate(600 388) rotate(${rotate})">
    <rect x="-260" y="-150" width="520" height="300" rx="22" fill="${c.bg}" stroke="${c.primary}" stroke-width="8"/>
    <path d="M-170 -70h340M-170 0h260M-170 70h310" stroke="${c.line}" stroke-width="18" stroke-linecap="round"/>
    <path d="M170 -102l54 54-116 116-66 12 12-66z" fill="${c.accent}" opacity=".85"/>
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
  <title>Lesson Studio Template ${theme.key}</title>
  <meta name="description" content="教室・レッスン・講座向けのHTML/CSS/JSテンプレートです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#top">Lesson Studio</a>
    <button class="nav-toggle" type="button" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#courses">Courses</a>
      <a href="#teacher">Teacher</a>
      <a href="#schedule">Schedule</a>
      <a href="#voice">Voice</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${theme.mood}</p>
        <h1>好きなことを、続けられる学びに。</h1>
        <p class="lead">ピアノ教室、英会話、ヨガ、ハンドメイド講座、オンラインレッスンなどに使える教室向けテンプレートです。</p>
        <div class="hero-actions">
          <a class="button primary" href="#courses">コースを見る</a>
          <a class="button ghost" href="https://example.com/reserve">体験レッスン予約</a>
        </div>
      </div>
      <div class="hero-visual"><img src="images/hero-main.svg" alt="レッスンスタジオのイメージ"></div>
    </section>

    <section class="info-bar" aria-label="教室情報">
      <span>Trial lesson available</span>
      <span>Online / Studio</span>
      <span>Beginner friendly</span>
    </section>

    <section id="courses" class="section">
      <div class="section-heading">
        <p class="eyebrow">Courses</p>
        <h2>コース案内</h2>
        <p>料金、対象、レッスン内容を差し替えて、さまざまな教室サイトに調整できます。</p>
      </div>
      <div class="course-grid">
        <article class="course-card">
          <img src="images/course-01.svg" alt="はじめてコース">
          <div><span>01</span><h3>はじめてコース</h3><p>基礎からゆっくり学びたい方向けの少人数レッスン。</p><strong>月4回 ¥8,800</strong></div>
        </article>
        <article class="course-card">
          <img src="images/course-02.svg" alt="個別レッスン">
          <div><span>02</span><h3>個別レッスン</h3><p>目的やペースに合わせて進めるマンツーマン形式。</p><strong>1回 ¥5,500</strong></div>
        </article>
        <article class="course-card">
          <img src="images/course-03.svg" alt="オンライン講座">
          <div><span>03</span><h3>オンライン講座</h3><p>自宅から参加できる動画・オンライン対応の講座。</p><strong>月額 ¥4,400</strong></div>
        </article>
      </div>
    </section>

    <section id="teacher" class="section teacher">
      <div class="teacher-image"><img src="images/about-teacher.svg" alt="講師プロフィールのイメージ"></div>
      <div class="teacher-copy">
        <p class="eyebrow">Teacher</p>
        <h2>講師紹介</h2>
        <p>Lesson Studioは架空の教室サイトです。プロフィール、経歴、レッスンで大切にしていることを入れると、安心感のあるページになります。</p>
        <dl>
          <div><dt>対象</dt><dd>初心者 / 趣味で学びたい方 / 親子参加</dd></div>
          <div><dt>形式</dt><dd>対面レッスン / オンライン / ワークショップ</dd></div>
          <div><dt>場所</dt><dd>東京都内スタジオ / オンライン</dd></div>
        </dl>
      </div>
    </section>

    <section id="schedule" class="section schedule">
      <div class="section-heading">
        <p class="eyebrow">Schedule</p>
        <h2>開講スケジュール</h2>
      </div>
      <div class="schedule-list">
        <article><time>Tue 18:00</time><h3>Beginner Class</h3><p>基礎を学ぶ定期クラス</p></article>
        <article><time>Sat 10:30</time><h3>Workshop</h3><p>月替わりテーマの単発講座</p></article>
        <article><time>Sun 14:00</time><h3>Online Lesson</h3><p>自宅から参加できるオンライン講座</p></article>
      </div>
    </section>

    <section class="section gallery">
      <div class="gallery-grid">
        <img src="images/gallery-01.svg" alt="教室風景">
        <img src="images/gallery-02.svg" alt="ワークショップ風景">
        <img src="images/gallery-03.svg" alt="レッスン道具">
      </div>
    </section>

    <section id="voice" class="section voice">
      <div class="section-heading">
        <p class="eyebrow">Voice</p>
        <h2>受講者の声</h2>
      </div>
      <div class="voice-grid">
        <blockquote>初めてでも質問しやすく、毎回のレッスンが楽しみになりました。</blockquote>
        <blockquote>自分のペースで続けられるので、忙しい時期でも無理なく学べます。</blockquote>
        <blockquote>作品や成果を見てもらえる時間があり、モチベーションが上がります。</blockquote>
      </div>
    </section>

    <section id="contact" class="section contact">
      <div>
        <p class="eyebrow">Contact</p>
        <h2>体験レッスン受付中</h2>
        <p>予約フォーム、LINE、Instagramなど実際の申し込み導線に差し替えて使えます。</p>
      </div>
      <div class="contact-actions">
        <a class="button primary" href="https://example.com/reserve">予約する</a>
        <a class="button ghost" href="https://www.instagram.com/">Instagram</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Lesson Studio. All rights reserved.</p>
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
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;line-height:1.8}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}
.site-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:76px;padding:18px clamp(18px,4vw,56px);background:color-mix(in srgb,var(--paper) 90%,transparent);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}
.logo{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;font-weight:700;letter-spacing:0}.site-nav{display:flex;align-items:center;gap:clamp(14px,2vw,30px);font-size:.9rem;font-weight:800}.site-nav a{color:var(--muted)}.site-nav a:hover{color:var(--primary)}
.nav-toggle{display:none;width:44px;height:44px;border:1px solid var(--line);background:var(--paper);padding:10px}.nav-toggle span{display:block;height:2px;margin:6px 0;background:var(--ink)}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.92fr);gap:clamp(30px,5vw,76px);align-items:center;min-height:calc(100vh - 76px);padding:clamp(48px,8vw,110px) clamp(20px,5vw,76px)}
.hero-copy{max-width:720px}.eyebrow{margin:0 0 12px;color:var(--primary);font-size:.76rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}h1,h2,h3,p{overflow-wrap:anywhere}h1{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.5rem,6vw,5.7rem);line-height:1.05;letter-spacing:0}h2{margin:0 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,4vw,3.7rem);line-height:1.15;letter-spacing:0}h3{margin:0 0 8px;font-size:1.05rem;line-height:1.5}.lead{max-width:620px;margin:28px 0 0;color:var(--muted);font-size:1.08rem}
.hero-actions,.contact-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}.button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 22px;border:1px solid var(--primary);font-size:.9rem;font-weight:900}.button.primary{background:var(--primary);color:var(--paper)}.button.ghost{color:var(--primary);background:transparent}
.hero-visual{position:relative}.hero-visual:before{content:"";position:absolute;inset:-18px;border:1px solid var(--line);transform:rotate(2deg)}.hero-visual img{position:relative;width:100%;aspect-ratio:4/3;object-fit:cover;box-shadow:var(--shadow)}
.info-bar{display:grid;grid-template-columns:repeat(3,1fr);border-block:1px solid var(--line);background:var(--deep);color:var(--paper)}.info-bar span{min-height:64px;display:grid;place-items:center;padding:12px;border-right:1px solid color-mix(in srgb,var(--paper) 20%,transparent);font-size:.82rem;font-weight:900;text-align:center}
.section{padding:clamp(68px,9vw,120px) clamp(20px,5vw,76px)}.section-heading{max-width:760px;margin-bottom:38px}.section-heading p:not(.eyebrow),.teacher-copy p,.contact p{color:var(--muted)}
.course-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.course-card{display:grid;background:var(--paper);border:1px solid var(--line)}.course-card img{width:100%;aspect-ratio:4/3;object-fit:cover;border-bottom:1px solid var(--line)}.course-card div{padding:22px}.course-card span{color:var(--accent);font-family:Georgia,"Times New Roman",serif;font-size:1.9rem;font-weight:700}.course-card p{min-height:60px;margin:0 0 14px;color:var(--muted);font-size:.93rem}.course-card strong{color:var(--primary)}
.teacher{display:grid;grid-template-columns:minmax(280px,.85fr) minmax(0,1fr);gap:clamp(28px,5vw,68px);align-items:center;background:var(--soft)}.teacher-image img{width:100%;aspect-ratio:5/4;object-fit:cover;border:1px solid var(--line)}.teacher dl{display:grid;gap:12px;margin:30px 0 0}.teacher dl div{display:grid;grid-template-columns:100px 1fr;gap:14px;padding:14px 0;border-bottom:1px solid var(--line)}.teacher dt{color:var(--primary);font-weight:900}.teacher dd{margin:0;color:var(--muted)}
.schedule{background:var(--deep);color:var(--paper)}.schedule .eyebrow,.schedule p{color:color-mix(in srgb,var(--paper) 72%,var(--accent))}.schedule-list{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.schedule-list article{min-height:190px;padding:26px;background:color-mix(in srgb,var(--paper) 10%,transparent);border:1px solid color-mix(in srgb,var(--paper) 26%,transparent)}time{color:var(--accent);font-weight:900}
.gallery-grid{display:grid;grid-template-columns:1fr 1.1fr .9fr;gap:18px}.gallery-grid img{width:100%;height:100%;min-height:280px;object-fit:cover;border:1px solid var(--line)}
.voice-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.voice-grid blockquote{margin:0;min-height:180px;padding:26px;background:var(--paper);border:1px solid var(--line);color:var(--muted)}
.contact{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;background:var(--soft)}.contact-actions{margin-top:0}.site-footer{display:flex;justify-content:space-between;gap:16px;padding:26px clamp(20px,5vw,76px);background:var(--deep);color:var(--paper);font-size:.86rem}.site-footer p{margin:0}
@media(max-width:900px){.nav-toggle{display:block}.site-nav{position:fixed;inset:76px 0 auto 0;display:none;flex-direction:column;align-items:stretch;padding:18px 20px 24px;background:var(--paper);border-bottom:1px solid var(--line)}.site-nav.is-open{display:flex}.site-nav a{padding:12px 0}.hero,.teacher,.contact{grid-template-columns:1fr}.hero{min-height:auto}.course-grid,.schedule-list,.voice-grid,.info-bar,.gallery-grid{grid-template-columns:1fr}.contact-actions{justify-content:flex-start}}
@media(max-width:560px){.site-header{padding-inline:16px}.hero,.section{padding-inline:16px}.hero-actions,.contact-actions{display:grid}.button{width:100%}.teacher dl div{grid-template-columns:1fr;gap:4px}.site-footer{flex-direction:column}}
`;
}

function js() {
  return `const navToggle=document.querySelector(".nav-toggle");const siteNav=document.querySelector(".site-nav");if(navToggle&&siteNav){navToggle.addEventListener("click",()=>{const isOpen=siteNav.classList.toggle("is-open");navToggle.setAttribute("aria-expanded",String(isOpen));navToggle.setAttribute("aria-label",isOpen?"メニューを閉じる":"メニューを開く")});siteNav.querySelectorAll("a").forEach(link=>{link.addEventListener("click",()=>{siteNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","メニューを開く")})})}
`;
}

function readme(theme) {
  return `# Lesson Studio Template ${theme.key}

教室・レッスン・講座向けのWebサイトテンプレートです。
コース案内、講師紹介、開講スケジュール、受講者の声、体験予約導線を1ページにまとめています。

## 編集する主な場所

- index.html: 教室名、コース、料金、スケジュール、予約リンク
- css/style.css: 色、余白、文字サイズ、レイアウト
- js/main.js: スマートフォン用メニューの開閉
- images/: 写真やイメージ画像

## 注意

問い合わせフォームの送信処理、予約システム、決済機能、サーバー設定は含まれていません。
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
  const dir = path.join(outRoot, `Lesson-Studio-Template-${theme.key}`);
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
