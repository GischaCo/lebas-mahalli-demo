const express = require("express");
const adminController = require("../controlllers/admin.controller");

const router = express.Router();

// products
router.route("/api/admin/add-product").post(adminController.addProduct);
router.route("/api/admin/all-products").get(adminController.allProducts);

module.exports = router;
