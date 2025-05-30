const ProfessionalLikes = require("../models/ProfessionalLikes");
const Posts = require('../models/Posts');

const LikesController = {
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

  getLiked: async (req, res) => {
    const { professional } = req.params;
    try {
        const likes = await ProfessionalLikes.findAll({
            where: { professional },
            include: [{
                model: Posts, // Adjust path if needed
                as: 'Post', // Use the alias if defined in your association, otherwise remove 'as'
            }]
        });
        // Extract the post objects
        const posts = likes.map(like => like.Post);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

};


module.exports = LikesController;