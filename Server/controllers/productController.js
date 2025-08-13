// backend/controllers/productController.js

const productService = require('../services/productService'); 

const productController = {
    // Get a single product by ID
    getProductById: async (req, res) => {
        const productId = req.params.id;

        console.log(`ProductController: Request received for product ID: ${productId}`);

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required.' });
        }

        try {
            
            const product = await productService.getProductById(productId); 

            if (product) {
                console.log(`ProductController: Found product with ID ${productId}`);
                return res.status(200).json(product);
            } else {
                console.log(`ProductController: Product with ID ${productId} not found.`);
                return res.status(404).json({ success: false, message: 'Product not found.' });
            }
        } catch (error) {
            console.error('ProductController: Error fetching product:', error);
            return res.status(500).json({ error: error.message || 'Server error occurred while fetching product details.' });
        }
    },

    // Get all products
    getAllProducts: async (req, res) => {
        console.log('ProductController: Request received for all products.');

        try {
            const products = await productService.getAllProducts(); 
            res.status(200).json(products);
        } catch (error) {
            console.error('ProductController: Error fetching all products:', error);
            return res.status(500).json({ error: error.message || 'Server error occurred while fetching all products.' });
        }
    }
};

module.exports = productController;
