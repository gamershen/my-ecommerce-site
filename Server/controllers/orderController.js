// backend/controllers/orderController.js
const orderService = require('../services/orderService');

const orderController = {
    /**
     * Handles creating a new order from the user's cart.
     * Expects userId in req.body.
     * Route: POST /api/orders
     */
    createOrder: async (req, res) => {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required to create an order.' });
        }

        try {
            const newOrder = await orderService.createOrderFromCart(userId);
            return res.status(201).json({
                success: true,
                message: 'Order created successfully and cart cleared.',
                order: newOrder
            });
        } catch (error) {
            console.error('OrderController: Error creating order:', error);
            // Handle specific errors for frontend feedback
            if (error.message.includes('Cart is empty')) {
                return res.status(400).json({ message: 'Your cart is empty. Please add items before checking out.' });
            }
            if (error.message.includes('Insufficient stock')) {
                 return res.status(400).json({ message: error.message }); // Send specific stock error
            }
            return res.status(500).json({ message: error.message || 'Failed to create order. Please try again.' });
        }
    },

    /**
     * Handles fetching a single order by ID.
     * Route: GET /api/orders/:orderId
     */
    getOrderById: async (req, res) => {
        const orderId = req.params.orderId;
        try {
            const order = await orderService.getOrderById(+orderId);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Order not found.' });
            }
        } catch (error) {
            console.error('OrderController: Error fetching order by ID:', error);
            res.status(500).json({ message: error.message || 'Failed to fetch order.' });
        }
    },

    /**
     * Handles fetching all orders for a specific user.
     * Route: GET /api/orders/user/:userId
     */
    getUserOrders: async (req, res) => {
        const userId = req.params.userId;
        try {
            const orders = await orderService.getUserOrders(+userId);
            res.status(200).json(orders);
        } catch (error) {
            console.error('OrderController: Error fetching user orders:', error);
            res.status(500).json({ message: error.message || 'Failed to fetch user orders.' });
        }
    }
};

module.exports = orderController;
