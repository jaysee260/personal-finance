var User = require("../models/User");
var bcrypt = require("bcryptjs");

function UserFactory() {

    this.createUser = async (userInfo) => {
        userInfo.password = await hashPassword(userInfo.password);
        return new User(userInfo);
    }

    let hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
}

module.exports = new UserFactory();