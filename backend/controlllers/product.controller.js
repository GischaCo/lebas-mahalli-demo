require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const Product = require("../models/product.model");
const ObjectId = require("mongodb").ObjectId;

const productsList = async (req, res) => {
  try {
    await Product.find()
      .then((products) => {
        return res.status(200).send({
          data: products,
          message: "عملیات با موفقیت انجام شد",
          success: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send({
          message: "خطا در انجام عملیات",
          success: false,
        });
      });
  } catch (error) {
    return res.status(400).send({
      message: "خطا در انجام عملیات",
      success: false,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    await Product.findById(productID)
      .then((product) => {
        return res.status(200).send({
          data: product,
          message: "عملیات با موفقیت انجام شد",
          success: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send({
          message: "خطا در انجام عملیات",
          success: false,
        });
      });
  } catch (error) {
    return res.status(400).send({
      message: "خطا در انجام عملیات",
      success: false,
    });
  }
};

const addComment = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // verify user token
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // get user data
    const user = await User.findById(decodedData.user_id);

    // get product's id
    const id = req.params.id;

    // get product's new data
    const data = req.body.data;

    // update product
    Product.findById(id).then((result) => {
      // send new comment to admin panel
      const newComment = new Comment({
        user: {
          id: user._id.toString(),
          fullname: user.fullname,
          phone: user.phone,
        },
        product: {
          id: result._id.toString(),
          title: result.title,
        },
        text: data.text,
        replies: [],
      });

      newComment
        .save()
        .then((commentResult) => {
          console.log("comment saved to admin database successfully");

          // now, update product's comments
          let comments = result.comments;
          comments.push(commentResult);

          Product.updateOne(
            { _id: new ObjectId(id) },
            { $set: { comments } }
          ).then(() => {
            res.status(200).send({
              message: "دیدگاه با موفقیت ثبت شد",
              status: 200,
              success: true,
            });
          });
        })
        .catch((errr) => {
          console.log("error adding comment:", errr);
          res.status(400).send({
            message: "خطا در ثبت دیدگاه",
            status: 400,
            success: false,
          });
        });
    });
  } catch (error) {
    console.log("error adding comment:", error);
    return res.status(400).send({
      message: "خطا در ثبت دیدگاه",
      status: 400,
      success: false,
    });
  }
};

module.exports = { productsList, singleProduct, addComment };
