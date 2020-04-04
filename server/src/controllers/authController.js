const authController = require("express").Router();
const UserFactory = require("../utils/userFactory");
const AuthUtilities = require("../utils/authUtilities");

// TODO: Consider automatically logging user in after account creation
authController.post("/register", async function(req, res) {
    let { userInfo } = req.body;

    if (!userInfo) {
        return res.status(400).json({ error: "Please provide user info." });
    }

    try {
        let userValidationError = AuthUtilities.validateUser(userInfo);
        if (userValidationError) {
            return res.status(400).json({ error: userValidationError.details[0].message });
        }
        
        // Check if email already exists in DB
        let userExists = await AuthUtilities.checkIfUserExists(userInfo.email);
        if (userExists) {
            return res.status(400).json({ error: "Email already in use." });
        }

        let user = await UserFactory.createUser(userInfo);
        let newUser = await user.save();

        res.status(200).json({ userId: newUser._id });
    } catch (newUserCreationError) {
        console.log({ newUserCreationError });
        res.status(500).json({ error: "An error occurred while creating new user." });
    }
});

authController.post("/login", async function(req, res) {
    let { login } = req.body;

    // Check if user exists
    let user = await AuthUtilities.checkIfUserExists(login.email);
    if (!user) {
        return res.status(400).json({ error: "A user with that email does not exist." });
    }

    // Check if password is correct
    let passwordIsCorrect = await AuthUtilities.validatePassword(login.password, user.password);
    if (!passwordIsCorrect) {
        return res.status(400).json({ error: "Password is incorrect." });
        // TODO: Implement some sort of lockout mechanism after X failed attempts
    }
    
    // Create and assign the user a token
    let jwtClaims = { userId: user._id };
    const token = AuthUtilities.generateJwt(jwtClaims);
    res.status(200)
        .header("Authentication", `Bearer ${token}`)
        .json({ token });
});

module.exports = authController;