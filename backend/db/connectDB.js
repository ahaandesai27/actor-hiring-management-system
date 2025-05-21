const { Sequelize } = require('sequelize');
require('dotenv').config()

const db = new Sequelize(process.env.DATABASE_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
})

const connectDB = async () => {
    try {
        await db.authenticate();
        console.log("Successfully connected to database");
    } catch(error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {db, connectDB};