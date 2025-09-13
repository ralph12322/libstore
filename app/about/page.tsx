import Navbar from "@/components/navbar";

// app/about/page.tsx
export default function AboutPage() {
  return (
    <>
      <section className="w-full h-[84.5vh] bg-gradient-to-br from-white via-steelblue-100 to-purple-100 flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold text-purple-800 mb-6">
            About <span className="text-steelblue-600">Us</span>
          </h1>

          <p className="text-lg text-gray-800 leading-relaxed mb-6">
            Welcome to{" "}
            <span className="font-semibold text-purple-700">Read and Roam</span> – 
            your go-to online bookstore for timeless classics, modern bestsellers, 
            and hidden literary gems. Our mission is to make reading accessible and 
            enjoyable for everyone by offering a wide variety of books across all genres.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed mb-6">
            Founded in <span className="font-semibold text-black">2025</span>, we are passionate about 
            connecting readers with stories that inspire, educate, and entertain. Whether 
            you are a casual reader, a student, or a lifelong book lover, you’ll always 
            find something special here.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed">
            Join us in celebrating the joy of reading, one page at a time!{" "}
            <span className="text-2xl">📖</span>
          </p>
        </div>
      </section>
    </>
  );
}
