function mainStonksDailyFunction() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let currencyTab = ss.getSheetByName("CURRENCY");
  let flowTab = ss.getSheetByName("FLOW");
  let historyTab = ss.getSheetByName("HISTORY");
  let usdHistoryTab = ss.getSheetByName("$HISTORY");
  let logbookTab = ss.getSheetByName("LOGBOOK");

  //update
  updateCURRENCYtab(currencyTab);
  updateFLOWtab(flowTab);
  updateHISTORYtab(historyTab);
  updateUSDHISTORYtab(usdHistoryTab);
  updateLOGBOOKtab(logbookTab);

  //send
  sendStonksChartCommand();
}

function updateCURRENCYtab(tab) {
  //add new row
  tab.insertRowAfter(1);

  //add values
  const tonPrice = serviceFetchTonPrice();
  const btcPrice = serviceFetchBTCPrice();
  const ethPrice = serviceFetchETHPrice();
  const dogePrice = serviceFetchDogePrice();
  const shitCoinsPrices = serviceFetchTonShitCoinsPrices();
  const tanPrice = serviceParseTANPrice();

  let i = 0;

  tab.getRange("A2:AM2").setValues([
    [
      formatDate(new Date()),
      1, //USDT
      tonPrice, //TON
      btcPrice, //BTC
      ethPrice, //ETH
      dogePrice, //DOGE
      tanPrice, //TAN
      shitCoinsPrices[i++], //AMBRA
      shitCoinsPrices[i++], //GLINT
      shitCoinsPrices[i++], //JETTON
      shitCoinsPrices[i++], //LAVE
      shitCoinsPrices[i++], //PUNK
      shitCoinsPrices[i++], //RAFF
      shitCoinsPrices[i++], //jWBTC
      shitCoinsPrices[i++], //tsTON
      shitCoinsPrices[i++], //jUSDT
      shitCoinsPrices[i++], //KINGY
      shitCoinsPrices[i++], //SCALE
      shitCoinsPrices[i++], //ARBUZ
      shitCoinsPrices[i++], //TONNEL
      shitCoinsPrices[i++], //DFC
      1, //LP dedust
      shitCoinsPrices[i++], //Dogwifhoodie
      shitCoinsPrices[i++], //FISH
      shitCoinsPrices[i++], //DYNYA
      shitCoinsPrices[i++], //jNANO
      1, //[SPENT USD COLUMN]
      shitCoinsPrices[i++], //APE
      shitCoinsPrices[i++], //JOKER
      shitCoinsPrices[i++], //PROTON
      shitCoinsPrices[i++], //PLANKTON
      shitCoinsPrices[i++], //GRAM
      shitCoinsPrices[i++], //WEB3
      shitCoinsPrices[i++], //NOBBY
      shitCoinsPrices[i++], //POVEL DUREV
      shitCoinsPrices[i++], //INDICA
      shitCoinsPrices[i++], //STBL
      shitCoinsPrices[i++], //STEPFROG
      shitCoinsPrices[i++], //TONUP
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

  //add history
  tab.getRange("B2:AM2").setFormulas([
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
      "=U3+FLOW!U2", //DFC
      "=V3+FLOW!V2", //LP dedust
      "=W3+FLOW!W2", //Dogwifhoodie
      "=X3+FLOW!X2", //FISH
      "=Y3+FLOW!Y2", 
      "=Z3+FLOW!Z2", 
      "=AA3+FLOW!AA2", //[SPENT USD]
      "=AB3+FLOW!AB2", 
      "=AC3+FLOW!AC2", 
      "=AD3+FLOW!AD2", 
      "=AE3+FLOW!AE2", 
      "=AF3+FLOW!AF2", 
      "=AG3+FLOW!AG2", 
      "=AH3+FLOW!AH2", 
      "=AI3+FLOW!AI2", 
      "=AJ3+FLOW!AJ2", 
      "=AK3+FLOW!AK2", 
      "=AL3+FLOW!AL2", 
      "=AM3+FLOW!AM2", 
      // //TOTALS
      // "=Y3+FLOW!AA2", //Y SPENT USD
      // "=ROUND(SUM(AB2:AX2),0)", //Z BALANCE USD
      // //USD VALUES
      // "", //AA DATE
      // "=B2*CURRENCY!B2", //AB USDT value
      // "=C2*CURRENCY!C2", //AC TON $ value
      // "=D2*CURRENCY!D2", //AD BTC $ value
      // "=E2*CURRENCY!E2", //AE ETH $ value
      // "=F2*CURRENCY!F2", //AF DOGE $ value
      // "=G2*CURRENCY!G2*CURRENCY!C2", //AG TAN $ value
      // "=H2*CURRENCY!H2", //AMBR $ value
      // "=I2*CURRENCY!I2", //GLINT $ value
      // "=J2*CURRENCY!J2", //JETTON $ value
      // "=K2*CURRENCY!K2", //LAVE $ value
      // "=L2*CURRENCY!L2", //PUNK $ value
      // "=M2*CURRENCY!M2", //RAFF $ value
      // "=N2*CURRENCY!N2", //JWBTC $ value
      // "=O2*CURRENCY!O2", //TSTON $ value
      // "=P2*CURRENCY!P2", //jUSDT $ value
      // "=Q2*CURRENCY!Q2", //KINGY $ value
      // "=R2*CURRENCY!R2", //SCALE $ value
      // "=S2*CURRENCY!S2", //ARBUZ $ value
      // "=T2*CURRENCY!T2", //TONNEL $ value
      // "=U2*CURRENCY!U2", //DFC $ value
      // "=V2*CURRENCY!V2", //LP $ value
      // "=W2*CURRENCY!W2", //Dogwifhoodie $ value
      // "=X2*CURRENCY!X2", //FISH $ value
    ],
  ]);

  //direct shitcoins values
  //const range = tab.getRange("AH2");
  //const numColumns = shitCoinsValues.length;
  //const convertedValues = shitCoinsValues.map(value => parseFloat(value.replace('$', '')));
  //range.offset(0, 0, 1, numColumns).setValues([convertedValues.slice(0, numColumns)]);

  //add today
  tab.getRange("A2").setValue(formatDate(new Date()));
}

function updateUSDHISTORYtab(tab) {
  //add new row
  tab.insertRowAfter(1);

  //add today
  tab.getRange("A2").setValue(formatDate(new Date()));

  //add history
  tab.getRange("B2:AM2").setFormulas([
    [
      "=B2*CURRENCY!B2", //AB USDT value
      "=C2*CURRENCY!C2", //AC TON $ value
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
      "=U2*CURRENCY!U2", //DFC $ value
      "=V2*CURRENCY!V2", //LP $ value
      "=W2*CURRENCY!W2", //Dogwifhoodie $ value
      "=X2*CURRENCY!X2", //FISH $ value
      "=Y2*CURRENCY!Y2", 
      "=Z2*CURRENCY!Z2", 
      "=AA2*CURRENCY!AA2", //[SPENT USD]
      "=AB2*CURRENCY!AB2", 
      "=AC2*CURRENCY!AC2", 
      "=AD2*CURRENCY!AD2", 
      "=AE2*CURRENCY!AE2", 
      "=AF2*CURRENCY!AF2", 
      "=AG2*CURRENCY!AG2", 
      "=AH2*CURRENCY!AH2", 
      "=AI2*CURRENCY!AI2", 
      "=AJ2*CURRENCY!AJ2", 
      "=AK2*CURRENCY!AK2", 
      "=AL2*CURRENCY!AL2", 
      "=AM2*CURRENCY!AM2", 
    ],
  ]);
}

function updateLOGBOOKtab(tab) {
  tab.insertRowAfter(1);
  tab.getRange("A2").setValue(formatDate(new Date()));
  tab.getRange("B2:D2").setFormulas([
    [
      "=B3+FLOW!AA2", //SPENT USD
      "=ROUND(SUM($HISTORY!B2:$HISTORY!AM2),0)", //BALANCE USD
      "=ROUND(100-(C3/C2 *100),2)/100", 
    ],
  ]);
}
