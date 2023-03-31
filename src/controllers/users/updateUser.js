const { imgbbUpload } = require("../../middlewares/imgbb/imgbb");
const {
  sharpHandler,
  uploadSingleImage,
} = require("../../middlewares/upload-img/upload-img");
const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { hashPassword, comparePassword } = require("../auth/auth");

const updateUser = async (req, res, next) => {
  try {
    // const { new_password, curr_password ,avatarUrl} = req.body;
    const { avatarUrl, userId } = req.body;
    // const getUser = await userModel.findById(req.userId).select("password");

    // console.log(getUser);
    // if (parseInt(getUser.id) !== parseInt(req.userId)) {
    //   throw errorHandler("unauthorized", 401);
    // }

    // let userBody = { ...req.body };

    // if (new_password && new_password === curr_password) {
    //   throw errorHandler("new password should be different", 401);
    // }

    // if (curr_password && new_password) {
    //   await comparePassword(curr_password, getUser.password);
    //   userBody.password = await hashPassword(new_password);
    // }

    // await userModel.findByIdAndUpdate(req.userId, userBody);
    const user = await userModel.findOne({ id: userId });
    const userBody = { ...user, avatar: { id: 2345, url: avatarUrl } };
    await userModel.findByIdAndUpdate(userId, userBody);

    // if (req.files?.photo) {
    //   userBody.photo = await imgbbUpload(...req.files.photo);
    // }

    // if (req.files?.cover_photo) {
    //   userBody.cover_photo = await imgbbUpload(...req.files.cover_photo);
    // }

    // await userModel.findByIdAndUpdate(req.userId, userBody);

    const updatedUser = await userModel.findById(req.userId);

    successHandler(res, updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = updateUser;
