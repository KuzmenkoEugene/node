const log = require("../utils/log");

module.exports = async function topProducts(db) {
  const orders = db.collection("orders");

  const result = await orders
    .aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          name: "$product.name",
          totalSold: 1,
        },
      },
    ])
    .toArray();

  log("Top 3 sold products:", result);
};
