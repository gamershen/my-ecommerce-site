// backend/models/index.js
const sequelize = require('../db.js');
const User = require('./userModel');
const Product = require('./productModel');
const Cart = require('./cartModel');
const CartItem = require('./cartItemModel');
const Order = require('./orderModel');      
const OrderItem = require('./orderItemModel'); 

// Define Associations
// User and Cart (One-to-One)
User.hasOne(Cart, {
  foreignKey: 'user_id',
  as: 'cart',
  onDelete: 'CASCADE'
});
Cart.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Cart and CartItem (One-to-Many)
Cart.hasMany(CartItem, {
  foreignKey: 'cart_id',
  as: 'cartItems',
  onDelete: 'CASCADE'
});
CartItem.belongsTo(Cart, {
  foreignKey: 'cart_id',
  as: 'cart'
});

// Product and CartItem (One-to-Many through CartItem)
Product.hasMany(CartItem, {
  foreignKey: 'product_id',
  as: 'cartItems'
});
CartItem.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});


// User and Order (One-to-Many)
User.hasMany(Order, {
  foreignKey: 'user_id',
  as: 'orders',
  onDelete: 'SET NULL' // Or 'CASCADE' if deleting a user should delete all their orders
});
Order.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Order and OrderItem (One-to-Many)
Order.hasMany(OrderItem, {
  foreignKey: 'order_id',
  as: 'orderItems',
  onDelete: 'CASCADE' // Deleting an order should delete its items
});
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'order'
});

// Product and OrderItem (One-to-Many through OrderItem)
Product.hasMany(OrderItem, {
  foreignKey: 'product_id',
  as: 'orderItems'
});
OrderItem.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});



// Export all models
module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem,
  Order,     
  OrderItem, 
};
