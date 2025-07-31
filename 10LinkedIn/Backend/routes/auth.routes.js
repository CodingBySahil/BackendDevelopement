import express from "express";
import { loginController, signUpController } from "../controllers/auth.controllers.js";
const authRoutes = express.Router();

authRoutes.post("/signup", signUpController)
authRoutes.post("/login", loginController)

export default authRoutes