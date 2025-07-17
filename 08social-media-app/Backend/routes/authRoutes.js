const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Multer for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Register
router.post("/register", async (req, res) => {
  const { username, email, password, gender } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password, gender });
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      gender: user.gender,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      gender: user.gender,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// ✅ Get logged-in user
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("posts")
    .populate("likedPosts")
    .populate("sharedPosts");

  res.json(user);
});

// ✅ Update Profile (bio, address, profilePic)
router.put(
  "/update",
  protect,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const { bio, address, gender } = req.body;
      const updatedData = { bio, address, gender };
      if (req.file) updatedData.profilePic = `/uploads/${req.file.filename}`;

      const user = await User.findByIdAndUpdate(req.user._id, updatedData, {
        new: true,
      })
        .populate("posts")
        .populate("likedPosts")
        .populate("sharedPosts");

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ✅ Get user by ID (Profile Page)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("posts")
      .populate("likedPosts")
      .populate("sharedPosts");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
