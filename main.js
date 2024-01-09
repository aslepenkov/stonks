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
  let logbookTab = ss.getSheetByName("LOGBOOK");

  if (true) return; // DEBUG?

  currencyTab.deleteRow(2);
  flowTab.deleteRow(2);
  historyTab.deleteRow(2);
  logbookTab.deleteRow(2);
}

function mainStonksDailyFunction() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let currencyTab = ss.getSheetByName("CURRENCY");
  let flowTab = ss.getSheetByName("FLOW");
  let historyTab = ss.getSheetByName("HISTORY");
  let logbookTab = ss.getSheetByName("LOGBOOK");

  //update
  updateCURRENCYtab(currencyTab);
  updateFLOWtab(flowTab);
  updateHISTORYtab(historyTab);
  updateLOGBOOKtab(logbookTab);

  //send
  sendStonksChartCommand();
}

function updateCURRENCYtab(tab) {
  //add new row
  tab.insertRowAfter(1);

  //add values
  const tonPrice = fetchTonPrice();
  const btcPrice = fetchBTCPrice();
  const ethPrice = fetchETHPrice();
  const dogePrice = fetchDogePrice();
  const tanPrice = parseTANPrice();
  const shitCoinsPrices = fetchTonShitCoinsPrices();

  tab.getRange("A2:T2").setValues([
    [
      formatDate(new Date()),
      1, //USDT
      tonPrice, //TON
      btcPrice, //BTC
      ethPrice, //ETH
      dogePrice, //DOGE
      tanPrice, //TAN
      shitCoinsPrices[0], //AMBRA
      shitCoinsPrices[1], //GLINT
      shitCoinsPrices[2], //JETTON
      shitCoinsPrices[3], //LAVE
      shitCoinsPrices[4], //PUNK
      shitCoinsPrices[5], //RAFF
      shitCoinsPrices[6], //jWBTC
      shitCoinsPrices[7], //tsTON
      shitCoinsPrices[8], //jUSDT
      shitCoinsPrices[9], //KINGY
      shitCoinsPrices[10], //SCALE
      shitCoinsPrices[11], //ARBUZ
      shitCoinsPrices[12], //TONNEL
    ],
  ]);
}

function updateFLOWtab(tab) {
  //add new row
  tab.insertRowAfter(1);

  //add today
  tab.getRange("A2").setValue(formatDate(new Date()));
}

function updateHISTORYtab(tab) {
  //add new row
  tab.insertRowAfter(1);
  //const shitCoinsValues = parseTonViewerShitCoinsValues();

  //add history
  tab.getRange("B2:AT2").setFormulas([
    [
      "=B3+FLOW!B2", //USDT
      "=C3+FLOW!C2", //TON
      "=D3+FLOW!D2", //BTC
      "=E3+FLOW!E2", //ETH
      "=F3+FLOW!F2", //DOGE
      "=G3+FLOW!G2", //TAN
      "=H3+FLOW!H2", //AMBR
      "=I3+FLOW!I2", //GLINT
      "=J3+FLOW!J2", //JETTON
      "=K3+FLOW!K2", //LAVE
      "=L3+FLOW!L2", //PUNK
      "=M3+FLOW!M2", //RAFF
      "=N3+FLOW!N2", //JWBTC
      "=O3+FLOW!O2", //TSTON
      "=P3+FLOW!P2", //jUSDT
      "=Q3+FLOW!Q2", //KINGY
      "=R3+FLOW!R2", //SCALE
      "=S3+FLOW!S2", //ARBUZ
      "=T3+FLOW!T2", //TONNEL
      "", //U empty
      "", //V empty
      "", //W empty
      "", //X empty
      "=Y3+FLOW!AA2", //Y SPENT USD
      "==ROUND(SUM(AB2:AX2),0)", //Z BALANCE USD
      "", //AA DATE
      "=B2*CURRENCY!B2", //AB USDT value
      "=C2*CURRENCY!B2", //AC TON $ value
      "=D2*CURRENCY!D2", //AD BTC $ value
      "=E2*CURRENCY!E2", //AE ETH $ value
      "=F2*CURRENCY!F2", //AF DOGE $ value
      "=G2*CURRENCY!G2*CURRENCY!C2", //AG TAN $ value
      "=H2*CURRENCY!H2", //AMBR $ value
      "=I2*CURRENCY!I2", //GLINT $ value
      "=J2*CURRENCY!J2", //JETTON $ value
      "=K2*CURRENCY!K2", //LAVE $ value
      "=L2*CURRENCY!L2", //PUNK $ value
      "=M2*CURRENCY!M2", //RAFF $ value
      "=N2*CURRENCY!N2", //JWBTC $ value
      "=O2*CURRENCY!O2", //TSTON $ value
      "=P2*CURRENCY!P2", //jUSDT $ value
      "=Q2*CURRENCY!Q2", //KINGY $ value
      "=R2*CURRENCY!R2", //SCALE $ value
      "=S2*CURRENCY!S2", //ARBUZ $ value
      "=T2*CURRENCY!T2", //TONNEL $ value
    ],
  ]);

  //direct shitcoins values
  //const range = tab.getRange("AH2");
  //const numColumns = shitCoinsValues.length;
  //const convertedValues = shitCoinsValues.map(value => parseFloat(value.replace('$', '')));
  //range.offset(0, 0, 1, numColumns).setValues([convertedValues.slice(0, numColumns)]);

  //add today
  tab.getRange("A2").setValue(formatDate(new Date()));
  tab.getRange("AA2").setValue(formatDate(new Date()));
}

function updateLOGBOOKtab(tab) {
  tab.insertRowAfter(1);
  tab.getRange("A2").setValue(formatDate(new Date()));
  tab
    .getRange("B2")
    .setFormulas([["=ROUND(100-(HISTORY!Z3/HISTORY!Z2 *100),2)/100"]]);
}
