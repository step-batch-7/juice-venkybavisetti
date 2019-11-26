const performAction = require("./src/performAction.js");
const utilities = require("./src/utilities.js");
const fs = require("fs");

const main = function() {
  const args = process.argv.slice(2);
  const path = "./src/transactionsData.json";
  const timeStamp = utilities.timeStamp;
  const readFile = fs.readFileSync;
  const exitsFile = fs.existsSync;
  const writeFile = fs.writeFileSync;
  const displayMsg = performAction.message(
    path,
    readFile,
    args,
    exitsFile,
    writeFile,
    timeStamp
  );
  console.log(displayMsg);
};

main();
