const asyncHandler = require("express-async-handler");
const WorkoutProgram = require("../models/workoutProgramModel");

//@description: Get all Workout Programs
//@route: GET /api/workoutPrograms
//@access private
const getWorkoutPrograms = asyncHandler(async (req, res) => {
  const workoutPrograms = await WorkoutProgram.find();
  res.status(200).json(workoutPrograms);
});

//@description: Get a Workout Program by ID
//@route: GET /api/workoutProgram/:id
//@access private
const getWorkoutProgram = asyncHandler(async (req, res) => {
  const workoutProgram = await WorkoutProgram.findById(req.params.id);

  if (!workoutProgram) {
    res.status(404);
    throw new Error("Workout program not found");
  }

  res.status(200).json(workoutProgram);
});

//@description: Create a new Workout Program
//@route: POST /api/workoutProgram
//@access private
const createWorkoutProgram = asyncHandler(async (req, res) => {
  const { name, description, programImage, programType, programLength } =
    req.body;

  if (!name || !programType || !programLength) {
    res.status(400);
    throw new Error(
      "Name, program type, and program length are required fields"
    );
  }

  const workoutProgram = await WorkoutProgram.create({
    name,
    description,
    programImage,
    programType,
    programLength,
  });

  res.status(201).json(workoutProgram);
});

//@description: Update a Workout Program by ID
//@route: PUT /api/workoutProgram/:id
//@access private
const updateWorkoutProgram = asyncHandler(async (req, res) => {
  const workoutProgram = await WorkoutProgram.findById(req.params.id);

  if (!workoutProgram) {
    res.status(404);
    throw new Error("Workout program not found");
  }

  const updatedWorkoutProgram = await WorkoutProgram.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedWorkoutProgram);
});

//@description: Delete a Workout Program by ID
//@route: DELETE /api/workoutProgram/:id
//@access private
const deleteWorkoutProgram = asyncHandler(async (req, res) => {
  const workoutProgram = await WorkoutProgram.findById(req.params.id);

  if (!workoutProgram) {
    res.status(404);
    throw new Error("Workout program not found");
  }

  await WorkoutProgram.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Workout program deleted" });
});

module.exports = {
  getWorkoutPrograms,
  getWorkoutProgram,
  createWorkoutProgram,
  updateWorkoutProgram,
  deleteWorkoutProgram,
};
