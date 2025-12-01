import express from 'express';
import { followUserController } from '../controllers/follow/followUserController.js';
import { checkFollowingController } from '../controllers/follow/checkFollowingController.js';
import { getFollowingCountController } from '../controllers/follow/getFollowingCountController.js';
import { getFollowersCountController } from '../controllers/follow/getFollowersCountController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/users/:userId/follow', verifyToken, followUserController);
router.get('/users/:userId/is-following', verifyToken, checkFollowingController);
router.get('/users/:userId/followers-count', getFollowersCountController);
router.get('/users/:userId/following-count', getFollowingCountController);

export default router;