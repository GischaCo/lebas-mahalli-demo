require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const fs = require("fs");
// const ObjectId = require("mongodb").ObjectId;

const addProduct = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

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

    // work on product's binary image
    const image = req.body.image;
    const bufferedImage = new Buffer(image, "base64");

    // work on product's binary images
    const images = req.body.images;
    let bufferedImages = [];
    for (let i in images) {
      const bufferedItem = new Buffer(images[i], "base64");
      bufferedImages.push(bufferedItem);
    }

    // set default data
    const defaultData = {
      sales: 0,
      comments: [],
    };

    // get product's data coming from request's body
    const reqBody = req.body;

    // set product's final data
    const productData = {
      ...reqBody,
      image: bufferedImage,
      images: bufferedImages,
      ...defaultData,
    };

    // add product to database
    Product.create(productData);

    // set response
    res.status(200).send({
      message: "محصول با موفقیت ثبت شد",
      status: 200,
      success: true,
    });
  } catch (err) {
    res.status(400).send({
      message: "خطا در ثبت محصول",
      status: 400,
      success: false,
    });
    console.log(err);
  }
};

module.exports = { addProduct };
