const { imgbbUpload } = require("../../middlewares/imgbb/imgbb");
const { postModel } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

const createPost = async (req, res, next) => {
  console.log("creating post ...");

  console.log({ body: req.body });
  console.log({ user: req.user });
  // console.log({ file: req.file });
  let id = "";
  let url = "";
  console.log({ user: req.user });
  try {
    if (req.file) {
      ({ url, id } = await imgbbUpload(req.file.filename));
    }

    const post = { ...req.body, image: { id, url }, author: req.user };
    console.log({ post });

    const createdPost = new postModel(post);
    await postModel.create(createdPost);

    successHandler(res, createdPost);
  } catch (err) {
    next(err);
  }
};

module.exports = createPost;
