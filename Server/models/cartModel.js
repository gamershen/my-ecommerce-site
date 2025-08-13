// backend/models/Cart.js
const { DataTypes } = require('sequelize');

const sequelize = require('../db.js'); 
const User = require('./userModel');

const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    // References will be defined in models/index.js now
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'cart',
  timestamps: false, // Set to false because you define 'created_at' manually
  underscored: true
});

// Associations are defined in backend/models/index.js to prevent circular dependencies.
// Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' }); // This line is now in index.js

module.exports = Cart;
