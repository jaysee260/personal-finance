var express = require("express");
var bodyParser = require("body-parser");
var plaid = require("plaid");

var { plaid:plaidConfig } = require("./config");
var { isNullOrEmpty } = require("./utils/stringUtilities");

var PORT = 3000;
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var plaidClient = new plaid.Client(
    plaidConfig.clientId,
    plaidConfig.secret,
    plaidConfig.publicKey,
    plaid.environments[plaidConfig.env],
    {version: '2019-05-29', clientApp: 'Personal Finance - API'}
);

app.get("/", function(req, res) {
    res.render("home.ejs", {
        PLAID_PUBLIC_KEY: plaidConfig.publicKey,
        PLAID_ENV: plaidConfig.env,
        PLAID_PRODUCTS: plaidConfig.products,
        PLAID_COUNTRY_CODES: plaidConfig.countryCodes
    })
});

app.post("/api/auth/get-access-token", async function(req, res) {
    let { publicToken } = req.body;
    
    if (isNullOrEmpty(publicToken)) {
        return res.status(400).json({ error: "A public token must be provided in the request body." });
    }

    try {
        let tokenExchangeResponse = await plaidClient.exchangePublicToken(publicToken);
        let { access_token, item_id } = tokenExchangeResponse;
        // TODO: associate accessToken to itemId, and persist to a DB.
        res.status(200).json({
            accessToken: access_token,
            itemId: item_id
        });
    } catch (tokenExchangeError) {
        console.error({ tokenExchangeError });
        res.status(500).json({ error: "An error occurred during the token exchange workflow." });
    }
});

app.get("/api/accounts/:itemId", function(req, res) {
    // At this point, we can assume the caller has already generated an accessToken.
    // So, we can use the itemId to look up the respective accessToken.
    // If found, we call the Plaid API. Otherwise, we reject the request due to lack of permissions.
    // Calls to the Plaid API only expect an access token...

    // Or... an alternative is to expect the the access token in a request header, but that would mean
    // the client would have to store the token on the front end and pass it around... Which I don't feel
    // strongly about. An access token seems like a sensitive enough piece of information to not want to
    // leave it floating around on the client side. 

    // Some research is due before deciding on "best" approach.
})

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