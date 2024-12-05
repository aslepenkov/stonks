function sendStonksChartCommand() {
  if (!dashboardTab) return;
  if (!logbookTab) return;
  if (!currencyTab) return;

  let charts = dashboardTab.getCharts();
  let spentUSD = Math.round(logbookTab.getRange("B2").getValue());
  let balanceUSD = Math.round(logbookTab.getRange("C2").getValue());

  let winRate = -Number(100 - (+balanceUSD / +spentUSD) * 100).toFixed(2);
  let win = balanceUSD > spentUSD ? `🟩 +${winRate}` : `🟥 ${winRate}`;

  let currTan = Math.round(currencyTab.getRange("C2").getValue());
  let currBTC = Math.round(currencyTab.getRange("D2").getValue());
  let currETH = Math.round(currencyTab.getRange("E2").getValue());
  let currTon = currencyTab.getRange("F2").getValue();

  let media = [
    {
      type: "photo",
      media: "attach://chart1",
      parse_mode: "Markdown",
      caption: `*$${balanceUSD} ${win}%*
TON: ${currTon}
BTC: ${currBTC}
ETH: ${currETH}
TAN: ${currTan}`,
    },
    {
      type: "photo",
      media: "attach://chart2",
    },
  ];
  let mediaStr = JSON.stringify(media);

  let formData = {
    chat_id: `${TELEGRAM_CHAT_ID}`,
    message_thread_id: `${MSG_THREAD}`,
    media: mediaStr,
    chart1: charts[0].getAs("image/png"),
    chart2: charts[2].getAs("image/png"),
  };
  let options = {
    method: "post",
    payload: formData,
  };

  UrlFetchApp.fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup`,
    options
  );
}
