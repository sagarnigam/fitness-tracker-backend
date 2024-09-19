const mongoose = require('mongoose');

const workoutProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    programImage: {
        type: String,
    },
    programType: {
        type: String,
        required: true
    },
    programLength: {
        type: Number,
        required: true
    }
});

const WorkoutProgram = mongoose.model('WorkoutProgram', workoutProgramSchema);

module.exports = WorkoutProgram;