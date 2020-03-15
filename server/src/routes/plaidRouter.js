var plaidRouter = require("express").Router();
var moment = require("moment");

var plaidClient = require("../utils/plaidClient");
var { isNullOrEmpty } = require("../utils/stringUtilities");

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
        // TODO: Improve descriptiveness of client-facing error
        console.error({ tokenExchangeError });
        res.status(500).json({ error: "An error occurred during the token exchange workflow." });
    }
})

plaidRouter.get("/item", async function(req, res) {
    let getItemResponse;

    try {
        getItemResponse = await plaidClient.getItem(ACCESS_TOKEN);
    } catch (getItemError) {
        console.error({ getItemError });
        res.status(500).json({ error: "An error occurred while getting Item information." });
    }

    let getInstitutionResponse;
    
    try {
        let { item } = getItemResponse;

        getInstitutionResponse = await plaidClient.getInstitutionById(item.institution_id);
        let { institution } = getInstitutionResponse;

        // TODO: Something to consider...
        // We may not want to expose the itemId to the front end?
        // Unsure about whether there's a valid reason for why we wouldn't want to.
        // Something to look into.
        // If that turns out to be the case, we can associate the item id with the institution id,
        // and pass back the institution id. And if we, for whatever reason, need the item id, we
        // could do a lookup by institution id.
        // Only if needed. If it's safe to pass item id to client, then we're safe.
        res.status(200).json({
            item: {
                id: item.item_id
            },
            institution: {
                id: institution.institution_id,
                name: institution.name
            }
        });
    } catch (getInstitutionError) {
        console.error({ getInstitutionError });
        res.status(500).json({ error: "An error occurred while information for institution <id>." });
    }
});

plaidRouter.get("/accounts", async function(req, res) {
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

plaidRouter.get("/transactions/:accountId", async function(req, res) {
    const { accountId } = req.params;

    if (isNullOrEmpty(accountId)) {
        res.status(400).json({ error: "An account id must be provided to retrieve transactions." });
    }

    // Pull transactions from last 7 days
    // TODO: Programmatically pull transactions from today (whatever the day is), until beginning of week
    try {
        let startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        let endDate = moment().format('YYYY-MM-DD');
        
        let getTransactionsResponse = await plaidClient.getTransactions(ACCESS_TOKEN, startDate, endDate, { account_ids: [accountId] })
    
        let { transactions } = getTransactionsResponse;
        // TODO: Consider using data property in successful response envelope
        res.status(200).json({ transactions });
    } catch (getTransactionsError) {
        console.error({ getTransactionsError });
        res.status(500).json({ error: `Something went wrong while trying to retrieve transactions for account ${accountId}` });
    }

});

module.exports = plaidRouter;