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

// users
router.route("/api/admin/all-users").get(adminController.allUsers);
router.route("/api/admin/delete-user/:id").delete(adminController.deleteUser);

// comments
router.route("/api/admin/all-comments").get(adminController.allComments);

module.exports = router;
