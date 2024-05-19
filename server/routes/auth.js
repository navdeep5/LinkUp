// Import packages
import express from 'express';
import {login} from "../controllers/auth.js";

// Set up router
const router = express.Router();

router.post("/login", login);

export default router;