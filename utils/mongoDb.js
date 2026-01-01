import { MongoClient, ObjectId } from "mongodb";

const mongoClient = new MongoClient(
  "mongodb://admin:password123@localhost:27018/usersDB?authSource=admin"
);
const DB_NAME = "usersDB";
const COLLECTION_NAME = "users";

let mongo = null;

export async function initMongoDb() {
  try {
    await mongoClient.connect();

    mongo = mongoClient.db(DB_NAME);
    const usersCollection = mongo.collection(COLLECTION_NAME);

    await usersCollection.createIndex({ name: 1 }, { unique: true });

    return mongo;
  } catch (error) {
    console.error("error");
    throw error;
  }
}

export async function createuser(req, res) {
  try {
    const { username, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // MongoDB
    await req.mongoDb.collection("users").insertOne({
      name,
      password,
    });

    // MySQL
    await req.mysqlConn.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?)",
      [name, password]
    );
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
// await createuser({ body: { username: "barak", password: "1234" } });

// GET /api/users/:id מחזיר לפי id
export async function getProduct(req, res) {
  if (!ObjectId.isValid(req.params.username, req.params.password)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const product = await req.mongoDb
    .collection("users")
    .findOne({ _id: new ObjectId(req.params.id) });

  if (!product) return res.status(404).json({ error: "Not found" });

  res.json(product);
}
