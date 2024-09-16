const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  name: {
    type: String,
    requied: [true, "Please add the exercise name"],
  },
  videoId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requied: [true, "Please add the exercise description"],
  },
  muscles: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
});


module.exports = mongoose.model("Exercise", exerciseSchema);