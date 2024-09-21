const express = require("express");
const router = express.Router();

const {
  getProgramStructureByDay,
  createProgramStructure,
  updateProgramStructure,
  deleteProgramStructure,
} = require("../controllers/programStructureController");

// Route to get a specific workouts program stucture by ID and day
router.get("/workoutprogramid/:workoutProgramId/day/:day", getProgramStructureByDay);

// Route to create a new workouts program stucture by ID and day
router.post("/workoutprogramid/:workoutProgramId/day/:day", createProgramStructure);

// Route to update a workouts program stucture by ID and day
router.put("/workoutprogramid/:workoutProgramId/day/:day", updateProgramStructure);

// Route to delete a workouts program stucture by ID and day
router.delete("/workoutprogramid/:workoutProgramId/day/:day", deleteProgramStructure);

module.exports = router;
