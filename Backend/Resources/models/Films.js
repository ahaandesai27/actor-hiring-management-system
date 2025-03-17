const { Sequelize, DataTypes, DATE } = require('sequelize');
const { db } = require('../../db/connectDB.js');

const Film = db.define('Film', {
    film_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    genre: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    summary: {
        type: DataTypes.STRING(300),
        allowNull: true
    },
    rating: {
        type: DataTypes.FLOAT(4, 2),
        allowNull: true
    },
    release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
}, {
    tableName: 'film',
    timestamps: false
});

module.exports = Film;