const express = require("express");
const mongoose = require("mongoose");

// app
const app = express();

// connect database
const dbURI =
  "mongodb://root:K4DQ9H8qQZU767tY@services.irn1.chabokan.net:28938/shop?authSource=admin";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully :)");
    app.listen(3001);
  })
  .catch((err) => {
    console.log("Database connection error: ", err);
  });
