const express = require("express");
const adminController = require("../controlllers/admin.controller");

const router = express.Router();

// auth
router.route("/api/admin/add-product").post(adminController.addProduct);

module.exports = router;
