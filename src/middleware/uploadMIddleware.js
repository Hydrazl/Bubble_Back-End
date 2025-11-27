import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "others";

    if (file.fieldname === "banner") folder = "banner";
    else if (file.fieldname === "profile") folder = "profile";
    else if (file.fieldname === "postImage") folder = "posts";

    const uploadPath = path.join("uploads", "users", folder);
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}${ext}`;
    cb(null, fileName);
  }
});


const upload = multer({ storage });

export default upload;
