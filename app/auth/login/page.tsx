"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartstore";

export default function LoginPage() {
  const router = useRouter();
  const setUserKey = useCartStore((state) => state.setUserKey);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        toast.success("Login successful!");

        // 🧠 Set unique cart key for this user
        setUserKey(form.email);

        // 🧹 Clear cart in memory to avoid mixing from previous users
        clearCart();

        // 🧩 Force Zustand to reload from new storage key
        setTimeout(() => {
          window.dispatchEvent(new Event("storage"));
        }, 100);

        // 🔁 Trigger global user state update
        window.dispatchEvent(new Event("user-updated"));

        // ✅ Redirect based on role
        if (data.role === "Admin") {
          router.push("/auth/admin");
        } else {
          router.push("/");
        }
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-[84.5vh] items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Log In to Your Account
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
