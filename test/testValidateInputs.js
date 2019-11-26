const assert = require("assert");
const validateInput = require("../src/validateInputs");

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
