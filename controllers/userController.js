const asyncHandler = require("express-async-handler");
// const Exercise = require("../models/userModel");

//@description: login user
//@route: GET /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "login user"});
});

//@description: Register user
//@route: GET /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: "Register the user"});
});

//@description: Get user information
//@route: GET /api/users/currentuser
//@access private
const getUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user information"});
});

module.exports = {
    getUser,
    loginUser,
    registerUser,
};
