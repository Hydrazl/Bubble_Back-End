import express from 'express';
import { newPostController } from "../controllers/post/createPostController.js";
import { getPostByIdController } from '../controllers/post/getPostByiDController.js';
import { upload } from "../middleware/multerConfig.js";

const router = express.Router();

router.post('/posts', upload.single('media'), newPostController);

// Buscar pelo ID
router.get('/posts/:id', getPostByIdController);

export default router;