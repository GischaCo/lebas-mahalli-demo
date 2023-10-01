require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Product = require("../models/product.model");
// const ObjectId = require("mongodb").ObjectId;

const addProduct = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // new product data coming from request's body
    const productData = req.body;

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // fint user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // add product to database
    Product.create({
      ...productData,
    });

    // set response
    res.status(200).send({
      data: result,
      message: "محصول با موفقیت ثبت شد",
      status: 200,
      success: true,
    });
  } catch (err) {
    res.status(400).send({
      message: "خطا در ثبت محصول",
      status: 400,
      success: true,
    });
    console.log(err);
  }
};

module.exports = { addProduct };
