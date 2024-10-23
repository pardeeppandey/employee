const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  start: {
    type: String,  // HH:mm format
    required: true,
  },
  end: {
    type: String,  // HH:mm format
    required: true,
  },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
