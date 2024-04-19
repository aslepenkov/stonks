const TELEGRAM_BOT_TOKEN =
  PropertiesService.getScriptProperties().getProperty("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID =
  PropertiesService.getScriptProperties().getProperty("TELEGRAM_CHAT_ID");
const TONAPI_API_TOKEN =
  PropertiesService.getScriptProperties().getProperty("TONAPI_API_TOKEN");
const TON_ADDRESS =
  PropertiesService.getScriptProperties().getProperty("TON_ADDRESS");
const TON_ACCOUNT_ID =
  PropertiesService.getScriptProperties().getProperty("TON_ACCOUNT_ID");

const MSG_THREAD = 9

const startIndex = 7;

const currencyTabName = "AUTOCURRENCY";
const historyTabName = "AUTOHISTORY";
const usdHistoryTabName = "AUTOUSDHISTORY";
const logbookTabName = "LOGBOOK";

const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
const dashboardTab = spreadSheet.getSheetByName("DASHBOARD");
const currencyTab = spreadSheet.getSheetByName(currencyTabName);
const historyTab = spreadSheet.getSheetByName(historyTabName);
const usdHistoryTab = spreadSheet.getSheetByName(usdHistoryTabName);
const logbookTab = spreadSheet.getSheetByName(logbookTabName);

const dailyAutofill = () => autofill(true);
const hourlyAutofill = () => autofill(false);
