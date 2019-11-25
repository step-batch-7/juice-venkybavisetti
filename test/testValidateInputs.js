const assert = require("assert");
const validateInput = require("../src/validateInputs");

describe("isNumber", function() {
  it("should validate numbers", function() {
    assert.ok(validateInput.isNumber("2"));
  });
  it("should validate non numeric characters", function() {
    assert.ok(!validateInput.isNumber("a"));
    assert.ok(!validateInput.isNumber("@"));
  });
});

describe("invalidInput", function() {
  it("should return false", function() {
    assert.ok(!validateInput.invalidInput());
  });
});

describe("getIndexOfAction", function() {
  it("should return index of --save", function() {
    assert.strictEqual(validateInput.getIndexOfAction(["--save"]), 0);
  });
  it("should return index of --query", function() {
    assert.strictEqual(validateInput.getIndexOfAction(["--query"]), 0);
  });
  it("should return -1 if both are exists", function() {
    assert.strictEqual(
      validateInput.getIndexOfAction(["--save", "--query"]),
      -1
    );
  });
  it("should return -1 if both doesn't exists", function() {
    assert.strictEqual(validateInput.getIndexOfAction(["ss", "sss"]), -1);
  });
});

describe("validateQuery", function() {
  it("should validate valid query args are given", function() {
    assert.ok(validateInput.validateQuery(["--query", "--empId", "343434"]));
  });
  it("should validate invalid query args are given", function() {
    assert.ok(!validateInput.validateQuery(["--query", "--naveen", "343434"]));
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
