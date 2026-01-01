import express from "express";
import { conn } from "./utils/mysql.js";
import { initMongoDb } from "./utils/mongoDb.js";

import productsRoutes from "./routes/products.js";
import ordersRoutes from "./routes/orders.js";

const app = express();
const PORT = 3000;

app.use(express.json());


app.use(async(req, res, next) => {
  req.mongoDb = await initMongoDb();
  req.mysqlConn = await getMysqlConnection()
  next();
});

async function startServer() {
  try {
    process.on("SIGINT", async () => {
      await conn.end();
      console.log("Connection close");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

startServer()
app.listen(PORT, async () => {
    await initMongoDb()
  console.log(`running on http://localhost:${PORT}`);
});
