import express from 'express';
import { getUserNotifications } from '../controllers/notification/getUserNotificationsController.js';
import { markAsRead } from '../controllers/notification/markAsReadController.js';
import { getUnreadCount } from '../controllers/notification/getUnreadCountController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);
router.get('/', getUserNotifications);
router.get('/unread-count', getUnreadCount);
router.patch('/:id/read', markAsRead);
router.patch('/read-all', markAsRead);

export default router;
