import Navbar from "@/components/navbar";

// app/contact/page.tsx
export default function ContactPage() {
  return (
    <>
      <section className="min-h-[84.5vh] bg-gradient-to-br from-white via-steelblue-100 to-purple-100 flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-purple-800 mb-8">
            Get in <span className="text-steelblue-600">Touch</span>
          </h1>

          <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
            Have questions, feedback, or need assistance?  
            We’d love to hear from you. Fill out the form below or reach us directly through our contact details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  placeholder="Write your message..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition shadow-md"
              >
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div className="flex flex-col justify-center space-y-6 text-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-purple-700 mb-1">📍 Address</h3>
                <p>123 Bookstore Lane, Manila, Philippines</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-700 mb-1">📞 Phone</h3>
                <p>+63 912 345 6789</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-700 mb-1">📧 Email</h3>
                <p>support@mybookstore.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-700 mb-1">⏰ Business Hours</h3>
                <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
