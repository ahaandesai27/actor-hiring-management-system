const { Sequelize, DataTypes, DATE } = require('sequelize');
const { db } = require('../../db/connectDB.js');

const Applications = db.define('Applications', {
    professional: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    audition_url: DataTypes.STRING,
    paragraph: DataTypes.STRING,
  }, { tableName: 'applications', timestamps: false });

module.exports = Applications;
