const express = require("express");
const { protect } = require("../../controllers/auth/auth");
const {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} = require("../../controllers/post/index.js");

const {
  uploadSingleImage,
} = require("../../middlewares/upload-img/upload-img");

const validatePost = require("../../validation/post/post");

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);

postRouter.post(
  "/",
  protect,
  validatePost,
  uploadSingleImage("file"),
  createPost
);

postRouter.patch(
  "/:id",
  protect,
  validatePost,
  uploadSingleImage("file"),
  updatePost
);

postRouter.delete("/", protect, deletePost);

module.exports = postRouter;
