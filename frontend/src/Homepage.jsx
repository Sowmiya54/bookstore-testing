import React, { useState } from "react";
import "./HomePage.css";

const sampleBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 399,
    image: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    image: "https://covers.openlibrary.org/b/id/10523399-L.jpg",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 299,
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 450,
    image: "https://covers.openlibrary.org/b/id/11153262-L.jpg",
  },
  {
    id: 5,
    title: "Ikigai",
    author: "Héctor García",
    price: 350,
    image: "https://covers.openlibrary.org/b/id/10909258-L.jpg",
  },
  {
    id: 6,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 375,
    image: "https://covers.openlibrary.org/b/id/10909264-L.jpg",
  },
];

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [orderMsg, setOrderMsg] = useState("");

  const handleShowBooks = () => {
    setBooks(sampleBooks);
    setOrderMsg(""); // clear old message
  };

  const handleOrder = (book) => {
    // ✅ Keep it simple so test can detect easily
    setOrderMsg("✅ Order placed successfully!");
    console.log(`Order placed for: ${book.title}`);
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">📚 My Bookstore</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#books">Books</a>
          <a href="#cart">Cart</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Show Books Button */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button id="show-books" onClick={handleShowBooks}>
          Show Available Books
        </button>
      </div>

      {/* Books Grid */}
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.image} alt={book.title} />
            <h2>{book.title}</h2>
            <p className="author">by {book.author}</p>
            <p className="price">₹{book.price}</p>
            <button
              className="order-btn"
              onClick={() => handleOrder(book)}
            >
              Order
            </button>
          </div>
        ))}
      </div>

      {/* Order Success Message */}
      {orderMsg && (
        <p id="order-msg" style={{ color: "green", textAlign: "center" }}>
          {orderMsg}
        </p>
      )}
    </div>
  );
}
