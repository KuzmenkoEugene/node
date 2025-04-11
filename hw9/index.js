const fs = require("fs");

const readable = fs.createReadStream("log.txt", "utf8");

readable.on("data", (chunk) => {
  console.log(chunk);
});

readable.on("end", () => {
  console.log("end.");
});
