const { postModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw errorHandler("invalid post id", 400);
    }
    const post = await postModel.findById(id).populate("author");

    if (!post) {
      throw errorHandler("post not found", 404);
    }

    successHandler(res, post, undefined);
  } catch (err) {
    next(err);
  }
};


module.exports=getPost