import express from 'express';
import { registerUser } from '../controllers/user/createUserController.js'
import { loginUser } from '../controllers/user/loginUserController.js'

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;