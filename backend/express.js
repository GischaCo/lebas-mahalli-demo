require("dotenv").config();
const cors = require("cors");
const express = require("express");
const categoryRouter = require("./routes/category.routes");
require("./config/database").connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes
app.use("/", categoryRouter);

module.exports = app;
