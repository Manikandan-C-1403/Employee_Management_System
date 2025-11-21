const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'empuser',
  password: process.env.DB_PASS || 'emppass',
  database: process.env.DB_NAME || 'empdb',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;


