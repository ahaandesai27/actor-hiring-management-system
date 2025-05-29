const Post = require("../models/Posts");
const Comment = require("../models/Comments");
const ProfessionalLikes = require("../models/ProfessionalLikes");

const PostController = {
  create: async (req, res) => {
    const { contents, creator } = req.body;
    try {
      const newPost = await Post.create({
        contents,
        creator,
      });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const Posts = await Post.findAll();
      res.status(200).json(Posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const { post_id } = req.params;
      const post = await Post.findByPk(post_id);
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getByCreator: async (req, res) => {
    try {
      const { creator } = req.params;
      const posts = await Post.findAll({
        where: { creator },
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getComments: async (req, res) => {
    try {
      const { post } = req.params;
      console.log(post);
      const comments = await Comment.findAll({
        where: { post },
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { post_id } = req.params;
      const info = req.body;
      const [updatedRows] = await Post.update(info, { where: { post_id } });
      if (updatedRows === 0) {
        return res
          .status(404)
          .json({ message: "Post not found or no changes made." });
      }
      res.status(200).json({ message: "Updated successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { post_id } = req.params;
      const deletedRows = await Post.destroy({ where: { post_id } });
      if (deletedRows === 0) {
        return res.status(404).json({ message: "Post not found." });
      }
      res.status(200).json({ message: "Deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  like: async (req, res) => {
    const { professional, post_id } = req.body;
    try {
      // Create a like if not already exists (optional to prevent duplicates)
      const [newLike, created] = await ProfessionalLikes.findOrCreate({
        where: { professional, post_id },
      });
      if (!created) {
        return res.status(409).json({ message: "Already liked" });
      }
      res.status(201).json(newLike);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  hasLiked: async (req, res) => {
    const { professional, post_id } = req.params;
    try {
      const like = await ProfessionalLikes.findOne({
        where: { professional, post_id },
      });
      res.status(200).json({ liked: !!like });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  unLike: async (req, res) => {
    const { professional, post_id } = req.body;
    try {
      const deleted = await ProfessionalLikes.destroy({
        where: { professional, post_id },
      });
      if (deleted) {
        return res.status(200).json({ message: "Unliked successfully" });
      } else {
        return res.status(404).json({ message: "Like not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = PostController;
