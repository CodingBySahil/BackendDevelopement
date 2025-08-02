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

// controller for getting all posts
export const getALlPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "firstName lastName profileImage headline")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

// controller for like the posts
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId); // ✅ FIXED

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ✅ Toggle like
    if (post.like.includes(userId)) {
      // Already liked → unlike
      post.like = post.like.filter((id) => id != userId);
    } else {
      // Not liked → like it
      post.like.push(userId);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post like updated",
      like: post.like,
    });
  } catch (error) {
    console.error("Error liking post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to like post",
      error: error.message,
    });
  }
};

// controller for comment the posts
export const commentOnPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const { content } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comment: { content, user: userId } } },
      { new: true }
    ).populate("comment.user", "firstName lastName profileImage headline");

    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      post,
    });
  } catch (error) {
    console.error("Error commenting on post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to comment on post",
      error: error.message,
    });
  }
};
