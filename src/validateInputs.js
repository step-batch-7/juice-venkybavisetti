const isValidInput = function(args) {
  const validateAction = {
    "--save": validateSave,
    "--query": validateQuery,
    undefined: invalidInput
  };
  const index = getIndexOfAction(args);
  return validateAction[args[index]](args);
};

const invalidInput = function() {
  return false;
};

const getIndexOfAction = function(args) {
  let exorArgs = args.includes("--save") && args.includes("--query");
  if (exorArgs) {
    return -1;
  }
  return (args.indexOf("--save") + 1 || args.indexOf("--query") + 1) - 1;
};

const validateSave = function(args) {
  const indOfEID = args.indexOf("--empId") + 1;
  const indOfQty = args.indexOf("--qty") + 1;
  const indOfBev = args.indexOf("--beverage") + 1;
  return (
    isNumber(args[indOfEID]) &&
    isNumber(args[indOfQty]) &&
    !isNumber(args[indOfBev])
  );
};

const isNumber = function(num) {
  return Number.isInteger(+num);
};

const validateQuery = function(args) {
  if (args.length == 3) {
    let index = args.indexOf("--empId");
    return isNumber(args[index + 1]);
  }
  return false;
};

exports.isValidInput = isValidInput;
exports.invalidInput = invalidInput;
exports.getIndexOfAction = getIndexOfAction;
exports.validateSave = validateSave;
exports.validateQuery = validateQuery;
exports.isNumber = isNumber;
