const validateInput = require("./validateInputs.js");
const utilities = require("./utilities.js");
const saveAction = require("./saveAction.js").saveAction;
const queryAction = require("./queryAction.js").queryAction;

const reducerForBeverages = function(totalBeverages, obj) {
  return totalBeverages + parseInt(obj.qty);
};

const getTotalBeverages = function(empTransactions) {
  return empTransactions.reduce(reducerForBeverages, 0);
};

const toRow = function(transaction) {
  return [
    transaction.empId,
    transaction.beverage,
    transaction.qty,
    transaction.date
  ].join(",");
};

const generateQueryTransactionMsg = function(empTransactions) {
  const totalBeverages = getTotalBeverages(empTransactions);
  const heading = "Employee ID, Beverage, Quantity, Date";
  const rows = empTransactions.map(toRow);
  return [heading, ...rows, `Total: ${totalBeverages} Juices`].join("\n");
};

const generateSavedTransactionMsg = function(newTransactionRecord) {
  const headings = "Employee ID,Beverage,Quantity,Date";
  const fields = [
    newTransactionRecord.empId,
    newTransactionRecord.beverage,
    newTransactionRecord.qty,
    newTransactionRecord.date.toJSON()
  ];
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

const performAction = function(parameters) {
  const { args } = parameters;
  const actions = { "--save": saveAction, "--query": queryAction };
  const indexOfAction = utilities.getIndexOfAction(args);
  return actions[args[indexOfAction]](parameters);
};

const message = function(parameters) {
  const { args } = parameters;
  if (!validateInput.isValidInput(args)) {
    return utilities.helpMsg();
  }
  dataInObjects = performAction(parameters);
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
