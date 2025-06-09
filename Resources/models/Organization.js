const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../../db/connectDB.js');
const Professional = require('./Professional.js');

const Organization = db.define(
    'Organization',
    {
        org_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(30)
        },
        number_of_employees: {
            type: DataTypes.INTEGER
        },
        owner: {
            type: DataTypes.STRING(15),
            references: {
                model: Professional,
                key: 'username'
            }
        }
    },
    {
        tableName: 'organizations',
        timestamps: false,
    }
);

// Define association with Professional
Organization.belongsTo(Professional, { foreignKey: 'owner' });

module.exports = Organization;