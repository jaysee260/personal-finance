var landingRouter = require("express").Router();
var { plaid:plaidConfig } = require("../config");

landingRouter.get("/", function(req, res) {
    res.render("home.ejs", {
        PLAID_PUBLIC_KEY: plaidConfig.publicKey,
        PLAID_ENV: plaidConfig.env,
        PLAID_PRODUCTS: plaidConfig.products,
        PLAID_COUNTRY_CODES: plaidConfig.countryCodes
    })
});

module.exports = landingRouter;