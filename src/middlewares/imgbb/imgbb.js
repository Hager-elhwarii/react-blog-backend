const fs = require("fs");
const imgbbUploader = require("imgbb-uploader");
const dotenv = require("dotenv");
const { errorHandler } = require("../../utils/responseHandler");

const DIR = "./images";
dotenv.config();

exports.imgbbUpload = async (file) => {
  console.log("uploading image to imgbb");
  try {
    const result = await imgbbUploader(process.env.IMGBB_KEY, `${DIR}/${file}`);

    if (result) {
      console.log({ result });

      fs.unlink(`${DIR}/${file}`, function (err) {
        if (err) {
          console.log(err);
        }
      });
      return { url: result.url, id: result.id };
    }
  } catch (err) {
    console.log(err);
    throw errorHandler("failed to upload images", 500);
  }
};
