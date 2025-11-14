"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Package, TrendingUp, DollarSign, BookOpen } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  seller: string;
}

interface BookForm {
  title: string;
  author: string;
  price: string;
  image: string;
}

const SellerPage: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState<BookForm>({ title: "", author: "", price: "", image: "" });
  const [books, setBooks] = useState<Book[]>([]);
  const [isSeller, setIsSeller] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: sellerData } = await axios.get<{ role: string }>("/api/admin/seller", {
          withCredentials: true,
        });

        if (sellerData.role !== "seller") {
          router.replace("/");
          return;
        }

        setIsSeller(true);

        const { data: bookData } = await axios.get<Book[]>("/api/admin/getBooks", {
          withCredentials: true,
        });

        setBooks(bookData);
      } catch (error) {
        console.error("Failed to load seller or books:", error);
        router.replace("/");
      }
    };

    init();
  }, []); // Empty dependency array - runs only once on mount

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.price || !form.image) return;

    setLoading(true);
    try {
      const { data: newBook } = await axios.post<Book>(
        "/api/admin/createBooks",
        { ...form, price: Number(form.price) },
        { withCredentials: true }
      );

      setBooks((prev) => [newBook, ...prev]);
      setForm({ title: "", author: "", price: "", image: "" });
      setShowAddForm(false);
    } catch (err) {
      console.error("Error adding book:", err);
      alert("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    setDeleteLoading(bookId);
    try {
      await axios.delete(`/api/admin/deleteBooks`, {
        withCredentials: true,
        data: {bookId}
      });

      setBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const totalRevenue = books.reduce((sum, book) => sum + book.price, 0);
  const totalBooks = books.length;

  if (isSeller === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isSeller) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your book inventory</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Plus size={20} />
              Add New Book
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Books</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalBooks}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">₱{totalRevenue}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₱{totalBooks > 0 ? Math.round(totalRevenue / totalBooks) : 0}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Add Book Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Book Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Author Name
                  </label>
                  <input
                    name="author"
                    type="text"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Price (₱)
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Image URL
                  </label>
                  <input
                    name="image"
                    type="text"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Adding..." : "Add Book"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Books Inventory */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-gray-700" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Book Inventory</h2>
            <span className="ml-2 bg-gray-100 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {totalBooks}
            </span>
          </div>

          {!books.length ? (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg font-medium">No books added yet</p>
              <p className="text-gray-400 text-sm mt-1">Click "Add New Book" to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => handleDelete(book._id)}
                      disabled={deleteLoading === book._id}
                      className="absolute top-2 right-2 bg-white hover:bg-red-50 text-red-600 p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                    >
                      {deleteLoading === book._id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 min-h-[2.5rem]">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 truncate">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">₱{book.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerPage;