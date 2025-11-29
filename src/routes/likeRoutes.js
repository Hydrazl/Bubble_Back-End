import express from "express";
import { toggleLike, getLikesCount } from "../controllers/like/likeController"

const route = express.Route();

router.post('/toggle', toggleLike);
router.get('/count/:postId', getLikesCount)

export default router;