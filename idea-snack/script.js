id="u7m3x5"
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


let gachaData = {};

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxm-zNHpZBB1MpHFEnbqNVP8fazHYPuHBCG6KzT4LB41ny-YrFP7IyJOWGxez2Axd3DsQ/exec";


// category生成
function createCategories(){

  categoryArea.innerHTML = "";

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


// Spreadsheet読み込み
async function loadData(){

  const response =
    await fetch(GAS_URL);

  const data =
    await response.json();

  gachaData = data; document.getElementById( "loadingText" ).remove(); createCategories();

}

loadData();


// button
drawBtn.addEventListener(
  "click",
  drawIdea
);

