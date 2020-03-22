import React from "react";

// TODO: Consider displaying accounts as a grid of cards on the dashboard.
const Account = ({ id, name, type }) => (
    <li
        id={id}
        className="list-group-item"
    >
        {name} - {type}
    </li>
)

export default Account;