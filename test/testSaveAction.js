const chai = require("chai");
const assert = chai.assert;
const saveAction = require("../src/saveAction.js");

describe("saveAction", function() {
  describe("updatePreviousTransactionRecords", function() {
    it("should return updated transaction when previousTransaction is empty", function() {
      const previousTransactionRecords = [];
      const newTransactionRecord = {
        "Employee Id": "123",
        Beverage: "org",
        Quantity: "4",
        Date: "2019-11-20T05:50:28.267Z"
      };
      const expected = [
        {
          "Employee Id": "123",
          Beverage: "org",
          Quantity: "4",
          Date: "2019-11-20T05:50:28.267Z"
        }
      ];
      const actual = saveAction.updatePreviousTransactionRecords(
        previousTransactionRecords,
        newTransactionRecord
      );
      assert.deepStrictEqual(actual, expected);
    });

    it("should return updated transaction when empId exists in previousTransaction", function() {
      const previousTransactionRecords = [
        {
          "Employee Id": 123,
          Beverage: "org",
          Quantity: 4,
          Date: "2019-11-20T05:50:28.267Z"
        }
      ];
      const newTransactionRecord = {
        "Employee Id": 123,
        Beverage: "org",
        Quantity: 4,
        Date: "2019-11-20T05:50:28.267Z"
      };
      const expected = [
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
      const actual = saveAction.updatePreviousTransactionRecords(
        previousTransactionRecords,
        newTransactionRecord
      );
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("updateTransactionFile", function() {
    it("should update transactionFile", function() {
      const path = "./somePath";
      const transactionRecords = {
        "123": [
          {
            "Employee Id": 123,
            Beverage: "org",
            Quantity: 4,
            Date: "2019-11-20T05:50:28.267Z"
          }
        ]
      };
      const writeFile = function(path, recordString, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(
          recordString,
          '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]}'
        );
        assert.strictEqual(fileType, "utf8");
      };
      const actual = saveAction.updateTransactionFile(
        path,
        writeFile,
        transactionRecords
      );
      const expected = undefined;
      assert.strictEqual(actual, expected);
    });
  });

  describe("generateTransactionRecord", function() {
    it("should return generated transaction with the given args", function() {
      const args = [
        "--save",
        "--empId",
        "123",
        "--beverage",
        "org",
        "--qty",
        "9"
      ];
      const timeStamp = function() {
        return "2019-11-20T05:50:28.267Z";
      };
      const actual = saveAction.generateTransactionRecord(args, timeStamp);
      const expected = {
        empId: 123,
        beverage: "org",
        qty: 9,
        date: "2019-11-20T05:50:28.267Z"
      };
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("saveAction", function() {
    it("should return recorded transaction in object", function() {
      const path = "./somePath";
      const readFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return '[{"empId":123,"beverage":"org","qty":9,"date":"2019-11-20T05:50:28.267Z"}]';
      };
      const args = [
        "--save",
        "--empId",
        "123",
        "--beverage",
        "org",
        "--qty",
        "9"
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
          '[{"empId":123,"beverage":"org","qty":9,"date":"2019-11-20T05:50:28.267Z"},{"empId":123,"beverage":"org","qty":9,"date":"2019-11-20T05:50:28.267Z"}]'
        );
        assert.strictEqual(fileType, "utf8");
      };
      const timeStamp = function() {
        return "2019-11-20T05:50:28.267Z";
      };

      const actual = saveAction.saveAction(
        path,
        readFile,
        args,
        exitsFile,
        writeFile,
        timeStamp
      );
      const expected = {
        empId: 123,
        beverage: "org",
        qty: 9,
        date: "2019-11-20T05:50:28.267Z"
      };
      assert.deepStrictEqual(actual, expected);
    });
  });
});
