import React from "react";

// This is basically a container/wrapper.
// We are currently using our own css .wrap class,
// but maybe look into leveraging bootstrap container or fluid container
const Body = ({ children }) => (
  <div className="wrap">
    {children}
  </div>
);

export default Body;