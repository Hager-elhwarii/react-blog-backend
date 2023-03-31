const multer = require("multer");

const { errorHandler } = require("../../utils/responseHandler");

const DIR = "./images";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        cb(
          errorHandler("Only .png, .jpg and .jpeg format allowed!", 400),
          false
        )
      );
    }
  },
});

//upload single
exports.uploadSingleImage = (image) => {
  if (!image) next();
  return upload.single(image);
};
