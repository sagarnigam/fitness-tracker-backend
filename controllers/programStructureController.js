const asyncHandler = require("express-async-handler");
const ProgramStructure = require("../models/programStructureModel");
const Exercise = require("../models/exerciseModel");


//@description: Get a Program Structure by Workout Program ID and Day
//@route: GET /api/programStructure/:workoutProgramId/day/:day
//@access private
const getProgramStructureByDay = asyncHandler(async (req, res) => {
  const { workoutProgramId, day } = req.params;

  // Fetch the program structure as plain JavaScript objects (removes extra mongoose fields)
  const programStructure = await ProgramStructure.findOne({ workoutProgramId, day }).lean();

  if (!programStructure) {
    res.status(404);
    throw new Error("Program structure not found for the specified day");
  }

  // Fetch detailed information for each exercise using its ID
  const populatedExercises = await Promise.all(
    programStructure.exercises.map(async (exerciseSet) => {
      // Fetch each exercise detail for the exerciseSet array
      const detailedExercises = await Promise.all(
        exerciseSet.exercise.map(async (exerciseId) => {
          const exerciseDetail = await Exercise.findById(exerciseId)
            .select("-__v")  // Remove unwanted fields such as __v
            .lean();  // Return plain JavaScript object
          
          if (!exerciseDetail) {
            throw new Error(`Exercise with ID ${exerciseId} not found`);
          }

          return exerciseDetail;
        })
      );

      // Return the exercise set with populated exercise details
      return {
        ...exerciseSet,
        exercise: detailedExercises, // Replace exercise IDs with full exercise objects
      };
    })
  );

  // Replace the exercises array in the program structure
  const modifiedProgramStructure = {
    ...programStructure,
    exercises: populatedExercises,  // Use the populated exercise data
  };

  // Return the cleaned up program structure
  res.status(200).json(modifiedProgramStructure);
});

//@description: Create a new Program Structure
//@route: POST /api/programStructure/:workoutProgramId/day/:day
//@access private
const createProgramStructure = asyncHandler(async (req, res) => {
  const { workoutProgramId, day } = req.params;
  const { exercises } = req.body;

  if (!exercises) {
    res.status(400);
    throw new Error("Exercises are required");
  }

  const programStructure = await ProgramStructure.create({
    workoutProgramId,
    day,
    exercises,
  });

  res.status(201).json(programStructure);
});

//@description: Update a Program Structure by Workout Program ID and Day
//@route: PUT /api/programStructure/:workoutProgramId/day/:day
//@access private
const updateProgramStructure = asyncHandler(async (req, res) => {
  const { workoutProgramId, day } = req.params;
  const { exercises } = req.body;

  const programStructure = await ProgramStructure.findOne({ workoutProgramId, day });

  if (!programStructure) {
    res.status(404);
    throw new Error("Program structure not found for the specified day");
  }

  programStructure.exercises = exercises || programStructure.exercises;
  const updatedProgramStructure = await programStructure.save();

  res.status(200).json(updatedProgramStructure);
});

//@description: Delete a Program Structure by Workout Program ID and Day
//@route: DELETE /api/programStructure/:workoutProgramId/day/:day
//@access private
const deleteProgramStructure = asyncHandler(async (req, res) => {
  const { workoutProgramId, day } = req.params;

  const programStructure = await ProgramStructure.findOne({ workoutProgramId, day });

  if (!programStructure) {
    res.status(404);
    throw new Error("Program structure not found for the specified day");
  }

  await ProgramStructure.deleteOne({ workoutProgramId, day });
  res.status(200).json({ message: "Program structure deleted" });
});

module.exports = {
  getProgramStructureByDay,
  createProgramStructure,
  updateProgramStructure,
  deleteProgramStructure,
};
