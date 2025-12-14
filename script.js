/* =========================
   ARTILOT script.js FINAL
========================= */

// ---------- データ定義 ----------
const data = {
  race: [
    { jp: '人', en: 'Human' },
    { jp: 'エルフ', en: 'Elf' },
    { jp: 'ダークエルフ', en: 'Dark Elf' },
    { jp: '獣人', en: 'Beastfolk' },
    { jp: '天使', en: 'Angel' },
    { jp: '悪魔', en: 'Demon' },
    { jp: '精霊', en: 'Spirit' },
    { jp: '機械人形', en: 'Automaton' }
  ],
  gender: [
    { jp: '不明', en: 'Unknown' },
    { jp: '中性', en: 'Neutral' },
    { jp: '女性', en: 'Female' },
    { jp: '男性', en: 'Male' },
    { jp: '両性', en: 'Androgynous' }
  ],
  personality: [
    { jp: '静か', en: 'Quiet' },
    { jp: '元気', en: 'Energetic' },
    { jp: '冷静', en: 'Calm' },
    { jp: '無表情', en: 'Stoic' },
    { jp: '皮肉屋', en: 'Sarcastic' },
    { jp: '優しい', en: 'Kind' },
    { jp: '不思議', en: 'Mysterious' },
    { jp: '自信家', en: 'Confident' }
  ],
  hair: [
    { jp: 'ショート', en: 'Short' },
    { jp: 'ロング', en: 'Long' },
    { jp: 'ボブ', en: 'Bob' },
    { jp: 'ポニーテール', en: 'Ponytail' },
    { jp: 'ツインテール', en: 'Twintails' },
    { jp: 'ウェーブ', en: 'Wavy' },
    { jp: '三つ編み', en: 'Braided' }
  ],
  outfit: [
    { jp: 'メイド', en: 'Maid' },
    { jp: '制服', en: 'Uniform' },
    { jp: '私服', en: 'Casual' },
    { jp: 'ドレス', en: 'Dress' },
    { jp: '鎧', en: 'Armor' },
    { jp: 'ローブ', en: 'Robe' },
    { jp: 'ストリート', en: 'Street' }
  ],
  motif: [
    { jp: '月', en: 'Moon' },
    { jp: '太陽', en: 'Sun' },
    { jp: '星', en: 'Star' },
    { jp: '花', en: 'Flower' },
    { jp: '骨', en: 'Bone' },
    { jp: '機械', en: 'Machine' },
    { jp: '水', en: 'Water' },
    { jp: '炎', en: 'Fire' }
  ],
  mood: [
    { jp: 'レトロ', en: 'Retro' },
    { jp: 'ダーク', en: 'Dark' },
    { jp: 'ポップ', en: 'Pop' },
    { jp: 'ゴシック', en: 'Gothic' },
    { jp: 'ナチュラル', en: 'Natural' },
    { jp: 'サイバー', en: 'Cyber' },
    { jp: 'ゆるい', en: 'Soft' }
  ],
  theme: [
    { jp: '自然', en: 'Nature' },
    { jp: 'テック', en: 'Tech' },
    { jp: 'ファンタジー', en: 'Fantasy' },
    { jp: '近未来', en: 'Near Future' },
    { jp: '中世', en: 'Medieval' },
    { jp: '和風', en: 'Japanese' },
    { jp: '宇宙', en: 'Space' }
  ],
  composition: [
    { jp: '全身', en: 'Full Body' },
    { jp: 'バストアップ', en: 'Bust Up' },
    { jp: '腰上', en: 'Waist Up' },
    { jp: '横顔', en: 'Profile' },
    { jp: '俯瞰', en: 'Top View' },
    { jp: '煽り', en: 'Low Angle' }
  ],
  colors: [
    '#1c3ea2', '#c1db59', '#155b5d',
    '#7c4dff', '#ff8a65', '#2e2e2e',
    '#ffd166', '#118ab2', '#ef476f'
  ]
};

// ---------- 共通関数 ----------
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

const drawThreeColors = () => {
  const shuffled = [...data.colors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

// ---------- DOM ----------
const cards = {
  race: document.getElementById('race'),
  gender: document.getElementById('gender'),
  personality: document.getElementById('personality'),
  hair: document.getElementById('hair'),
  outfit: document.getElementById('outfit'),
  motif: document.getElementById('motif'),
  mood: document.getElementById('mood'),
  theme: document.getElementById('theme'),
  composition: document.getElementById('composition')
};

const colorBox = document.getElementById('colorBox');
const historyArea = document.getElementById('history');

// ---------- メイン処理 ----------
function drawCards() {
  const result = {
    race: rand(data.race),
    gender: rand(data.gender),
    personality: rand(data.personality),
    hair: rand(data.hair),
    outfit: rand(data.outfit),
    motif: rand(data.motif),
    mood: rand(data.mood),
    theme: rand(data.theme),
    composition: rand(data.composition),
    colors: drawThreeColors()
  };

  // 表示
  Object.keys(cards).forEach(key => {
    cards[key].innerHTML = `
      <div class="jp">${result[key].jp}</div>
      <div class="en">${result[key].en}</div>
    `;
  });

  // カラー表示（右下枠）
  colorBox.innerHTML = '';
  result.colors.forEach(c => {
    const span = document.createElement('span');
    span.style.background = c;
    colorBox.appendChild(span);
  });

  saveHistory(result);
}

// ---------- 履歴 ----------
function saveHistory(result) {
  const history = JSON.parse(localStorage.getItem('artilotHistory') || '[]');
  history.unshift(result);
  if (history.length > 20) history.pop();
  localStorage.setItem('artilotHistory', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem('artilotHistory') || '[]');
  historyArea.innerHTML = '';

  history.forEach((h, i) => {
    const card = document.createElement('div');
    card.className = 'history-card';
    card.innerHTML = `
      <strong>#${i + 1}</strong><br>
      種族: ${h.race.jp} / ${h.race.en}<br>
      性別: ${h.gender.jp} / ${h.gender.en}<br>
      性格: ${h.personality.jp} / ${h.personality.en}<br>
      髪型: ${h.hair.jp} / ${h.hair.en}<br>
      服: ${h.outfit.jp} / ${h.outfit.en}<br>
      モチーフ: ${h.motif.jp} / ${h.motif.en}<br>
      雰囲気: ${h.mood.jp} / ${h.mood.en}<br>
      テーマ: ${h.theme.jp} / ${h.theme.en}<br>
      構図: ${h.composition.jp} / ${h.composition.en}
    `;
    card.onclick = () => shareFromHistory(h);
    historyArea.appendChild(card);
  });
}

// ---------- シェア ----------
function shareFromHistory(h) {
  const text = `
インスピレーションカードの結果
種族: ${h.race.jp}
性別: ${h.gender.jp}
性格: ${h.personality.jp}
髪型: ${h.hair.jp}
服: ${h.outfit.jp}
モチーフ: ${h.motif.jp}
雰囲気: ${h.mood.jp}
テーマ: ${h.theme.jp}
構図: ${h.composition.jp}

#ARTILOT
https://kuraymd.github.io/Artilot/
  `.trim();

  navigator.share
    ? navigator.share({ text })
    : alert(text);
}

// ---------- 初期化 ----------
renderHistory();
