import React from "react";

const Container = ({ children, styles }) => (
    <div className="container" style={styles}>
        {children}
    </div>
)

export default Container;