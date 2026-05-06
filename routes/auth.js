import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const options = {
  httpOnly: true,
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// POST /api/auth/register
//get the data
//check for existing user
//save user to database
//generate token
//send response
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ email, username, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(201)
      .cookie("token", token, options)
      .json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login
//get the data
//find the user
//validate user
//compare the password
//generate token
//return response
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res
        .status(400)
        .json({ error: "Email and password fields must not be empty" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Email or password incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .cookie("token", token, options)
      .json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// POST /api/auth/logout
//clear cookie
//return response
router.post("/logout", async (req, res) => {
  res
    .clearCookie("token", options)
    .json({ message: "User logged out successfully" });
});

// GET /api/auth/me — check if user is logged in
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
