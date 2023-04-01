const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const PORT = 3000;
const app = express();

const authRouter = require("./src/routers/auth/user");
const userRouter = require("./src/routers/user/user");

const postRouter = require("./src/routers/post/post");

dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(morgan("dev"));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://slice-of-sin-react-blog.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/post", postRouter);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then((_) => {
  console.log("database is connected successfully");
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  console.log({ err });
  res.status(err.status || 500).send(err.response);
});

app.listen(PORT, () => console.log(`Server is listening on port : ${PORT}`));
