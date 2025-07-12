const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const RegisterNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isEmailExist = await UserModel.findOne({ email });
    if (isEmailExist)
      return res.status(409).json({ message: "Email already exists" });

    const isUsernameExist = await UserModel.findOne({ username });
    if (isUsernameExist)
      return res.status(409).json({ message: "Username already exists" });

    const user = await new UserModel({ username, email, password });
    await user.save();

    const token = generateToken(user);
    return res.status(201).json({ message: "User created", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const LoginAUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    return res
      .cookie("token", token, {
        httpOnly: true, // Can't be accessed via JS
        secure: false, // true if you're using HTTPS (set to false in development)
        sameSite: "strict", // Helps prevent CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({ message: "Login success", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const LogoutUser = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logged out" });
};
const dashboardRoute = (req, res) => {
  res.send(`Welcome ${req.user.username}, this is your dashboard.`);
};

module.exports = { RegisterNewUser, LoginAUser, dashboardRoute, LogoutUser };
