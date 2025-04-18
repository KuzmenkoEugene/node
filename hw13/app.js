const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  const users = [
    { name: "Александр Смирнов", age: 28, email: "asmirnov28@mail.ru" },
    { name: "Мария Коваль", age: 34, email: "mkoval@gmail.com" },
    { name: "Игорь Петров", age: 45, email: "ipetrov45@yandex.ru" },
    { name: "Ольга Синицына", age: 29, email: "olga.sinitsyna89@gmail.com" },
    { name: "Денис Романов", age: 37, email: "d.romanov@inbox.ru" },
    { name: "Светлана Орлова", age: 31, email: "sv.orlova@mail.ru" },
    { name: "Никита Васильев", age: 26, email: "nvasiliev26@gmail.com" },
    { name: "Екатерина Мельник", age: 39, email: "k.melnik@ya.ru" },
    { name: "Владимир Чернов", age: 42, email: "chernov.vl42@mail.ru" },
    { name: "Анастасия Григорьева", age: 33, email: "nastya.grigorieva@gmail.com"},
  ];

  res.render("index", {users});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
