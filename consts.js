var TELEGRAM_BOT_TOKEN =
  PropertiesService.getScriptProperties().getProperty("TELEGRAM_BOT_TOKEN");
var TELEGRAM_CHAT_ID =
  PropertiesService.getScriptProperties().getProperty("TELEGRAM_CHAT_ID");
var TONAPI_API_TOKEN =
  PropertiesService.getScriptProperties().getProperty("TONAPI_API_TOKEN");
var TON_ADDRESS =
  PropertiesService.getScriptProperties().getProperty("TON_ADDRESS");
var TON_ACCOUNT_ID =
  PropertiesService.getScriptProperties().getProperty("TON_ACCOUNT_ID");

var MSG_THREAD = 9

var startIndex = 10;

var currencyTabName = "AUTOCURRENCY";
var historyTabName = "AUTOHISTORY";
var usdHistoryTabName = "AUTOUSDHISTORY";
var logbookTabName = "LOGBOOK";

var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
var dashboardTab = spreadSheet.getSheetByName("DASHBOARD");
var currencyTab = spreadSheet.getSheetByName(currencyTabName);
var historyTab = spreadSheet.getSheetByName(historyTabName);
var usdHistoryTab = spreadSheet.getSheetByName(usdHistoryTabName);
var logbookTab = spreadSheet.getSheetByName(logbookTabName);


