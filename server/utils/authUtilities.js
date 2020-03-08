const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registrationSchema } = require("../models/User/validation");
const { jwt : jwtConfig } = require("../config");
const User = require("../models/User");

const authUtilities = {};

authUtilities.validateUser = (user) => {
    let { error } = registrationSchema.validate(user)
    return error //? error.details[0].message : null
}

authUtilities.validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

// Claims is a collection of key value pairs {} - an object.
// The caller is responsible for 
authUtilities.generateJwt = (claims) => {
    return jwt.sign(claims, jwtConfig.secret);
}

authUtilities.checkIfUserExists = async (email) => {
    return await User.findOne({ email });
}

module.exports = authUtilities;