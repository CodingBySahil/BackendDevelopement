const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const RegisterNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isEmailExist = await UserModel.findOne({ email });
    if (isEmailExist)
      return res
        .status(201)
        .json({ message: "User already exits by this email" });
    const isUsernameExist = await UserModel.findOne({ username });
    if (isUsernameExist)
      return res.status(201).json({ message: "Username already exist" });
    const user = await new UserModel({ username, email, password });
    user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
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

    return res.status(200).json({ message: "Login success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { RegisterNewUser, LoginAUser };
