const log = require('../utils/log');

module.exports = async function findSmartphones(db) {
  const categories = db.collection('categories');
  const products = db.collection('products');

  const smartphoneCategory = await categories.findOne({ name: 'Smartphones' });
  const smartphoneProducts = await products.find({ categoryId: smartphoneCategory._id }).toArray();

  log('Smartphone products:', smartphoneProducts);
};
