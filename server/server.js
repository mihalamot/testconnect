require('dotenv').config();     //looks for .env file

const express = require('express');   
const mongoose = require('mongoose');  
const workoutroutes = require('./routes/workouts');  //importing the workouts 

const app = express();     //creates express instance for routes and middleware

//middleware
app.use(express.json());  //request body gets parsed to JSON

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();   //next to move to the next middleware or route handler
});

//next middleware
app.use('/api/workouts/', workoutroutes);     //use on route /api/workouts/ + workoutroutes route -> example /

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)  //MONGO_URI from .env file
  .then(() => {
    //listen for requests after connection
    app.listen(process.env.PORT, () => {     //access to env: process.env.variable
    console.log('Connected to DB, server is running on http://localhost:' + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


