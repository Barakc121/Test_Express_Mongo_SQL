import mysql from "mysql2/promise";

export const pool = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "ecommerce",
});

async function initSqlDb() {
  await initDb("ecommerce");
  await initEcommerceTable();
}

export async function initDb(db) {
  await pool.query(`create database if not exists ${db}`);
  await pool.query(`use ${db}`);
}

export async function initEcommerceTable() {
  await pool.execute(`CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId VARCHAR(24) NOT NULL,
  quantity INT NOT NULL,
  customerName VARCHAR(255) NOT NULL,
  totalPrice DECIMAL(10,2) NOT NULL,
  orderDate DATETIME DEFAULT CURRENT_TIMESTAMP
)`);
}



export async function getMysqlConnection() {
  if (conn) return conn;
  else {
    const conn = await mysql.createConnection({
      Host: "localhost",
      port: 3306,
      user: "root",
      password: "root",
      database: "ecommerce"
    });
    return conn;
  }
}
