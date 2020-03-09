const { isNullOrEmpty } = require("../../src/utils/stringUtilities");

test("isNullOrEmpty should return false when string is not null or empty", () => {
    let result = isNullOrEmpty("not an empty string");

    expect(result).toBe(false);
});

test("isNullOrEmpty should return true when string is empty", () => {
    let result = isNullOrEmpty("");

    expect(result).toBe(true);
});

test("isNullOrEmpty should return true when string is only whitespace", () => {
    let result = isNullOrEmpty(" ");

    expect(result).toBe(true);
});

test("isNullOrEmpty should return true when passed null", () => {
    let result = isNullOrEmpty(null);

    expect(result).toBe(true);
});