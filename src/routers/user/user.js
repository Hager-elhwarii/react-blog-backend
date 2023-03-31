const express = require("express");
const { protect } = require("../../controllers/auth/auth");

const { getUser, updateUser } = require("../../controllers/users/");

const userRouter = express.Router();

userRouter.get("/me", getUser);

userRouter.patch("/", protect, updateUser);

module.exports = userRouter;
