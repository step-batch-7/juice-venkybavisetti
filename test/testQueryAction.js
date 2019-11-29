const chai = require("chai");
const assert = chai.assert;
const queryAction = require("../src/queryAction");

describe("queryAction", function() {
  describe("getEmpTransactions", function() {
    it("should return emp transactions in previousTransactionRecords", function() {
      const args = ["--empId", "123"];
      const previousTransactionRecords = [
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-20T05:50:28.267Z"
        }
      ];
      const actual = queryAction.getEmpTransactions(
        args,
        previousTransactionRecords
      );
      const expected = [
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-20T05:50:28.267Z"
        }
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("getPreviousTransactionRecords", function() {
    it("should return all transaction records", function() {
      const path = "./somePath";
      const readFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return '{"123":[{"Employee Id":123,"Beverage":"org","Quantity":9,"Date":"2019-11-20T05:50:28.267Z"}]}';
      };
      const actual = queryAction.getPreviousTransactionRecords(path, readFile);
      const expected = {
        "123": [
          {
            "Employee Id": 123,
            Beverage: "org",
            Quantity: 9,
            Date: "2019-11-20T05:50:28.267Z"
          }
        ]
      };
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("queryAction", function() {
    it("should return employee transactions", function() {
      const path = "./somePath";
      const readFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return '[{"empId":123,"beverage":"org","qty":9,"date":"2019-11-20T05:50:28.267Z"}]';
      };
      const args = ["--query", "--empId", "123"];
      const actual = queryAction.queryAction(path, readFile, args);
      const expected = [
        {
          empId: 123,
          beverage: "org",
          qty: 9,
          date: "2019-11-20T05:50:28.267Z"
        }
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
