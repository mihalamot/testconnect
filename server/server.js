require('dotenv').config();

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'json message',
    });
});

app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:3000');
});

