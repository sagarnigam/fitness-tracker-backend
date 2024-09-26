const express = require('express');
const router = express.Router();
const { addUserWeights, getUserWeights } = require('../controllers/userWeightsController');

router.post('/', addUserWeights)

router.get('/', getUserWeights)

module.exports = router;