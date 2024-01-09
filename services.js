const TONAPI_API_TOKEN =
  PropertiesService.getScriptProperties().getProperty("TONAPI_API_TOKEN");
const TON_ADDRESS =
  PropertiesService.getScriptProperties().getProperty("TON_ADDRESS");

function serviceFetchTonShitCoinsPrices() {
  try {
    const headers = {
      Authorization: "Bearer " + TONAPI_API_TOKEN,
    };

    const options = {
      headers: headers,
    };

    const tokensQueryParam = TOKENS.join("%2C");
    const apiUrl = `https://tonapi.io/v2/rates?tokens=${tokensQueryParam}&currencies=usd`;
    const response = UrlFetchApp.fetch(apiUrl, options);
    const content = JSON.parse(response.getContentText());

    const usdPrices = TOKENS.map((token) => content.rates[token].prices.USD);
    //console.log(usdPrices)
    return usdPrices;
  } catch (error) {
    return Array(TOKENS.length).fill(0);
  }
}

function serviceFetchTonPrice() {
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

function serviceParseTonViewerShitCoinsValues() {
  try {
    const url = `https://tonviewer.com/${TON_ADDRESS}?section=tokens`;
    let html = UrlFetchApp.fetch(url).getContentText();
    html = removeSVGandIMG(html);

    const tableStartIndex = html.indexOf("Methods") ?? 0;
    const tableEndIndex = html.indexOf("Privacy") ?? html.length;

    let subString = html.substring(tableStartIndex, tableEndIndex);
    subString = subString.substring(
      subString.indexOf("<div class") ?? 0,
      subString.indexOf("<a href") ?? subString.length
    );

    const tokens = extractTokenNames(subString);

    //console.log(tokens)
    const sortedKeys = Object.keys(tokens).sort();
    const keysArray = sortedKeys.map((key) => key);
    const valuesArray = sortedKeys.map((key) => tokens[key]);

    console.log(keysArray);
    console.log(valuesArray);

    return valuesArray;
  } catch (error) {
    return 0;
  }
}
