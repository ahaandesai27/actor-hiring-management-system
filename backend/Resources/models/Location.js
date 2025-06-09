const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../../db/connectDB.js');

const Location = db.define(
    'Location',
    {
        latitude: {
            type: DataTypes.FLOAT(9,6),
            allowNull: false,
            primaryKey: true
        },
        longitude: {
            type: DataTypes.FLOAT(9,6),
            allowNull: false,
            primaryKey: true
        },
        freq_of_booking: {
            type: DataTypes.INTEGER
        },
        rating: {
            type: DataTypes.FLOAT(3,2)
        },
        cost_of_booking: {
            type: DataTypes.INTEGER
        },
        conditions: {
            type: DataTypes.STRING(256)
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: 'locations',
        timestamps: false
    }
);

module.exports = Location;