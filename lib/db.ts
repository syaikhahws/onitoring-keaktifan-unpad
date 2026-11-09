import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // Ini akan otomatis mengambil dari .env.local
  database: process.env.DB_NAME || 'db_monitoring_unpad',
  port: Number(process.env.DB_PORT) || 3306,
});