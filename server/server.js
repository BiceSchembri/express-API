// Import core modules
const express = require('express');
// const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Router
const router = require('./routes.js');

// Set the Express app
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Set PORT and HOST from .env file, with hard-coded alternative
const port = process.env.PORT;
// const host = process.env.HOST;

// Use Router
app.use('/', router);

// Port listener
app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}/`)
);
