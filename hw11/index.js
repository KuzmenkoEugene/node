const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.end("Home Page");
  } else if (req.method === "GET" && req.url === "/about") {
    res.end("About Us");
  } else {
    res.end("404");
  }
});

server.listen(3000, () => {
  console.log("Сервер запущено на http://localhost:3000");
});
