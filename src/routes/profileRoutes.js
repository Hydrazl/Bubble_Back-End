import express from "express";
import multer from "multer";
import path from "path";
import { getProfile, updateProfile } from "../controllers/user/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get("/profile", verifyToken, getProfile);

router.put(
  "/profile",
  verifyToken,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "profilePic", maxCount: 1 }
  ]),
  updateProfile
);

export default router;