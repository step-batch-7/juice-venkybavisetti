const performAction = require("../src/performAction.js");
const fs = require("fs");
const assert = require("assert");
const utilities = require("../src/utilities.js");

describe("reducerForBeverages", function() {
  it("should add totalBeverages and Quantity in the objects", function() {
    const totalBeverages = 1;
    const obj = {
      "Employee Id": 123,
      Beverage: "org",
      Quantity: 4,
      Date: "2019-11-20T05:50:28.267Z"
    };
    const actual = performAction.reducerForBeverages(totalBeverages, obj);
    const expected = 5;
    assert.strictEqual(actual, expected);
  });
});

describe("getTotalBeverages", function() {
  it("should return total count of beverages when one transaction took place", function() {
    const empTransactions = [
      {
        "Employee Id": 123,
        Beverage: "org",
        Quantity: 4,
        Date: "2019-11-20T05:50:28.267Z"
      }
    ];
    const actual = performAction.getTotalBeverages(empTransactions);
    const expected = 4;
    assert.strictEqual(actual, expected);
  });

  it("should return total count of beverages when two transaction took place", function() {
    const empTransactions = [
      {
        "Employee Id": 123,
        Beverage: "org",
        Quantity: 4,
        Date: "2019-11-20T05:50:28.267Z"
      },
      {
        "Employee Id": 123,
        Beverage: "org",
        Quantity: 4,
        Date: "2019-11-20T05:50:28.267Z"
      }
    ];
    const actual = performAction.getTotalBeverages(empTransactions);
    const expected = 8;
    assert.strictEqual(actual, expected);
  });
});

describe("generateQueryTransactionMsg", function() {
  it("should return generated string msg from queryTransaction object", function() {
    const newTransactionRecord = [
      {
        "Employee Id": 123,
        Beverage: "org",
        Quantity: 4,
        Date: "2019-11-20T05:50:28.267Z"
      }
    ];
    const actual = performAction.generateQueryTransactionMsg(
      newTransactionRecord
    );
    const expected =
      "Employee Id,Beverage,Quantity,Date\n123,org,4,2019-11-20T05:50:28.267Z\nTotal Beverages: 4";
    assert.strictEqual(actual, expected);
  });
});

describe("generateSavedTransactionMsg", function() {
  it("should return generated string msg from savedTransaction object", function() {
    const newTransactionRecord = {
      "Employee Id": 123,
      Beverage: "org",
      Quantity: 4,
      Date: "2019-11-20T05:50:28.267Z"
    };
    const actual = performAction.generateSavedTransactionMsg(
      newTransactionRecord
    );
    const expected =
      "Transaction Recorded:\nEmployee Id,Beverage,Quantity,Date\n123,org,4,2019-11-20T05:50:28.267Z";
    assert.strictEqual(actual, expected);
  });
});

describe("convertIntoMsg", function() {
  it("should convert savedObject into required string", function() {
    const args = ["--save", "--empId", "123"];
    const dataInObjects = {
      "Employee Id": 123,
      Beverage: "org",
      Quantity: 4,
      Date: "2019-11-20T05:50:28.267Z"
    };

    const expected =
      "Transaction Recorded:\nEmployee Id,Beverage,Quantity,Date\n123,org,4,2019-11-20T05:50:28.267Z";

    const actual = performAction.convertIntoMsg(args, dataInObjects);
    assert.strictEqual(actual, expected);
  });

  it("should convert queryObject into required string", function() {
    const args = ["--query", "--empId", "123"];
    const dataInObjects = [
      {
        "Employee Id": 123,
        Beverage: "org",
        Quantity: 4,
        Date: "2019-11-20T05:50:28.267Z"
      }
    ];
    const expected =
      "Employee Id,Beverage,Quantity,Date\n123,org,4,2019-11-20T05:50:28.267Z\nTotal Beverages: 4";

    const actual = performAction.convertIntoMsg(args, dataInObjects);
    assert.strictEqual(actual, expected);
  });
});

describe("performAction", function() {
  it("should return saved transaction recorded  in object", function() {
    const path = "./somePath";
    const readFile = function(path, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(fileType, "utf8");
      return '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}';
    };
    const args = [
      "--save",
      "--empId",
      "123",
      "--beverage",
      "org",
      "--qty",
      "4"
    ];
    const exitsFile = function(path, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(fileType, "utf8");
      return true;
    };
    const writeFile = function(path, recordString, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(
        recordString,
        '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"},{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}'
      );
      assert.strictEqual(fileType, "utf8");
    };
    const timeStamp = function() {
      return "2019-11-20T05:50:28.267Z";
    };
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
      Quantity: 4
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should return query transactions details in objects", function() {
    const path = "./somePath";
    const readFile = function(path, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(fileType, "utf8");
      return '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}';
    };
    const args = ["--query", "--empId", "123"];
    const exitsFile = function(path, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(fileType, "utf8");
      return true;
    };
    const writeFile = function(path, recordString, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(
        recordString,
        '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"},{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}'
      );
      assert.strictEqual(fileType, "utf8");
    };
    const timeStamp = function() {
      return "2019-11-20T05:50:28.267Z";
    };

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
  it("should return string from convertIntoMsg function", function() {
    const path = "./somePath";
    const readFile = function(path, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(fileType, "utf8");
      return '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}';
    };
    const args = [
      "--save",
      "--empId",
      "123",
      "--beverage",
      "org",
      "--qty",
      "4"
    ];
    const exitsFile = function(path, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(fileType, "utf8");
      return true;
    };
    const writeFile = function(path, recordString, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(
        recordString,
        '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"},{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}'
      );
      assert.strictEqual(fileType, "utf8");
    };
    const timeStamp = function() {
      return "2019-11-20T05:50:28.267Z";
    };
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
    const path = "./somePath";
    const readFile = function(path, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(fileType, "utf8");
      return '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}';
    };
    const args = [
      "--noAction",
      "--empId",
      "123",
      "--beverage",
      "org",
      "--qty",
      "4"
    ];
    const exitsFile = function(path, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(fileType, "utf8");
      return true;
    };
    const writeFile = function(path, recordString, fileType) {
      assert.strictEqual(path, "./somePath");
      assert.strictEqual(
        recordString,
        '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"},{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}'
      );
      assert.strictEqual(fileType, "utf8");
    };
    const timeStamp = function() {
      return "2019-11-20T05:50:28.267Z";
    };
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
