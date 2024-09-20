const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define Exercise Schema
const programExercisesSchema = new Schema({
  type: {
    type: String,
    enum: ["individual-set", "super-set", "giant-set"],
    required: true,
  },
  exercise: { type: [String], required: true }, // array of strings (exercise IDs or names)
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
});

// Define Program Structure Schema
const programDaySchema = new Schema({
  workoutProgramId: { type: String, required: true },
  day: { type: String, required: true },
  exercises: { type: [programExercisesSchema], required: true }, // array of exercises
});

// Create the Mongoose model
const ProgramStructure = mongoose.model("ProgramStructure", programDaySchema);

module.exports = ProgramStructure;
