const mongoose = require("mongoose");

module.exports.initializeDb = function() {
  // Connect to Mongo DB
  const mongoConnectionString = 
    process.env.MONGO_DB_CONNECTION_STRING ||
    require("../../config")[process.env.NODE_ENV].database.mongo.connectionString;
    
  mongoose.connect(
      mongoConnectionString,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Connected to Mongo DB.")
  );
}