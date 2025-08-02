import express from "express";
import { createPost } from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";
import isAuth from "../middlewares/isAuth.js";

// Define the post routes
const postRoutes = express.Router();

// Route for creating a post
postRoutes.post("/create-post", isAuth, upload.single("image"), createPost);
export default postRoutes;
