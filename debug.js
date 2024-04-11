function debug() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let debugTab = ss.getSheetByName("DEBUG");
  //update
  updateHISTORYtab(debugTab);
  updateCURRENCYtab(debugTab);
  updateLOGBOOKtab(debugTab);
}

function deleteLastRow() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let currencyTab = ss.getSheetByName("CURRENCY");
  let flowTab = ss.getSheetByName("FLOW");
  let historyTab = ss.getSheetByName("HISTORY");
  let usdHistoryTab = ss.getSheetByName("$HISTORY");
  let logbookTab = ss.getSheetByName("LOGBOOK");

  //if (true) return; // DEBUG?

  usdHistoryTab.deleteRow(2);
  currencyTab.deleteRow(2);
  flowTab.deleteRow(2);
  historyTab.deleteRow(2);
  logbookTab.deleteRow(2);
}



function debugServices() {
  const functions = Object.getOwnPropertyNames(this).filter(
    (name) =>
      typeof this[name] === "function" &&
      (name.toLowerCase().includes("parse") ||
        name.toLowerCase().includes("fetch")) &&
      name.startsWith("service")
  );

  functions.forEach((funcName) => {
    const result = this[funcName]();
    Logger.log(`${funcName}: {result}`);
  });
}
