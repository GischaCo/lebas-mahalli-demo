require("dotenv").config();
const cors = require("cors");
const express = require("express");
const categoryRouter = require("./routes/category.routes");
const userRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");
const productRouter = require("./routes/product.routes");
require("./config/database").connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes
app.use("/", categoryRouter);
app.use("/", userRouter);
app.use("/", adminRouter);
app.use("/", productRouter);

module.exports = app;
