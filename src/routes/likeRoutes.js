import express from "express";
import { toggleLike, getLikesCount } from "../controllers/like/likeController.js"

const router = express.Router();

router.post('/toggle', toggleLike);
router.get('/count/:postId', getLikesCount)

export default router;