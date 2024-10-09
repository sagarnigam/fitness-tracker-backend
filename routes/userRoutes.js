const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/currentuser', getUsers)

module.exports = router;