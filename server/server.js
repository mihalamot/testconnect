require('dotenv').config();     //looks for .env file

const express = require('express');   

const app = express();     //creates express instance for routes and middleware

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();   //next to move to the next middleware or route handler
});

//next middleware
app.get('/', (req, res) => {      //  '/' is root path
    res.json({
        message: 'json message',
    });
});

app.listen(process.env.PORT, () => {     //access to env: process.env.variable
  console.log('Server is running on http://localhost:' + process.env.PORT);
});

