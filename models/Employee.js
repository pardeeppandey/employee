const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    office: { type: String },
    department: { type: String },
    clockInTime: { type: Date },    
    totalHoursWorked: { type: Number, default: 0 }
});

module.exports = mongoose.model('Employee', EmployeeSchema);