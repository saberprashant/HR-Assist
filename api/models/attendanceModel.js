const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  attendanceDate: Date,
  empId: mongoose.Schema.Types.ObjectId,
  empName: String,
  checkInTime: Date,
  checkOutTime: Date,
});

module.exports = mongoose.model('Attendance', attendanceSchema);