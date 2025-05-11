const log = require("../utils/log");

module.exports = async function calculateRevenue(db) {
  const orders = db.collection("orders");

  const result = await orders
    .aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$productDetails.price"] },
          },
        },
      },
    ])
    .toArray();

  log("Total revenue:", result[0]?.totalRevenue || 0);
};
