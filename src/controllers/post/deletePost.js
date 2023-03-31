const { postModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

const deletePost = async (req, res, next) => {
  try {
    // console.log({ body: req.body });
    const { id } = req.body;
    // console.log("deleting post");
    if (!id) {
      throw errorHandler("Missing post id", 400);
    }

    const post = await postModel.findById(id);

    if (!post) {
      throw errorHandler("post not found", 404);
    }

    // if (parseInt(post.user) !== parseInt(req.userId)) {
    //   throw errorHandler("unauthorized", 401);
    // }

    await postModel.findByIdAndRemove(id);

    successHandler(res, post);
  } catch (err) {
    next(err);
  }
};

module.exports = deletePost;
