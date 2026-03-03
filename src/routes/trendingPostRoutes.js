
import express from "express";
import { getTrendingPosts } from "../controllers/trending/trendingControllerpost.js"; 
const router = express.Router();

router.get("/", getTrendingPosts);

export default router;
