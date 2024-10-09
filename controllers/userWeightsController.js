const asyncHandler = require("express-async-handler");
const UserWeight = require("../models/weightModel");

//@description: Get users weight information
//@route: GET /api/user/:id/weights
//@access private
const getUserweights = asyncHandler(async (req, res) => {
  const { userid } = req.params;

  const userWeightInfo = await UserWeight.findOne({ userid });

  if (!userWeightInfo) {
    return res.status(404).json({ error: "no user weight info available" });
  }

  res.status(200).json(userWeightInfo.weights);
});

//@description: Add or updates users weight information
//@route: POST /api/user/:id/weights
//@access private
const addUserweights = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { weight, date } = req.body;

  if (!userId || !weight) {
    return res.status(400).json({ error: "UserId and weight are required" });
  }

  let userWeightInfo = await UserWeight.findOne({ userId });
  

    if (!userWeightInfo) {
      userWeightInfo = await UserWeight.create({ userId, weights: [{ date, weight }] });
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
    const updatedUserWeightInfo = await userWeightInfo.save();
    res.status(200).json(updatedUserWeightInfo);
});

module.exports = {
  getUserweights,
  addUserweights,
};
