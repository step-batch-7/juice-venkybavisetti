const fs = require("fs");
const performAction = require("./src/performAction.js");
const { timeStamp, getDataStorePath } = require("./src/config");

const main = function() {
  const args = process.argv.slice(2);
  const path = getDataStorePath(process.env);
  const readFile = fs.readFileSync;
  const exitsFile = fs.existsSync;
  const writeFile = fs.writeFileSync;
  const timeStampWithEnv = timeStamp.bind(null, process.env);
  const displayMsg = performAction.message(
    path,
    readFile,
    args,
    exitsFile,
    writeFile,
    timeStampWithEnv
  );
  console.log(displayMsg);
};

main();
