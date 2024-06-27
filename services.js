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
    const symbolsSet = new Set();

    return content.balances.reduce((acc, i) => {
      const symbol = i.jetton.symbol.toUpperCase();
      if (!symbolsSet.has(symbol)) {
        symbolsSet.add(symbol);
        acc.push({
          balance: +i.balance * 10 ** -i.jetton.decimals,
          symbol: symbol,
          price: +i.price.prices.USD
        });
      }
      return acc;
    }, []).sort((a, b) => a.symbol.localeCompare(b.symbol));

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
    const url = "https://getgems.io/collection/EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N";
    const html = UrlFetchApp.fetch(url).getContentText();
    const floorPriceIndex = html.indexOf("floorPrice");
    const subString = html.substring(floorPriceIndex);
    const regex = /floorPrice":(\d+(\.\d+)?)/;
    const match = subString.match(regex);
    
    return match ? match[1] || 0 : 0;
  } catch (error) {
    return 0;
  }
}
