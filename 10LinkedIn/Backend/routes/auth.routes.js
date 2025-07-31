import express from "express";
import { signUpController } from "../controllers/auth.controllers.js";
const authRoutes = express.Router();

authRoutes.post("/signup", signUpController)

export default authRoutes