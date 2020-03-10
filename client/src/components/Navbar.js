import React from "react";

const Navbar = ({ brandName }) => (
    <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">{ brandName }</span>
    </nav>
)

export default Navbar;