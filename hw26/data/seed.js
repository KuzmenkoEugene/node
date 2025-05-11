const { connectToDb, closeDb } = require('../db/client');
const { ObjectId } = require('mongodb');

async function seed() {
  const { db, client } = await connectToDb();

  try {
    const categories = db.collection('categories');
    const products = db.collection('products');
    const orders = db.collection('orders');

    await categories.deleteMany({});
    await products.deleteMany({});
    await orders.deleteMany({});

    const smartphoneCategoryId = new ObjectId();
    const laptopCategoryId = new ObjectId();

    await categories.insertMany([
      { _id: smartphoneCategoryId, name: 'Smartphones' },
      { _id: laptopCategoryId, name: 'Laptops' }
    ]);

    const productList = [
      {
        _id: new ObjectId(),
        name: 'iPhone 15',
        price: 1200,
        stock: 50,
        categoryId: smartphoneCategoryId
      },
      {
        _id: new ObjectId(),
        name: 'Samsung Galaxy S24',
        price: 1000,
        stock: 40,
        categoryId: smartphoneCategoryId
      },
      {
        _id: new ObjectId(),
        name: 'Xiaomi Mi 14',
        price: 800,
        stock: 60,
        categoryId: smartphoneCategoryId
      },
      {
        _id: new ObjectId(),
        name: 'MacBook Pro',
        price: 2500,
        stock: 20,
        categoryId: laptopCategoryId
      },
      {
        _id: new ObjectId(),
        name: 'Dell XPS 15',
        price: 2000,
        stock: 30,
        categoryId: laptopCategoryId
      }
    ];

    await products.insertMany(productList);

    await orders.insertMany([
      {
        date: new Date(),
        items: [
          { productId: productList[0]._id, quantity: 2 },
          { productId: productList[3]._id, quantity: 1 }
        ]
      },
      {
        date: new Date(),
        items: [
          { productId: productList[1]._id, quantity: 3 },
          { productId: productList[4]._id, quantity: 2 }
        ]
      },
      {
        date: new Date(),
        items: [
          { productId: productList[2]._id, quantity: 5 }
        ]
      }
    ]);

    console.log('База успешно заполнена.');
  } catch (err) {
    console.error('Ошибка при заполнении базы:', err);
  } finally {
    await closeDb(client);
  }
}

module.exports = { seed };
