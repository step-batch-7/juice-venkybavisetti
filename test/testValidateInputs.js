const chai = require("chai");
const assert = chai.assert;
const validateInput = require("../src/validateInputs");

describe("validateInputs", function() {
  describe("predicateForEvery", function() {
    it("should validate given pair args", function() {
      const element = ["--beverage", "orange"];
      const actual = validateInput.predicateForEvery(element);
      assert.ok(actual);
    });
    it("should inValidate given pair args", function() {
      const element = ["--venky", "orange"];
      const actual = validateInput.predicateForEvery(element);
      assert.notOk(actual);
    });
  });

  describe("validateBeverage", function() {
    it("should validate beverage args", function() {
      const beverage = "orange";
      const actual = validateInput.validateBeverage(beverage);
      assert.ok(actual);
    });
    it("should InValidate beverage args", function() {
      const beverage = "34ange";
      const actual = validateInput.validateBeverage(beverage);
      assert.notOk(actual);
    });
  });

  describe("validateDate", function() {
    it("should validate date args", function() {
      const actual = validateInput.validateDate("2019-11-29");
      assert.ok(actual);
    });
    it("should inValidate date args", function() {
      const actual = validateInput.validateDate("2aaaa-11-29");
      assert.notOk(actual);
    });
  });

  describe("validateEmpId", function() {
    it("should validate empId args", function() {
      const actual = validateInput.validateEmpId(23343);
      assert.ok(actual);
    });
    it("should inValidate empId args", function() {
      const actual = validateInput.validateEmpId("2334df");
      assert.notOk(actual);
    });
  });

  describe("getQuerryArgsPaired", function() {
    it("should paired querry args", function() {
      const args = ["--beverage", "orange", "--empId", "1234"];
      const actual = validateInput.getQuerryArgsPaired(args);
      const expected = [
        ["--beverage", "orange"],
        ["--empId", "1234"]
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("reducerForPair", function() {
    it("should pair when no element in the context", function() {
      const context = [[]];
      const element = "beverage";
      const actual = validateInput.reducerForPair(context, element);
      const expected = [["beverage"]];
      assert.deepStrictEqual(actual, expected);
    });
    it("should pair when one element in the context", function() {
      const context = [["beverage"]];
      const element = "orange";
      const actual = validateInput.reducerForPair(context, element);
      const expected = [["beverage", "orange"]];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("invalidInput", function() {
    it("should return false", function() {
      assert.ok(!validateInput.invalidInput());
    });
  });

  describe("validateQuery", function() {
    it("should validate valid query args are given", function() {
      assert.ok(validateInput.validateQuery(["--query", "--empId", "343434"]));
    });
    it("should validate invalid query args are given", function() {
      assert.ok(
        !validateInput.validateQuery(["--query", "--empId", "34", "over"])
      );
    });
  });

  describe("validateSave", function() {
    it("should validate for valid save args", function() {
      assert.ok(
        validateInput.validateSave([
          "--save",
          "--empId",
          123,
          "--beverage",
          "orange",
          "--qty",
          1
        ])
      );
    });
    it("should validate for invalid save args", function() {
      assert.ok(
        !validateInput.validateSave([
          "--save",
          "--empId",
          "hello",
          "--beverage",
          "123",
          "--qty",
          1
        ])
      );
    });
  });

  describe("isValidInput", function() {
    it("should validate for save", function() {
      assert.ok(
        validateInput.isValidInput([
          "--save",
          "--empId",
          123,
          "--beverage",
          "orange",
          "--qty",
          1
        ])
      );
    });
    it("should validate for query", function() {
      assert.ok(validateInput.isValidInput(["--query", "--empId", "343434"]));
    });
    it("should validate for invalid args", function() {
      assert.ok(
        !validateInput.isValidInput(["--save", "--query", "--empId", "343434"])
      );
      assert.ok(!validateInput.isValidInput(["--empId", "343434"]));
    });
  });
});
