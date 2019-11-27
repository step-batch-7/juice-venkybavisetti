const getEmpTransactions = function(args, previousTransactionRecords) {
  const indexOfEmpIdNum = args.indexOf("--empId") + 1;
  const empIdNum = args[indexOfEmpIdNum];
  return previousTransactionRecords[empIdNum];
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
  return empTransactions;
};

exports.queryAction = queryAction;
exports.getPreviousTransactionRecords = getPreviousTransactionRecords;
exports.getEmpTransactions = getEmpTransactions;
