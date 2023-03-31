// core modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    posts: {
      type: Array,
    },
    avatar: {
      id: String,
      url: String,
    },
    bio: String,
  },
  { timestamps: true },

  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);
module.exports = userSchema;
