const { Sequelize, DataTypes, DATE } = require('sequelize');
const { db } = require('../../db/connectDB.js');

const Post = db.define('Post', {
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    }
}, {
    tableName: 'posts',
    timestamps: false
});

module.exports = Post;