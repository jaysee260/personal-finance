var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 80;
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to Mongo DB
mongoose.connect(
    process.env.MONGO_DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to Mongo DB.")
);

// Register routes
var authRouter = require("./routes/authRouter");
var landingRouter = require("./routes/landingRouter");
var plaidRouter = require("./routes/plaidRouter");

app.use("/auth", authRouter);
app.use("/", landingRouter);
app.use("/api/plaid", plaidRouter);

app.listen(PORT, function() {
    console.log("Server running on port %s", PORT);
});