function serviceFetchJettonsBalances() {
  try {
    const headers = {
      Authorization: "Bearer " + TONAPI_API_TOKEN,
    };

    const options = {
      headers: headers,
    };

    const apiUrl = `https://tonapi.io/v2/accounts/${TON_ACCOUNT_ID}/jettons?currencies=USD`;
    const response = UrlFetchApp.fetch(apiUrl, options);
    const content = JSON.parse(response.getContentText());

    return content.balances
      //.filter(i => +i.balance > 0)
      //.filter(i => +i.price.prices.USD > 0)
      .filter(i => i.jetton.symbol.toUpperCase() !== "LP")
      .filter(i => i.jetton.symbol.toUpperCase() !== "@BTC25")
      .filter(i => !i.jetton.symbol.toUpperCase().endsWith("-TON"))
      .filter(i => !i.jetton.symbol.toUpperCase().endsWith(" LP"))
      .map(i => ({
        balance: +i.balance * 10 ** -i.jetton.decimals,
        symbol: i.jetton.symbol.toUpperCase(),
        price: +i.price.prices.USD
      }))
      .sort((a, b) => a.symbol.localeCompare(b.symbol));

  } catch (error) {
    return [];
  }
}

function serviceFetchJettonPricesByTokensList(tokens) {
  try {
    const headers = {
      Authorization: "Bearer " + TONAPI_API_TOKEN,
    };

    const options = {
      headers: headers,
    };

    const tokensQueryParam = tokens.join("%2C");
    const apiUrl = `https://tonapi.io/v2/rates?tokens=${tokensQueryParam}&currencies=usd`;
    const response = UrlFetchApp.fetch(apiUrl, options);
    const content = JSON.parse(response.getContentText());

    const usdPrices = tokens.map((token) => content.rates[token].prices.USD);
    return usdPrices;
  } catch (error) {
    return Array(tokens.length).fill(0);
  }
}

function serviceFetchTONBalance() {
  try {
    const headers = {
      Authorization: "Bearer " + TONAPI_API_TOKEN,
    };

    const options = {
      headers: headers,
    };

    const apiUrl = `https://tonapi.io/v2/accounts/${TON_ACCOUNT_ID}`;
    const response = UrlFetchApp.fetch(apiUrl, options);
    const content = JSON.parse(response.getContentText());

    return content.balance * 10 ** -9;
  } catch (error) {
    return 0;
  }
}

function serviceFetchTONPrice() {
  try {
    const response = UrlFetchApp.fetch(
      "https://tonapi.io/v2/rates?tokens=ton&currencies=usd"
    );
    const content = JSON.parse(response.getContentText());
    const usdPrice = content.rates.TON.prices.USD;

    return usdPrice.toFixed(2);
  } catch {
    return 0;
  }
}

function serviceFetchETHPrice() {
  try {
    const response = UrlFetchApp.fetch("https://cryptoprices.cc/ETH/");
    const usdPrice = response;

    return parseInt(usdPrice).toFixed();
  } catch {
    return 0;
  }
}

function serviceFetchDogePrice() {
  try {
    const response = UrlFetchApp.fetch("https://cryptoprices.cc/DOGE/");
    const usdPrice = response;

    return parseFloat(usdPrice).toFixed(3);
  } catch {
    return 0;
  }
}

function serviceFetchBTCPrice() {
  try {
    const response = UrlFetchApp.fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    const content = JSON.parse(response.getContentText());
    const usdPrice = content.bpi.USD.rate;

    return parseInt(usdPrice.replace(",", "")).toFixed();
  } catch {
    return 0;
  }
}

function serviceParseTANPrice() {
  try {
    const url = "https://ton.diamonds/collection/anonymous-telegram-numbers";
    const html = UrlFetchApp.fetch(url).getContentText();
    const floorPriceIndex = html.indexOf("Floor price");
    const subString = html.substring(floorPriceIndex);
    const match = /(\d+\.?\d+\sTON)/.exec(subString);

    return match ? parseInt(match[1]).toFixed() || 0 : 0;
  } catch (error) {
    return 0;
  }
}
