var express = require("express");
var bodyParser = require("body-parser");
var plaid = require("plaid");

var app = express();
var PORT = 3000;
var { plaid:plaidConfig } = require("./config");

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: Create Plaid client. We will need it to make API calls to Plaid.

app.get("/", function(req, res) {
    res.render("home.ejs", {
        PLAID_PUBLIC_KEY: plaidConfig.publicKey,
        PLAID_ENV: plaidConfig.env,
        PLAID_PRODUCTS: plaidConfig.products,
        PLAID_COUNTRY_CODES: plaidConfig.countryCodes
    })
});

app.get("/home-exercise", function(req, res) {
    var accounts = [
        {
            id: 1,
            name: "Personal Checking"
        },
        {
            id: 2,
            name: "Joint Checking"
        },
        {
            id: 3,
            name: "Personal Savings"
        },
        {
            id: 4,
            name: "Joint Savings"
        }
    ];

    res.render("home-exercise.ejs", {
        accounts
    });
});

app.listen(PORT, function() {
    console.log("Server running on port %s", PORT);
});