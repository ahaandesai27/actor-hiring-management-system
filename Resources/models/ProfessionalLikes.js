const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../../db/connectDB.js');

const ProfessionalLikes = db.define('ProfessionalLikes', {
  professional: {
    type: DataTypes.STRING(15),
    allowNull: false,
    primaryKey: true
  },
  post_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'professional_likes',
  timestamps: false,
  freezeTableName: true
});

module.exports = ProfessionalLikes;
