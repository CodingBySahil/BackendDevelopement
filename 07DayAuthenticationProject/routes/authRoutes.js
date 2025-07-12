const express = require("express");
const {
  RegisterNewUser,
  LoginAUser,
  dashboardRoute,
  LogoutUser,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, dashboardRoute);
router.post("/register", RegisterNewUser);
router.post("/login", LoginAUser);
router.get("/logout", LogoutUser);

module.exports = router;
