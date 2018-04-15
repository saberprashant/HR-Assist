const mongoose = require('mongoose');

const settingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  timeVal: Number,
  deduction: Number
});

module.exports = mongoose.model('Setting', settingSchema);