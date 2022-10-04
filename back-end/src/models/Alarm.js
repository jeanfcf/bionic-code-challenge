const mongoose = require("mongoose");

const Alarm = mongoose.model("Alarm", {
  type: Number,
  deviceType: Number,
  serial: String,
  checked: Boolean,
});

module.exports = Alarm