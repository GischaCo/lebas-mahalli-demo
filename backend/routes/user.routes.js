const express = require("express");
const authController = require("../controlllers/auth.controller");
const panelController = require("../controlllers/panel.controller");

const router = express.Router();

// auth
router.route("/api/auth/register").post(authController.userRegister);
router.route("/api/auth/login").post(authController.userLogin);
router.route("/api/auth/profile").get(authController.userProfile);

// panel
router.route("/api/panel/update-profile").post(panelController.userUpdate);
router.route("/api/panel/add-to-cart").post(panelController.addToCart);

module.exports = router;
