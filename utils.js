var gcl = (columnNumber) => {
  let temp, letter = '';
  while (columnNumber > 0) {
    temp = (columnNumber - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    columnNumber = (columnNumber - temp - 1) / 26;
  }
  return letter;
}

var newColumnsIndexes = (newLst, old) =>
  newLst
    .map(j => old.indexOf(j) === -1 ? newLst.indexOf(j) : undefined)
    .filter(i => i !== undefined)
    .map(i => startIndex + i);


var dailyAutofill = () => autofill(true);
var hourlyAutofill = () => autofill(false);