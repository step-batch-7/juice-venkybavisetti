const fs = require("fs");
const validateInput = require("./validateInputs.js");
const utilities = require("./utilities.js");
const saveAction = require("./saveAction.js").saveAction;
const queryAction = require("./queryAction.js").queryAction;

const reducerForBeverages = function(totalBeverages, obj) {
  return totalBeverages + parseInt(obj["qty"]);
};

const getTotalBeverages = function(empTransactions) {
  return empTransactions.reduce(reducerForBeverages, 0);
};

const generateQueryTransactionMsg = function(empTransactions) {
  const totalBeverages = getTotalBeverages(empTransactions);
  const headings = "Employee ID, Beverage, Quantity, Date";
  const fields = empTransactions.map(function(obj) {
    return Object.values(obj);
  });
  return (
    headings + "\n" + fields.join("\n") + "\nTotal Beverages: " + totalBeverages
  );
};

const generateSavedTransactionMsg = function(newTransactionRecord) {
  const headings = "Employee ID,Beverage,Quantity,Date";
  const fields = Object.values(newTransactionRecord);
  return "Transaction Recorded:\n" + headings + "\n" + fields;
};

const convertIntoMsg = function(args, dataInObjects) {
  const actions = {
    "--save": generateSavedTransactionMsg,
    "--query": generateQueryTransactionMsg
  };
  const indexOfAction = utilities.getIndexOfAction(args);
  return actions[args[indexOfAction]](dataInObjects);
};

const performAction = function(
  path,
  readFile,
  args,
  exitsFile,
  writeFile,
  timeStamp
) {
  const actions = { "--save": saveAction, "--query": queryAction };
  const indexOfAction = utilities.getIndexOfAction(args);
  return actions[args[indexOfAction]](
    path,
    readFile,
    args,
    exitsFile,
    writeFile,
    timeStamp
  );
};

const message = function(
  path,
  readFile,
  args,
  exitsFile,
  writeFile,
  timeStamp
) {
  if (!validateInput.isValidInput(args)) {
    return utilities.helpMsg();
  }
  dataInObjects = performAction(
    path,
    readFile,
    args,
    exitsFile,
    writeFile,
    timeStamp
  );
  const convertedMsg = convertIntoMsg(args, dataInObjects);
  return convertedMsg;
};

exports.message = message;
exports.performAction = performAction;
exports.convertIntoMsg = convertIntoMsg;
exports.generateSavedTransactionMsg = generateSavedTransactionMsg;
exports.generateQueryTransactionMsg = generateQueryTransactionMsg;
exports.getTotalBeverages = getTotalBeverages;
exports.reducerForBeverages = reducerForBeverages;
