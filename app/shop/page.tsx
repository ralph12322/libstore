// app/shop/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function ShopPage() {
  const [sortOption, setSortOption] = useState("title");
  const [books, setBooks] = useState<Array<{ id: number; title: string; author: string; price: number; image: string }>>([]);

  useEffect(() => {
    // Simulate fetching books from an API or database
    const fetchBooks = async () => {
      const response = await fetch('/api/admin/test');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

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

        {/* Sorting Toggles */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setSortOption("title")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              sortOption === "title"
                ? "bg-purple-700 text-white shadow-md"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Sort by Title
          </button>
          <button
            onClick={() => setSortOption("price")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              sortOption === "price"
                ? "bg-purple-700 text-white shadow-md"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Sort by Price
          </button>
          <button
            onClick={() => setSortOption("newest")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              sortOption === "newest"
                ? "bg-purple-700 text-white shadow-md"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Sort by Newest
          </button>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedBooks.map((book, index) => (
            <div
              key={index}
              className="
              bg-white 
              rounded-2xl 
              shadow-md 
              overflow-hidden 
              transition 
              hover:shadow-[0_8px_20px_rgba(120,81,169,0.6)]   /* Royal Purple glow */
              hover:-translate-y-1 
              hover:scale-[1.02]"
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
                <p className="text-purple-700 font-bold">${book.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
