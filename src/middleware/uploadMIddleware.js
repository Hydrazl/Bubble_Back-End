import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const baseUploadPath = process.env.UPLOADS_PATH || "uploads";
const userPath = process.env.USERS_UPLOADS_PATH || `${baseUploadPath}/users`;
const tempPath = process.env.TEMPS_UPLOADS_PATH || `${baseUploadPath}/temps`;

// Garante que as pastas existam
[userPath, tempPath].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Função que decide o destino dinamicamente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Se for upload de perfil (exemplo)
    if (req.baseUrl.includes("user")) {
      cb(null, userPath);
    } 
    // Se for upload temporário (exemplo)
    else if (req.baseUrl.includes("temp")) {
      cb(null, tempPath);
    } 
    // Caso padrão
    else {
      cb(null, baseUploadPath);
    }
  },

  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
