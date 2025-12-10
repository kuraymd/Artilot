/* --------------------------------------------------
   6. シェア画像（白背景で描き直す）
-------------------------------------------------- */
document.getElementById("saveImgBtn").addEventListener("click", saveImage);

function saveImage() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 出力サイズ（横3枚で 900px x 400px）
  canvas.width = 900;
  canvas.height = 400;

  // 背景を白で塗る
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // カード情報を取得
  const cardData = [
    {
      title: document.getElementById("card1-title").textContent,
      lines: [
        document.getElementById("c1-1").textContent,
        document.getElementById("c1-2").textContent,
        document.getElementById("c1-3").textContent
      ]
    },
    {
      title: document.getElementById("card2-title").textContent,
      lines: [
        document.getElementById("c2-1").textContent,
        document.getElementById("c2-2").textContent,
        document.getElementById("c2-3").textContent
      ]
    },
    {
      title: document.getElementById("card3-title").textContent,
      lines: [
        document.getElementById("c3-1").textContent,
        document.getElementById("c3-2").textContent
      ],
      palette: Array.from(
        document.querySelectorAll("#paletteRow .palette-swatch")
      ).map(s => s.style.background)
    }
  ];

  // カード描画設定
  const cardWidth = 280;
  const cardHeight = 350;
  const startX = [10, 310, 610]; // 3枚横に並べる位置

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  ctx.font = "20px sans-serif";

  // ------- カードを描画 -------
  cardData.forEach((c, i) => {
    const x = startX[i];
    const y = 20;

    // カード枠（角丸）
    drawRoundedRect(ctx, x, y, cardWidth, cardHeight, 6);
    ctx.stroke();

    // タイトル
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(c.title, x + 12, y + 40);

    // 各項目
    ctx.font = "16px sans-serif";
    c.lines.forEach((text, index) => {
      ctx.fillText(text, x + 12, y + 80 + index * 28);
    });

    // パレット（3色）
    if (c.palette) {
      c.palette.forEach((col, j) => {
        ctx.fillStyle = col;
        ctx.fillRect(x + 12 + j * 32, y + 200, 28, 28);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(x + 12 + j * 32, y + 200, 28, 28);
      });
    }
  });

  // フッター
  ctx.fillStyle = "#000";
  ctx.font = "14px sans-serif";
  ctx.fillText("© 2025 Artilot", canvas.width - 150, canvas.height - 10);

  // 保存
  const link = document.createElement("a");
  link.download = "artilot_cards.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/* ------- 角丸描画関数 ------- */
function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
