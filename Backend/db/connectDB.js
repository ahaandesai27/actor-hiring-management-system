const { Sequelize } = require('sequelize');

const db = new Sequelize('actor', 'root', 'Ahaan1?23', {
    host: 'localhost',
    dialect: 'mariadb',
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