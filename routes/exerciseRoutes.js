const express = require('express');
const router = express.Router();
const { getExercises, getExercise, putExercise, postExercise, deleteExercise } = require('../controllers/exerciseController');

router.route('/').get(getExercises);

router.route('/:id').get(getExercise);

router.route('/').post(postExercise);

router.route('/:id').put(putExercise);

router.route('/:id').delete(deleteExercise);


module.exports = router;