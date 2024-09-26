const express = require('express');
const router = express.Router();
const { addUserweights, getUserweights } = require('../controllers/userWeightsController');

router.post('/:userId/weights', addUserweights)

router.get('/:userId/weights', getUserweights)

module.exports = router;