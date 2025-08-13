// backend/controllers/userController.js
const userService = require('../services/userService'); 

exports.signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await userService.findByEmail(email);
        
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        const newUser = await userService.createUser(name, email, password);
        return res.status(201).json({ success: true, message: 'User registered successfully!', user: newUser });

    } catch (error) {
        console.error('Signup error:', error);
        if (error.message.includes('email already exists')) {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error registering user.' });
    }
};

exports.loginUser = async (req, res) => { 
    const { email, password } = req.body;

    console.log(`Login attempt received for: ${email}`);

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        
        const user = await userService.findByCredentials(email, password);

        if (user) {
            // User found and credentials matched
            console.log(`Login successful for user: ${user.email}`);
            // Sequelize returns a model instance. You can access data using user.dataValues or directly.
            // Ensure you only send back safe data (no password!)
            return res.status(200).json({ success: true, message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
        } else {
            // No user found with those credentials
            console.log(`Login failed for ${email}: Invalid credentials.`);
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        // Catch any errors that might be thrown by the userService (e.g., database errors)
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Error during login process.' });
    }
};
