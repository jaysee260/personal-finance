var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 5000;
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize database
const { initializeDb } = require("./db")
initializeDb();

// Register routes
const { router } = require("./routes");
app.use(router);

app.listen(PORT, function() {
    console.log("Server running on http://localhost:%s", PORT);
});