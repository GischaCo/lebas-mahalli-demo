require("dotenv").config();
const cors = require("cors");
const express = require("express");
const categoryRouter = require("./routes/category.routes");
const userRouter = require("./routes/user.routes");
require("./config/database").connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes
app.use("/", categoryRouter);
app.use("/", userRouter);

module.exports = app;
