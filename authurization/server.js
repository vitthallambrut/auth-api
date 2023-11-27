const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv'); 
const db = require('./config/db');
const routes = require('./routes/routes');
const authorization = require('./src/authsetting/auth_setting');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(authorization);

// Routes and Middleware
app.use(routes);


// Load environment variables from .env file
dotenv.config();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
