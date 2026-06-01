const SHEETS = {
  categories: "categories",
  habitats: "habitats",
  species: "species",
  body_features: "body_features",
  face_features: "face_features",
  behaviors: "behaviors",
  abilities: "abilities",
  comments: "comments",
  nicknames: "nicknames",
  statuses: "statuses",
  announcements: "announcements",
  requests: "requests"
};

function setupMonsterLabSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  createSheetWithHeader_(spreadsheet, SHEETS.categories, ["category", "sub_category"]);
  createSheetWithHeader_(spreadsheet, SHEETS.habitats, ["habitat", "habitat_type"]);
  createSheetWithHeader_(spreadsheet, SHEETS.species, ["species", "species_type"]);
  createSheetWithHeader_(spreadsheet, SHEETS.body_features, ["body_feature", "feature_type"]);
  createSheetWithHeader_(spreadsheet, SHEETS.face_features, ["face_feature", "feature_type"]);
  createSheetWithHeader_(spreadsheet, SHEETS.behaviors, ["behavior", "behavior_type"]);
  createSheetWithHeader_(spreadsheet, SHEETS.abilities, ["ability", "ability_type"]);
  createSheetWithHeader_(spreadsheet, SHEETS.comments, ["comment", "comment_type"]);
  createSheetWithHeader_(spreadsheet, SHEETS.nicknames, ["nickname_prefix", "nickname_suffix"]);
  createSheetWithHeader_(spreadsheet, SHEETS.statuses, ["status", "status_type"]);
  createSheetWithHeader_(spreadsheet, SHEETS.announcements, ["date", "title", "text"]);
  createSheetWithHeader_(spreadsheet, SHEETS.requests, ["createdAt", "category", "idea"]);
}

function doGet() {
  return json_({
    categories: readSheetObjects_(SHEETS.categories),
    habitats: readSheetObjects_(SHEETS.habitats),
    species: readSheetObjects_(SHEETS.species),
    body_features: readSheetObjects_(SHEETS.body_features),
    face_features: readSheetObjects_(SHEETS.face_features),
    behaviors: readSheetObjects_(SHEETS.behaviors),
    abilities: readSheetObjects_(SHEETS.abilities),
    comments: readSheetObjects_(SHEETS.comments),
    nicknames: readSheetObjects_(SHEETS.nicknames),
    statuses: readSheetObjects_(SHEETS.statuses),
    announcements: readSheetObjects_(SHEETS.announcements)
  });
}

function doPost(e) {
  const action = e.parameter.action || "";

  if (action === "request") {
    const sheet = getOrCreateSheet_(SpreadsheetApp.getActiveSpreadsheet(), SHEETS.requests);
    ensureHeader_(sheet, ["createdAt", "category", "idea"]);
    sheet.appendRow([
      e.parameter.createdAt || new Date().toISOString(),
      e.parameter.category || "other",
      e.parameter.idea || ""
    ]);
  }

  return json_({ ok: true });
}

function createSheetWithHeader_(spreadsheet, name, headers) {
  const sheet = getOrCreateSheet_(spreadsheet, name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
}

function ensureHeader_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
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
