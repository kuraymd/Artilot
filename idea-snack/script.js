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

const updatesList =
  document.getElementById(
    "updatesList"
  );

const requestForm =
  document.getElementById(
    "requestForm"
  );

const requestStatus =
  document.getElementById(
    "requestStatus"
  );


let gachaData = {};

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxm-zNHpZBB1MpHFEnbqNVP8fazHYPuHBCG6KzT4LB41ny-YrFP7IyJOWGxez2Axd3DsQ/exec";

const announcementsFallback = [
  {
    date: "2026.05",
    label: "NEW",
    text: "How to Use / Updates / Request セクションを追加しました。"
  },
  {
    date: "2026.05",
    label: "GAS",
    text: "Google Sheets 連携のカテゴリガチャを維持しています。"
  },
  {
    date: "NEXT",
    label: "PLAN",
    text: "announcements シートから更新情報を取得できる構造に拡張予定です。"
  }
];


// category generation
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


// random
function randomItem(array){

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];

}


// gacha
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


function renderUpdates(items){

  if(!updatesList){
    return;
  }

  updatesList.innerHTML = "";

  items.forEach(item=>{

    const update =
      document.createElement(
        "article"
      );

    update.className =
      "update-item";

    update.innerHTML = `
      <div class="update-date">
        ${item.date}
      </div>

      <div class="update-body">
        <strong>${item.label}</strong>
        <p>${item.text}</p>
      </div>
    `;

    updatesList.appendChild(
      update
    );

  });

}


// Future: load from announcements sheet.
async function loadAnnouncements(){

  renderUpdates(
    announcementsFallback
  );

}


function setupRequestForm(){

  if(!requestForm){
    return;
  }

  requestForm.addEventListener(
    "submit",
    event=>{

      event.preventDefault();

      const formData =
        new FormData(
          requestForm
        );

      const idea =
        String(
          formData.get("idea") || ""
        ).trim();

      if(!idea){

        requestStatus.textContent =
          "リクエスト内容を入力してください。";

        return;

      }

      requestStatus.textContent =
        "ありがとうございます。requests シート連携時に送信できるようになります。";

      requestForm.reset();

    }
  );

}


// Spreadsheet load
async function loadData(){

  const response =
    await fetch(GAS_URL);

  const data =
    await response.json();

  gachaData =
    data;

  document.getElementById(
    "loadingText"
  ).remove();

  createCategories();

}

loadAnnouncements();

loadData();

setupRequestForm();


// button
drawBtn.addEventListener(
  "click",
  drawIdea
);
