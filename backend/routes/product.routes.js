const express = require("express");
const productController = require("../controlllers/product.controller");

const router = express.Router();

// auth
router.route("/api/admin/add-product").post(productController.addProduct);

module.exports = router;
