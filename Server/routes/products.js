// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router(); // Create an Express Router instance
const productController = require('../controllers/productController'); 

// Route to get a single product by ID
// This will handle requests like GET /api/products/123
router.get('/:id', productController.getProductById);

// Route to get all products (optional, but good for a listing page)
// This will handle requests like GET /api/products
router.get('/', productController.getAllProducts);

module.exports = router; // Export the router instance
