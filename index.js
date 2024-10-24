const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello Pardeep' );
});

const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');
const loginRoutes = require('./routes/authRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api', loginRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
