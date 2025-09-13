import React from "react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-[#4682B4] via-white to-[#7851A9] py-13 px-6 w-full h-[42vh]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        {/* Left Content */}
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold text-black leading-tight mb-4">
            Welcome to <span className="text-[#7851A9]">R and R</span>
          </h2>
          <p className="text-lg text-black mb-8">
            Read and Roam offers a curated selection of books that ignite your imagination and fuel your passion for reading.
          </p>
          <a
            href="https://www.facebook.com/pawns88" target="_blank"
            className="inline-block bg-[#7851A9] text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-[#5e3e8a] hover:shadow-xl hover:scale-105 transition transform"
          >
            Handsome
          </a>
        </div>

        {/* Right Image (optional illustration) */}
        <div className="mt-10 md:mt-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
            alt="Books illustration"
            className="w-72 md:w-96 drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
