import express from "express";
import { checkLike } from "../controllers/like/checkLikeController.js"
import { toggleLike } from "../controllers/like/toggleLikeController.js"
import { getPostLikes } from "../controllers/like/getPostLikesController.js"
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/posts/:postId/like', verifyToken, toggleLike);
router.get('/posts/:postId/like', verifyToken, checkLike)
router.get('/posts/:postId/likes', verifyToken, getPostLikes)

export default router;