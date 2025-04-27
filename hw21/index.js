const cluster = require("cluster");
const http = require("http");
const os = require("os");

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master, PID: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exit`);
    cluster.fork(); 
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`Worker answer ${process.pid}`);
    })
    .listen(3000);

  console.log(`Worker start, PID: ${process.pid}`);
}
