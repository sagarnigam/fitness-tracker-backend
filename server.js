const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// middleware used to parse the body in the request body
app.use(express.json()); 

app.use('/api/exercises', require('./routes/exerciseRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/workoutprograms', require('./routes/workoutProgramRoutes'));
app.use('/api/programStructure/', require('./routes/programStructureRoutes'));
app.use('/api/user', require('./routes/userWeightsRoutes'));


// use of custom middleware to handle error
app.use(errorHandler);

app.listen(port, () => {
    console.log('listening on the port ' + port);
});