// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to get a user's cart by user ID
// GET /api/cart/:userId
router.get('/:userId', cartController.getCart);

// Route to add an item to the cart
// POST /api/cart/items
router.post('/items', cartController.addItem);


// PUT /api/cart/items/:cartItemId
// (userId will be in the request body)
router.put('/items/:cartItemId', cartController.updateItemQuantity); 


// DELETE /api/cart/items/:cartItemId
// (userId will be in the request body)
router.delete('/items/:cartItemId', cartController.removeItem); 


// DELETE /api/cart/clear/:userId
router.delete('/clear/:userId', cartController.clearCart); 

module.exports = router;
