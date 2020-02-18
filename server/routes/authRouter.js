var authRouter = require("express").Router();
// TODO: Use a UserFactory and delegate user creation, password hashing and validation responsibilities to it.
var User = require("../models/User");

authRouter.post("/register", async function(req, res) {
    let { userInfo } = req.body;

    if (!userInfo) {
        return res.status(400).json({ error: "Please provide user info." });
    }

    let user = new User(userInfo);

    try {
        let newUser = await user.save();
        res.status(200).json(newUser);
    } catch (newUserCreationError) {
        console.log({ newUserCreationError });
        res.status(500).json({ error: "An error occurred while creating new user." });
    }
});

authRouter.post("/login", function(req, res) {
    res.send("login");
});

module.exports = authRouter;