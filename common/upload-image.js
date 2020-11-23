const multer = require('multer');

module.exports.uploadImage = (type = 'misc') => {
  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, `./upload/${type}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer(storage);
  // console.log(upload);
  //   read context about fieldName
  return upload.single(type);
};
