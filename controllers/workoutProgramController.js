const asyncHandler = require("express-async-handler");
const Exercise = require("../models/exerciseModel");

//@description: Get all Workout Programs
//@route: GET /api/WorkoutPrograms
//@access private
const getWorkoutPrograms = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find();
  res.status(200).json(exercises);
});

//@description: Get Exercise with id
//@route: GET /api/WorkoutPrograms/:id
//@access private
const getWorkoutProgram = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findById(req.params.id);
  
  if (!exercise) {
    res.status(404);
    throw new Error("Exercise not found");
  }
  res.status(200).json(exercise);
});

//@description: Create new Workout Program
//@route: POST /api/WorkoutPrograms
//@access private
const createWorkoutProgram = asyncHandler(async (req, res) => {
    const { name, videoId, description, muscles, instructions } = req.body;
    if (!name || !videoId || !description || !muscles || !instructions) {
      res.status(400);
      throw new Error("All fields are required");
    }
  
    const exercise = await Exercise.create({
      name,
      videoId,
      description,
      muscles,
      instructions,
    });
  
    res.status(201).json(exercise);
  });
  
  //@description: Update Workout Program
  //@route: PUT /api/WorkoutPrograms
  //@access private
  const updateWorkoutProgram = asyncHandler(async (req, res) => {
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
  
  //@description: Delete Workout Program
  //@route: DELETE /api/WorkoutPrograms
  //@access private
  const deleteWorkoutProgram = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      res.status(404);
      throw new Error("Exercise not found");
    }
  
    await Exercise.findByIdAndDelete(req.params.id);
    res.status(200).json(exercise);
  });
  
  module.exports = {
    getWorkoutPrograms,
    getWorkoutProgram,
    createWorkoutProgram,
    updateWorkoutProgram,
    deleteWorkoutProgram,
  };