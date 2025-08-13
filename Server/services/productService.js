// backend/services/productService.js

const Product = require('../models/productModel'); 

const productService = {
    /**
     * Retrieves a single product by its ID using Sequelize.
     * This method contains the business logic for fetching product details by ID.
     * It uses the Sequelize Product model's findByPk method.
     * @param {string} productId The ID of the product to retrieve.
     * @returns {Promise<object|null>} A promise that resolves to the product object if found, or null.
     */
    async getProductById(productId) {
        try {
            // Use Sequelize's findByPk method to find a product by its primary key (id)
            const product = await Product.findByPk(productId, {
                // Optionally specify attributes to select to limit data sent
                attributes: ['id', 'title', 'description', 'price', 'image_url',]
            });
            return product; // Sequelize will return a model instance or null
        } catch (error) {
            console.error('ProductService: Error in getProductById using Sequelize:', error);
            // Re-throw or throw a more generic error for the controller to handle
            throw new Error('Database error during product retrieval.');
        }
    },

    /**
     * Retrieves all products using Sequelize.
     * This method contains the business logic for fetching all products.
     * It uses the Sequelize Product model's findAll method.
     * @returns {Promise<Array<object>>} A promise that resolves to an array of product objects.
     */
    async getAllProducts() {
        try {
            // Use Sequelize's findAll method to get all products
            const products = await Product.findAll({
                // Optionally specify attributes to select
                attributes: ['id', 'title', 'description', 'price', 'image_url']
            });
            return products; // Will be an array of Sequelize Product instances
        } catch (error) {
            console.error('ProductService: Error in getAllProducts using Sequelize:', error);
            // Re-throw or throw a more generic error for the controller to handle
            throw new Error('Database error during all products retrieval.');
        }
    }

    
};

module.exports = productService;
