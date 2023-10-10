require("dotenv").config();
const Product = require("../models/product.model");

const productsList = async (req, res) => {
  try {
    await Product.find()
      .then((products) => {
        return res.status(200).send({
          data: products,
          message: "عملیات با موفقیت انجام شد",
          success: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send({
          message: "خطا در انجام عملیات",
          success: false,
        });
      });
  } catch (error) {
    return res.status(400).send({
      message: "خطا در انجام عملیات",
      success: false,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    await Product.findById(productID)
      .then((product) => {
        return res.status(200).send({
          data: product,
          message: "عملیات با موفقیت انجام شد",
          success: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send({
          message: "خطا در انجام عملیات",
          success: false,
        });
      });
  } catch (error) {
    return res.status(400).send({
      message: "خطا در انجام عملیات",
      success: false,
    });
  }
};

module.exports = { productsList, singleProduct };
