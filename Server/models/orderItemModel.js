// backend/models/OrderItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const OrderItem = sequelize.define('OrderItem', {
  order_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Foreign key defined in models/index.js
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Foreign key defined in models/index.js
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price_at_purchase: { 
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'order_items',
  timestamps: false, // No default timestamps needed here
  underscored: true, // Use snake_case for column names
});

module.exports = OrderItem;
