const express = require("express");
const UserModel = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>hello sahil</h1>");
});

router.post("/register", async (req, res) => {
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
});
module.exports = router;
