// routes/trendingRoutes.js
import express from 'express';
import { getTopUsers, getTopPosts, getBubblesPlaceholder } from '../controllers/trending/trendingController.js';

const router = express.Router();

router.get('/trending/users', getTopUsers);
router.get('/trending/posts', getTopPosts);
router.get('/trending/bubbles', getBubblesPlaceholder);

export default router;
