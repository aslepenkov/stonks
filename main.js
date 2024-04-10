function mainStonksDailyFunction(hourly = false) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let currencyTab = ss.getSheetByName("CURRENCY");
  let flowTab = ss.getSheetByName("FLOW");
  let historyTab = ss.getSheetByName("HISTORY");
  let usdHistoryTab = ss.getSheetByName("$HISTORY");
  let logbookTab = ss.getSheetByName("LOGBOOK");

  //currency
  updateCURRENCYtab(currencyTab, hourly);

  if (hourly) return;

  //flow
  updateFLOWtab(flowTab);

  //history
  updateHISTORYtab(historyTab);

  //usdhistory
  updateUSDHISTORYtab(usdHistoryTab);

  //logbook
  updateLOGBOOKtab(logbookTab);

  //send chart
  sendStonksChartCommand();
}

function updateCURRENCYtab(tab, hourly = false) {
  //add new row
  if (!hourly) tab.insertRowAfter(1);

  //add values
  const tonPrice = serviceFetchTonPrice();
  const btcPrice = serviceFetchBTCPrice();
  const ethPrice = serviceFetchETHPrice();
  const dogePrice = serviceFetchDogePrice();
  const shitCoinsPrices = serviceFetchTonShitCoinsPrices();
  const tanPrice = serviceParseTANPrice();

  let i = 0;

  if (!hourly) tab.getRange("A2").setValues([[formatDate(new Date())]]);

  tab.getRange("B2:AN2").setValues([
    [
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
      0, //[SPENT USD COLUMN]
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
      shitCoinsPrices[i++], //ANON
    ],
  ]);
}

function updateFLOWtab(tab) {
  //add new row
  tab.insertRowAfter(1);

  //add history
  tab.getRange("A2").setFormulas([["=CURRENCY!A2"]]);
}

function updateHISTORYtab(tab) {
  //add new row
  tab.insertRowAfter(1);

  //add history
  tab.getRange("A2:AN2").setFormulas([
    [
      "=CURRENCY!A2",
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
      "=0", //[SPENT USD]
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
      "=AN3+FLOW!AN2",
    ],
  ]);
}

function updateUSDHISTORYtab(tab) {
  //add new row
  tab.insertRowAfter(1);

  //add history
  tab.getRange("A2:AN2").setFormulas([
    [
      "=CURRENCY!A2",
      "=HISTORY!B2*CURRENCY!B2", //AB USDT value
      "=HISTORY!C2*CURRENCY!C2", //AC TON $ value
      "=HISTORY!D2*CURRENCY!D2", //AD BTC $ value
      "=HISTORY!E2*CURRENCY!E2", //AE ETH $ value
      "=HISTORY!F2*CURRENCY!F2", //AF DOGE $ value
      "=HISTORY!G2*CURRENCY!G2*CURRENCY!C2", //AG TAN $ value
      "=HISTORY!H2*CURRENCY!H2", //AMBR $ value
      "=HISTORY!I2*CURRENCY!I2", //GLINT $ value
      "=HISTORY!J2*CURRENCY!J2", //JETTON $ value
      "=HISTORY!K2*CURRENCY!K2", //LAVE $ value
      "=HISTORY!L2*CURRENCY!L2", //PUNK $ value
      "=HISTORY!M2*CURRENCY!M2", //RAFF $ value
      "=HISTORY!N2*CURRENCY!N2", //JWBTC $ value
      "=HISTORY!O2*CURRENCY!O2", //TSTON $ value
      "=HISTORY!P2*CURRENCY!P2", //jUSDT $ value
      "=HISTORY!Q2*CURRENCY!Q2", //KINGY $ value
      "=HISTORY!R2*CURRENCY!R2", //SCALE $ value
      "=HISTORY!S2*CURRENCY!S2", //ARBUZ $ value
      "=HISTORY!T2*CURRENCY!T2", //TONNEL $ value
      "=HISTORY!U2*CURRENCY!U2", //DFC $ value
      "=HISTORY!V2*CURRENCY!V2", //LP $ value
      "=HISTORY!W2*CURRENCY!W2", //Dogwifhoodie $ value
      "=HISTORY!X2*CURRENCY!X2", //FISH $ value
      "=HISTORY!Y2*CURRENCY!Y2",
      "=HISTORY!Z2*CURRENCY!Z2",
      "=0", //[SPENT USD]
      "=HISTORY!AB2*CURRENCY!AB2",
      "=HISTORY!AC2*CURRENCY!AC2",
      "=HISTORY!AD2*CURRENCY!AD2",
      "=HISTORY!AE2*CURRENCY!AE2",
      "=HISTORY!AF2*CURRENCY!AF2",
      "=HISTORY!AG2*CURRENCY!AG2",
      "=HISTORY!AH2*CURRENCY!AH2",
      "=HISTORY!AI2*CURRENCY!AI2",
      "=HISTORY!AJ2*CURRENCY!AJ2",
      "=HISTORY!AK2*CURRENCY!AK2",
      "=HISTORY!AL2*CURRENCY!AL2",
      "=HISTORY!AM2*CURRENCY!AM2",
      "=HISTORY!AN2*CURRENCY!AN2",
    ],
  ]);
}

function updateLOGBOOKtab(tab) {
  tab.insertRowAfter(1);
  tab.getRange("A2:D2").setFormulas([
    [
      "=CURRENCY!A2",
      "=B3+FLOW!AA2", //SPENT USD
      "=ROUND(SUM($HISTORY!B2:AN2),0)", //BALANCE USD
      "=ROUND(100-(C3/C2 *100),2)/100",
    ],
  ]);
}
