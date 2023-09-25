const express = require("express");
const categoryRouter = require("./routes/category.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes
app.use("/", categoryRouter);

module.exports = app;
