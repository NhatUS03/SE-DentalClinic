const sql = require('mssql')
require('dotenv').config();
const sqlConfig = {
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  server: 'localhost',
  database: process.env.DB_NAME,
  options : {
    encrypt: false // Tắt yêu cầu chứng chỉ
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  } 
}

module.exports=sqlConfig;