import { Router } from "express";
import { register, login, logout, getMe, verifyEmail } from "../controllers/authController.js";

const authRoute=Router();

// POST /api/auth/register
authRoute.post("/register",register)

// GET /api/auth/login
authRoute.get("/login",login);

// GET /api/auth/get-me
authRoute.get("/get-me",getMe)

// GET /api/ath/logout
authRoute.get("/logout",logout)

// POST /api/auth/verify-email
authRoute.post("/verify-email",verifyEmail)

export default authRoute