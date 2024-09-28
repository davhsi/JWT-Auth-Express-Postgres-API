const { Sequelize } = require('sequelize');
require('dotenv').config(); // Ensure .env is being read

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432, // Use the database port
    dialectOptions: {
        ssl: process.env.DB_HOST !== 'localhost' ? {
            require: true,
            rejectUnauthorized: false // Use this only for testing; set it to true in production
        } : false // Disable SSL for local connections
    },
    logging: false,
});


module.exports = { sequelize };
