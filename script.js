const data = {
  race: [{jp:'人', en:'Human'}, {jp:'エルフ', en:'Elf'}],
  gender: [{jp:'不明', en:'Unknown'}, {jp:'中性', en:'Neutral'}],
  personality: [{jp:'静か', en:'Quiet'}, {jp:'元気', en:'Energetic'}],
  hair: [{jp:'ショート', en:'Short'}],
  outfit: [{jp:'メイド', en:'Maid'}],
  motif: [{jp:'月', en:'Moon'}],
  mood: [{jp:'レトロ', en:'Retro'}],
  theme: [{jp:'自然', en:'Nature'}],
  composition: [{jp:'全身', en:'Full Body'}],
  colors: ['#1c3ea2','#c1db59','#155b5d']
};

const resultEl = document.getElementById('result');
const paletteEl = document.getElementById('palette');

document.getElementById('drawBtn').onclick = draw;
document.getElementById('shareBtn').onclick = share;
document.getElementById('clearHistory').onclick = () => {
  localStorage.removeItem('artilotHistory');
  loadHistory();
};

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function draw(){
  const r = {
    race: pick(data.race),
    gender: pick(data.gender),
    personality: pick(data.personality),
    hair: pick(data.hair),
    outfit: pick(data.outfit),
    motif: pick(data.motif),
    mood: pick(data.mood),
    theme: pick(data.theme),
    composition: pick(data.composition),
    main: data.colors[0],
    subs: data.colors.slice(1)
  };

  renderResult(r);
  saveHistory(r);
  loadHistory();
}

function renderResult(r){
  resultEl.innerHTML = '';
  Object.entries(r).forEach(([k,v])=>{
    if(typeof v === 'object' && v.jp){
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="label">${k}</div>
        <div class="value">${v.jp}<br>${v.en}</div>
      `;
      resultEl.appendChild(card);
    }
  });

  paletteEl.innerHTML = '';
  [r.main, ...r.subs].forEach(c=>{
    const chip = document.createElement('div');
    chip.className = 'color-chip';
    chip.style.background = c;
    paletteEl.appendChild(chip);
  });
}

function saveHistory(r){
  const h = JSON.parse(localStorage.getItem('artilotHistory')||'[]');
  h.unshift(r);
  if(h.length>20) h.pop();
  localStorage.setItem('artilotHistory', JSON.stringify(h));
}

function loadHistory(){
  const list = document.getElementById('historyList');
  list.innerHTML='';
  const h = JSON.parse(localStorage.getItem('artilotHistory')||'[]');
  h.forEach((r,i)=>{
    const d = document.createElement('div');
    d.className='history-card';
    d.innerHTML=`
      <strong>#${i+1}</strong>
      種族: ${r.race.jp} / ${r.race.en}<br>
      性別: ${r.gender.jp} / ${r.gender.en}<br>
      性格: ${r.personality.jp} / ${r.personality.en}<br>
      髪型: ${r.hair.jp} / ${r.hair.en}<br>
      服: ${r.outfit.jp} / ${r.outfit.en}<br>
      モチーフ: ${r.motif.jp} / ${r.motif.en}<br>
      雰囲気: ${r.mood.jp} / ${r.mood.en}<br>
      テーマ: ${r.theme.jp} / ${r.theme.en}<br>
      構図: ${r.composition.jp} / ${r.composition.en}
    `;
    d.onclick = ()=> shareFromHistory(r);
    list.appendChild(d);
  });
}

function shareFromHistory(r){
  const text = `
インスピレーションカードの結果
種族: ${r.race.jp}
性別: ${r.gender.jp}
性格: ${r.personality.jp}
髪型: ${r.hair.jp}
服: ${r.outfit.jp}
モチーフ: ${r.motif.jp}
雰囲気: ${r.mood.jp}
テーマ: ${r.theme.jp}
構図: ${r.composition.jp}

#ARTILOT
#今日のお題
https://kuraymd.github.io/Artilot/
`;
  navigator.share ? navigator.share({text}) : alert(text);
}

function share(){
  const h = JSON.parse(localStorage.getItem('artilotHistory')||'[]');
  if(h[0]) shareFromHistory(h[0]);
}

loadHistory();
