const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "../files");
    cb(null, path.join(__dirname, '..', '/files'))

  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname);
  },
});

const upload = multer({ storage: storage });
const uploadFileMiddleware = upload.single("image");

module.exports = uploadFileMiddleware;