require("dotenv").config();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Product = require("../models/product.model");

const addProduct = async (req, res) => {
  try {
    // get token from request header
    const userToken = req.header("Authorization");
    const tokenArray = userToken.split(" ");

    // get & decode user token data
    const decodedData = jwt.verify(tokenArray[1], process.env.TOKEN_KEY);

    // fint user
    const user = await User.findOne({ phone: decodedData.phone });

    // check if request sender's role is admin
    if (user.role === "user") {
      return res.status(400).send({
        message: "شما به این بخش دسترسی ندارید",
        status: 400,
        success: false,
      });
    }

    // store images
    const image = req.body.image;
    const images = req.body.images;

    // get product's data coming from request's body
    const reqBody = req.body;

    // set default data
    const defaultData = {
      sales: 0,
      comments: [],
    };

    // set product's final data
    const productData = {
      ...reqBody,
      image: "null",
      images: "null",
      ...defaultData,
    };

    // save product
    const product = new Product(productData);
    await product
      .save()
      .then((result) => {
        // save main image
        const data = image.replace(/^data:image\/\w+;base64,/, "");
        const buf = Buffer.from(data, "base64");
        fs.mkdir(`./public/upload/products/${result._id}`, (fsError) => {
          if (fsError) {
            console.log(fsError);
          }

          createImageFile(result._id);
        });

        // create image file
        const createImageFile = (id) => {
          fs.writeFile(
            `./public/upload/products/${id}/main.png`,
            buf,
            function (fsError) {
              if (fsError) {
                console.log(fsError);
              }

              createProductImagesDirectory(id);

              saveOtherImages(id, images);
            }
          );
        };

        // create a directory for product's other image
        const createProductImagesDirectory = (id) => {
          fs.mkdir(`./public/upload/products/${id}/images`, (fsError) => {
            if (fsError) {
              console.log(fsError);
            }
          });
        };

        // save other images
        const saveOtherImages = (id, images) => {
          const imagesKeys = Object.keys(images);
          for (let i in imagesKeys) {
            const imageData = images[imagesKeys[i]].replace(
              /^data:image\/\w+;base64,/,
              ""
            );
            const imageBuf = Buffer.from(imageData, "base64");
            fs.writeFile(
              `./public/upload/products/${id}/images/${imagesKeys[i]}.png`,
              imageBuf,
              function (fsError) {
                if (fsError) {
                  console.log(fsError);
                }
              }
            );
          }
        };
      })
      .catch((err) => {
        res.status(400).send({
          message: "خطا در ثبت محصول",
          status: 400,
          success: false,
        });
        console.log(err);
      });
    res.status(200).send({
      message: "محصول با موفقیت ثبت شد",
      status: 200,
      success: true,
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

module.exports = { addProduct };
