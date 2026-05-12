
const categoryArea =
  document.getElementById(
    "categoryArea"
  );

const resultArea =
  document.getElementById(
    "resultArea"
  );

const drawBtn =
  document.getElementById(
    "drawBtn"
  );


// 仮データ
const gachaData = {

  hair:[
    "Twin Tail",
    "Short Bob",
    "Long Hair",
    "Messy Hair"
  ],

  outfit:[
    "Oversized Hoodie",
    "Cyber Jacket",
    "Retro Dress",
    "School Uniform"
  ],

  motif:[
    "Deep Sea",
    "Candy",
    "Arcade",
    "Space"
  ]

};


// category生成
function createCategories(){

  Object.keys(gachaData)
    .forEach(category=>{

      const button =
        document.createElement(
          "button"
        );

      button.className =
        "category-chip active";

      button.dataset.category =
        category;

      button.textContent =
        category.toUpperCase();

      button.addEventListener(
        "click",
        ()=>{

          button.classList.toggle(
            "active"
          );

        }
      );

      categoryArea.appendChild(
        button
      );

    });

}


// ランダム
function randomItem(array){

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];

}


// ガチャ
function drawIdea(){

  resultArea.innerHTML = "";

  const activeCategories =
    document.querySelectorAll(
      ".category-chip.active"
    );

  activeCategories.forEach(button=>{

    const category =
      button.dataset.category;

    const item =
      randomItem(
        gachaData[category]
      );

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "result-card";

    card.innerHTML = `
      <p class="result-title">
        ${category}
      </p>

      <p class="result-value">
        ${item}
      </p>
    `;

    resultArea.appendChild(card);

  });

}


// 初期化
createCategories();


// button
drawBtn.addEventListener(
  "click",
  drawIdea
);

