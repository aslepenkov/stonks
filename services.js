TONAPI_API_TOKEN =
  PropertiesService.getScriptProperties().getProperty("TONAPI_API_TOKEN");

TOKENS = [
  "EQCcLAW537KnRg_aSPrnQJoyYjOZkzqYp6FVmRUvN1crSazV", //AMBRA
  "EQCBdxpECfEPH2wUxi1a6QiOkSf-5qDjUWqLCUuKtD-GLINT", //GLINT
  "EQAQXlWJvGbbFfE8F3oS8s87lIgdovS455IsWFaRdmJetTon", //JETTON
  "EQBl3gg6AAdjgjO2ZoNU5Q5EzUIl8XMNZrix8Z5dJmkHUfxI", //LAVE
  "EQCdpz6QhJtDtm2s9-krV2ygl45Pwl-KJJCV1-XrP-Xuuxoq", //PUNK
  "EQCJbp0kBpPwPoBG-U5C-cWfP_jnksvotGfArPF50Q9Qiv9h", //RAFF
  "EQDcBkGHmC4pTf34x3Gm05XvepO5w60DNxZ-XT4I6-UGG5L5", //jWBTC
  "EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav", //tsTON
  "EQBynBO23ywHy_CgarY9NK9FTz0yDsG82PtcbSTQgGoXwiuA", //jUSDT
  "EQC-tdRjjoYMz3MXKW4pj95bNZgvRyWwZ23Jix3ph7guvHxJ", //KINGY
  "EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE", //SCALE
  "EQAM2KWDp9lN0YvxvfSbI0ryjBXwM70rakpNIHbuETatRWA1", //ARBUZ
  "EQDNDv54v_TEU5t26rFykylsdPQsv5nsSZaH_v7JSJPtMitv", //TONNEL
];

function debugServices() {
  const functions = Object.getOwnPropertyNames(this).filter(
    (name) =>
      typeof this[name] === "function" &&
      (name.includes("parse") || name.includes("fetch"))
  );

  functions.forEach((funcName) => {
    const result = this[funcName]();
    Logger.log(`${funcName}: {result}`);
  });
}

function fetchTonShitCoinsPrices() {
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

function fetchTonPrice() {
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

function fetchETHPrice() {
  try {
    const response = UrlFetchApp.fetch("https://cryptoprices.cc/ETH/");
    const usdPrice = response;

    return parseInt(usdPrice).toFixed();
  } catch {
    return 0;
  }
}

function fetchDogePrice() {
  try {
    const response = UrlFetchApp.fetch("https://cryptoprices.cc/DOGE/");
    const usdPrice = response;

    return parseFloat(usdPrice).toFixed(3);
  } catch {
    return 0;
  }
}

function fetchBTCPrice() {
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

function parseTANPrice() {
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

function fetchTonShitCoinsPrices() {
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

function parseTonViewerShitCoinsValues() {
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
