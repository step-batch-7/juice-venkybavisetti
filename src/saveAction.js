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

const generateTransactionRecorded = function(input, timeStamp) {
  const indexOfEmpIdNum = input.indexOf("--empId") + 1;
  const indexOfBeverageJuice = input.indexOf("--beverage") + 1;
  const indexOfQtyNum = input.indexOf("--qty") + 1;
  return {
    "Employee Id": +input[indexOfEmpIdNum],
    Beverage: input[indexOfBeverageJuice],
    Quantity: +input[indexOfQtyNum],
    Date: timeStamp()
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
  const newTransactionRecord = generateTransactionRecorded(args, timeStamp);
  const updatedTransactionRecords = updatePreviousTransactionRecords(
    args,
    previousTransactionRecords,
    newTransactionRecord
  );
  updateTransactionFile(path, writeFile, updatedTransactionRecords);
  return newTransactionRecord;
};

exports.saveAction = saveAction;
exports.generateTransactionRecorded = generateTransactionRecorded;
exports.updatePreviousTransactionRecords = updatePreviousTransactionRecords;
exports.updateTransactionFile = updateTransactionFile;
