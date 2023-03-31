const { getRounds } = require("bcrypt");
const { postModel } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

const getPosts = async (req, res, next) => {
  try {
    // const { limit } = req.query;
    const allPosts = await postModel
      .find({})
      .populate("author")
      .sort("-createdAt");
    // console.log({ allPosts });
    // const posts = await postModel
    //   .find({})
    //   .limit(limit ?? undefined)
    //   .populate("user");
    // console.log({ allPosts });
    successHandler(res, allPosts);
  } catch (err) {
    next(err);
  }
};

module.exports = getPosts;
