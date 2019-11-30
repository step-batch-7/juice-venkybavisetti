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

const getPreviousTransactionRecords = function(path, readFile) {
  const data = readFile(path, "utf8");
  transactionRecords = JSON.parse(data);
  return transactionRecords;
};

const queryAction = function(path, readFile, args) {
  const previousTransactionRecords = getPreviousTransactionRecords(
    path,
    readFile
  );
  const empTransactions = getEmpTransactions(args, previousTransactionRecords);
  const dateOfTransactions = getDateOfTransactions(args, empTransactions);
  return dateOfTransactions;
};

exports.queryAction = queryAction;
exports.getPreviousTransactionRecords = getPreviousTransactionRecords;
exports.getEmpTransactions = getEmpTransactions;
exports.getDateOfTransactions = getDateOfTransactions;
exports.filterReqTxns = filterReqTxns;
