import express from "express";
import { conn } from "./utils/mysql.js";
import { initMongoDb } from "./utils/mongoDb.js";

const app = express();
const PORT = 3000;

app.use(express.json());

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
startServer()
app.listen(PORT, async () => {
    await initMongoDb()
  console.log(`running on http://localhost:${PORT}`);
});
