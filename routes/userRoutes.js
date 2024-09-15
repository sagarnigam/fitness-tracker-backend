const express = require('express');
const router = express.Router();
const { getUser, registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/currentuser', getUser)

module.exports = router;