const isNumber = function(num) {
  return Number.isInteger(+num);
};

const timeStamp = function() {
  return process.env.NOW || new Date().toJSON();
};

const getIndexOfAction = function(args) {
  let exorArgs = args.includes("--save") && args.includes("--query");
  if (exorArgs) {
    return -1;
  }
  return (args.indexOf("--save") + 1 || args.indexOf("--query") + 1) - 1;
};

const helpMsg = function() {
  return "please enter valid input";
};

const getPreviousTransactionRecords = function(path, readFile, exitsFile) {
  let transactionRecords = [];
  if (exitsFile(path, "utf8")) {
    const data = readFile(path, "utf8");
    transactionRecords = JSON.parse(data);
  }
  return transactionRecords;
};

exports.isNumber = isNumber;
exports.timeStamp = timeStamp;
exports.helpMsg = helpMsg;
exports.getIndexOfAction = getIndexOfAction;
exports.getPreviousTransactionRecords = getPreviousTransactionRecords;
