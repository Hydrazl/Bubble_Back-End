import express from 'express';
import { createComment, getCommentsByPost, deleteComment } from '../controllers/commet/commetController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/comments', verifyToken, createComment);
router.get('/comments/:postId', getCommentsByPost);
router.delete('/comments/:id', verifyToken, deleteComment);

export default router;
