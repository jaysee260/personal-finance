const jwt = require("jsonwebtoken");
const { jwt : jwtConfig } = require("../../config");

function verifyJwt(req, res, next) {
    let authHeader = req.header("Authentication");
    if (!authHeader) {
        return res.status(401).json({ error: "Authentication header missing" });
    }

    let token = authHeader.split("Bearer ")[1];
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }

    try {
        // TODO: Consider moving all config values to a .env file
        let decodedToken = jwt.verify(token, jwtConfig.secret);
        req.currentUser = decodedToken;
        next();
    } catch (tokenVerificationError) {
        res.status(400).json({ error: "Invalid token" });
    }
}

module.exports = verifyJwt;