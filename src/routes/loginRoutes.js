const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Route to handle user login
router.post('/login', loginController.loginUser);

// Route to retrieve all users
router.get('/users', loginController.getAllUsers);

module.exports = router;
