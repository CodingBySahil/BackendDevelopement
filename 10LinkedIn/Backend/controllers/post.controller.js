import uploadOnCloudinary from "../config/cloudinary.js";
import Post from "../models/post.model.js";
// controller for creating a post
export const createPost = async (req, res) => {
  try {
    const { description } = req.body;
    let newPost;
    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path);
      newPost = await Post.create({
        author: req.userId,
        description,
        image,
      });
    } else {
      newPost = await Post.create({
        author: req.userId,
        description,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
};
