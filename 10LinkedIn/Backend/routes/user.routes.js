import express from "express";
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const userRoutes = express.Router();

userRoutes.get("/get-current-user", isAuth, getCurrentUser);

export default userRoutes;
