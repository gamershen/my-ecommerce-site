// backend/main.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db.js');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');


// Import the object containing all models and their associations
const models = require('./models'); // This will ensure all models are loaded

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// --- ROUTES ---
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Express server is running!');
});

// Sync all defined Sequelize models with the database using 'alter: true'
// This is the preferred method for development after initial table creation,
// as it tries to make non-destructive changes.
sequelize.sync() // <--- REVERTED: Use alter: true for safer updates
    .then(() => {
        console.log('Database synchronized with models and associations.');
        app.listen(port, () => {
            console.log(`Backend server running on http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Error synchronizing database:', error);
        process.exit(1);
    });
