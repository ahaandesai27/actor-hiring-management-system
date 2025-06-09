const { Sequelize, DataTypes, DATE } = require('sequelize');
const { db } = require('../../db/connectDB.js');

const Connections = db.define('Connections', {
    professional1: DataTypes.STRING,
    professional2: DataTypes.STRING,
  }, { tableName: 'connections', timestamps: false });

module.exports = Connections;
