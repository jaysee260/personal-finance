var plaid = require("plaid");
var { plaid:plaidConfig } = require("../config");

var plaidClient = new plaid.Client(
    plaidConfig.clientId,
    plaidConfig.secret,
    plaidConfig.publicKey,
    plaid.environments[plaidConfig.env],
    {version: '2019-05-29', clientApp: 'Personal Finance - API'}
);

module.exports = plaidClient;