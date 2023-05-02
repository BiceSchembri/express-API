// Import core modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Set the Express app
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Serve static files (not needed for this exercise)
// app.use(express.static('./'));

// Set PORT and HOST from .env file, with hard-coded alternative
const port = process.env.PORT || 3001;
// const host = process.env.HOST || 'localhost';

// GET request
app.get('/', (req, res) => {
  res.send('GET request was sent successfully');
});

// Port listener
app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}/`)
);
