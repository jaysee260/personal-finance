var landingRouter = require("express").Router();
var path = require("path");
var { plaid : plaidConfig } = require("../config");
var verifyJwt = require("../utils/middleware/verifyJwt");

landingRouter.get("/", function(req, res) {
    res.sendFile(path.resolve("./views/landing.html"));
});

landingRouter.get("/home", verifyJwt, function(req, res) {
    res.render("home.ejs", {
        PLAID_PUBLIC_KEY: plaidConfig.publicKey,
        PLAID_ENV: plaidConfig.env,
        PLAID_PRODUCTS: plaidConfig.products,
        PLAID_COUNTRY_CODES: plaidConfig.countryCodes
    });
});

module.exports = landingRouter;