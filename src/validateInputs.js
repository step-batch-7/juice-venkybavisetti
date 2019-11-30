const utilities = require("./utilities");

const invalidInput = function() {
  return false;
};

const validateQuery = function(args) {
  if (args.length < 6) {
    let index = args.indexOf("--empId");
    return utilities.isNumber(args[index + 1]) || true;
  }
  return false;
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
  const index = utilities.getIndexOfAction(args);
  return validateAction[args[index]](args);
};

exports.isValidInput = isValidInput;
exports.validateSave = validateSave;
exports.validateQuery = validateQuery;
exports.invalidInput = invalidInput;
