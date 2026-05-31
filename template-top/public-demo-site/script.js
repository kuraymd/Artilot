const templates = [
  { name: "Cafe Template", category: "Cafe", theme: "Cool", tone: "洗練されたネイビーとアクセントカラー", use: "カフェ、喫茶店、スイーツショップ", colors: ["#15182a", "#19b8b2", "#d5b95c"] },
  { name: "Cafe Template", category: "Cafe", theme: "Dark", tone: "黒と深い赤紫の落ち着いた世界観", use: "バー、夜カフェ、コンセプトショップ", colors: ["#090809", "#e0473f", "#6f38a7"] },
  { name: "Cafe Template", category: "Cafe", theme: "Girly", tone: "淡いピンクとラベンダーのやさしい雰囲気", use: "スイーツ店、かわいい系カフェ", colors: ["#fff8fb", "#ff7eb3", "#c5a1ec"] },
  { name: "Cafe Template", category: "Cafe", theme: "Minimal", tone: "白黒ベースのシンプルな見せ方", use: "小規模店舗、予約制サロン、作品展示", colors: ["#ffffff", "#111111", "#dcdcdc"] },
  { name: "Cafe Template", category: "Cafe", theme: "RetroPop", tone: "明るく遊び心のあるポップデザイン", use: "レトロ喫茶、イベント、ポップアップ", colors: ["#fffbee", "#f45b7b", "#63cdf2"] },

  { name: "Nail Template", category: "Nail", theme: "Cool", tone: "清潔感とスタイリッシュさを両立", use: "ネイルサロン、美容サロン", colors: ["#1f2633", "#67c7d4", "#d8c58a"] },
  { name: "Nail Template", category: "Nail", theme: "Dark", tone: "大人っぽい高級感のある暗色系", use: "プライベートサロン、夜系美容店舗", colors: ["#111111", "#8e3154", "#c9a46a"] },
  { name: "Nail Template", category: "Nail", theme: "Minimal", tone: "余白を活かした端正な印象", use: "予約制サロン、個人サロン", colors: ["#ffffff", "#222222", "#eeeeee"] },
  { name: "Rose Veil Template", category: "Nail", theme: "Girly", tone: "ローズ系の華やかでやわらかい雰囲気", use: "ネイル、エステ、女性向けサービス", colors: ["#fff6fa", "#e98aaa", "#d7b7ef"] },
  { name: "Rose Veil Template", category: "Nail", theme: "RetroPop", tone: "可愛さとポップ感を強めたデザイン", use: "ガーリー系サロン、イベント告知", colors: ["#fff0a8", "#ff6c9b", "#72d8ef"] },

  { name: "Portfolio Template", category: "Portfolio", theme: "Cool", tone: "実績をシャープに見せるクール系", use: "デザイナー、写真家、制作会社", colors: ["#1a1a2e", "#0f9b8e", "#c9a84c"] },
  { name: "Portfolio Template", category: "Portfolio", theme: "Dark", tone: "重厚感のある作品向けダークトーン", use: "アーティスト、映像、音楽、世界観重視", colors: ["#0d0d0d", "#c0392b", "#6c3483"] },
  { name: "Portfolio Template", category: "Portfolio", theme: "Girly", tone: "やわらかく親しみやすいポートフォリオ", use: "イラスト、ハンドメイド、女性向け制作", colors: ["#fff8fb", "#f2a7c3", "#c9a7e8"] },
  { name: "Portfolio Template", category: "Portfolio", theme: "Minimal", tone: "作品を主役にするモノトーン", use: "写真、建築、文章、シンプルな実績集", colors: ["#ffffff", "#111111", "#e5e5e5"] },
  { name: "Portfolio Template", category: "Portfolio", theme: "RetroPop", tone: "太線と明るい色のレトロポップ", use: "イラスト、グッズ、ポップなブランド", colors: ["#fffbef", "#f2607d", "#6acff5"] },

  { name: "Creator Portfolio", category: "Creator", theme: "Cool", tone: "クリエイター活動を落ち着いてまとめる", use: "イラスト、依頼受付、SNSリンク", colors: ["#15182a", "#19b8b2", "#d5b95c"] },
  { name: "Creator Portfolio", category: "Creator", theme: "Dark", tone: "個性的な作品世界を強く見せる", use: "ダーク系イラスト、音楽、創作活動", colors: ["#090809", "#e0473f", "#6f38a7"] },
  { name: "Creator Portfolio", category: "Creator", theme: "Girly", tone: "かわいい作品やグッズ展開に合わせやすい", use: "イラスト、雑貨、SNSまとめ", colors: ["#fff8fb", "#ff7eb3", "#c5a1ec"] },
  { name: "Creator Portfolio", category: "Creator", theme: "Minimal", tone: "活動内容をすっきり整理して見せる", use: "作家、デザイナー、ポートフォリオ", colors: ["#ffffff", "#111111", "#dcdcdc"] },
  { name: "Creator Portfolio", category: "Creator", theme: "RetroPop", tone: "SNS映えするポップなクリエイターサイト", use: "キャラクター、グッズ、イベント告知", colors: ["#fffbee", "#f45b7b", "#63cdf2"] },
];

const templateGrid = document.querySelector("#templateGrid");
const categoryFilter = document.querySelector("#categoryFilter");
const themeFilter = document.querySelector("#themeFilter");

function unique(values) {
  return ["All", ...new Set(values)];
}

function renderOptions(select, values) {
  select.innerHTML = values.map((value) => `<option value="${value}">${value}</option>`).join("");
}

function createCard(template) {
  const card = document.createElement("article");
  card.className = "template-card";
  card.style.setProperty("--c1", template.colors[0]);
  card.style.setProperty("--c2", template.colors[1]);
  card.style.setProperty("--c3", template.colors[2]);
  card.innerHTML = `
    <div class="mock-preview" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="card-body">
      <p class="card-meta">${template.category} / ${template.theme}</p>
      <h3>${template.name}</h3>
      <p>${template.tone}</p>
      <p class="use">${template.use}</p>
      <span class="demo-label">Preview only</span>
    </div>
  `;
  return card;
}

function renderTemplates() {
  const category = categoryFilter.value;
  const theme = themeFilter.value;
  const filtered = templates.filter((template) => {
    const matchCategory = category === "All" || template.category === category;
    const matchTheme = theme === "All" || template.theme === theme;
    return matchCategory && matchTheme;
  });

  templateGrid.innerHTML = "";
  filtered.forEach((template) => templateGrid.appendChild(createCard(template)));
}

renderOptions(categoryFilter, unique(templates.map((template) => template.category)));
renderOptions(themeFilter, unique(templates.map((template) => template.theme)));
categoryFilter.addEventListener("change", renderTemplates);
themeFilter.addEventListener("change", renderTemplates);
renderTemplates();
