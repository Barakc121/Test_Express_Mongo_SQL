import { MongoClient, ObjectId } from 'mongodb'

const mongoClient = new MongoClient(
  "mongodb://admin:password123@localhost:27018/usersDB?authSource=admin"
);
const DB_NAME = "usersDB";
const COLLECTION_NAME = "users";



let mongo = null;

export async function initMongoDb() {
  try {;
    await mongoClient.connect();

    mongo = mongoClient.db(DB_NAME);
    const usersCollection = mongo.collection(COLLECTION_NAME);

    await usersCollection.createIndex({ name: 1 }, { unique: true });

    console.log("create name");
    return mongo;
  } catch (error) {
    console.error("error");
    throw error;
  }
}

// POST /api/orders
// export async function createOrder(req, res) {
//   const { producId, username, password } = req.body;

//   const product = await req.mongoDb
//     .collection("users")
//     .findOne({ _id: new ObjectId(producId) });

//   if (!product) return res.status(404).json({ error: "Product not found" });
  
//     // await req.mysqlConn.query([producId, username, password ])

//   await req.mongoDb
//     .collection("users")
//     .updateOne({ _id: product._id }, { $inc: { totalOrdersCount: 1 } });

//   res.status(201).json({ message: "Order created" });
// }
// console.log(createOrder({ username: "dana", password: "1234" }));

// GET /api/users/:id מחזיר לפי id

// export async function getProduct(req, res) {
//   if (!ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: "Invalid id" });
//   }

//   const product = await req.mongoDb
//     .collection("users")
//     .findOne({ _id: new ObjectId(req.params.id) });

//   if (!product) return res.status(404).json({ error: "Not found" });

//   res.json(product);
// }
