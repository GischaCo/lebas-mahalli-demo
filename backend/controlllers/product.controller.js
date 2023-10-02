require("dotenv").config();
const Product = require("../models/product.model");

const productsList = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send({
      data: products,
      message: "عملیات با موفقیت انجام شد",
      success: true,
    });
  } catch (error) {
    return res.status(400).send({
      message: "خطا در دریافت لیست محصولات",
      success: false,
    });
  }
};

module.exports = { productsList };
