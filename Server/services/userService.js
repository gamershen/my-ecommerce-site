// backend/services/userService.js

const User = require('../models/userModel'); 
const cartService = require('./cartService');

const userService = {
    async findByCredentials(email, password) {
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                    password: password
                },
                attributes: ['id', 'name', 'email']
            });
            return user;
        } catch (error) {
            console.error('UserService: Error in findByCredentials:', error);
            throw new Error('Database error during credential check.');
        }
    },

    async findByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email: email },
                attributes: ['id', 'name', 'email']
            });
            return user;
        } catch (error) {
            console.error('UserService: Error in findByEmail:', error);
            throw new Error('Database error during email lookup.');
        }
    },

    async createUser(name, email, password) {
        try {
            const newUser = await User.create({
                name: name,
                email: email,
                password: password
            });

            // Create a cart for the new user AFTER user is successfully created
            await cartService.createCartForUser(newUser.id);

            return { id: newUser.id, name: newUser.name, email: newUser.email };
        } catch (error) {
            console.error('UserService: Error in createUser:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new Error('User with this email already exists.');
            }
            throw new Error('Database error during user creation.');
        }
    }
};

module.exports = userService;
