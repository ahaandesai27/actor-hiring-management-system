const {Sequelize, Datatypes, DATE} = require('sequelize');
const {db} = require('../../db/connectDB.js');
const DataTypes = require('sequelize/lib/data-types');
const Films = require('./Films.js')


const roles = db.define('Roles',{

    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    information: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_for: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    pay: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false
    },
    film_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Films,
            key: 'film_id'
        }
    },
    deadline: {
        type: DataTypes.DATE,
        defaultValue: () => new Date(Date.now() + (14 * 24 * 60 * 60 * 1000))
    },
    offered_to: {
        type: DataTypes.STRING
    }
},{
    tableName: "roles",
    timestamps: false,
})

module.exports = roles;