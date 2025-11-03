import express from 'express';
import { toggleLike, getLikesCount } from '../controllers/like/likeController.js';

const router = express.Router();

router.post('/like', toggleLike);
router.get('/like/:postId', getLikesCount);

export default router;