const express = require("express");
const categoryRouter = require("./routes/category.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes
app.use("/", categoryRouter);

module.exports = app;
