// backend/config/db.config.js
const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME || 'fullstack';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'root';
const DB_HOST = process.env.DB_HOST || 'localhost';

// Create a new Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, { // Database, Username, Password
  host: DB_HOST,
  dialect: 'mysql', // Specify the database dialect
  logging: false,   // Set to true to see SQL queries in console (useful for debugging)
  pool: {           // Connection pool options
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test the connection
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Sequelize: Connection to MySQL has been established successfully.');
  } catch (error) {
    console.error('Sequelize: Unable to connect to the database:', error);
    process.exit(1); // Exit process if database connection fails
  }
}

// Call the function to connect when this module is loaded
connectDB();

module.exports = sequelize; // Export the sequelize instance