const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../config/multer");
const Post = require("../models/Post");

// ✅ CREATE POST
router.post("/", protect, upload.single("media"), async (req, res) => {
  const { content } = req.body;
  const mediaFile = req.file;

  try {
    const newPost = new Post({
      author: req.user._id,
      content,
      media: mediaFile ? mediaFile.filename : "",
      mediaType: mediaFile
        ? mediaFile.mimetype.startsWith("video")
          ? "video"
          : "image"
        : "none",
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username profilePic")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" },
      });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ LIKE/UNLIKE POST
router.put("/:id/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const liked = post.likes.includes(req.user._id);
    if (liked) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ SHARE POST
router.post("/:id/share", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.shares += 1;
    await post.save();

    res.json({ message: "Post shared", shares: post.shares });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
