const asyncHandler = require("express-async-handler");

//@description: Get all Exercises
//@route: GET /api/Exercises
//@access public
const getExercises = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Exercises found'});
})

//@description: Get Exercise with id
//@route: GET /api/exercise/:id
//@access public
const getExercise = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Exercise with ${req.params.id} found`});
})

//@description: Create new Exercise
//@route: POST /api/exercise
//@access public
const postExercise = asyncHandler(async(req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are required')
    }
    res.status(201).json({ message: 'Create Exercises'});
})

//@description: Update Exercise with id
//@route: PUT /api/Exercise/:id
//@access public
const putExercise = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Updated Exercises for ${req.params.id}`});
})

//@description: Delete Exercise with id
//@route: DELETE /api/Exercise/:id
//@access public
const deleteExercise = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Exercises deleted with ${req.params.id}`});
})

module.exports = { getExercises, getExercise, putExercise, postExercise, deleteExercise };