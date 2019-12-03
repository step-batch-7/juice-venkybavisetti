const performAction = require("../src/performAction.js");
const chai = require("chai");
const assert = chai.assert;
const utilities = require("../src/utilities.js");

describe("performAction", function() {
  describe("reducerForBeverages", function() {
    it("should add totalBeverages and Quantity in the objects", function() {
      const totalBeverages = 1;
      const obj = {
        empId: 123,
        beverage: "org",
        qty: 4,
        date: "2019-11-20T05:50:28.267Z"
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
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-20T05:50:28.267Z"
        }
      ];
      const actual = performAction.getTotalBeverages(empTransactions);
      const expected = 4;
      assert.strictEqual(actual, expected);
    });

    it("should return total count of beverages when two transaction took place", function() {
      const empTransactions = [
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-20T05:50:28.267Z"
        },
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-20T05:50:28.267Z"
        }
      ];
      const actual = performAction.getTotalBeverages(empTransactions);
      const expected = 8;
      assert.strictEqual(actual, expected);
    });
  });

  describe("generateQueryTransactionMsg", function() {
    it("should give a text representation of list of one transaction", function() {
      const newTransactionRecord = [
        {
          beverage: "org",
          empId: 123,
          qty: 4,
          date: "2019-11-20T05:50:28.267Z"
        }
      ];
      const actual = performAction.generateQueryTransactionMsg(
        newTransactionRecord
      );
      const expected =
        "Employee ID, Beverage, Quantity, Date\n123,org,4,2019-11-20T05:50:28.267Z\nTotal: 4 Juices";
      assert.strictEqual(actual, expected);
    });
    it("should give a text representation of list of two transactions", function() {
      const newTransactionRecord = [
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-20T05:50:28.267Z"
        },
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-20T05:50:28.268Z"
        }
      ];
      const actual = performAction.generateQueryTransactionMsg(
        newTransactionRecord
      );
      const expected =
        "Employee ID, Beverage, Quantity, Date\n123,org,4,2019-11-20T05:50:28.267Z\n123,org,4,2019-11-20T05:50:28.268Z\nTotal: 8 Juices";
      assert.strictEqual(actual, expected);
    });
    it("should give a text representation of list of one transaction and one qty for testing juice", function() {
      const newTransactionRecord = [
        {
          beverage: "org",
          empId: 123,
          qty: 1,
          date: "2019-11-20T05:50:28.267Z"
        }
      ];
      const actual = performAction.generateQueryTransactionMsg(
        newTransactionRecord
      );
      const expected =
        "Employee ID, Beverage, Quantity, Date\n123,org,1,2019-11-20T05:50:28.267Z\nTotal: 1 Juice";
      assert.strictEqual(actual, expected);
    });
  });

  describe("generateSavedTransactionMsg", function() {
    it("should return generated string msg from savedTransaction object", function() {
      const newTransactionRecord = {
        empId: 123,
        beverage: "org",
        qty: 4,
        date: new Date("2019-11-20T05:50:28.267Z")
      };
      const actual = performAction.generateSavedTransactionMsg(
        newTransactionRecord
      );
      const expected =
        "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n123,org,4,2019-11-20T05:50:28.267Z";
      assert.strictEqual(actual, expected);
    });
  });

  describe("convertIntoMsg", function() {
    it("should convert savedObject into required string", function() {
      const args = ["--save", "--empId", "123"];
      const dataInObjects = {
        empId: 123,
        beverage: "org",
        qty: 4,
        date: new Date("2019-11-20T05:50:28.267Z")
      };

      const expected =
        "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n123,org,4,2019-11-20T05:50:28.267Z";

      const actual = performAction.convertIntoMsg(args, dataInObjects);
      assert.strictEqual(actual, expected);
    });

    it("should convert queryObject into required string", function() {
      const args = ["--query", "--empId", "123"];
      const dataInObjects = [
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-20T05:50:28.267Z"
        }
      ];
      const expected =
        "Employee ID, Beverage, Quantity, Date\n123,org,4,2019-11-20T05:50:28.267Z\nTotal: 4 Juices";

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
        return '[{"empId":123,"beverage":"org","qty":4,"date":"2019-11-20T05:50:28.267Z"}]';
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
      const existsFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return true;
      };
      const writeFile = function(path, recordString, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(
          recordString,
          '[{"empId":123,"beverage":"org","qty":4,"date":"2019-11-20T05:50:28.267Z"},{"empId":123,"beverage":"org","qty":4,"date":"2019-11-20T05:50:28.267Z"}]'
        );
        assert.strictEqual(fileType, "utf8");
      };
      const timeStamp = function() {
        return "2019-11-20T05:50:28.267Z";
      };
      const parameters = {
        args: args,
        path: path,
        existsFile: existsFile,
        readFile: readFile,
        writeFile: writeFile,
        timeStamp: timeStamp
      };
      const actual = performAction.performAction(parameters);
      const expected = {
        empId: 123,
        beverage: "org",
        date: "2019-11-20T05:50:28.267Z",
        qty: 4
      };
      assert.deepStrictEqual(actual, expected);
    });

    it("should return query transactions details in objects", function() {
      const path = "./somePath";
      const readFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return '[{"empId":123,"beverage":"org","qty":4,"date":"2019-11-20T05:50:28.267Z"}]';
      };
      const args = ["--query", "--empId", "123"];
      const existsFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return true;
      };
      const writeFile = function(path, recordString, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(
          recordString,
          '[{"empId":123,"beverage":"org","qty":4,"date":"2019-11-20T05:50:28.267Z"},{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]'
        );
        assert.strictEqual(fileType, "utf8");
      };
      const timeStamp = function() {
        return "2019-11-20T05:50:28.267Z";
      };
      const parameters = {
        args: args,
        path: path,
        existsFile: existsFile,
        readFile: readFile,
        writeFile: writeFile,
        timeStamp: timeStamp
      };
      const actual = performAction.performAction(parameters);
      const expected = [
        {
          empId: 123,
          beverage: "org",
          date: "2019-11-20T05:50:28.267Z",
          qty: 4
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
        return '[{"empId":123,"beverage":"org","qty":4,"date":"2019-11-20T05:50:28.267Z"}]';
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
      const existsFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return true;
      };
      const writeFile = function(path, recordString, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(
          recordString,
          '[{"empId":123,"beverage":"org","qty":4,"date":"2019-11-20T05:50:28.267Z"},{"empId":123,"beverage":"org","qty":4,"date":"2019-11-20T05:50:28.267Z"}]'
        );
        assert.strictEqual(fileType, "utf8");
      };
      const timeStamp = function() {
        return new Date("2019-11-20T05:50:28.267Z");
      };
      const parameters = {
        args: args,
        path: path,
        existsFile: existsFile,
        readFile: readFile,
        writeFile: writeFile,
        timeStamp: timeStamp
      };
      const actual = performAction.message(parameters);
      const expected =
        "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n123,org,4,2019-11-20T05:50:28.267Z";
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
      const existsFile = function(path, fileType) {
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
      const parameters = {
        args: args,
        path: path,
        existsFile: existsFile,
        readFile: readFile,
        writeFile: writeFile,
        timeStamp: timeStamp
      };
      const actual = performAction.message(parameters);
      const expected = utilities.helpMsg();
      assert.strictEqual(actual, expected);
    });
  });
});
