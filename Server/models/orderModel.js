// backend/models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    // Foreign key defined in models/index.js
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled', 'processing'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  tableName: 'orders',
  timestamps: false,
  underscored: true,
});

module.exports = Order;
