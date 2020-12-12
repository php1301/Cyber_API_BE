const multer = require('multer');

module.exports.uploadImage = (type = 'misc') => {
  // Ta truyền arg là type vào để lưu đúng folder, default param là folder misc
  const storage = multer.diskStorage({
    // Nơi lưu file, null là error null
    destination: (req, res, cb) => {
      cb(null, `./upload/${type}`);
    },
    // Tên file - ngày hiện tại và tên file, null là error
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  // Khởi tạo multer object cho storage đã config trên
  const upload = multer(storage);
  // console.log(upload);
  //   read context about fieldName
  // upload 1 file 1 lần
  return upload.single(type);
};
