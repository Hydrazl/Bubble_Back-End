import express from 'express';
import { newPostController } from "../controllers/post/createPostController.js";
import { getPostByIdController } from '../controllers/post/getPostByIdController.js';
import { deletePostController } from "../controllers/post/deletePostController.js";
import upload from "../middleware/uploadMIddleware.js";
import { verifyToken }  from "../middleware/authMiddleware.js";
import { getAllPostsController } from '../controllers/post/getAllPostsController.js';
import { updatePostController } from '../controllers/post/updatePostController.js';

const router = express.Router();

router.post("/posts", upload.single("postImage"), verifyToken, newPostController);
router.get("/posts", getAllPostsController);
router.get('/home/:id', verifyToken, getPostByIdController);
router.put('/:id', upload.single('media'), updatePostController);
router.delete('/home/:id', verifyToken, deletePostController);

export default router;