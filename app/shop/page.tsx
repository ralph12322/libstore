// app/shop/page.tsx
"use client";

import { useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
};

const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12,
    image: "https://m.media-amazon.com/images/I/718Bb1aU71L._UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    title: "Me and My Jowa",
    author: "George Orwell",
    price: 26,
    image: "https://m.media-amazon.com/images/I/81cPazH8X7L.jpg",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 10,
    image: "https://m.media-amazon.com/images/I/51BiP6i+qIL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 3,
    image: "https://m.media-amazon.com/images/I/71r-M3Ndx3L._UF1000,1000_QL80_.jpg",
  },
  {
    id: 5,
    title: "Billy Joe",
    author: "F. Scott Fitzgerald",
    price: 12,
    image: "https://m.media-amazon.com/images/I/718Bb1aU71L._UF1000,1000_QL80_.jpg",
  },
  {
    id: 6,
    title: "Charlie Kirk",
    author: "George Orwell",
    price: 15,
    image: "https://m.media-amazon.com/images/I/81cPazH8X7L.jpg",
  },
  {
    id: 7,
    title: "Be a Hero",
    author: "Harper Lee",
    price: 10,
    image: "https://m.media-amazon.com/images/I/51BiP6i+qIL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 8,
    title: "Atomic Habits",
    author: "Jane Austen",
    price: 8,
    image: "https://m.media-amazon.com/images/I/71r-M3Ndx3L._UF1000,1000_QL80_.jpg",
  },
  {
    id: 9,
    title: "Believer",
    author: "F. Scott Fitzgerald",
    price: 19,
    image: "https://m.media-amazon.com/images/I/718Bb1aU71L._UF1000,1000_QL80_.jpg",
  },
  {
    id: 10,
    title: "Making an Impact",
    author: "George Orwell",
    price: 15,
    image: "https://m.media-amazon.com/images/I/81cPazH8X7L.jpg",
  },
  {
    id: 11,
    title: "Michael's Life",
    author: "Harper Lee",
    price: 12,
    image: "https://m.media-amazon.com/images/I/51BiP6i+qIL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 12,
    title: "Being Alone Again",
    author: "Jane Austen",
    price: 23,
    image: "https://m.media-amazon.com/images/I/71r-M3Ndx3L._UF1000,1000_QL80_.jpg",
  },
];

export default function ShopPage() {
  const [sortOption, setSortOption] = useState("title");

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
          {sortedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
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
