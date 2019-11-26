const saveAction = function(
  path,
  readFile,
  args,
  exitsFile,
  writeFile,
  timeStamp
) {
  let record = {};
  if (exitsFile(path, "utf8")) {
    const data = readFile(path, "utf8");
    record = JSON.parse(data);
  }
  const recordKeys = Object.keys(record);
  const empIdIndex = args.indexOf("--empId") + 1;
  const empId = args[empIdIndex];
  const newRecord = generateTransactionRecord(args, timeStamp);
  if (recordKeys.includes(empId)) {
    record[empId].push(newRecord);
  } else {
    record[empId] = [newRecord];
  }
  const tableColumns = Object.keys(newRecord);
  const tableValues = Object.values(newRecord);
  const recordString = JSON.stringify(record);
  writeFile(path, recordString, "utf8");
  return "Transaction Recorded:\n" + tableColumns + "\n" + tableValues;
};

const generateTransactionRecord = function(input, timeStamp) {
  const empIdIndex = input.indexOf("--empId") + 1;
  const beverageIndex = input.indexOf("--beverage") + 1;
  const qtyIndex = input.indexOf("--qty") + 1;
  return {
    "Employee Id": +input[empIdIndex],
    Beverage: input[beverageIndex],
    Quantity: +input[qtyIndex],
    Date: timeStamp()
  };
};

exports.saveAction = saveAction;
exports.generateTransactionRecord = generateTransactionRecord;
