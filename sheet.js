function autofill(daily = false) {
  let symbols = [];
  let balances = [];
  let prices = [];

  let usdHistoryTabFormulas = [];
  let usdHistoryHeaderFormulas = [];
  let historyHeaderFormulas = [];

  const jettonsBalances = serviceFetchJettonsBalances();
  const maxLetter = gcl(startIndex + jettonsBalances.length - 1);

  jettonsBalances.forEach((jb, index) => {
    symbols.push(jb.symbol);
    balances.push(jb.balance);
    prices.push(jb.price);

    //generate common formulas
    index += startIndex;
    let column = gcl(index);

    usdHistoryTabFormulas.push(
      `=${historyTabName}!${column}2*${currencyTabName}!${column}2`
    );

    historyHeaderFormulas.push(`=${currencyTabName}!${column}1`);
    usdHistoryHeaderFormulas.push(
      `=CONCAT("$",${currencyTabName}!${column}1)`
    );
  });

  //MAYBE NEW JETTONS? ADD NEW COLUMNS
  const jettonsInPortfolio = currencyTab
    .getRange(`${gcl(startIndex)}1:${gcl(maxLetter)}1`)
    .getValues()[0]
    .filter((value) => value !== "");

  console.log(jettonsInPortfolio);
  const newColumnIdx = newColumnsIndexes(symbols, jettonsInPortfolio);
  console.log(newColumnIdx);
  newColumnIdx.forEach((c) => {
    console.log(c);
    currencyTab.insertColumnBefore(c);
    historyTab.insertColumnBefore(c);
    usdHistoryTab.insertColumnBefore(c);
  });

  fillCurrencyTab(maxLetter, symbols, prices, daily);
  fillHistoryTab(maxLetter, balances, historyHeaderFormulas, daily);
  fillUSDHistoryTab(
    maxLetter,
    usdHistoryTabFormulas,
    usdHistoryHeaderFormulas,
    daily
  );

  if (!daily) return;

  // once in a day
  updateLOGBOOKtab(maxLetter);
  sendStonksChartCommand();
}

function fillCurrencyTab(maxLetter, symbols, prices, daily) {
  //set jettons symbols
  currencyTab.getRange(`G1:${maxLetter}1`).setValues([symbols]);

  let tonPrice = serviceFetchTONPrice();
  let btcPrice = serviceFetchBTCPrice();
  let ethPrice = serviceFetchETHPrice();
  let tanPrice = serviceParseTANPrice();

  if (daily) {
    currencyTab.insertRowAfter(1);
    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    currencyTab.getRange("A2").setValues([[`${formattedDate}`]]);
  }

  //fixed + jettons. jettons count is variable
  let arr = [tanPrice, btcPrice, ethPrice, tonPrice, ...prices];
  currencyTab.getRange(`C2:${maxLetter}2`).setValues([arr]);
}

function fillHistoryTab(maxLetter, balances, historyHeaderFormulas, daily) {
  let tonBalance = serviceFetchTONBalance();

  if (daily) {
    historyTab.insertRowAfter(1);
    historyTab.getRange("A2:E2").setFormulas([
      [
        `=${currencyTabName}!A2`, //DATE
        "", //SPENT USD ENTER HERE
        "=C3", //TAN
        "=D3", //BTC
        "=E3", //ETH
      ],
    ]);
  }

  //ton + jettons.jettons count is variable
  let arr = [tonBalance, ...balances];
  historyTab.getRange(`F2:${maxLetter}2`).setValues([arr]);
  historyTab.getRange(`G1:${maxLetter}1`).setValues([historyHeaderFormulas]);
}

function fillUSDHistoryTab(
  maxLetter,
  usdHistoryTabFormulas,
  usdHistoryHeaderFormulas,
  daily
) {
  if (daily) {
    usdHistoryTab.insertRowAfter(1);

    //fixed columns
    usdHistoryTab.getRange(`A2:F2`).setFormulas([
      [
        `=${currencyTabName}!A2`, //DATE
        `=SUM(C2:${maxLetter}2)`, //TOTAL SUM
        `=${historyTabName}!C2*${currencyTabName}!C2*${currencyTabName}!F2`, //TAN
        `=${historyTabName}!D2*${currencyTabName}!D2`, //BTC
        `=${historyTabName}!E2*${currencyTabName}!E2`, //ETH
        `=${historyTabName}!F2*${currencyTabName}!F2`, //TON
      ],
    ]);
  }

  //jettons count is variable
  usdHistoryTab
    .getRange(`G2:${maxLetter}2`)
    .setFormulas([[...usdHistoryTabFormulas]]);

  usdHistoryTab
    .getRange(`G1:${maxLetter}1`)
    .setValues([usdHistoryHeaderFormulas]);
}

function updateLOGBOOKtab(maxLetter) {
  logbookTab.insertRowAfter(1);
  logbookTab.getRange("A2:D2").setFormulas([
    [
      `=${currencyTabName}!A2`, //DATE
      `=B3+${historyTabName}!B2`, //SPENT USD
      `=ROUND(SUM(${usdHistoryTabName}!C2:${maxLetter}2),0)`, //BALANCE USD
      `=ROUND(100-(C3/C2 *100),2)/100`, //DAILY GAIN
    ],
  ]);
}
