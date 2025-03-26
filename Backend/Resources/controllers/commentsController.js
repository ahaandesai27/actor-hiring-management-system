const Comment = require('../module/Comments')
const CommentController = {
    create: async (req, res) => {
        try {
            const { comment_id, contents, post, creator } = req.body;
            const newComment = await Comment.create({ comment_id, contents, post, creator });
            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { comment_id } = req.params;
            const { contents } = req.body;
            const [updatedRows] = await Comment.update({ contents }, { where: { comment_id } });
            if (updatedRows === 0) {
                return res.status(404).json({ message: "Comment not found or no changes made." });
            }
            res.status(200).json({ message: "Updated successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { comment_id } = req.params;
            const deletedRows = await Comment.destroy({ where: { comment_id } });
            if (deletedRows === 0) {
                return res.status(404).json({ message: "Comment not found." });
            }
            res.status(200).json({ message: "Deleted successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = CommentController;
