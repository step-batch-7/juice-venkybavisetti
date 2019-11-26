const fs = require("fs");
const validateInput = require("./validateInputs.js");
const utilities = require("./utilities.js");
const saveAction = require("./saveAction.js").saveAction;
const queryAction = require("./queryAction.js").queryAction;

const message = function(
  path,
  readFile,
  args,
  exitsFile,
  writeFile,
  timeStamp
) {
  if (!validateInput.isValidInput(args)) {
    return utilities.helpMsg();
  }
  return performAction(path, readFile, args, exitsFile, writeFile, timeStamp);
};

const performAction = function(
  path,
  readFile,
  args,
  exitsFile,
  writeFile,
  timeStamp
) {
  const actions = { "--save": saveAction, "--query": queryAction };
  const indexOfAction = utilities.getIndexOfAction(args);
  return actions[args[indexOfAction]](
    path,
    readFile,
    args,
    exitsFile,
    writeFile,
    timeStamp
  );
};

exports.performAction = performAction;
exports.message = message;
