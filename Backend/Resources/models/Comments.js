const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../../db/connectDB.js');
const { Post } = require('../models/Posts.js');

const Comment = db.define('Comment', {
    comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    contents: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    post: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Post,
            key: 'post_id'
        }
    },
    creator: {
        type: DataTypes.STRING(15),
        allowNull: true
    }
}, {
    tableName: 'comments',
    timestamps: false
});

module.exports = Comment;
