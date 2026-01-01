
// // POST /api/users
// export async function createuser(req, res) {
//   try{
//   const user= req.body;

//   const product = await req.mongo
//     .collection("users")
//     .findOne({ _id: new ObjectId(producId) });

  
//     await req.mysqlConn.query([user])

//   await req.mongoDb
//     .collection("users")
//     .updateOne({ _id: product._id }, { $inc: { totalOrdersCount: 1 } });

//   res.status(201).json({ message: "Order created" });}
//   catch(err){
//     console.error(err)}}
// console.log(createuser())