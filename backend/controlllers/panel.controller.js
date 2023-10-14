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
    res.status(400).send({
      message: "خطای سرور؛ در صورت نیاز با پشتیبانی تماس بگیرید",
      status: 400,
      success: false,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // new cart item data
    const newCartItem = req.body;

    // update user cart
    User.findById(decodedData.user_id)
      .then((user) => {
        let userCart = user.cart;
        userCart.push(newCartItem);

        User.updateOne(
          { _id: new ObjectId(user._id) },
          { $set: { cart: userCart } }
        ).then(() => {
          res.status(200).send({
            message: "محصول با موفقیت به سبد خرید اضافه شد",
            status: 200,
            success: true,
          });
        });
      })
      .catch((error) => {
        console.log("error updating user cart:", error);
        res.status(400).send({
          message: "خطا در بروزرسانی سبد خرید",
          status: 400,
          success: false,
        });
      });
  } catch (err) {
    res.status(400).send({
      message: "خطا در بروزرسانی سبد خرید",
      status: 400,
      success: false,
    });
  }
};

module.exports = { userUpdate, addToCart };
