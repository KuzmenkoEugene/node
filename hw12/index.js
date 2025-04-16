const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const app = express();
app.use(express.json());
const PORT = 3000;
const FILE = path.join(__dirname, "data", "tasks.json");

app.use(async (req, res, next) => {
  const log = `Time: ${new Date().toISOString()}, Method: ${req.method}, URL: ${req.url}\n`;

  console.log(log.trim());

  try {
    await fs.appendFile('log.txt', log);
  } catch (err) {
    console.error('Ошибка записи:', err);
  }

  next();
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/tasks", async (req, res) => {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch {
    res.status(500).json({ error: "Ошибка чтения" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const list = JSON.parse(await fs.readFile(FILE, "utf-8"));
    const task = list.find((t) => t.id === Number(req.params.id));

    if (!task) {
      return res.status(404).json({ error: "Задачу не найдено" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Ошибка чтения" });
  }
});


app.post("/tasks", async (req, res) => {
  const { title, description, status } = req.body;
  const statuses = ["todo", "in-progress", "done"];

  if (!title || title.length < 3)
    return res.status(400).json({ error: "Короткий 'title'" });

  if (!statuses.includes(status))
    return res.status(400).json({ error: "Неверный статус" });

  try {
    const list = JSON.parse(await fs.readFile(FILE, "utf-8"));

    const task = {
      id: Date.now(),
      title,
      description,
      status,
      createdAt: new Date().toISOString(),
    };

    list.push(task);
    await fs.writeFile(FILE, JSON.stringify(list, null, 2));
    res.status(201).json(task);
  } catch(err) {
    console.error("Ошибка записи:", err);
    res.status(500).json({ error: "Ошибка записи" });
  }
});

app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
