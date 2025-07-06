import express from "express";
import { getUserData } from "../controllers/userController.js";
import { checkAuth } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddle.js";

const router = express.Router();

// POST route to fetch user data by userId
router.get("/data",getUserData);

export default router;
