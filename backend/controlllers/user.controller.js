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
        message: "Missing a required input",
        success: false,
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ phone });

    if (oldUser) {
      return res.status(409).send({
        message: "User Already Exist. Please Login",
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
    res.status(201).send({
      data: user,
      message: "User successfully registered",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { userRegister };
