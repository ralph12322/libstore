import React from "react";

export default function Hero() {
  return (
    <section className="font-cinzel relative w-full h-[42vh]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://homelightblog.wpengine.com/wp-content/uploads/2021/01/do-built-in-bookshelves-add-value-1.png')",
        }}
      ></div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/75 to-black/75"></div>


      {/* Content */}
      <div className="relative container mx-auto flex justify-center md:flex-row items-center text-center md:text-left h-full px-6">
        <div className="flex flex-col justify-center items-center text-center max-w-3xl">
          <h1 className="text-7xl font-extrabold text-white leading-tight mb-4">
            Read and Roam
          </h1>
          <p className="text-lg text-white mb-8">
            Read and Roam offers a curated selection of books that ignite your imagination and fuel your passion for reading.
          </p>
          <a
            href="https://www.facebook.com/pawns88"
            target="_blank"
            className="inline-block bg-[#7851A9] text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-[#5e3e8a] hover:shadow-xl hover:scale-105 transition transform"
          >
            Handsome
          </a>
        </div>
      </div>
    </section>
  );
}
