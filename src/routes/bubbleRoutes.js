import express from 'express';
import { getAllBubbles, getPostsFromBubble } from '../controllers/post/bubbleController.js';

const router = express.Router();

router.get("/", getAllBubbles),
router.get("/:id/posts", getPostsFromBubble);

export default router;