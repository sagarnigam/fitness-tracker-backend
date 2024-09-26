const mongoose = require('mongoose');

const userWeightSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  weights: [
    {
      date: { type: Date, default: Date.now },
      weight: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('UserWeight', userWeightSchema);