const express = require("express");

const { signUp, signIn } = require("../../controllers/auth/");
const { signupValid, signinValid } = require("../../validation/user/auth");

const authRouter = express.Router();

authRouter.post("/sign-up", signupValid, signUp);
authRouter.post("/sign-in", signinValid, signIn);

module.exports = authRouter;
