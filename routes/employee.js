const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const TimeOffRequest = require('../models/TimeOffRequest');

// Clock In Route
router.post('/clockin', async (req, res) => {
    const { employeeId } = req.body;
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });

        // Perform clock-in actions here (like tracking time)
        // Assume we're updating a field `clockInTime` and `location` for simplicity
        employee.clockInTime = new Date();
        // employee.location = location;
        // employee.ip = ip;
        await employee.save();

        res.json({ message: 'Clocked in successfully', employee });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Clock Out Route (Calculate total hours worked)
router.post('/clockout', async (req, res) => {
    const { employeeId } = req.body;
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });

        const clockOutTime = new Date();
        const hoursWorked = (clockOutTime - employee.clockInTime) / 1000 / 60 / 60; // Convert ms to hours

        employee.totalHoursWorked += hoursWorked;
        employee.clockInTime = null; // Reset clock-in time
        await employee.save();

        res.json({ message: `Clocked out successfully.`, hoursWorked, employee });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Endpoint for submitting time-off request
router.post('/requestTimeOff', async (req, res) => {
    const { employeeId, startDate, endDate, reason } = req.body;

    try {
        const newRequest = new TimeOffRequest({
            employeeId,
            startDate,
            endDate,
            reason,
        });

        await newRequest.save();
        res.status(201).json({ message: 'Time-off request submitted successfully', request: newRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting time-off request', error });
    }
});

// Employee dashboard - Fetch time-off requests by employee
router.get('/timeOffRequests/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    try {
        const requests = await TimeOffRequest.find({ employeeId }).sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching time-off requests', error });
    }
});

module.exports = router;

