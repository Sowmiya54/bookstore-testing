// backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory "DB"
const books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 12.99 },
  { id: 2, title: "Atomic Habits", author: "James Clear", price: 15.5 },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", price: 29.0 },
  { id: 4, title: "The Pragmatic Programmer", author: "Andrew Hunt", price: 27.5 },
  { id: 5, title: "1984", author: "George Orwell", price: 10.0 }
];

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/order", (req, res) => {
  const { bookId } = req.body;
  const book = books.find(b => b.id === Number(bookId));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json({ message: `Order placed for "${book.title}"` });
});

// (Optional) Serve a simple landing if you ever build a static build
app.get("/", (req, res) => {
  res.send("📚 Bookstore API is running. Try GET /books");
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
