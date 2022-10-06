const mongoose = require("mongoose");
const { Schema } = mongoose;
const alarmSchema = new Schema({
  type: Number,
  deviceType: Number,
  serial: String,
  checked: Boolean,
},
{ versionKey: false });
const Alarm = mongoose.model(
  "Alarm",
  alarmSchema
);

module.exports = Alarm;
