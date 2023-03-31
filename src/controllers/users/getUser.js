const { userModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userId);

    if (!user) throw errorHandler("user not found", 404);

    successHandler(res, user);
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
