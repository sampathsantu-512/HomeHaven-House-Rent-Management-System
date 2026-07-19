const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "homehaven",
    allowed_formats: [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "heic",
  "gif"
],
  },
});

const upload = multer({ storage });

module.exports = upload;