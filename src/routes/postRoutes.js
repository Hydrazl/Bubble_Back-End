import express from 'express';
import { newPostController } from "../controllers/post/createPostController.js";
import { getPostByIdController } from '../controllers/post/getPostByiDController.js';
import { deletePostController } from "../controllers/post/deletePostController.js";
import upload from "../middleware/uploadMIddleware.js";
import { verifyToken }  from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/posts", upload.single("postImage"), newPostController);

router.get('/home/:id', getPostByIdController);

router.delete('/home/:id', verifyToken, deletePostController);

export default router;