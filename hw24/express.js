const cluster = require("cluster");
const os = require("os");
const express = require("express");
const app = express();
const port = 3001;

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

  app.get("/", (req, res) => {
    res.send(`Worker answer ${process.pid}`);
  })
  .listen(port);
}
