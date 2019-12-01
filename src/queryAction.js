const utilities = require("./utilities");

const getBeverageTransactions = function(args, dateOfTransactions) {
  if (!args.includes("--beverage")) return dateOfTransactions;
  const indxOfBvgValue = args.indexOf("--beverage") + 1;
  const bvgValue = args[indxOfBvgValue];
  let bvgDetails = ["beverage"];
  bvgDetails.push(bvgValue);
  return filterReqTxns(bvgDetails, dateOfTransactions);
};

const getDateOfTransactions = function(args, empTransactions) {
  if (!args.includes("--date")) return empTransactions;
  const indexOfDateNum = args.indexOf("--date") + 1;
  const dateValue = args[indexOfDateNum];
  return empTransactions.filter(
    object => object["date"].slice(0, 10) == dateValue
  );
};

const getEmpTransactions = function(args, previousTransactionRecords) {
  if (!args.includes("--empId")) return previousTransactionRecords;
  const indexOfEmpIdNum = args.indexOf("--empId") + 1;
  const empIdNum = args[indexOfEmpIdNum];
  let empDetails = ["empId"];
  empDetails.push(empIdNum);
  return filterReqTxns(empDetails, previousTransactionRecords);
};

const filterReqTxns = function(reqMatcher, txnRecords) {
  filteredTxns = txnRecords.filter(function(obj) {
    return obj[reqMatcher[0]] == reqMatcher[1];
  });
  return filteredTxns;
};

const queryAction = function(parameters) {
  const { path, existsFile, readFile, args } = parameters;
  const previousTransactionRecords = utilities.getPreviousTransactionRecords(
    path,
    readFile,
    existsFile
  );
  const empTransactions = getEmpTransactions(args, previousTransactionRecords);
  const dateOfTransactions = getDateOfTransactions(args, empTransactions);
  const beverageTransactions = getBeverageTransactions(
    args,
    dateOfTransactions
  );
  return beverageTransactions;
};

exports.queryAction = queryAction;
exports.getEmpTransactions = getEmpTransactions;
exports.getDateOfTransactions = getDateOfTransactions;
exports.filterReqTxns = filterReqTxns;
exports.getBeverageTransactions = getBeverageTransactions;
