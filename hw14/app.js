const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {

  const products = [
    { name: "Яблоки", availability: 'есть' },
    { name: "Бананы", availability: 'нету' },
    { name: "Молоко", availability: 'есть' },
    { name: "Хлеб", availability: 'нету' },
    { name: "Сыр", availability: 'есть' },
    { name: "Макароны", availability: 'нету' },
    { name: "Рис", availability: 'есть' },
    { name: "Курица", availability: 'нету' },
    { name: "Яйца", availability: 'есть' },
    { name: "Картофель", availability: 'есть' },
  ];

  res.render("index", {products});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
