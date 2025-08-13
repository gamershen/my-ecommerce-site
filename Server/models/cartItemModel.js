// backend/models/CartItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const CartItem = sequelize.define('CartItem', {
  cart_item_id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price_at_add: { // Assuming this column still exists as per previous discussion for product price at time of add
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  
}, {
  tableName: 'cart_items', // Explicitly set the table name
  timestamps: true,       // Keep true if you have created_at/updated_at. If not, change to false.
  underscored: true,      // Ensures column names are snake_case if Sequelize auto-generates them
  indexes: [
    {
      unique: true,
      fields: ['cart_id', 'product_id'] // Composite unique index
    }
  ]
});

module.exports = CartItem;
