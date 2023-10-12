const express = require("express");
const productController = require("../controlllers/product.controller");

const router = express.Router();

router.route("/api/all-products").get(productController.productsList);
router.route("/api/single-product/:id").get(productController.singleProduct);
router.route("/api/add-comment/:id").post(productController.addComment);

module.exports = router;
