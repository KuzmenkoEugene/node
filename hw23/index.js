const { Worker, isMainThread, parentPort } = require("worker_threads");

const factorialFanction = function (n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorialFanction(n - 1);
};

if (isMainThread) {
  const worker = new Worker(__filename);

  worker.postMessage(5);

  worker.on("message", (result) => {
    console.log("Результат від worker:", result);
  });

  worker.on("error", (err) => {
    console.error("Помилка в worker:", err);
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Worker завершив роботу з кодом ${code}`);
    }
  });
} else {
  parentPort.on("message", (number) => {
    const result = factorialFanction(number);
    parentPort.postMessage(result);
  });
}
