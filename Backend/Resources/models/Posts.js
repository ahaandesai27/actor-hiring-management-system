const { Sequelize, DataTypes, DATE } = require('sequelize');
const { db } = require('../../db/connectDB.js');

const Post = db.define('Post', {
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    contents: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    likes: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0
    },
    creator: {
        type: DataTypes.STRING(15),
        allowNull: true
    }
}, {
    tableName: 'posts',
    timestamps: false
});

module.exports = Post;