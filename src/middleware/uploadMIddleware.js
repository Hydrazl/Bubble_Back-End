import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = file.fieldname === "banner" ? "banner" : "profile";
    const uploadPath = path.join("uploads", "users", folder);

    // Cria automaticamente se não existir
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
