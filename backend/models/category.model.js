const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    // persian display title
    type: String,
    required: true,
  },
  name: {
    // English name
    type: String,
    required: true,
  },
  path: {
    // category path endpoint e.g. /example/sample
    type: String,
    required: true,
  },
  isParent: {
    type: Boolean,
    required: true,
  },
  parent: {
    // parent category endpoint
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
