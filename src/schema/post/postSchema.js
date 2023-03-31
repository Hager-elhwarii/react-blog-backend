//core modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    recipe: {
      type: String,
    },
    image: {
      id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);
module.exports = postSchema;
