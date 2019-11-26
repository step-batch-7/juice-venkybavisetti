const isNumber = function(num) {
  return Number.isInteger(+num);
};

const timeStamp = function() {
  return new Date().toJSON();
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

exports.isNumber = isNumber;
exports.timeStamp = timeStamp;
exports.helpMsg = helpMsg;
exports.getIndexOfAction = getIndexOfAction;
