import { ObjectId,mongoDb,MongoClient } from "mongodb";


const DB_NAME = "ecommerce";
const COLLECTION_NAME = "products";

let mongoClient = null;
let mongoDb = null;

export async function initMongoDb() {
  try {
    mongoClient = new MongoClient(MONGO_URL);
    await mongoClient.connect();

    mongoDb = mongoClient.db(DB_NAME);
    const productsCollection = mongoDb.collection(COLLECTION_NAME);

    await productsCollection.createIndex({ name: 1 }, { unique: true });

    console.log("create name");
    return mongoDb;
  } catch (error) {
    console.error("error");
    throw error;
  }
}
console.log(initMongoDb());


// POST /api/orders
export async function createOrder(req, res) {
  const { productId, quantity, customerName } = req.body;

  const product = await req.mongoDb
    .collection("products")
    .findOne({ _id: new ObjectId(productId) });

  if (!product) return res.status(404).json({ error: "Product not found" });

  const totalPrice = quantity * product.price;

  await req.mysqlConn.query(
    `INSERT INTO orders (productId, quantity, customerName, totalPrice)
     VALUES (?, ?, ?, ?)`,
    [productId, quantity, customerName, totalPrice]
  );

  await req.mongoDb
    .collection("products")
    .updateOne({ _id: product._id }, { $inc: { totalOrdersCount: 1 } });

  res.status(201).json({ message: "Order created" });
}

// GET /api/products/:id מחזיר לפי id

// export async function getProduct(req, res) {
//   if (!ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: "Invalid id" });
//   }

//   const product = await req.mongoDb
//     .collection("products")
//     .findOne({ _id: new ObjectId(req.params.id) });

//   if (!product) return res.status(404).json({ error: "Not found" });

//   res.json(product);
// }