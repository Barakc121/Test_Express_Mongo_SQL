export async function deleteOrder(req, res) {
  const user = parseInt(req.params.username, req.params.password);
  if (isNaN(user)) return res.status(400).json({ error: "Invalid id" });


}