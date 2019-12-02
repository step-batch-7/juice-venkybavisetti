const utilities = require("./utilities");

const invalidInput = function() {
  return false;
};

const getQuerryArgsPaired = function(args) {
  extractPairedArgs = args.reduce(reducer, [[]]);
  return extractPairedArgs;
};

const reducer = function(context, element) {
  const indexOfLastArray = context.length - 1;
  const lengthOfLastArray = context.slice(-1)[0].length;
  if (2 == lengthOfLastArray) {
    context.push([element]);
    return context;
  }
  context[indexOfLastArray].push(element);
  return context;
};

const validateEmpId = function(id) {
  return utilities.isNumber(id);
};

const validateDate = function(date) {
  const dateInNum = date.split("-");
  return dateInNum.every(utilities.isNumber);
};

const validateBeverage = function(beverage) {
  const splitedBeverage = beverage.split("");
  return splitedBeverage.every(element => element.match(/[a-z]/i));
};

const predicate = function(element) {
  let result = false;
  const key = element[0];
  const value = element[1];
  const validater = {
    "--empId": validateEmpId,
    "--date": validateDate,
    "--beverage": validateBeverage
  };
  if (["--empId", "--date", "--beverage"].includes(key)) {
    result = validater[key](value);
  }
  return result;
};

const validateQuery = function(args) {
  queryPairedArgs = getQuerryArgsPaired(args.slice(1));
  return queryPairedArgs.every(predicate);
};

const validateSave = function(args) {
  const indOfEID = args.indexOf("--empId") + 1;
  const indOfQty = args.indexOf("--qty") + 1;
  const indOfBev = args.indexOf("--beverage") + 1;
  return (
    utilities.isNumber(args[indOfEID]) &&
    utilities.isNumber(args[indOfQty]) &&
    !utilities.isNumber(args[indOfBev])
  );
};

const isValidInput = function(args) {
  const validateAction = {
    "--save": validateSave,
    "--query": validateQuery,
    undefined: invalidInput
  };
  const indexOfAction = utilities.getIndexOfAction(args);
  const saveOrQuery = args[indexOfAction];
  return validateAction[saveOrQuery](args);
};

exports.isValidInput = isValidInput;
exports.validateSave = validateSave;
exports.validateQuery = validateQuery;
exports.invalidInput = invalidInput;
