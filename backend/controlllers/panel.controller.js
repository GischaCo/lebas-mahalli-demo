require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ObjectId = require("mongodb").ObjectId;

const userUpdate = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // new user data coming from request's body
    const newUserData = req.body;

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // update user in database
    User.updateOne(
      { _id: new ObjectId(decodedData.user_id) },
      { $set: newUserData }
    )
      .then((result) => {
        res.status(200).send({
          data: result,
          message: "تغییرات با موفقیت ثبت شد",
          status: 200,
          success: true,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "خطا در ثبت تغییرات حساب کاربری",
          status: 400,
          success: false,
        });
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { userUpdate };
