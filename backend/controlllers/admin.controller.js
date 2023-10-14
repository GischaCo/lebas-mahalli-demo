require("dotenv").config();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const Comment = require("../models/comment.model");
const ObjectId = require("mongodb").ObjectId;

// prpoducts
const allProducts = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // find user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // get products list
    await Product.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        let productsList = result;
        productsList.forEach((product) => {
          // convert images into binary
          // |-- main image
          product.image = product.image.toString("base64");
          // |-- other images
          let images = [];
          product.images.forEach((imageBuf) => {
            images.push(imageBuf.toString("base64"));
          });
          product.images = images;
        });

        // send products list via response
        return res.status(200).send({
          data: result,
          message: "لیست محصولات با موفقیت دریافت شد",
          status: 200,
          success: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send({
          message: "خطا در دریافت لیست محصولات",
          status: 400,
          success: false,
        });
      });
  } catch (error) {
    return res.status(400).send({
      message: "خطا در دریافت لیست محصولات",
      status: 400,
      success: false,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // find user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // product is sending via params
    const productId = req.params.id;

    // get product's data
    await Product.findById(productId)
      .then((result) => {
        // convert images into binary
        // |-- main image
        const image = result.image.toString("base64");
        // |-- other images
        let images = [];
        result.images.forEach((imageBuf) => {
          images.push(imageBuf.toString("base64"));
        });

        // send products list via response
        res.status(200).send({
          data: { ...result._doc, image, images },
          message: "اطلاعات محصول با موفقیت دریافت شد",
          status: 200,
          success: true,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({
          message: "خطا در دریافت اطلاعات محصول",
          status: 400,
          success: false,
        });
      });
  } catch (error) {
    return res.status(400).send({
      message: "خطا در دریافت اطلاعات محصول",
      status: 400,
      success: false,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // find user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // get product's data coming from request's body
    const reqBody = req.body;

    // store images
    // |- convert main image into Buffer
    const binaryImage = req.body.image;
    const imgData = binaryImage.replace(/^data:image\/\w+;base64,/, "");
    const image = Buffer.from(imgData, "base64");
    // |- convert other images into Buffer
    const binaryImages = req.body.images;
    let images = [];
    binaryImages.forEach((imgObj) => {
      const imageData = imgObj.img.replace(/^data:image\/\w+;base64,/, "");
      const bufImage = Buffer.from(imageData, "base64");
      images.push(bufImage);
    });

    // set default data
    const defaultData = {
      sales: 0,
      comments: [],
    };

    // set product's final data
    const productData = {
      ...reqBody,
      image: image,
      images: images,
      ...defaultData,
    };

    // save product
    const product = new Product(productData);

    await product
      .save()
      .then(() => {
        res.status(200).send({
          message: "محصول با موفقیت افزوده شد",
          status: 200,
          success: true,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({
          message: "خطا در ثبت محصول",
          status: 400,
          success: false,
        });
      });
  } catch (err) {
    res.status(400).send({
      message: "خطا در ثبت محصول",
      status: 400,
      success: false,
    });
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // find user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // get product's id
    const id = req.header("id");

    // get product's new data
    const data = req.body.data;

    // update product
    Product.updateOne({ _id: new ObjectId(id) }, { $set: data })
      .then(() => {
        res.status(200).send({
          message: "محصول با موفقیت ویرایش شد",
          status: 200,
          success: true,
        });
      })
      .catch((errr) => {
        console.log("error updating product:", errr);
        res.status(400).send({
          message: "خطا در ویرایش محصول",
          status: 400,
          success: false,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "خطا در حذف محصول",
      status: 400,
      success: false,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // find user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // get product's id
    const id = req.params.id;

    // delete product from database
    await Product.findByIdAndDelete(id);

    // delete product's images
    fs.rmSync(
      `./public/upload/products/${id}`,
      { recursive: true, force: true },
      function (fsError) {
        if (fsError) console.log(fsError);
      }
    );

    // send response
    return res.status(200).send({
      message: "محصول با موفقیت حذف شد",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "خطا در حذف محصول",
      status: 400,
      success: false,
    });
  }
};

// users
const allUsers = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // find user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // get admins & users list separated to show admins first
    const users = await User.find().sort({ createdAt: -1 });

    // send users list via response
    return res.status(200).send({
      data: users,
      message: "لیست کاربران با موفقیت دریافت شد",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "خطا در دریافت لیست کاربران",
      status: 400,
      success: false,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // find user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // get user's id
    const id = req.params.id;

    // delete user from database
    await User.findById(id)
      .then(async (result) => {
        const adminID = user._id.toString();
        const targetUserID = result._id.toString();
        if (adminID === targetUserID) {
          return res.status(400).send({
            message: "شما نمی‌توانید حساب خودتان را حذف کنید",
            status: 400,
            success: false,
          });
        } else {
          await User.findByIdAndDelete(id)
            .then(() => {
              return res.status(200).send({
                message: "کاربر با موفقیت حذف شد",
                status: 200,
                success: true,
              });
            })
            .catch((error) => {
              console.log(error);
              return res.status(400).send({
                message: "خطا در حذف کاربر",
                status: 400,
                success: false,
              });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send({
          message: "خطا در حذف کاربر",
          status: 400,
          success: false,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "خطا در حذف کاربر",
      status: 400,
      success: false,
    });
  }
};

// comments
const allComments = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // find user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // find all comments and sort by date
    const comments = await Comment.find().sort({ createdAt: -1 });

    // send comments list via response
    return res.status(200).send({
      data: comments,
      message: "لیست دیدگاه‌ها با موفقیت دریافت شد",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "خطا در دریافت لیست دیدگاه‌ها",
      status: 400,
      success: false,
    });
  }
};
const replyComment = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // find user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // product's id
    const productID = req.header("id");

    // product's comment's id to reply
    const commentID = req.body.id;

    // reply data
    const { fullname, text } = req.body;

    Product.findById(productID).then((result) => {
      let comments = result.comments;
      const commentIndex = comments.findIndex(
        (comment) => comment._id.toString() === commentID
      );
      comments[commentIndex].replies.push({
        fullname,
        text,
      });

      // update product
      Product.updateOne(
        { _id: new ObjectId(productID) },
        { $set: { comments } }
      )
        .then(() => {
          res.status(200).send({
            message: "پاسخ با موفقیت ثبت شد",
            status: 200,
            success: true,
          });
        })
        .catch((errr) => {
          console.log("error updating product:", errr);
          res.status(400).send({
            message: "خطا در ثبت پاسخ",
            status: 400,
            success: false,
          });
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "خطا در حذف محصول",
      status: 400,
      success: false,
    });
  }
};

module.exports = {
  // products
  allProducts,
  singleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  // users
  allUsers,
  deleteUser,
  // comments
  allComments,
  replyComment,
};
