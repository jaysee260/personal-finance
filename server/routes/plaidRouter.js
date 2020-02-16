var plaidRouter = require("express").Router();
var plaid = require("plaid");

var { plaid:plaidConfig } = require("../config");
var { isNullOrEmpty } = require("../utils/stringUtilities");

var plaidClient = new plaid.Client(
    plaidConfig.clientId,
    plaidConfig.secret,
    plaidConfig.publicKey,
    plaid.environments[plaidConfig.env],
    {version: '2019-05-29', clientApp: 'Personal Finance - API'}
);

// Store these values in memory for now.
// TODO: Store these in a secure, persistent data store
var ACCESS_TOKEN = null;
var ITEM_ID = null;

// TODO: Settle on a standard envelope for API responses.
plaidRouter.post("/auth/get-access-token", async function(req, res) {
    let { publicToken } = req.body;
    
    if (isNullOrEmpty(publicToken)) {
        return res.status(400).json({ error: "A public token must be provided in the request body." });
    }

    try {
        let tokenExchangeResponse = await plaidClient.exchangePublicToken(publicToken);
        let { access_token, item_id } = tokenExchangeResponse;
        // TODO: associate accessToken to itemId, and persist to a DB.
        ACCESS_TOKEN = access_token;
        ITEM_ID = item_id;

        res.status(200).json({
            accessToken: access_token,
            itemId: item_id
        });
    } catch (tokenExchangeError) {
        console.error({ tokenExchangeError });
        res.status(500).json({ error: "An error occurred during the token exchange workflow." });
    }
})

plaidRouter.get("/api/plaid/accounts", async function(req, res) {
    // /api/accounts/:itemId ?
    // At this point, we can assume the caller has already generated an accessToken.
    // So, we can use the itemId to look up the respective accessToken.
    // If found, we call the Plaid API. Otherwise, we reject the request due to lack of permissions.
    // Calls to the Plaid API only expect an access token...

    // Or... an alternative is to expect the the access token in a request header, but that would mean
    // the client would have to store the token on the front end and pass it around... Which I don't feel
    // strongly about. An access token seems like a sensitive enough piece of information to not want to
    // leave it floating around on the client side. 

    // Some research is due before deciding on "best" approach.

    // TODO: considered a ?filtered=true|false query param
    try {
        let getAccountsResponse = await plaidClient.getAccounts(ACCESS_TOKEN);
        let filteredAccounts = getAccountsResponse
            .accounts
            .filter(acct => acct.subtype === "checking" || acct.subtype === "credit card");

        res.status(200).json({ accounts: filteredAccounts, count: filteredAccounts.length });
    } catch (getAccountsError) {
        console.log({ getAccountsError });
        res.status(500).json({ error: `An error occurred while getting accounts for item ${ITEM_ID}` })
    }
})

module.exports = plaidRouter;