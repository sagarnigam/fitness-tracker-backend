const asyncHandler = require("express-async-handler");
const UserWeight = require("../models/weightModel");

//@description: Get users weight information
//@route: GET /api/user/:id/weights
//@access private
const getUserweights = asyncHandler(async (req, res) => {
  const { userid } = req.params;

  try {
    const userWeightInfo = await UserWeight.findOne({ userid });

    if (!userWeightInfo) {
      return res.status(404).json({ error: "no user weight info available" });
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

  if (!id || !weight) {
    return res.status(400).json({ error: "UserId and weight are required" });
  }

  try {
    let userWeightInfo = await UserWeight.findOne({ userId });
    console.log(userWeightInfo);

    if (!userWeightInfo) {
        userWeightInfo = new UserWeight({ userId, weights: [{ date, weight }] });
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
  addUserweights,
};
