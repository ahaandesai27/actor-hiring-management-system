const { Sequelize, DataTypes, DATE } = require('sequelize');
const { db } = require('../../db/connectDB.js');

const WorkedOn = db.define('WorkedOn', {
    professional: DataTypes.STRING,
    film: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
  }, { tableName: 'worked_on', timestamps: false });

module.exports = WorkedOn;
