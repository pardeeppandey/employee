// models/timeOff.model.js
const mongoose = require('mongoose');

const timeOffSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, // Status field
});

const TimeOffRequest = mongoose.model('TimeOffRequest', timeOffSchema);

module.exports = TimeOffRequest;
