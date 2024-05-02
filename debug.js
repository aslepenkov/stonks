function debugCallAllServices() {
  const functions = Object.getOwnPropertyNames(this).filter(
    (name) =>
      typeof this[name] === "function" &&
      (name.toLowerCase().includes("parse") ||
        name.toLowerCase().includes("fetch")) &&
      name.startsWith("service")
  );

  functions.forEach((funcName) => {
    const result = this[funcName]();
    Logger.log(`${funcName}: {result}`);
  });
}

function deleteRow(really, ...tabs) {
  if (!really)
    return;

  tabs.forEach(tab => {
    tab.deleteRow(2);
  });
}