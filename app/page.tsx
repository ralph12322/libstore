"use client";
import Hero from "@/components/hero";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { connectDb } from "@/lib/connectDb";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const connectToDatabase = async () => {
      try {
        await connectDb();
        console.log("✅ Database connected");
      } catch (error) {
        console.error("❌ Database connection failed:", error);
      }
    };
    connectToDatabase();
  }, []);

  const books = [
    {
      title: "The Art of Teaching Children",
      author: "Phillip Done",
      price: "₱350",
      image: "https://m.media-amazon.com/images/I/410HvKUSIgL._SL500_.jpg",
    },
    {
      title: "How Education Works",
      author: "Jun Done",
      price: "₱400",
      image: "https://www.aupress.ca/app/uploads/120320_How-Education-Works-cover.jpg",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: "₱350",
      image: "https://m.media-amazon.com/images/I/410HvKUSIgL._SL500_.jpg",
    },
    {
      title: "1984",
      author: "George Orwell",
      price: "₱400",
      image: "https://www.aupress.ca/app/uploads/120320_How-Education-Works-cover.jpg",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Hero />

      {/* Featured Books - Improved for mobile */}
      <section className="container mx-auto pt-20 px-3 sm:px-4 py-6 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            FEATURED BOOKS
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            A curated selection of books that ignite your imagination and fuel your passion for reading.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#7851A9]/20"
            >
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw,
                         (max-width: 768px) 50vw,
                         (max-width: 1024px) 33vw,
                         25vw"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 mb-1">
                  {book.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  {book.author}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[#7851A9] font-bold text-sm sm:text-base">
                    {book.price}
                  </span>
                  <button className="bg-[#7851A9] text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg hover:bg-[#5e3e8a] transition-colors duration-200 font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Improved for mobile */}
      <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 bg-gray-50 rounded-2xl my-6">

        <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-gray-900">
          Why Choose Us?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              title: "Wide Selection",
              description: "Thousands of books across all genres to choose from.",
            },
            {
              iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
              title: "Fast Shipping",
              description: "Quick and reliable delivery to your doorstep.",
            },
            {
              iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              title: "Quality Assurance",
              description: "Only the best books handpicked for our customers.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 sm:p-6 rounded-xl shadow-sm text-center border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col items-center"
            >
              <div className="mb-4 p-3 bg-[#7851A9]/10 rounded-full">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-[#7851A9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.iconPath}
                  />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">
                {item.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base">
            © 2025 Read and Roam. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}