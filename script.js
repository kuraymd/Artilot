const data = {
  race: [["Human","人"],["Elf","エルフ"],["Robot","ロボット"]],
  gender: [["Male","男性"],["Female","女性"],["?","不明"]],
  personality: [["Quiet","静か"],["Energetic","元気"],["Expressionless","無表情"]],
  hair: [["Short","ショート"],["Long","ロング"],["Bob","ボブ"]],
  outfit: [["Maid","メイド"],["Armor","鎧"],["Sailor","セーラー"]],
  motif: [["Moon","月"],["Sun","太陽"],["Fish","魚"]],
  mood: [["Retro","レトロ"],["Fantasy","ファンタジー"],["Horror","ホラー"]],
  theme: [["Nature","自然"],["Urban","都会"],["Dream","夢"]],
  composition: [["Full Body","全身"],["Bust","バストアップ"],["Top-down","上から"]]
};

let lang = "JP";
let history = JSON.parse(localStorage.getItem("artilot_history") || "[]");

const resultArea = document.getElementById("resultArea");

document.getElementById("btnJP").onclick = () => setLang("JP");
document.getElementById("btnEN").onclick = () => setLang("EN");
document.getElementById("drawBtn").onclick = draw;
document.getElementById("clearHistory").onclick = () => {
  history = [];
  saveHistory();
};

function setLang(l) {
  lang = l;
  document.getElementById("btnJP").classList.toggle("active", l==="JP");
  document.getElementById("btnEN").classList.toggle("active", l==="EN");
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function draw() {
  resultArea.innerHTML = "";
  const result = {};

  Object.keys(data).forEach(key => {
    const v = pick(data[key]);
    result[key] = v;
    addCrystal(v, key);
  });

  const colors = ["#"+Math.floor(Math.random()*16777215).toString(16),
                  "#"+Math.floor(Math.random()*16777215).toString(16),
                  "#"+Math.floor(Math.random()*16777215).toString(16)];

  ["Main","Sub1","Sub2"].forEach((t,i)=>{
    addColorCrystal(t, colors[i]);
    result[t] = colors[i];
  });

  history.unshift(result);
  history = history.slice(0,20);
  saveHistory();
}

function addCrystal(value, label) {
  const div = document.createElement("div");
  div.className = "crystal";
  div.innerHTML = `
    <div class="crystal-ball">
      ${lang==="EN"?value[0]:value[1]}
      <span>${lang==="EN"?value[1]:value[0]}</span>
    </div>
    <div class="crystal-base">${label}</div>
  `;
  resultArea.appendChild(div);
}

function addColorCrystal(name, color) {
  const div = document.createElement("div");
  div.className = "crystal color";
  div.innerHTML = `
    <div class="crystal-ball" style="background:${color}">
      ${name}
    </div>
    <div class="crystal-base">${color}</div>
  `;
  resultArea.appendChild(div);
}

function saveHistory() {
  localStorage.setItem("artilot_history", JSON.stringify(history));
  const list = document.getElementById("historyList");
  list.innerHTML = history.map((h,i)=>`<div>#${i+1}<br>${JSON.stringify(h)}</div>`).join("");
}
