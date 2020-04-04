var landingController = require("express").Router();
var path = require("path");
var plaidConfig = require("../../config")[process.env.NODE_ENV].plaid[process.env.PLAID_ENV];

landingController.get("/", function(req, res) {
    res.sendFile(path.resolve("./views/landing.html"));
});

landingController.get("/home", function(req, res) {
    res.render("home.ejs", {
        PLAID_PUBLIC_KEY: plaidConfig.publicKey,
        PLAID_ENV: plaidConfig.env,
        PLAID_PRODUCTS: plaidConfig.products,
        PLAID_COUNTRY_CODES: plaidConfig.countryCodes
    });
});

module.exports = landingController;