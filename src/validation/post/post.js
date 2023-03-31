const joi = require("joi");

const { errorHandler } = require("../../utils/responseHandler");

const postSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  recipe: joi.string().required(),
});

const validatePost = async (req, res, next) => {
  try {
    await postSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(
      errorHandler(
        err.details.map((err) => err.message),
        400
      )
    );
  }
};

module.exports = validatePost;
