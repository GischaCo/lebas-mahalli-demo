require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
// const categoryRouter = require("./routes/category.routes");
// const userRouter = require("./routes/user.routes");
// const adminRouter = require("./routes/admin.routes");
// const productRouter = require("./routes/product.routes");
require("./config/database").connect();

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// mount routes
// app.use("/", categoryRouter);
// app.use("/", userRouter);
// app.use("/", adminRouter);
// app.use("/", productRouter);

module.exports = app;
