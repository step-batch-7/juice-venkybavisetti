const performAction = require("../src/performAction.js");
const fs = require("fs");
const assert = require("assert");
const utilities = require("../src/utilities.js");

describe("performAction", function() {
  it("should return saved transaction recorded  display", function() {
    const readFile = function(path, filetype) {
      return '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}';
    };
    const exitsFile = function(path, fileType) {
      return true;
    };
    const writeFile = function(path, record, fileType) {};
    const timeStamp = function() {
      return "2019-11-20T05:50:28.267Z";
    };
    const path = "./src/dataStorage";
    const args = [
      "--save",
      "--empId",
      "123",
      "--beverage",
      "org",
      "--qty",
      "9"
    ];
    const actual = performAction.performAction(
      path,
      readFile,
      args,
      exitsFile,
      writeFile,
      timeStamp
    );
    const expected = {
      "Employee Id": 123,
      Beverage: "org",
      Date: "2019-11-20T05:50:28.267Z",
      Quantity: 9
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should return query transactions details display", function() {
    const readFile = function(path, filetype) {
      return '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}';
    };
    const exitsFile = function(path, fileType) {
      return true;
    };
    const writeFile = function(path, record, fileType) {};
    const timeStamp = function() {
      return "2019-11-20T05:50:28.267Z";
    };
    const path = "./src/dataStorage";
    const args = ["--query", "--empId", "123"];
    const actual = performAction.performAction(
      path,
      readFile,
      args,
      exitsFile,
      writeFile,
      timeStamp
    );
    const expected = [
      {
        "Employee Id": 123,
        Beverage: "org",
        Date: "2019-11-20T05:50:28.267Z",
        Quantity: 4
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("message", function() {
  it("should return message from performAction", function() {
    const readFile = function(path, filetype) {
      return '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}';
    };
    const exitsFile = function(path, fileType) {
      return true;
    };
    const writeFile = function(path, record, fileType) {};
    const timeStamp = function() {
      return "2019-11-20T05:50:28.267Z";
    };
    const path = "./src/dataStorage";
    const args = [
      "--save",
      "--empId",
      "123",
      "--beverage",
      "org",
      "--qty",
      "4"
    ];
    const actual = performAction.message(
      path,
      readFile,
      args,
      exitsFile,
      writeFile,
      timeStamp
    );
    const expected =
      "Transaction Recorded:\nEmployee Id,Beverage,Quantity,Date\n123,org,4,2019-11-20T05:50:28.267Z";
    assert.strictEqual(actual, expected);
  });

  it("should return message from isValidInput", function() {
    const readFile = function(path, filetype) {
      return '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}';
    };
    const exitsFile = function(path, fileType) {
      return true;
    };
    const writeFile = function(path, record, fileType) {};
    const timeStamp = function() {
      return "2019-11-20T05:50:28.267Z";
    };
    const path = "./src/dataStorage";
    const args = [
      "--delete",
      "--empId",
      "123",
      "--beverage",
      "org",
      "--qty",
      "4"
    ];
    const actual = performAction.message(
      path,
      readFile,
      args,
      exitsFile,
      writeFile,
      timeStamp
    );
    const expected = utilities.helpMsg();
    assert.strictEqual(actual, expected);
  });
});
