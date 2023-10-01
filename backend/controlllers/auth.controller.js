require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userRegister = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { fullname, phone, password } = req.body;

    // Validate user input
    if (!(fullname && phone && password)) {
      res.status(400).send({
        message: "مقادیر ارسال شده صحیح نیست",
        status: 400,
        success: false,
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ phone });

    if (oldUser) {
      return res.status(409).send({
        message: "این شماره در سایت وجود دارد، وارد شوید",
        status: 409,
        success: false,
      });
    }

    // Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      fullname,
      phone,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, phone },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(200).send({
      data: {
        token: token,
      },
      message: "ثبت‌نام با موفیقت انجام شد",
      status: 200,
      success: true,
    });
  } catch (err) {
    res.status(404).send({
      message: "خطای سرور؛ در صورت نیاز با پشتیبانی تماس بگیرید",
      status: 404,
      success: false,
    });
    console.log(err);
  }
};

const userLogin = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { phone, password } = req.body;

    // Validate user input
    if (!(phone && password)) {
      res.status(400).send({
        message: "مقادیر ارسال شده صحیح نیست",
        status: 400,
        success: false,
      });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ phone });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, phone },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).send({
        data: { token },
        message: "ورود به حساب کاربری با موفقیت انجام شد",
        status: 200,
        success: true,
      });
    } else {
      res.status(409).send({
        message: "شماره موبایل یا رمز عبور اشتباه است",
        status: 409,
        success: false,
      });
    }
  } catch (err) {
    res.status(404).send({
      message: "خطای سرور؛ در صورت نیاز با پشتیبانی تماس بگیرید",
      status: 404,
      success: false,
    });
    console.log(err);
  }
};

const userProfile = async (req, res) => {
  try {
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    User.findById(decodedData.user_id)
      .then((result) => {
        res.status(200).send({
          data: result,
          message: "ورود به حساب کاربری با موفقیت انجام شد",
          status: 200,
          success: true,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "خطا در دریافت اطلاعات حساب کاربری",
          status: 400,
          success: true,
        });
        console.log(err);
      });
  } catch (err) {
    res.status(404).send({
      message: "خطای سرور؛ در صورت نیاز با پشتیبانی تماس بگیرید",
      status: 404,
      success: false,
    });
    console.log(err);
  }
};

module.exports = { userRegister, userLogin, userProfile };