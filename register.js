import { ObjectId } from "mongodb";

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
