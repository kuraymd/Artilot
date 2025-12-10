// カテゴリデータ
const cardData = {
    human: [
        "青年 / 青い髪 / ミステリアス",
        "女性 / 優しい雰囲気 / 長髪",
        "大人 / 落ち着いた表情 / シックな服",
    ],
    monster: [
        "影の怪物 / 触手 / 黒い霧",
        "骨の獣 / 赤い眼 / 静かな咆哮",
        "深海の怪異 / 青白い光 / 無感情",
    ],
    animal: [
        "白い猫 / 金の目 / 上品",
        "黒い狼 / 美しい毛並み / 俊敏",
        "梟 / 静寂 / 知性",
    ],
    costume: [
        "魔法使いのローブ",
        "騎士の鎧",
        "クラシックドレス",
    ],
    palette: [
        "ゴールド × エメラルド",
        "赤 × 黒",
        "水色 × 白",
    ],
};

// カードを引く
function drawCard() {
    const category = document.getElementById("categorySelect").value;
    const area = document.getElementById("cardDisplay");

    const list = cardData[category];
    const random = list[Math.floor(Math.random() * list.length)];

    area.innerHTML = `
        <div class="card-title">${category.toUpperCase()}</div>
        <div class="card-text">${random}</div>
    `;
}
