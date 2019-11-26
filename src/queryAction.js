const queryAction = function(path, readFile, args) {
  const previousTransactionRecords = getPreviousTransactionRecords(
    path,
    readFile
  );
  const empTransactions = getEmpTransactions(args, previousTransactionRecords);
  const totalBeverages = getTotalBeverages(empTransactions);
  const headings = Object.keys(empTransactions[0]);
  const fields = empTransactions.map(function(obj) {
    return Object.values(obj);
  });
  return (
    headings + "\n" + fields.join("\n") + "\nTotal Beverages: " + totalBeverages
  );
};

const getTotalBeverages = function(empTransactions) {
  return empTransactions.reduce(reducerForBeverages, 0);
};

const reducerForBeverages = function(totalBeverages, obj) {
  return totalBeverages + parseInt(obj["Quantity"]);
};

const getEmpTransactions = function(args, previousTransactionRecords) {
  const indexOfEmpIdNum = args.indexOf("--empId") + 1;
  const employeeID = args[indexOfEmpIdNum];
  return previousTransactionRecords[employeeID];
};

const getPreviousTransactionRecords = function(path, readFile) {
  const data = readFile(path, "utf8");
  transactionRecords = JSON.parse(data);
  return transactionRecords;
};

exports.queryAction = queryAction;
