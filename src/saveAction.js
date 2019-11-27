const updateTransactionFile = function(path, writeFile, transactionRecords) {
  const recordString = JSON.stringify(transactionRecords);
  writeFile(path, recordString, "utf8");
};

const updatePreviousTransactionRecords = function(
  args,
  previousTransactionRecords,
  newTransactionRecord
) {
  const recordKeys = Object.keys(previousTransactionRecords);
  const empIdNumIndex = args.indexOf("--empId") + 1;
  const empIdNum = args[empIdNumIndex];
  if (recordKeys.includes(empIdNum)) {
    previousTransactionRecords[empIdNum].push(newTransactionRecord);
  } else {
    previousTransactionRecords[empIdNum] = [newTransactionRecord];
  }
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

const getPreviousTransactionRecords = function(path, readFile, exitsFile) {
  let transactionRecords = {};
  if (exitsFile(path, "utf8")) {
    const data = readFile(path, "utf8");
    transactionRecords = JSON.parse(data);
  }
  return transactionRecords;
};

const saveAction = function(
  path,
  readFile,
  args,
  exitsFile,
  writeFile,
  timeStamp
) {
  let previousTransactionRecords = getPreviousTransactionRecords(
    path,
    readFile,
    exitsFile
  );
  const newTransactionRecord = generateTransactionRecord(args, timeStamp);
  const updatedTransactionRecords = updatePreviousTransactionRecords(
    args,
    previousTransactionRecords,
    newTransactionRecord
  );
  updateTransactionFile(path, writeFile, updatedTransactionRecords);
  return newTransactionRecord;
};

exports.saveAction = saveAction;
exports.getPreviousTransactionRecords = getPreviousTransactionRecords;
exports.generateTransactionRecord = generateTransactionRecord;
exports.updatePreviousTransactionRecords = updatePreviousTransactionRecords;
exports.updateTransactionFile = updateTransactionFile;
