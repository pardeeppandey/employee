const express = require('express');

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello Pardeep' );
});




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
