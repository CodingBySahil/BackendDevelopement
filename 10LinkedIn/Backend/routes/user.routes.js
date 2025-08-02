import express from "express";
import {
  getCurrentUser,
  updateProfile,
} from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const userRoutes = express.Router();

userRoutes.get("/get-current-user", isAuth, getCurrentUser);
userRoutes.put(
  "/update-profile",
  isAuth,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateProfile
);

export default userRoutes;
