import React from 'react';
import { Router, Link } from "@reach/router";

import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <div id="root" className="App">

      {/* <nav>
        <Link to="/">Landing</Link> |{" "}
        <Link to="dashboard">Dashboard</Link>
      </nav> */}
      
      <Router>
        <Landing path="/" />
        <Dashboard path="dashboard" />
      </Router>
    </div>
  );
}

export default App;
