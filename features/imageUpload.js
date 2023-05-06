const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'upload/images/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileUpload = multer({
  storage,
  limits: {
    fieldSize: 2 * 1024 * 1024, // 1 mb
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },

});

module.exports = fileUpload;
