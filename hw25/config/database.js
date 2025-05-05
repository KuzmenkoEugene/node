// config/database.js
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'hotel_booking' 
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;