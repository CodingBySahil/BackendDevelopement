import express from "express";
import { createPost, getALlPosts } from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";
import isAuth from "../middlewares/isAuth.js";

// Define the post routes
const postRoutes = express.Router();

// Route for creating a post
postRoutes.post("/create-post", isAuth, upload.single("image"), createPost);
postRoutes.get("/get-all-posts", isAuth, getALlPosts);
export default postRoutes;
