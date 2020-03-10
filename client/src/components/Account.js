import React from "react";

const Account = ({ id, name, type }) => (
    <li
        id={id}
        className="list-group-item"
    >
        {name} - {type}
    </li>
)

export default Account;