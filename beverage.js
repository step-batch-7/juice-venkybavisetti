const fs = require("fs");
const performAction = require("./src/performAction.js");
const { timeStamp, getDataStorePath } = require("./src/config");

const main = function() {
  const args = process.argv.slice(2);
  const path = getDataStorePath(process.env);
  const readFile = fs.readFileSync;
  const existsFile = fs.existsSync;
  const writeFile = fs.writeFileSync;
  const timeStampWithEnv = timeStamp.bind(null, process.env);
  const parameters = {
    args: args,
    path: path,
    existsFile: existsFile,
    readFile: readFile,
    writeFile: writeFile,
    timeStamp: timeStampWithEnv
  };
  const displayMsg = performAction.message(parameters);
  console.log(displayMsg);
};

main();
