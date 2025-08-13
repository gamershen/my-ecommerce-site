// backend/services/cartService.js
const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');
const Product = require('../models/productModel');

const cartService = {
    /**
     * Creates a new cart associated with a specific user.
     * @param {number} userId The ID of the user for whom to create the cart.
     * @returns {Promise<object>} A promise that resolves to the newly created cart object.
     */
    async createCartForUser(userId) {
        try {
            let [cart, created] = await Cart.findOrCreate({
                where: { user_id: userId },
                defaults: { user_id: userId }
            });
            console.log(`CartService: Cart created for userId: ${userId}, Cart ID: ${cart.cart_id}`);
            return cart;
        } catch (error) {
            console.error(`CartService: Error creating cart for user ${userId}:`, error);
            throw new Error('Could not create cart for user.');
        }
    },

    /**
     * Retrieves a user's cart with all its items and associated product details.
     * @param {number} userId The ID of the user whose cart to retrieve.
     * @returns {Promise<object|null>} A promise that resolves to the cart object (including items and products) or null if not found.
     */
    async getCartByUserId(userId) {
        try {
            const cart = await Cart.findOne({
                where: { user_id: userId },
                include: [{
                    model: CartItem,
                    as: 'cartItems',
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'title', 'price', 'image_url']
                    }]
                }]
            });

            if (!cart) {
                console.log(`CartService: No cart found for userId: ${userId}`);
            } else {
                console.log(`CartService: Fetched cart for userId: ${userId}, Cart ID: ${cart.cart_id}`);
            }
            return cart;
        } catch (error) {
            console.error(`CartService: Error fetching cart for user ${userId}:`, error);
            throw new Error('Could not fetch cart.');
        }
    },

    /**
     * Adds an item to a user's cart, or updates its quantity if already present.
     * @param {number} userId The ID of the user.
     * @param {number} productId The ID of the product to add.
     * @param {number} quantity The quantity to add/update.
     * @param {number} priceAtAdd The price of the product at the moment of adding.
     * @returns {Promise<object>} A promise that resolves to the created or updated CartItem.
     */
    async addItemToCart(userId, productId, quantity, priceAtAdd) {
        try {
            let [cart] = await Cart.findOrCreate({
                where: { user_id: userId },
                defaults: { user_id: userId }
            });

            let [cartItem, itemCreated] = await CartItem.findOrCreate({
                where: {
                    cart_id: cart.cart_id,
                    product_id: productId
                },
                defaults: {
                    cart_id: cart.cart_id,
                    product_id: productId,
                    quantity: quantity,
                    price_at_add: priceAtAdd
                }
            });

            if (!itemCreated) {
                cartItem.quantity += quantity;
                await cartItem.save();
            }

            console.log(`CartService: Item ${itemCreated ? 'added' : 'updated'} in cart. Cart ID: ${cart.cart_id}, Product ID: ${productId}, Quantity: ${cartItem.quantity}`);
            return cartItem;
        } catch (error) {
            console.error(`CartService: Error adding/updating item to cart for user ${userId}:`, error);
            throw new Error('Could not add item to cart.');
        }
    },

    /**
     * Updates the quantity of a specific item in the cart.
     * @param {number} userId The ID of the user whose cart contains the item.
     * @param {number} cartItemId The ID of the cart item to update.
     * @param {number} newQuantity The new quantity for the item.
     * @returns {Promise<object|null>} A promise that resolves to the updated CartItem, or null if not found/updated.
     */
    async updateCartItemQuantity(userId, cartItemId, newQuantity) {
        try {
            const cart = await Cart.findOne({ where: { user_id: userId } });
            if (!cart) {
                throw new Error('User cart not found.');
            }

            const [affectedRows] = await CartItem.update(
                { quantity: newQuantity },
                {
                    where: {
                        cart_item_id: cartItemId, 
                        cart_id: cart.cart_id
                    }
                }
            );

            if (affectedRows > 0) {
                const updatedItem = await CartItem.findByPk(cartItemId); // findByPk uses the primary key, which is cart_item_id
                console.log(`CartService: Updated cart item ${cartItemId} to quantity ${newQuantity} for user ${userId}.`);
                return updatedItem;
            } else {
                console.log(`CartService: Cart item ${cartItemId} not found or not updated for user ${userId}.`);
                return null;
            }
        } catch (error) {
            console.error(`CartService: Error updating cart item ${cartItemId} for user ${userId}:`, error);
            throw new Error('Could not update cart item quantity.');
        }
    },

    /**
     * Removes a specific item from the cart.
     * @param {number} userId The ID of the user whose cart contains the item.
     * @param {number} cartItemId The ID of the cart item to remove.
     * @returns {Promise<number>} A promise that resolves to the number of rows deleted (0 or 1).
     */
    async removeCartItem(userId, cartItemId) {
        try {
            const cart = await Cart.findOne({ where: { user_id: userId } });
            if (!cart) {
                throw new Error('User cart not found.');
            }

            const deletedRows = await CartItem.destroy({
                where: {
                    cart_item_id: cartItemId, 
                    cart_id: cart.cart_id
                }
            });

            if (deletedRows > 0) {
                console.log(`CartService: Removed cart item ${cartItemId} from user ${userId}'s cart.`);
            } else {
                console.log(`CartService: Cart item ${cartItemId} not found or not removed for user ${userId}.`);
            }
            return deletedRows;
        } catch (error) {
            console.error(`CartService: Error removing cart item ${cartItemId} for user ${userId}:`, error);
            throw new Error('Could not remove cart item.');
        }
    },

    /**
     * Clears all items from a user's cart.
     * @param {number} userId The ID of the user whose cart to clear.
     * @returns {Promise<number>} A promise that resolves to the number of rows deleted.
     */
    async clearUserCart(userId) {
        try {
            const cart = await Cart.findOne({ where: { user_id: userId } });
            if (!cart) {
                throw new Error('User cart not found.');
            }

            const deletedRows = await CartItem.destroy({
                where: {
                    cart_id: cart.cart_id
                }
            });
            console.log(`CartService: Cleared ${deletedRows} items from user ${userId}'s cart.`);
            return deletedRows;
        } catch (error) {
            console.error(`CartService: Error clearing cart for user ${userId}:`, error);
            throw new Error('Could not clear cart.');
        }
    }
};

module.exports = cartService;
