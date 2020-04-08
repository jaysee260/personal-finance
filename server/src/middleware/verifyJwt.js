const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || require("../../config")[process.env.NODE_ENV].jwt.secret


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
        let decodedToken = jwt.verify(token, jwtSecret);
        req.currentUser = decodedToken;
        next();
    } catch (tokenVerificationError) {
        res.status(400).json({ error: "Invalid token" });
    }
}

module.exports = verifyJwt;