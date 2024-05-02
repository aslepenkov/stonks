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

var isDate1GreaterThanDate2 = (date1, date2) => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return d1 > d2;
};

var dailyAutofill = () => autofill(true);
var hourlyAutofill = () => autofill(false);