const uuid = require("uuid");
const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { hashPassword, signUserToken } = require("./auth");

const signUp = async (req, res, next) => {
  console.log({ body: req.body });

  try {
    const { username, email, password } = req.body;

    // check if user exist
    const checkedUser = await userModel.findOne({ email });
    if (checkedUser) {
      throw errorHandler(
        "email is already exist try different email or sign in",
        400
      );
    }
    // hash password
    const pass = await hashPassword(password);
    console.log({ pass });
    // create new user

    await userModel.create({
      ...req.body,
      password: pass,
      avatar: { id: uuid.v4(), url: "" },
    });

    //get the user
    const newUser = await userModel.findOne({ email });

    //add access token
    const access_token = await signUserToken(newUser.id);
    console.log({ access_token });

    // handle response
    // successHandler(res, {
    //   access_token,
    //   user: newUser,
    // });
    res.status(200).send({
      userBody: newUser,
      access_token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = signUp;
