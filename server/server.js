// Import core modules
const express = require('express');
// const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Import routers
const productRouter = require('./routes/product-routes');
const userRouter = require('./routes/user-routes');
const sessionRouter = require('./routes/session-routes');
const postRouter = require('./routes/post-routes');
const profileRouter = require('./routes/profile-routes');

// 404 middleware
const pageNotFound = require('./middlewares/pageNotFound.middleware');

// Set the Express app
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(cookieParser());

// Set PORT and HOST from .env file, with hard-coded alternative
const port = process.env.PORT;
// const host = process.env.HOST;

// Show landing page
app.get('/', (req, res) => {
  res.send('Welcome! This is the landing page of my tattoo e-shop.');
});

// Use Router
app.use(productRouter);
app.use(userRouter);
app.use(sessionRouter);
app.use(profileRouter);
app.use(postRouter);

// Mount a 404 middleware for all non-existing routes (this goes at the bottom of the stack)
app.use(pageNotFound);

// Port listener
app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}/`)
);
