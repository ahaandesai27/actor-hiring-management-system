const { Sequelize, DataTypes, DATE } = require('sequelize');
const { db } = require('../../db/connectDB.js');
const Film = require('./Films.js');
const WorkedOn = require('./WorkedOn.js');


const Professional = db.define(
    'Professional',
    {
        username: {
            type: DataTypes.STRING(15),
            allowNull: false,  
            primaryKey: true
        },
        full_name: {
            type: DataTypes.STRING(25),
            allowNull: false  
        },
        profession: {
            type: DataTypes.STRING(8),
            allowNull: false,
            defaultValue: 'actor'
        },
        years_of_experience: DataTypes.INTEGER,
        rating: {
            type: DataTypes.DECIMAL(4,2),
            defaultValue: 5.00
        },
        profile_picture: {
            type: DataTypes.STRING(500),
            allowNull: true
        }
    },
    {
        tableName: 'professionals',
        timestamps: true,
        updatedAt: false
    }
);


module.exports = Professional;