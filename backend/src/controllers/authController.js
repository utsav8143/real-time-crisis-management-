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

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      token: accessToken,
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
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // if (!user.verified) {
    //   return res.satatus(401).json({ message: "User not verified" });
    // }

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
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
}

// @desc Get current loggeIn user
// @ROUTE GET /api/auth/get-me

export async function getMe(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).josn({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    console.log(decoded);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.loh("Error:", err);
  }
}

// @desc Refresh the access Token
// @ROUTE GET /api/auth/refresh-token

export async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  
  try {
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET_KEY);

    const refreshTokenHashed = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionmodel.findOne({
      refreshTokenHashed,
      revoked: false,
    });

    if (!session) {
      return res.status(401).json({ message: "Invalid or expired session" });
    }

    const accessToken = jwt.sign(
      {
        id: decoded._id,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    const newRefreshToken = jwt.sign(
      {
        id: decoded._id,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    const newRefreshTokenHashed = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    session.refreshTokenHashed = newRefreshTokenHashed;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Access Token refreshed successfully",
      accessToken,
    });
  } catch (err) {
    console.log("Error:", err);
  }
}

// @desc Logout User
// @ROUTE GET /api/auth/logout

export async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token not found" });
  }

  const refreshTokenHashed = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionmodel.findOne({
    refreshTokenHashed,
    revoked: false,
  });

  if (!session) {
    return res.status(401).json({ message: "Invalid refresh Token" });
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logged out successfully" });
}


