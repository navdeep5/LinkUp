// Import packages
import express from "express";
import {getFeedPost, getUserPost, likePost} from "../controllers/posts.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/", verifyToken, getFeedPost);  // Get user feed from home page
router.get("/:userId/posts", verifyToken, getUserPost);  // Get user posts

// Update
router.patch("/:id/like", verifyToken, likePost);  // Like post