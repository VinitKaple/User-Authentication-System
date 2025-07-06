import express from "express";
import { checkAuth,login, logout, register, resetPassword, sendResetOpt } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddle.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);
router.post('/sendResetotp', sendResetOpt);
router.post('/resetPassword', resetPassword);


export default router;