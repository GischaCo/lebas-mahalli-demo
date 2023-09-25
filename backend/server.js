const app = require("./express");
const mongoose = require("mongoose");

// connect database
const dbURI =
  "mongodb://root:jT6PfoXBFrcIqGh14mTYX7Jv@robin.iran.liara.ir:33829/shop?authSource=admin";
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
