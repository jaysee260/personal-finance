import React, { useState } from "react";
import PlaidLink from "react-plaid-link";

import { Navbar, Container, FluidContainer } from "../../common/components";
import { Account, AccountList } from "./components"

import appConfig from "../../config";
const { plaid } = appConfig[process.env.NODE_ENV];

// TODO: Consider having a directory for each components.
// It would contains that component's styles and tests,
// along with an index.js file to expose it to the outside.

function DashboardPage() {
    let publicToken = null;
    let [institution, setInstitution] = useState(null);
    let [accounts, setAccounts] = useState(null);
    
    function handleOnSuccess(token, metadata) {
        console.log({ token, metadata });
        publicToken = token;
        
        let { institution, accounts } = metadata;
        let filteredAccounts = accounts.filter(account => account.subtype === "checking" || account.subtype === "credit card");
        setInstitution(institution);
        setAccounts(filteredAccounts);
    }

    function handleOnExit() {
        console.log("something went wrong");
    }

    function initiateAccessTokenExchange() {

    }

    return (
        <div id="dashboard-page">
            <Navbar brandName="Personal Finance"/>

            <FluidContainer>

                <Container styles={{padding: 20}}>
                <h3>{!institution ? "" : institution.name}</h3>
                <AccountList>
                    {!accounts ? null : accounts.map((account, index) => (
                    <Account
                        key={++index}
                        id={account.id}
                        name={account.name}
                        type={account.subtype}
                    />
                    ))}
                </AccountList>
                </Container>

                <PlaidLink
                    clientName="Personal Finance"
                    env="sandbox"
                    product={["auth", "transactions"]}
                    publicKey={plaid.publicKey}
                    onExit={handleOnExit}
                    onSuccess={handleOnSuccess}>
                    Link a Financial Institution
                </PlaidLink>

            </FluidContainer>
        </div>
    )
}

export default DashboardPage;