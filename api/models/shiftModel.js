const mongoose = require('mongoose');

const shiftSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  value: Number,
  valueType: String,
  type: String
});

module.exports = mongoose.model('Salary', shiftSchema);