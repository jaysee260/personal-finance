var stringUtilities = {};

stringUtilities.isNullOrEmpty = stringValue => !stringValue || stringValue.trim() === "";

module.exports = stringUtilities;
