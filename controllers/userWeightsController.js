const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@description: Get users weight information
//@route: GET /api/user/:id/weights
//@access private
const getUserweights = asyncHandler(async (req, res) => {
  const { userid } = req.params;

  try {
    const userWeightInfo = await User.findOne({ userid });

    if (!userWeightInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userWeightInfo.weights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//@description: Add or updates users weight information
//@route: POST /api/user/:id/weights
//@access private
const addUserweights = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { weight, date } = req.body;

  if (!userId || !weight) {
    return res.status(400).json({ error: "Username and weight are required" });
  }

  try {
    // Find user by username
    let userWeightInfo = await User.findOne({ userId });

    // If user doesn't exist, create a new one
    if (!userWeightInfo) {
        userWeightInfo = new User({ userId, weights: [{ date, weight }] });
    } else {
      // If user exists, update the weight for the date
      const existingWeight = userWeightInfo.weights.find(
        (record) =>
          record.date.toISOString().split("T")[0] ===
          new Date(date).toISOString().split("T")[0]
      );

      if (existingWeight) {
        existingWeight.weight = weight;
      } else {
        userWeightInfo.weights.push({ date, weight });
      }
    }

    // Save the user data
    await userWeightInfo.save();
    res.json({ message: "Weight added/updated successfully", userWeightInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  getUserweights,
  addUserWeights,
};
