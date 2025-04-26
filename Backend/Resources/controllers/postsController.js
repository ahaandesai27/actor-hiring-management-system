const Post = require('../models/Posts');
const Comment = require('../models/Comments');

const PostController = {
    create: async (req, res) => {
        const { post_id, contents, creator} = req.body;
        try {
            const newPost = await Post.create({
                post_id,
                contents,
                creator
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
    getByCreator: async(req, res) => {
        try {
            const {creator} = req.params;
            const posts = await Post.find({
                where: {creator}
            });
            res.status(200)
               .json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
          }
                  },
    getComments: async (req, res) => {
        try {
          const {post} = req.params;
          const comments = await Comment.find({
            where: [post]
          });
          res.status(200)
             .json(comments);

        } catch (error) {
            res.status(500)
               .json({error: error.message})
          }                        
    },
    update: async (req, res) => {
        try {
            const { post_id } = req.params;
            const info = req.body;
            const [updatedRows] = await Post.update(info, { where: { post_id } });
            if (updatedRows === 0) {
                return res.status(404).json({ message: "Post not found or no changes made." });
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
    }
}

module.exports = PostController;
