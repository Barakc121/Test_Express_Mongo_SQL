import mysql from "mysql2/promise";

export const conn = await mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database:'users'
});

async function initSqlDb() {
  await initDb("ecommerce");
  await initEcommerceTable();
}

export async function initDb(db) {
  await conn.query(`create database if not exists ${db}`);
//   console.log('created')
  await conn.query(`use ${db}`);
}

export async function initEcommerceTable() {
  await conn.execute(`CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId VARCHAR(24) NOT NULL,
  quantity INT NOT NULL,
  customerName VARCHAR(255) NOT NULL,
  totalPrice DECIMAL(10,2) NOT NULL,
  orderDate DATETIME DEFAULT CURRENT_TIMESTAMP
)`);
}
console.log(initSqlDb())

export async function getMysqlConnection() {
  if (conn) return conn;
  else {
    const conn = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "root",
      database: "users"
    });
    return conn;
  }
}
// console.log(await initEcommerceTable())
// console.log(await getMysqlConnection())