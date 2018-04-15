const mongoose = require('mongoose');

const desigSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  salaryStructure: Array
});

module.exports = mongoose.model('Designation', desigSchema);