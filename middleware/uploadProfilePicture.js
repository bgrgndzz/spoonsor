const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../public/res/uploads'));
  },
  filename: (req, file, callback) => {
    const uid = req.session.user.id;
    const date = Date.now();
    const originalname = file.originalname.replace(/\s/g, '');
    callback(null, `${uid}__${date}__${originalname}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Sadece fotoğraflar yüklenebilir.'));
    }
    callback(null, true);
  },
  limits:{fileSize: 1024 * 1024}
});

module.exports = upload.single('profilepicture');