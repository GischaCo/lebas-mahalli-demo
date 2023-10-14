const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {
      type: Object,
      required: true,
      // example: {id: ID, fullname: FULLNAME, phone: PHONE},
    },
    text: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      required: true,
      // example: {id: ID, title: TITLE}
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
