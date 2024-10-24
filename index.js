const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routes for Admin and Employee API
const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');
const loginRoutes = require('./routes/authRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api', loginRoutes);

// Export the app for Vercel to use
module.exports = app;
