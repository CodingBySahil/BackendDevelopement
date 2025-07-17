const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../config/multer");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

// ✅ CREATE POST (Push post to User's posts array)
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

    // ✅ Push post to user's posts array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { posts: saved._id },
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get All Posts with Author & Comments (with Comment Authors)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username profilePic gender")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username profilePic gender",
        },
      })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ LIKE/UNLIKE POST (Update likedPosts in User)
router.put("/:id/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {
      // ✅ Unlike (Remove from likedPosts)
      post.likes.pull(req.user._id);
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { likedPosts: post._id },
      });
    } else {
      // ✅ Like (Add to likedPosts)
      post.likes.push(req.user._id);
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { likedPosts: post._id },
      });
    }

    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ SHARE POST (Update sharedPosts in User)
router.post("/:id/share", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.shares += 1;
    await post.save();

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { sharedPosts: post._id },
    });

    res.json({ message: "Post shared", shares: post.shares });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ EDIT POST
router.put("/:id", protect, upload.single("media"), async (req, res) => {
  const { content } = req.body;
  const mediaFile = req.file;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only author can edit
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this post" });
    }

    post.content = content || post.content;
    if (mediaFile) {
      post.media = mediaFile.filename;
      post.mediaType = mediaFile.mimetype.startsWith("video")
        ? "video"
        : "image";
    }

    const updated = await post.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE POST (Also remove from User's posts, likedPosts, sharedPosts)
router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only author can delete
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    // Delete all comments related to the post
    await Comment.deleteMany({ post: post._id });

    // Remove post reference from User's arrays
    await User.updateMany(
      {},
      {
        $pull: {
          posts: post._id,
          likedPosts: post._id,
          sharedPosts: post._id,
        },
      }
    );

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
