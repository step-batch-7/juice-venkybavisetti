const utilities = require("../src/utilities.js");
const chai = require("chai");
const assert = chai.assert;

describe("utilities", function() {
  describe("isNumber", function() {
    it("should validate numbrics only", function() {
      assert.ok(utilities.isNumber("232"));
    });
    it("should validate non numbrics", function() {
      assert.ok(!utilities.isNumber("a"));
      assert.ok(!utilities.isNumber("@"));
    });
  });

  describe("getIndexOfAction", function() {
    it("should return index of --save", function() {
      assert.strictEqual(utilities.getIndexOfAction(["--save"]), 0);
    });
    it("should return index of --query", function() {
      assert.strictEqual(utilities.getIndexOfAction(["--query"]), 0);
    });
    it("should return -1 if both are exists", function() {
      assert.strictEqual(utilities.getIndexOfAction(["--save", "--query"]), -1);
    });
    it("should return -1 if both doesn't exists", function() {
      assert.strictEqual(utilities.getIndexOfAction(["ss", "sss"]), -1);
    });
  });

  describe("timeStamp", function() {
    it("should return stamp time when we call", function() {
      const actual = utilities.timeStamp();
      const expected = actual;
      assert.strictEqual(actual, expected);
    });
  });

  describe("getPreviousTransactionRecords", function() {
    it("should read file when file exists", function() {
      const path = "./somePath";
      const readFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return '[{"Employee Id":123,"Beverage":"org","Quantity":4,"Date":"2019-11-20T05:50:28.267Z"}]';
      };
      const exitsFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return true;
      };
      const actual = utilities.getPreviousTransactionRecords(
        path,
        readFile,
        exitsFile
      );
      const expected = [
        {
          "Employee Id": 123,
          Beverage: "org",
          Quantity: 4,
          Date: "2019-11-20T05:50:28.267Z"
        }
      ];
      assert.deepStrictEqual(actual, expected);
    });

    it("should not read file when file not exists", function() {
      const path = "./somePath";
      const readFile = function(path, fileType) {
        return "";
      };
      const exitsFile = function(path, fileType) {
        assert.strictEqual(path, "./somePath");
        assert.strictEqual(fileType, "utf8");
        return false;
      };
      const actual = utilities.getPreviousTransactionRecords(
        path,
        readFile,
        exitsFile
      );
      const expected = [];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("helpMsg", function() {
    it("should return help msg", function() {
      const actual = utilities.helpMsg();
      const expected = "please enter valid input";
      assert.strictEqual(actual, expected);
    });
  });
});
