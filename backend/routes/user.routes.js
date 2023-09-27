const express = require("express");
const userController = require("../controlllers/user.controller");

const router = express.Router();

router.route("/api/auth/register").post(userController.userRegister);

router.route("/api/auth/login").post(userController.userLogin);

module.exports = router;
