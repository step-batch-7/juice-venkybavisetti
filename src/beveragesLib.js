const fs = require("fs");

const performAction = function(action, args) {
  const actions = { "--save": save, "--query": query };
  return actions[action](args);
};

const generateTransactionRecord = function(input) {
  return {
    empId: +input[0],
    beverage: input[1],
    qty: input[2],
    date: new Date().toJSON()
  };
};

const getDataInObject = function() {
  const data = fs.readFileSync("./transactionsData.json", "utf8");
  const dataObj = JSON.parse(data);

  return dataObj;
};

const putDatainFile = function(object) {
  const dataAsString = JSON.stringify(object);

  fs.writeFileSync("./transactionsData.json", dataAsString, "utf8");
};

const save = function(args) {
  let record = {};
  if (isFilePresent("./transactionsData.json")) {
    record = getDataInObject();
  }
  const recordKeys = Object.keys(record);
  const empId = args[0];
  const newRecord = generateTransactionRecord(args);
  if (recordKeys.includes(empId)) {
    record[empId].push(newRecord);
  } else {
    record[empId] = [newRecord];
  }
  const tableColumns = Object.keys(newRecord);
  const tableValues = Object.values(newRecord);
  putDatainFile(record);
  return "Transaction Recorded:\n" + tableColumns + "\n" + tableValues;
};
const query = function(args) {
  return 0;
};

const isFilePresent = function(filename) {
  return fs.existsSync(filename);
};

exports.isFilePresent = isFilePresent;
exports.query = query;
exports.save = save;
exports.performAction = performAction;
exports.generateTransactionRecord = generateTransactionRecord;
exports.getDataInObject = getDataInObject;
exports.putDatainFile = putDatainFile;
