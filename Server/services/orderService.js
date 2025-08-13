// backend/services/orderService.js
const sequelize = require('../db.js'); // Import the Sequelize instance for transactions
const { Order, OrderItem, Cart, CartItem, Product } = require('../models'); // Import all necessary models

const orderService = {
    /**
     * Creates a new order from a user's current cart items within a transaction.
     * Also clears the cart after successful order creation.
     * @param {number} userId The ID of the user creating the order.
     * @returns {Promise<object>} A promise that resolves to the newly created order object.
     */
    async createOrderFromCart(userId) {
        // Use a Sequelize transaction to ensure atomicity
        const t = await sequelize.transaction();

        try {
            // 1. Fetch the user's cart with all its items and product details
            const cart = await Cart.findOne({
                where: { user_id: userId },
                include: [{
                    model: CartItem,
                    as: 'cartItems',
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'title', 'price'] 
                    }]
                }],
                transaction: t // Include transaction
            });

            if (!cart || cart.cartItems.length === 0) {
                throw new Error('Cart is empty. Cannot create an order.');
            }

            // Calculate total amount for the order
            let totalAmount = 0;
            const orderItemsData = [];

            for (const cartItem of cart.cartItems) {
                const product = cartItem.product;

              
                totalAmount += Number(cartItem.quantity) * Number(cartItem.price_at_add);
                orderItemsData.push({
                    product_id: cartItem.product_id,
                    quantity: cartItem.quantity,
                    price_at_purchase: cartItem.price_at_add // Store price at the time of purchase
                });
            }

            // 2. Create the Order
            const newOrder = await Order.create({
                user_id: userId,
                total_amount: totalAmount,
                status: 'pending' // Initial status
            }, { transaction: t });

            // 3. Create Order Items and link them to the new order
            const createdOrderItems = await Promise.all(orderItemsData.map(async (itemData) => {
                // Attach order_id to each order item
                return await OrderItem.create({
                    order_id: newOrder.order_id,
                    ...itemData
                }, { transaction: t });
            }));

        

            // 5. Clear the user's cart (delete all cart items)
            await CartItem.destroy({
                where: { cart_id: cart.cart_id },
                transaction: t
            });

            // Commit the transaction if all steps are successful
            await t.commit();

            console.log(`OrderService: Order ${newOrder.order_id} created successfully for user ${userId}. Cart cleared.`);
            // Return the created order with its items for frontend display
            
            const orderWithItems = await Order.findByPk(newOrder.order_id, {
                include: [{
                    model: OrderItem,
                    as: 'orderItems',
                    include: [{ model: Product, as: 'product', attributes: ['id', 'title', 'image_url'] }]
                }]
            });
            return orderWithItems;

        } catch (error) {
            // Rollback the transaction if any step fails
            await t.rollback();
            console.error(`OrderService: Error creating order for user ${userId}. Transaction rolled back:`, error);
            // Re-throw specific errors for frontend handling
            if (error.message.includes('Insufficient stock')) {
                throw new Error(error.message); // Propagate stock error
            }
            throw new Error('Could not complete order. Please try again.');
        }
    },

    /**
     * Retrieves a specific order by its ID.
     * @param {number} orderId The ID of the order to retrieve.
     * @returns {Promise<object|null>} The order object with its items and product details.
     */
    async getOrderById(orderId) {
      try {
        const order = await Order.findByPk(orderId, {
          include: [{
            model: OrderItem,
            as: 'orderItems',
            include: [{
              model: Product,
              as: 'product',
              attributes: ['id', 'title', 'image_url', 'price']
            }]
          }]
        });
        return order;
      } catch (error) {
        console.error(`OrderService: Error fetching order ${orderId}:`, error);
        throw new Error('Could not fetch order details.');
      }
    },

    /**
     * Retrieves all orders for a specific user.
     * @param {number} userId The ID of the user.
     * @returns {Promise<Array<object>>} An array of order objects for the user.
     */
    async getUserOrders(userId) {
      try {
        const orders = await Order.findAll({
          where: { user_id: userId },
          include: [{
            model: OrderItem,
            as: 'orderItems',
            include: [{
              model: Product,
              as: 'product',
              attributes: ['id', 'title', 'image_url', 'price']
            }]
          }],
          order: [['order_date', 'DESC']] 
        });
        return orders;
      } catch (error) {
        console.error(`OrderService: Error fetching orders for user ${userId}:`, error);
        throw new Error('Could not fetch user orders.');
      }
    }
};

module.exports = orderService;
