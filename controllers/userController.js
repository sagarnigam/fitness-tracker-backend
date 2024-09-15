const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@description: login user
//@route: GET /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  const isPasswordValid = await bcrypt.compare(
    password,
    userAvailable.password
  );

  if (userAvailable && isPasswordValid) {
    const accessToken = jwt.sign(
      {
        user: {
          username: userAvailable.username,
          email: userAvailable.email,
          id: userAvailable.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({accessToken});
  } else {
    res.status(401);
    throw new Error(" Email or password is not valid");
  }
});

//@description: Register user
//@route: POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User is already registered");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({ _id: newUser.id, email: newUser.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
});

//@description: Get user information
//@route: GET /api/users/currentuser
//@access private
const getUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  getUser,
  loginUser,
  registerUser,
};
