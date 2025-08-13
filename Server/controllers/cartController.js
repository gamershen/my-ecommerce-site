// backend/controllers/cartController.js
const cartService = require('../services/cartService');

const cartController = {
    /**
     * Handles fetching a user's cart with all its items.
     * Expects userId in req.params (e.g., /api/cart/123)
     */
    getCart: async (req, res) => {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        try {
            const cart = await cartService.getCartByUserId(userId);

            if (cart) {
                // Respond with the cart data, including items
                return res.status(200).json(cart);
            } else {
                // If cart is not found, respond with 404 or an empty cart object
                return res.status(404).json({ message: 'Cart not found for this user.' });
            }
        } catch (error) {
            console.error('CartController: Error fetching cart:', error);
            return res.status(500).json({ error: error.message || 'Server error occurred while fetching cart.' });
        }
    },

    /**
     * Handles adding an item to the user's cart.
     * Expects userId, productId, quantity, priceAtAdd in req.body.
     * Route: POST /api/cart/items
     */
    addItem: async (req, res) => {
        const { userId, productId, quantity, priceAtAdd } = req.body;

        if (!userId || !productId || !quantity || !priceAtAdd) {
            return res.status(400).json({ message: 'User ID, Product ID, Quantity, and Price are required.' });
        }
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be positive.' });
        }

        try {
            const cartItem = await cartService.addItemToCart(userId, productId, quantity, priceAtAdd);
            return res.status(200).json({ success: true, message: 'Item added/updated in cart', cartItem });
        } catch (error) {
            console.error('CartController: Error adding item to cart:', error);
            return res.status(500).json({ error: error.message || 'Failed to add item to cart.' });
        }
    },

    /**
     * Handles updating the quantity of a specific item in the cart.
     * Route: PUT /api/cart/items/:cartItemId
     */
    updateItemQuantity: async (req, res) => { 
        const userId = req.body.userId; // Assuming userId is passed in body for PUT
        const cartItemId = req.params.cartItemId; // Get cart item ID from URL
        const { quantity } = req.body; // New quantity from body

        if (!userId || !cartItemId || !quantity) {
            return res.status(400).json({ message: 'User ID, Cart Item ID, and Quantity are required.' });
        }
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be positive.' });
        }

        try {
            const updatedItem = await cartService.updateCartItemQuantity(userId, +cartItemId, quantity); // +cartItemId to convert to number
            if (updatedItem) {
                return res.status(200).json({ success: true, message: 'Cart item quantity updated', cartItem: updatedItem });
            } else {
                return res.status(404).json({ success: false, message: 'Cart item not found or not updated.' });
            }
        } catch (error) {
            console.error('CartController: Error updating cart item quantity:', error);
            return res.status(500).json({ error: error.message || 'Failed to update cart item quantity.' });
        }
    },

    /**
     * Handles removing a specific item from the cart.
     * Route: DELETE /api/cart/items/:cartItemId
     */
    removeItem: async (req, res) => { // <--- NEW METHOD
        const userId = req.body.userId; // Assuming userId is passed in body for DELETE
        const cartItemId = req.params.cartItemId; // Get cart item ID from URL

        if (!userId || !cartItemId) {
            return res.status(400).json({ message: 'User ID and Cart Item ID are required.' });
        }

        try {
            const deletedRows = await cartService.removeCartItem(userId, +cartItemId); // +cartItemId to convert to number
            if (deletedRows > 0) {
                return res.status(200).json({ success: true, message: 'Cart item removed successfully.' });
            } else {
                return res.status(404).json({ success: false, message: 'Cart item not found or not removed.' });
            }
        } catch (error) {
            console.error('CartController: Error removing cart item:', error);
            return res.status(500).json({ error: error.message || 'Failed to remove cart item.' });
        }
    },

    /**
     * Handles clearing all items from a user's cart.
     * Route: DELETE /api/cart/clear/:userId
     */
    clearCart: async (req, res) => { // <--- NEW METHOD
        const userId = req.params.userId; // Get user ID from URL

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        try {
            const deletedRows = await cartService.clearUserCart(+userId);
            return res.status(200).json({ success: true, message: `Cleared ${deletedRows} items from cart.`, clearedItemsCount: deletedRows });
        } catch (error) {
            console.error('CartController: Error clearing cart:', error);
            return res.status(500).json({ error: error.message || 'Failed to clear cart.' });
        }
    }
};

module.exports = cartController;
