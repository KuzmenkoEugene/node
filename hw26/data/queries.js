const { connectToDb, closeDb } = require('../db/client');
const { ObjectId } = require('mongodb');

async function runQueries() {
  const { db, client } = await connectToDb();

  try {
    const categories = db.collection('categories');
    const products = db.collection('products');
    const orders = db.collection('orders');

    const smartphoneCategory = await categories.findOne({ name: 'Smartphones' });
    const smartphones = await products.find({ categoryId: smartphoneCategory._id }).toArray();
    console.log('Smartphones":', smartphones);

    const allOrders = await orders.find().toArray();
    const productMap = await products.find().toArray().then(arr =>
      arr.reduce((acc, product) => {
        acc[product._id.toString()] = product.price;
        return acc;
      }, {})
    );

    let totalRevenue = 0;
    for (const order of allOrders) {
      for (const item of order.items) {
        const price = productMap[item.productId.toString()] || 0;
        totalRevenue += price * item.quantity;
      }
    }
    console.log('Общий доход:', totalRevenue);

    for (const order of allOrders) {
      for (const item of order.items) {
        await products.updateOne(
          { _id: item.productId },
          { $inc: { stock: -item.quantity } }
        );
      }
    }
    console.log('Общее колл товаров на складе:');

    const salesMap = {};
    for (const order of allOrders) {
      for (const item of order.items) {
        const key = item.productId.toString();
        salesMap[key] = (salesMap[key] || 0) + item.quantity;
      }
    }

    const sortedSales = Object.entries(salesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const topProducts = await products
      .find({ _id: { $in: sortedSales.map(([id]) => new ObjectId(id)) } })
      .toArray();

    console.log('Топ 3 по продажам:');
    topProducts.forEach(product => {
      const soldQty = salesMap[product._id.toString()];
      console.log(`- ${product.name}: ${soldQty} продаж`);
    });

  } catch (err) {
    console.error(err);
  } finally {
    await closeDb(client);
  }
}

module.exports = { runQueries };
