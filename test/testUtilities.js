const utilities = require("../src/utilities.js");
const assert = require("assert");

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

  describe("helpMsg", function() {
    it("should return help msg", function() {
      const actual = utilities.helpMsg();
      const expected = "please enter valid input";
      assert.strictEqual(actual, expected);
    });
  });
});
