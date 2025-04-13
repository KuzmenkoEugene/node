const fs = require("fs");

const readable = fs.createReadStream("log.txt", {encoding: 'utf-8'});

readable.on("data", (chunk) => {
  console.log(chunk);
});

readable.on("end", () => {
  console.log("end.");
});
