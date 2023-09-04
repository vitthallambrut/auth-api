const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  host: process.env.HOST_NAME,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.USER_NAME,
  password: process.env.HOST_PASSWORD,
});


pool
  .connect()
  .then(() => {
    console.log('Database connection established successfully..!!');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

module.exports = pool;
