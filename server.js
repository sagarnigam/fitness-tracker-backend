const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// middleware used to parse the body in the request body
app.use(express.json()); 

app.use('/api/exercises', require('./routes/exerciseRoutes'));

// use of custom middleware to handle error
app.use(errorHandler);

app.listen(port, () => {
    console.log('listening on the port ' + port);
});