import express from 'express';
import { registerUser } from '../controllers/user/createUserController.js'
import { loginUser } from '../controllers/user/loginUserController.js'
import { verifyToken } from "../middleware/authMiddleware.js";
import { getByIdUser } from '../controllers/user/getUserById.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/", loginUser);
router.get("/profile/:userId", verifyToken, getByIdUser);

export default router;