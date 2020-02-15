var express = require("express");
var app = express();
var path = require("path");
var PORT = 3000;

var accounts = [
    {
        name: "Personal Checking"
    },
    {
        name: "Joint Checking"
    }
];

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home.ejs", {
        ACCOUNTS: accounts,
        num: 5
    });
});

app.listen(PORT, function() {
    console.log("Server running on port %s", PORT);
});