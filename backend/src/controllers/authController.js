import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/config.js";

// @desc Register User
// @ROUTE POST api/auth/register

export async function register(req, res) {
  const { email, password, name } = req.body;

  try {
    const isAlreadyRegistered = await userModel.findOne({ email });

    if (!isAlreadyRegistered) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

// @desc Login User
// @ROUTE POST /api/auth/login

export async function login(req, res) {}

// @desc Get current loggeIn user
// @ROUTE GET /api/auth/get-me

export async function getMe(params) {}

// @desc Logout User
// @ROUTE GET /api/auth/logout

export async function logout(req, res) {}

// @desc Verify Email
// @ROUTE POST /api/auth/verify-email

export async function verifyEmail(req, res) {}
