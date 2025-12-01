import express from 'express';
import { completeProfile } from '../controllers/user/completeProfileController.js';
import { registerUser } from '../controllers/user/createUserController.js'
import { loginUser } from '../controllers/user/loginUserController.js'
import { verifyToken } from "../middleware/authMiddleware.js";
import { getByIdUser } from '../controllers/user/getUserById.js';
import upload from '../middleware/uploadMIddleware.js';

const router = express.Router();

router.post("/", loginUser);
router.post("/register", registerUser);
router.post('/complete-profile', upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), completeProfile); 
router.get("/profile/:userId", verifyToken, getByIdUser);

export default router;