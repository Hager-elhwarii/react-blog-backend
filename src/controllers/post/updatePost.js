const { imgbbUpload } = require("../../middlewares/imgbb/imgbb");
const { postModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

const updatePost = async (req, res, next) => {
  console.log("updating post ...");
  console.log(req.body);
  let url = "";
  let imageId = "";

  try {
    const { id } = req.params;

    if (!id) {
      throw errorHandler("invalid post id", 400);
    }
    const post = await postModel.findById(id);

    if (!post) {
      throw errorHandler("post not found", 404);
    }

    // if (parseInt(post.user) !== parseInt(req.userId)) {
    //   throw errorHandler("unauthorized", 401);
    // }

    // let postData = { ...req.body, user: req.userId };

    if (req.file) {
      ({ url, id: imageId } = await imgbbUpload(req.file.filename));
    } else if (req.body.image) {
      ({ url, id: imageId } = JSON.parse(req.body.image));
    }

    let postData = { ...req.body, image: { url, id: imageId } };

    await postModel.findByIdAndUpdate(id, {
      ...postData,
    });

    const updatedPost = await postModel.findById(id);
    successHandler(res, updatedPost);
  } catch (err) {
    next(err);
  }
};

module.exports = updatePost;
