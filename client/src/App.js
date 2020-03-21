import React, { useState } from 'react';
import PlaidLink from "react-plaid-link";
import AccountsList from './components/AccountsList';
import Account from './components/Account';
import Navbar from './components/Navbar';
import FluidContainer from './components/common/FluidContainer';
import Container from './components/common/Container';
import appConfig from "./config";
const { plaid } = appConfig[process.env.NODE_ENV];

function App() {
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
    <div id="root" className="App">
      <Navbar brandName="Personal Finance"/>

      <FluidContainer>
        <Container styles={{padding: 20}}>
          <h3>{!institution ? "" : institution.name}</h3>
          <AccountsList>
            {!accounts ? null : accounts.map((account, index) => (
              <Account
                key={++index}
                id={account.id}
                name={account.name}
                type={account.subtype}
              />
            ))}
          </AccountsList>
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
  );
}

export default App;
