const express = require("express");
const router = express.Router();

const {
  getProgramStructureByDay,
  createProgramStructure,
  updateProgramStructure,
  deleteProgramStructure,
} = require("../controllers/programStructureController");

// Route to get a specific workouts program stucture by ID and day
router.get("/", getProgramStructureByDay);

// Route to create a new workouts program stucture by ID and day
router.post("/", createProgramStructure);

// Route to update a workouts program stucture by ID and day
router.put("/", updateProgramStructure);

// Route to delete a workouts program stucture by ID and day
router.delete("/", deleteProgramStructure);

module.exports = router;
