const utilities = require("./utilities");

const updateTransactionFile = function(path, writeFile, transactionRecords) {
  const recordString = JSON.stringify(transactionRecords);
  writeFile(path, recordString, "utf8");
};

const updatePreviousTransactionRecords = function(
  previousTransactionRecords,
  newTransactionRecord
) {
  previousTransactionRecords.push(newTransactionRecord);
  return previousTransactionRecords;
};

const generateTransactionRecord = function(args, timeStamp) {
  const indexOfEmpIdNum = args.indexOf("--empId") + 1;
  const indexOfBeverageJuice = args.indexOf("--beverage") + 1;
  const indexOfQtyNum = args.indexOf("--qty") + 1;
  return {
    empId: +args[indexOfEmpIdNum],
    beverage: args[indexOfBeverageJuice],
    qty: +args[indexOfQtyNum],
    date: timeStamp()
  };
};

const saveAction = function(
  path,
  readFile,
  args,
  exitsFile,
  writeFile,
  timeStamp
) {
  let previousTransactionRecords = utilities.getPreviousTransactionRecords(
    path,
    readFile,
    exitsFile
  );
  const newTransactionRecord = generateTransactionRecord(args, timeStamp);
  const updatedTransactionRecords = updatePreviousTransactionRecords(
    previousTransactionRecords,
    newTransactionRecord
  );
  updateTransactionFile(path, writeFile, updatedTransactionRecords);
  return newTransactionRecord;
};

exports.saveAction = saveAction;
exports.generateTransactionRecord = generateTransactionRecord;
exports.updatePreviousTransactionRecords = updatePreviousTransactionRecords;
exports.updateTransactionFile = updateTransactionFile;
