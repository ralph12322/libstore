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
      title: "The Great Gatsby",
      price: "₱10",
      image: "https://m.media-amazon.com/images/I/410HvKUSIgL._SL500_.jpg",
    },
    {
      title: "1984",
      price: "₱12",
      image:
        "https://www.aupress.ca/app/uploads/120320_How-Education-Works-cover.jpg",
    },
    {
      title: "To Kill a Mockingbird",
      price: "₱15",
      image: "https://m.media-amazon.com/images/I/410HvKUSIgL._SL500_.jpg",
    },
    {
      title: "Pride and Prejudice",
      price: "₱9",
      image:
        "https://www.aupress.ca/app/uploads/120320_How-Education-Works-cover.jpg",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Hero />

      {/* Featured Books */}
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-black">
          Featured Books
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative w-full h-64 sm:h-80 md:h-64 lg:h-72">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 768px) 50vw,
                         (max-width: 1024px) 33vw,
                         25vw"
                />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-bold text-black truncate">{book.title}</h4>
                <p className="text-[#7851A9] font-medium">{book.price}</p>
                <button className="mt-3 w-full bg-[#7851A9] text-white py-2 rounded-lg hover:bg-[#5e3e8a] transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-black">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2z M12 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2z",
              title: "Wide Selection",
              description: "Thousands of books across all genres to choose from.",
            },
            {
              iconPath: "M3 10h1l1 2h13l1-2h1M5 6h14l1 2H4l1-2zM5 18h14l1-2H4l1 2z",
              title: "Fast Shipping",
              description: "Quick and reliable delivery to your doorstep.",
            },
            {
              iconPath: "M5 13l4 4L19 7",
              title: "Quality Assurance",
              description: "Only the best books handpicked for our customers.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center border border-[#4682B4]/20 flex flex-col items-center"
            >
              <div className="mb-4">
                <svg
                  className="w-12 h-12 text-[#7851A9]"
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
              <h4 className="text-lg font-bold mb-2 text-black">{item.title}</h4>
              <p className="text-[#4682B4]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
