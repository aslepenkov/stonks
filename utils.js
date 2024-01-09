function copyTONPrice(tab) {
  return tab.getRange("M1").getValue();
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join("/");
}

// Function to remove all <svg> elements
function removeSVGandIMG(html) {
  const regex = /<svg[^>]*>[\s\S]*?<\/svg>|<img[^>]*>/gi;
  const cleanedHTML = html.replace(regex, "");
  return cleanedHTML;
}

function extractTokenNames(html) {
  const tokenNames = [];
  const tokenValues = {};
  const matches = html.match(/<div class="amount">(.*?)<\/div>/g);

  if (matches) {
    matches.forEach((match) => {
      const nameMatch = match.match(/<div class="amount">(.*?)<\/div>/);
      if (nameMatch && nameMatch[1]) {
        const tokenName = nameMatch[1].trim();
        tokenNames.push(tokenName);
      }
    });
  }

  tokenNames.forEach((token) => {
    const tokenIndex = html.indexOf(token);
    if (tokenIndex !== -1) {
      const valueStart = html.indexOf("$", tokenIndex); // Find the dollar sign after the token
      if (valueStart !== -1) {
        const valueEnd = html.indexOf("</div>", valueStart); // Find the end of the value
        if (valueEnd !== -1) {
          const value = html.substring(valueStart, valueEnd).trim(); // Extract the value substring
          tokenValues[token] = value;
        }
      }
    }
  });

  return tokenValues;
}

function extractValues(tokens, message) {
  const tokenValues = {};

  tokens.forEach((token) => {
    const tokenIndex = message.indexOf(token);
    if (tokenIndex !== -1) {
      const valueStart = message.indexOf("$", tokenIndex); // Find the dollar sign after the token
      if (valueStart !== -1) {
        const valueEnd = message.indexOf("</div>", valueStart); // Find the end of the value
        if (valueEnd !== -1) {
          const value = message.substring(valueStart, valueEnd).trim(); // Extract the value substring
          tokenValues[token] = value;
        }
      }
    }
  });

  return tokenValues;
}
