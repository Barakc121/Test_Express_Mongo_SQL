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

export const createUser = async (req, res) => {
  try {
    const mongoConn = req.mongoConn;
    const { body } = req;
    const usersCollection = mongoConn.collection("users");

    const now = new Date();

    const newUser = {
      username: body.username,
      password: body.password,
    };
    const result = await usersCollection.insertOne(newUser);

    const user = await usersCollection.findOne({
      _id: result.insertedId,
    });

    res.status(201).send("created user");
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await req.mongoConn
      .collection("users")
      .findOne({ username: username });

    if (user.password != password) res.status(401).send("is not a password");
    if (!user) res.status(404).send("User not found");

    delete user._id;

    res.status(200).send("create", { data: user });
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET /api/orders/:id
// export async function getOrder(req, res) {
//   try {
//     const db = req.mongoDb;
//     const { id } = req.params;
//     if (!ObjectId.isValid(id))
//       return res.status(400).json({ error: "Invalid ID" });

//     const order = await db
//       .collection("users")
//       .findOne({ _id: new ObjectId(id) });
//     if (!order) return res.status(404).json({ error: "users not found" });

//     res.status(200).json({ id: order._id.toString(), ...order });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// export async function getProduct(req, res) {
//   if (!ObjectId.isValid(req.params.username, req.params.password)) {
//     return res.status(400).json({ error: "Invalid id" });
//   }

//   const product = await req.mongoDb
//     .collection("users")
//     .findOne({ _id: new ObjectId(req.params.id) });

//   if (!product) return res.status(404).json({ error: "Not found" });

//   res.json(product);
// }
