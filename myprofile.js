// PUT /api/orders/:id
export async function updateOrder(req, res) {
  const id = parseInt(req.params.password, req.params.username);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const { username, password } = req.body;

  if (username && password) {
    const product = await req.mongoDb
      .collection("users")
      .findOne({
        username: new Object(username),
        password: new Object(password),
      });

    if (!product) return res.status(404).json({ error: "Product not found" });
  } else {
  }

  res.json({ message: "Order updated" });
}
