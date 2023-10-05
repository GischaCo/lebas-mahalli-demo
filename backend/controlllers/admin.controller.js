require("dotenv").config();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const ObjectId = require("mongodb").ObjectId;

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
    const products = await Product.find();

    // send products list via response
    return res.status(200).send({
      data: products,
      message: "لیست محصولات با موفقیت دریافت شد",
      status: 200,
      success: true,
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
    const product = await Product.findById(productId);

    // send products list via response
    return res.status(200).send({
      data: product,
      message: "اطلاعات محصول با موفقیت دریافت شد",
      status: 200,
      success: true,
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
      images: {},
      ...defaultData,
    };

    // save product
    const product = new Product(productData);
    await product
      .save()
      .then((result) => {
        const productId = result._id.toString();

        // image data
        const imagesData = {
          image: "",
          images: {},
        };

        // save main image
        const data = image.replace(/^data:image\/\w+;base64,/, "");
        const buf = Buffer.from(data, "base64");
        fs.mkdir(`./public/upload/products/${productId}`, (fsError) => {
          if (fsError) {
            console.log(fsError);
          }

          createImageFile(productId);
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

              imagesData.image = `/${id}/main.png`;
              createProductImagesDirectory(id);

              saveOtherImages(id, images);

              updateProductImages(id, imagesData);
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

            imagesData.images[
              imagesKeys[i]
            ] = `/${id}/images/${imagesKeys[i]}.png`;
          }
        };

        // save porduct's images url
        const updateProductImages = (id, data) => {
          Product.updateOne({ _id: new ObjectId(id) }, { $set: data })
            .then(() => {
              console.log("update product's image");
            })
            .catch((errr) => {
              console.log("error updating product's image:", errr);
            });
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

    // send response
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
        // image
        const image = data.image;
        const images = data.images;
        const imagesData = {
          image: image,
          images: { ...images },
        };
        // ---- main ----
        if (image.startsWith("data")) {
          // remove image
          fs.rm(
            `./public/upload/products/${id}/main.png`,
            { recursive: true, force: true },
            function (fsError) {
              if (fsError) console.log(fsError);

              // then
              const imageData = image.replace(/^data:image\/\w+;base64,/, "");
              const buf = Buffer.from(imageData, "base64");
              fs.writeFile(
                `./public/upload/products/${id}/main.png`,
                buf,
                function (fsError) {
                  if (fsError) {
                    console.log(fsError);
                  }

                  imagesData.image = `/${id}/main.png`;

                  console.log("saved:", imagesData.image);

                  // ---- images ----
                  const testFunc = (callback) => {
                    const imagesKeys = Object.keys(images);
                    let remainedFiles = imagesKeys.length;
                    for (let i in imagesKeys) {
                      remainedFiles--;
                      const img = images[imagesKeys[i]];
                      // console.log("img::::::::::::::", img);
                      if (img.startsWith("data")) {
                        // remove image
                        fs.rm(
                          `./public/upload/products/${id}/images/${imagesKeys[i]}.png`,
                          { recursive: true, force: true },
                          function (fsError) {
                            if (fsError) console.log(fsError);

                            const signleImageData = img.replace(
                              /^data:image\/\w+;base64,/,
                              ""
                            );
                            const imageBuf = Buffer.from(
                              signleImageData,
                              "base64"
                            );
                            console.log("imagesKeys[i]::::", imagesKeys[i]);
                            fs.writeFile(
                              `./public/upload/products/${id}/images/${imagesKeys[i]}.png`,
                              imageBuf,
                              function (fsError) {
                                if (fsError) {
                                  console.log(fsError);
                                }
                                console.log("saveeeeeeeeeeeeeeeeeeeed");
                                imagesData.images[
                                  imagesKeys[i]
                                ] = `/${id}/images/${imagesKeys[i]}.png`;

                                // database stuff
                                console.log("remainedFiles::::", remainedFiles);
                                if (remainedFiles === 0) {
                                  callback();
                                }
                              }
                            );
                          }
                        );
                      }
                    }
                  };

                  // save to database
                  const saveToDatabase = () => {
                    Product.updateOne(
                      { _id: new ObjectId(id) },
                      { $set: imagesData }
                    )
                      .then(() => {
                        console.log("imagesData::::", imagesData);
                        console.log("update product's image");
                        res.status(200).send({
                          message: "محصول با موفقیت ویرایش شد",
                          status: 200,
                          success: true,
                        });
                      })
                      .catch((err) => {
                        res.status(400).send({
                          message: "خطا در ویرایش محصول",
                          status: 400,
                          success: false,
                        });
                        console.log("error updating product's image:", err);
                      });
                  };

                  // run
                  testFunc(saveToDatabase);
                }
              );
            }
          );
        } else {
          console.log("testtttttttttttttttttt");
          // ---- images ----
          const testFunc = (callback) => {
            const imagesKeys = Object.keys(images);
            let remainedFiles = imagesKeys.length;
            for (let i in imagesKeys) {
              remainedFiles--;
              const img = images[imagesKeys[i]];
              // console.log("img::::::::::::::", img);
              if (img.startsWith("data")) {
                // remove image
                fs.rm(
                  `./public/upload/products/${id}/images/${imagesKeys[i]}.png`,
                  { recursive: true, force: true },
                  function (fsError) {
                    if (fsError) console.log(fsError);

                    const signleImageData = img.replace(
                      /^data:image\/\w+;base64,/,
                      ""
                    );
                    const imageBuf = Buffer.from(signleImageData, "base64");
                    console.log("imagesKeys[i]::::", imagesKeys[i]);
                    fs.writeFile(
                      `./public/upload/products/${id}/images/${imagesKeys[i]}.png`,
                      imageBuf,
                      function (fsError) {
                        if (fsError) {
                          console.log(fsError);
                        }
                        console.log("saveeeeeeeeeeeeeeeeeeeed");
                        imagesData.images[
                          imagesKeys[i]
                        ] = `/${id}/images/${imagesKeys[i]}.png`;

                        // database stuff
                        console.log("remainedFiles::::", remainedFiles);
                        if (remainedFiles === 0) {
                          callback();
                        }
                      }
                    );
                  }
                );
              }
            }
          };

          // save to database
          const saveToDatabase = () => {
            Product.updateOne({ _id: new ObjectId(id) }, { $set: imagesData })
              .then(() => {
                console.log("imagesData::::", imagesData);
                console.log("update product's image");
                res.status(200).send({
                  message: "محصول با موفقیت ویرایش شد",
                  status: 200,
                  success: true,
                });
              })
              .catch((err) => {
                res.status(400).send({
                  message: "خطا در ویرایش محصول",
                  status: 400,
                  success: false,
                });
                console.log("error updating product's image:", err);
              });
          };

          // run
          testFunc(saveToDatabase);
        }
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

module.exports = {
  addProduct,
  allProducts,
  deleteProduct,
  updateProduct,
  singleProduct,
};
