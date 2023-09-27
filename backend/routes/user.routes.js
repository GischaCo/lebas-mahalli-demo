const express = require("express");
const userController = require("../controlllers/user.controller");

const router = express.Router();

router.route("/api/auth/register").post(userController.userRegister);
// router
//   .route("/api/categories/:categoryId")
//   .get(categoryController.categoryById);

// router.param("categoryId", categoryController.categoryById);

module.exports = router;
