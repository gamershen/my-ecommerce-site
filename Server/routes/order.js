// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create a new order from the user's cart
// POST /api/orders
router.post('/', orderController.createOrder);

// Route to get a specific order by its ID
// GET /api/orders/:orderId
router.get('/:orderId', orderController.getOrderById);

// Route to get all orders for a specific user
// GET /api/orders/user/:userId
router.get('/user/:userId', orderController.getUserOrders);

module.exports = router;
