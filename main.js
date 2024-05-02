const _ = SpreadsheetApp.getActiveSpreadsheet(); //GAS permissions workaround
const REPO_URL = "https://api.github.com/repos/aslepenkov/stonks/contents";
const GITHUB_API_KEY =
    PropertiesService.getScriptProperties().getProperty("GITHUB_API_KEY");
const options = {
    headers: {
        Authorization: `Bearer ${GITHUB_API_KEY}`,
    }
};

function main() {
    try {
        let response = UrlFetchApp.fetch(REPO_URL, options);
        let files = JSON.parse(response.getContentText());
        let today = new Date();

        let jsFiles = files.filter(function (file) {
            return file.type === "file" && file.name.endsWith(".js");
        });

        for (var i = 0; i < jsFiles.length; i++) {
            let file = jsFiles[i];
            let response = UrlFetchApp.fetch(file.download_url);
            if (response.getResponseCode() == 200) {
                let scriptContent = response.getContentText();
                scriptContent += " ";
                eval(scriptContent);
            }
        }
        let lastDate = new Date(`${currencyTab.getRange("A2").getValue()}`);

        if (isDate1GreaterThanDate2(today, lastDate)) {
            dailyAutofill()
        } else {
            hourlyAutofill()
        }
    }
    catch (e) {
        throw e;
    }
}