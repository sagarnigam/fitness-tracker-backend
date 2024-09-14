const asyncHandler = require("express-async-handler");
const Exercise = require("../models/exerciseModel");

//@description: Get all Exercises
//@route: GET /api/Exercises
//@access public
const getExercises = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find();
  res.status(200).json(exercises);
});

//@description: Get Exercise with id
//@route: GET /api/exercise/:id
//@access public
const getExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findById(req.params.id);
  console.log(exercise);
  if (!exercise) {
    res.status(404);
    throw new Error("Exercise not found");
  }
  res.status(200).json(exercise);
});

//@description: Create new Exercise
//@route: POST /api/exercise
//@access public
const createExercise = asyncHandler(async (req, res) => {
  const { name, description, muscles, instructions } = req.body;
  if (!name || !description || !muscles || !instructions) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const exercise = await Exercise.create({
    name,
    description,
    muscles,
    instructions,
  });

  res.status(201).json(exercise);
});

//@description: Update Exercise with id
//@route: PUT /api/Exercise/:id
//@access public
const updateExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    res.status(404);
    throw new Error("Exercise not found");
  }

  const updatedExercise = await Exercise.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedExercise);
});

//@description: Delete Exercise with id
//@route: DELETE /api/Exercise/:id
//@access public
const deleteExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findById(req.params.id);
  console.log(exercise);
  if (!exercise) {
    res.status(404);
    throw new Error("Exercise not found");
  }

  await Exercise.findByIdAndDelete(req.params.id);
  res.status(200).json(exercise);
});

module.exports = {
  getExercises,
  getExercise,
  updateExercise,
  createExercise,
  deleteExercise,
};
