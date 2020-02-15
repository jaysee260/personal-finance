var express = require("express");
var plaid = require("plaid");

var app = express();
var PORT = 3000;

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    var accounts = [
        {
            id: 1,
            name: "Personal Checking"
        },
        {
            id: 2,
            name: "Joint Checking"
        },
        {
            id: 3,
            name: "Personal Savings"
        },
        {
            id: 4,
            name: "Joint Savings"
        }
    ];

    res.render("home.ejs", {
        accounts
    });
});

app.listen(PORT, function() {
    console.log("Server running on port %s", PORT);
});