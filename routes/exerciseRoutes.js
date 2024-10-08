const express = require('express');
const router = express.Router();
const { getExercises, getExercise, getExerciseByBodyPart, createExercise, updateExercise, deleteExercise } = require('../controllers/exerciseController');

router.route('/').get(getExercises);

router.route('/:id').get(getExercise);

router.route('/bodypart/:id').get(getExerciseByBodyPart);

router.route('/').post(createExercise);

router.route('/:id').put(updateExercise);

router.route('/:id').delete(deleteExercise);


module.exports = router;