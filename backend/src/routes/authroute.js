import { Router } from "express";
import { register, login, logout, getMe, verifyEmail, refreshToken } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRoute=Router();

// POST /api/auth/register
authRoute.post("/register",register)

// POST /api/auth/login
authRoute.post("/login",login);

// GET /api/auth/get-me
authRoute.get("/get-me",protect,getMe)

// GET /api/auth/refresh-token
authRoute.get("/refresh-token",refreshToken)

// GET /api/ath/logout
authRoute.get("/logout",logout)

export default authRoute