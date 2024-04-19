function autofill(daily = false) {
  let symbols = [];
  let balances = [];
  let prices = [];
  let usdHistoryTabFormulas = [];

  const jettonsBalances = serviceFetchJettonsBalances();
  const maxLetter = gcl(4 + 2 + jettonsBalances.length)

  jettonsBalances.forEach((jb, index) => {
    symbols.push(jb.symbol);
    balances.push(jb.balance);
    prices.push(jb.price);

    //generate common formulas
    index += startIndex
    usdHistoryTabFormulas.push(`=${historyTabName}!${gcl(index)}2*${currencyTabName}!${gcl(index)}2`)
  });

  //hourly + daily
  fillCurrencyTab(maxLetter, symbols, prices, daily)
  fillHistoryTab(maxLetter, balances, daily)
  fillUSDHistoryTab(maxLetter, usdHistoryTabFormulas, daily)

  if (!daily)
    return;

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
    const formattedDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

    currencyTab.getRange("A2").setValues([[`${formattedDate}`]]);
  }

  //fixed + jettons. jettons count is variable
  let arr = [tanPrice, btcPrice, ethPrice, tonPrice, ...prices]
  currencyTab.getRange(`C2:${maxLetter}2`).setValues([arr]);
}

function fillHistoryTab(maxLetter, balances, daily) {
  let tonBalance = serviceFetchTONBalance();

  if (daily) {
    historyTab.insertRowAfter(1);
    historyTab.getRange("A2:E2").setFormulas([
      [
        `=${currencyTabName}!A2`, //DATE
        '',//SPENT USD ENTER HERE 
        '=C3',  //TAN
        '=D3', //BTC
        '=E3', //ETH
      ],
    ]);
  }

  //ton + jettons.jettons count is variable
  let arr = [tonBalance, ...balances];
  historyTab.getRange(`F2:${maxLetter}2`).setValues([arr]);
}

function fillUSDHistoryTab(maxLetter, usdHistoryTabFormulas, daily) {
  if (daily) {
    usdHistoryTab.insertRowAfter(1);

    //fixed columns
    usdHistoryTab.getRange(`A2:F2`).setFormulas([[
      `=${currencyTabName}!A2`, //DATE
      `=SUM(C2:${maxLetter}2)`, //TOTAL SUM
      `=${historyTabName}!C2*${historyTabName}!C2*${currencyTabName}!F2`, //TAN
      `=${historyTabName}!D2*${historyTabName}!D2`, //BTC
      `=${historyTabName}!E2*${historyTabName}!E2`, //ETH
      `=${historyTabName}!F2*${historyTabName}!F2`, //TON
    ]])
  }

  //jettons count is variable
  usdHistoryTab.getRange(`G2:${maxLetter}2`).setFormulas([[...usdHistoryTabFormulas]]);
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
