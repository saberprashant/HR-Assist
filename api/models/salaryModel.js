const mongoose = require('mongoose');

const salarySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  value: Number,
  valueType: String,
  type: String
});

module.exports = mongoose.model('Salary', salarySchema);