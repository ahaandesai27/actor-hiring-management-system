const { Sequelize, DataTypes, DATE } = require('sequelize');
const { db } = require('../../db/connectDB.js');

const Applications = db.define('Applications', {
    professional: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
<<<<<<< Updated upstream
    audition_url: DataTypes.STRING,
    paragraph: DataTypes.STRING,
=======
>>>>>>> Stashed changes
  }, { tableName: 'applications', timestamps: false });

module.exports = Applications;
