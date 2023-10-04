const express = require("express");
const adminController = require("../controlllers/admin.controller");

const router = express.Router();

// products
router.route("/api/admin/all-products").get(adminController.allProducts);
router
  .route("/api/admin/single-product/:id")
  .get(adminController.singleProduct);
router.route("/api/admin/add-product").post(adminController.addProduct);
router.route("/api/admin/update-product").post(adminController.updateProduct);
router
  .route("/api/admin/delete-product/:id")
  .delete(adminController.deleteProduct);

module.exports = router;
