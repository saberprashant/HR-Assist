const mongoose = require('mongoose');

const shiftSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  start: Date,
  end: Date
});

module.exports = mongoose.model('Shift', shiftSchema);