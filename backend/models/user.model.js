const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    default: null,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    default: null,
  },
  gender: {
    type: Number,
    default: 0, // 0: not determined, 1: woman, 2: man
  },
  role: {
    type: String,
    default: "user",
  },
  cart: {
    type: Array,
    default: [],
  },
  purchases: {
    type: Array,
    default: [],
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
