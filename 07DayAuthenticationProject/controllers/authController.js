const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// ======================
// REGISTER CONTROLLER
// ======================
const RegisterNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for existing user by email or username
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";
      return res.status(409).json({ message: `${field} already exists` });
    }

    // Create and save new user
    const user = new UserModel({ username, email, password });
    await user.save();

    // Generate token
    const token = generateToken(user);

    // Set token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(201)
      .json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ======================
// LOGIN CONTROLLER
// ======================
const LoginAUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate token
    const token = generateToken(user);

    // Set token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ======================
// LOGOUT CONTROLLER
// ======================
const LogoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

// ======================
// DASHBOARD ROUTE
// ======================
const dashboardRoute = (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.username}, this is your dashboard.`,
    user: req.user,
  });
};

module.exports = {
  RegisterNewUser,
  LoginAUser,
  LogoutUser,
  dashboardRoute,
};
