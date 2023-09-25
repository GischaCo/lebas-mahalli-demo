const express = require("express");
const categoryController = require("../controlllers/category.controller");

const router = express.Router();

router.route("/api/categories").get(categoryController.categoriesList);
router
  .route("/api/categories/:categoryId")
  .get(categoryController.categoryById);

router.param("categoryId", categoryController.categoryById);

module.exports = router;
