const express = require("express");
const router = express.Router();

const {
  getWorkoutPrograms,
  getWorkoutProgram,
  createWorkoutProgram,
  updateWorkoutProgram,
  deleteWorkoutProgram,
} = require("../controllers/workoutProgramController");

// Route to get all workout programs
router.get("/", getWorkoutPrograms);

// Route to get a specific workout program by ID
router.get("/:id", getWorkoutProgram);

// Route to create a new workout program
router.post("/", createWorkoutProgram);

// Route to update a workout program by ID
router.put("/:id", updateWorkoutProgram);

// Route to delete a workout program by ID
router.delete("/:id", deleteWorkoutProgram);

module.exports = router;
