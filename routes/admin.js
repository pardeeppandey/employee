const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Office = require('../models/Office');
const Department = require('../models/Department');
const Schedule = require('../models/Schedule');
const TimeOffRequest = require('../models/TimeOffRequest');

// Add an employee
router.post('/employees', async (req, res) => {
    const newEmployee = new Employee(req.body);
    try {
        const employee = await newEmployee.save();
        res.json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add an office
router.post('/offices', async (req, res) => {
    const newOffice = new Office(req.body);
    try {
        const office = await newOffice.save();
        res.json(office);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Get an Office
router.get('/offices', async (req, res) => {
    try {
        const office = await Office.find();
        res.json(office);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add a department
router.post('/departments', async (req, res) => {
    const newDepartment = new Department(req.body);
    try {
        const department = await newDepartment.save();
        res.json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Get a department
router.get('/departments', async (req, res) => {
    try {
        const department = await Department.find();
        res.json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Add Schedules
router.post('/add-schedule', async (req, res) => {
    const { employee, start, end } = req.body;

    try {
        // Ensure employee exists
        const employees = await Employee.findById(employee);
        if (!employees) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Create new schedule for the employee
        const schedule = new Schedule({
            employee: employee,
            start,
            end,
        });

        const savedSchedule = await schedule.save();

        res.status(201).json({ message: 'Schedule created', schedule: savedSchedule });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Schedules
router.get('/get-schedules', async (req, res) => {
    try {
        const schedules = await Schedule.find().populate('employee', 'name');
        res.status(200).json(schedules);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a Reports
router.get('/reports', async (req, res) => {
    try {
        const department = await Employee.find();
        res.json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Admin dashboard - Fetch pending time-off requests
router.get('/pendingRequests', async (req, res) => {
    try {
        const pendingRequests = await TimeOffRequest.find({ status: 'Pending' }).populate('employeeId', 'name role');
        res.status(200).json(pendingRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pending requests', error });
    }
});

// Admin updates status (Approve/Reject)
router.put('/updateRequest/:requestId', async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const request = await TimeOffRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.status = status;
        await request.save();
        res.status(200).json({ message: 'Request updated successfully', request });
    } catch (error) {
        res.status(500).json({ message: 'Error updating request', error });
    }
});

module.exports = router;

