require("dotenv").config();
const jwt = require("jsonwebtoken");
// const Product = require("../models/product.model")
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

    // test
    console.log(decodedData);

    // add product
    // ...
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addProduct };
