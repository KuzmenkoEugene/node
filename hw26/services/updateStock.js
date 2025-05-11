const log = require("../utils/log");

module.exports = async function updateStock(db) {
  const orders = db.collection("orders");
  const products = db.collection("products");

  const allOrders = await orders.find().toArray();

  for (const order of allOrders) {
    for (const item of order.items) {
      await products.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.quantity } }
      );
    }
  }

  log("Stock updated after orders");
};
