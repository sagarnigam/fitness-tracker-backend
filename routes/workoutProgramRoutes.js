const express = require('express');
const router = express.Router();

router.route('/').get(getWorkoutPrograms);

router.route('/:id').get(getWorkoutProgram);

// router.route('/').post(createExercise);

// router.route('/:id').put(updateExercise);

// router.route('/:id').delete(deleteExercise);


module.exports = router;