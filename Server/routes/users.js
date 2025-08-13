// routes/userRoutes.js
const express = require('express');
const router = express.Router(); // Create an Express Router instance directly
const userController = require('../controllers/userController'); // Import your userController
const db = require('../db'); 


router.post('/signup', userController.signupUser); 


router.post('/login', userController.loginUser);

module.exports = router; // Directly export the router instance
