import express from 'express';
import { registerUser } from '../controllers/user/createUserController.js'
import { loginUser } from '../controllers/user/loginUserController.js'
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/perfil", verifyToken, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.email}` });
});

export default router;