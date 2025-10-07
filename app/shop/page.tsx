"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/cartstore";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
}

export default function ShopPage() {
  const [sortOption, setSortOption] = useState("title");
  const [books, setBooks] = useState<Book[]>([]);
  const { cart, addToCart, removeFromCart } = useCartStore();

  // ✅ Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/admin/test");
        const data = await res.json();

        // ensure unique IDs
        const sanitized = data.map((book: Book, index: number) => ({
          ...book,
          id: book.id ?? index + 1,
        }));

        setBooks(sanitized);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  // ✅ Sorting logic
  const sortedBooks = [...books].sort((a, b) => {
    if (sortOption === "title") return a.title.localeCompare(b.title);
    if (sortOption === "price") return a.price - b.price;
    if (sortOption === "newest") return b.id - a.id;
    return 0;
  });

  return (
    <section className="min-h-[92.5vh] bg-gradient-to-br from-white via-slate-100 to-slate-200 px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-8 text-center">
          Our Collection
        </h1>

        {/* 🧭 Sorting Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          {["title", "price", "newest"].map((opt) => (
            <button
              key={opt}
              onClick={() => setSortOption(opt)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                sortOption === opt
                  ? "bg-purple-700 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Sort by {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>

        {/* 🛍️ Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedBooks.map((book) => {
            const inCart = cart.some((item: { id: number; }) => item.id === book.id);
            return (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-[0_8px_20px_rgba(120,81,169,0.6)] hover:-translate-y-1 hover:scale-[1.02]"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                  <p className="text-purple-700 font-bold mb-3">
                    ₱{book.price.toFixed(2)}
                  </p>

                  {inCart ? (
                    <button
                      onClick={() => removeFromCart(book.id)}
                      className="w-full py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart({ ...book, quantity: 1 })}
                      className="w-full py-2 bg-purple-700 text-white font-medium rounded-lg hover:bg-purple-800 transition"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
