const plaid = require("plaid");
const plaidEnv = process.env.PLAID_ENV || "sandbox";
const nodeEnv = process.env.NODE_ENV || "development";
const plaidConfig = require("../../config")[nodeEnv].plaid[plaidEnv];

const plaidClient = new plaid.Client(
    plaidConfig.clientId,
    plaidConfig.secret,
    plaidConfig.publicKey,
    plaid.environments[plaidEnv],
    {version: '2019-05-29', clientApp: 'Personal Finance API'}
);

module.exports = plaidClient;