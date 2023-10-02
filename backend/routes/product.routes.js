const express = require("express");
const productController = require("../controlllers/product.controller");

const router = express.Router();

router.route("/api/all-products").get(productController.productsList);

module.exports = router;
