const SHEETS = {
  gacha: "ガチャ内容",
  requests: "リクエスト",
  news: "お知らせ"
};

function setupMonsterLabSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  const gacha = getOrCreateSheet_(spreadsheet, SHEETS.gacha);
  gacha.clear();
  gacha.appendRow(["theme", "themeKey", "tone", "toneKey", "rank", "species", "color", "feature", "ability", "scene", "nameWord", "targetTheme", "targetTone"]);
  gacha.appendRow(["動物", "animal", "ホラー", "horror", "SS", "きつね", "青白い灰", "目を合わせると黙る", "足音を真似る", "丘の上", "裏窓", "", ""]);
  gacha.appendRow(["深海", "deepsea", "かわいい", "cute", "C", "クラゲ", "クリーム色", "人懐っこい", "小さな幸運を運ぶ", "海中洞窟", "こ", "", ""]);
  gacha.appendRow(["植物", "plant", "明るい", "cheerful", "B", "若葉", "オーロラグリーン", "好奇心が強い", "光るサインを出す", "川沿いの草むら", "きら", "", ""]);
  gacha.appendRow(["", "", "", "", "", "割れた人形", "", "", "", "", "", "廃墟", "ホラー"]);

  const requests = getOrCreateSheet_(spreadsheet, SHEETS.requests);
  requests.clear();
  requests.appendRow(["createdAt", "category", "idea"]);

  const news = getOrCreateSheet_(spreadsheet, SHEETS.news);
  news.clear();
  news.appendRow(["date", "title", "text"]);
  news.appendRow(["2026.05", "Monster Lab 更新", "テーマ、トーン、種族などをスプレッドシートから管理できるようにしました。"]);
}

function doGet(e) {
  const action = e.parameter.action || "gacha";

  if (action === "news") {
    return json_(readSheetObjects_(SHEETS.news));
  }

  return json_({
    gacha: readSheetObjects_(SHEETS.gacha),
    news: readSheetObjects_(SHEETS.news)
  });
}

function doPost(e) {
  const action = e.parameter.action || "";

  if (action === "request") {
    const sheet = getOrCreateSheet_(SpreadsheetApp.getActiveSpreadsheet(), SHEETS.requests);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["createdAt", "category", "idea"]);
    }
    sheet.appendRow([
      e.parameter.createdAt || new Date().toISOString(),
      e.parameter.category || "",
      e.parameter.idea || ""
    ]);
  }

  return json_({ ok: true });
}

function getOrCreateSheet_(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function readSheetObjects_(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map(header => String(header).trim());

  return values.slice(1)
    .filter(row => row.some(cell => String(cell).trim()))
    .map(row => {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = row[index];
      });
      return item;
    });
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
