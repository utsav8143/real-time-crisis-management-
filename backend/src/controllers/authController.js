import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/config.js";
import sessionmodel from "../models/Sessionmodel.js";

// @desc Register User
// @ROUTE POST api/auth/register

export async function register(req, res) {
  const { email, password, name } = req.body;

  try {
    const isAlreadyRegistered = await userModel.findOne({ email });

    if (isAlreadyRegistered) {
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
        password: user.password,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

// @desc Login User
// @ROUTE POST /api/auth/login

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).josn({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      return res.satatus(401).json({ message: "User not verified" });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const isPasswordValid = hashedPassword === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    const refreshTokenHashed = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionmodel.create({
      user: user._id,
      refreshTokenHashed,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    console.log("Error in fething the user:", err);
  }
}

// @desc Get current loggeIn user
// @ROUTE GET /api/auth/get-me

export async function getMe(params) {}

// @desc Logout User
// @ROUTE GET /api/auth/logout

export async function logout(req, res) {}

// @desc Verify Email
// @ROUTE POST /api/auth/verify-email

export async function verifyEmail(req, res) {}
