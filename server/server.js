// Import core modules
const express = require('express');
// const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Router
const productRouter = require('./routes/product-routes');
const userRouter = require('./routes/user-routes');
const pageNotFound = require('./middlewares/pageNotFound.middleware');

// Set the Express app
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Set PORT and HOST from .env file, with hard-coded alternative
const port = process.env.PORT;
// const host = process.env.HOST;

// Use Router
app.use(productRouter);
app.use(userRouter);

// Mount a 404 middleware for all non-existing routes (this goes at the bottom of the stack)
app.use(pageNotFound);

// Port listener
app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}/`)
);
