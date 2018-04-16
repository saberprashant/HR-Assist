const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  mobile: Number,
  email: String,
  cAddress: Object,
  pAddress: Object,
  designationName: String,
  designationId: mongoose.Schema.Types.ObjectId,
  shiftId: mongoose.Schema.Types.ObjectId,
  salaryStructure: Array,
  totalSal: Number,
  shiftName: String,
});

module.exports = mongoose.model('Employee', employeeSchema);