/* ---------- Share (Text Only, Fully Stable) ---------- */
shareBtn.addEventListener("click", () => {

  // カードのテキストを取得
  const race = document.getElementById("c1-1").textContent;
  const gender = document.getElementById("c1-2").textContent;
  const personality = document.getElementById("c1-3").textContent;

  const hair = document.getElementById("c2-1").textContent;
  const outfit = document.getElementById("c2-2").textContent;
  const motif = document.getElementById("c2-3").textContent;

  const mood = document.getElementById("c3-1").textContent;

  // カラーコード（色チップの背景色を取得）
  const mainColorChip = document.querySelector("#mainPalette .palette-chip");
  const mainColor = rgbToHex(mainColorChip.style.background);

  const subChips = document.querySelectorAll("#subPalette .palette-chip");
  const subColors = Array.from(subChips).map(c => rgbToHex(c.style.background));

  const subColorText = `${subColors[0]} / ${subColors[1]} / ${subColors[2]}`;

  const shareText = 
`インスピレーションカードの結果
——————————————
種族: ${race}
性別: ${gender}
性格: ${personality}

髪型: ${hair}
服: ${outfit}
モチーフ: ${motif}

雰囲気: ${mood}

メインカラー:
${mainColor}

サブカラー:
${subColorText}

——————————————
#ARTILOT
#今日のお題
#InspirationCards

あなたもやってみてね！
ARTILOT → https://kuraymd.github.io/Artilot/
`;

  if (navigator.share) {
    navigator.share({
      title: "ARTILOT Inspiration Cards",
      text: shareText
    }).catch(() => {
      alert("共有に失敗しました");
    });
  } else {
    // シェアできない環境用
    navigator.clipboard.writeText(shareText);
    alert("共有機能が使えないため、テキストをコピーしました！");
  }
});


/* ---------- RGB → HEX 変換（色チップ用） ---------- */
function rgbToHex(rgb) {
  if (!rgb) return "#000000";
  const result = rgb.match(/\d+/g);
  if (!result) return "#000000";
  return "#" + result
    .slice(0, 3)
    .map(x => ("0" + parseInt(x).toString(16)).slice(-2))
    .join("");
}
