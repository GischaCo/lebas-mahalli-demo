const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    sales: {
      type: Number,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    images: {
      type: Array,
      required: true,
      // example: images: [{ name: first, img: lorem }]
    },
    comments: {
      type: Array,
      default: [],
      // example: comments: [{ fullname: "John Doe", phone: "09112345678", text: "lorem ipsum", date: DATE }]
    },
    category: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
