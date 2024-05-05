const express = require('express');
const router = express.Router();
const { saveUserData } = require('../controllers/userController');

router.post('/save-option', saveUserData);

module.exports = router; 
