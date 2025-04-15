import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, "todos.json");

app.use(cors());
app.use(express.json());

const readTodos = () => {
  try {
    const data = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("readTodos faylini o'qishda xatoli yuz berdi", error);
  }
};

const writeTodos = (todos) => {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Faylga yozishda xatolik", error);
  }
};

app.get("/api/todos", (req, res) => {
  try {
    const todos = readTodos();
    res.status(200).json(todos);
  } catch (error) {
    console.error("todos ni o'qishda xatolik", error);
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
});

app.post("/api/todos", (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res
        .status(400)
        .json({ message: "Text maydoni bo'sh bo'lmasligi kerak" });
    }

    const todos = readTodos();
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Yangi todo yozishda xatolik", error);
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
});

app.delete("/api/todos/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const todos = readTodos();
    const exists = todos.some((todo) => todo.id === id);
    if (!exists) {
      return res
        .status(404)
        .json({ message: "Bunday id bilan todo topilmadi" });
    }
    const filtered = todos.filter((todo) => todo.id !== id);
    writeTodos(filtered);
    res.status(204).end();
  } catch (error) {
    console.error("O'chirishda xatolik", error);
    res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
});

app.put("/api/todos/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const todos = readTodos();

    const exists = todos.some((todo) => todo.id === id);

    if (!exists) {
      return res
        .status(404)
        .json({ message: "Bunday id bilan todo topilmadi" });
    }

    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, ...req.body, id: todo.id } : todo,
    );

    writeTodos(updated);
    const updatedTodo = updated.find((todo) => todo.id === id);
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Yangilashda xatolik", error);
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
});

app.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
