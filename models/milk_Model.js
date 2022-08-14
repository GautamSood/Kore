const mongoose = require("mongoose");
const validator = require("validator");

const milkSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  capacity: {
    type: Number,
    default: 500,
  },
});

const Milk = mongoose.model("Milk", milkSchema);
module.exports = Milk;