const mongoose = require('mongoose');

const overtimeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  allowance: Number
});

module.exports = mongoose.model('Overtime', overtimeSchema);