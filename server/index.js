var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 80;
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Register routes
var landingRouter = require("./routes/landingRouter");
var plaidRouter = require("./routes/plaidRouter");

app.use("/", landingRouter);
app.use("/api/plaid", plaidRouter);

app.listen(PORT, function() {
    console.log("Server running on port %s", PORT);
});