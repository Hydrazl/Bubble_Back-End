import express from 'express';
import { newPostController } from "../controllers/post/createPostController.js";
import { getPostByIdController } from '../controllers/post/getPostByiDController.js';
import { deletePostController } from "../controllers/post/deletePostController.js";
import upload from "../middleware/uploadMIddleware.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/posts', verifyToken, upload.single('media'), newPostController);

router.get('/posts/:id', getPostByIdController);

router.delete('/posts/:id', verifyToken, deletePostController);

export default router;