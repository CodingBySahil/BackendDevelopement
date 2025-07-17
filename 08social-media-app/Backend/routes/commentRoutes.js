const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// ✅ ADD COMMENT
router.post("/:postId", protect, async (req, res) => {
  const { content } = req.body;

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = new Comment({
      post: post._id,
      author: req.user._id,
      content,
    });

    const saved = await comment.save();

    post.comments.push(saved._id);
    await post.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
