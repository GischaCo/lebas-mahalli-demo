const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {
      type: Object,
      required: true,
      // example: {id: ID, fullname: FULLNAME, phone: PHONE},
    },
    product: {
      type: Object,
      required: true,
      // example: {id: ID, title: TITLE}
    },
    text: {
      type: String,
      required: true,
    },
    replies: {
      type: Array,
      required: true,
      // example: {fullname: FULLNAME, text: REPLYTEXT}
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
