const chai = require("chai");
const assert = chai.assert;
const queryAction = require("../src/queryAction");

describe("queryAction", function() {
  describe("getBeverageTransactions", function() {
    const args = ["--beverage", "org"];
    const dateOfTransactions = [
      {
        empId: 123,
        beverage: "org",
        qty: 4,
        date: "2019-11-29T05:50:28.267Z"
      },
      {
        empId: 25317,
        beverage: "limeJuice",
        qty: 4,
        date: "2019-11-20T05:50:28.267Z"
      }
    ];
    it("should filter beverage in the transactions", function() {
      const actual = queryAction.getBeverageTransactions(
        args,
        dateOfTransactions
      );
      const expected = [
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-29T05:50:28.267Z"
        }
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("filterReqTxn", function() {
    it("should filter reqMatcher in the txnRexords", function() {
      const reqMatcher = ["empId", "123"];
      const txnRecords = [
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-29T05:50:28.267Z"
        },
        {
          empId: 25317,
          beverage: "org",
          qty: 4,
          date: "2019-11-20T05:50:28.267Z"
        }
      ];
      const actual = queryAction.filterReqTxns(reqMatcher, txnRecords);
      const expected = [
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-29T05:50:28.267Z"
        }
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("dateOfTransactions", function() {
    it("should filter date in the transactions", function() {
      const args = ["--date", "2019-11-20"];
      const empTransactions = [
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-29T05:50:28.267Z"
        },
        {
          empId: 123,
          beverage: "org",
          qty: 4,
          date: "2019-11-20T05:50:28.267Z"
        }
      ];
      const actual = queryAction.getDateOfTransactions(args, empTransactions);
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

  describe("queryAction", function() {
    it("should return employee transactions", function() {
      const path = "./somePath";
      const readFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return '[{"empId":123,"beverage":"org","qty":9,"date":"2019-11-20T05:50:28.267Z"}]';
      };
      const args = ["--query", "--empId", "123"];
      const exitsFile = () => true;
      const actual = queryAction.queryAction(path, readFile, args, exitsFile);
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
