"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "The Silent Library",
      price: 18.99,
      quantity: 1,
      image:
        "https://m.media-amazon.com/images/I/61jDhgNwgFL.jpg",
    },
    {
      id: 2,
      title: "Mysteries of Time",
      price: 24.5,
      quantity: 2,
      image:
        "https://m.media-amazon.com/images/I/718Bb1aU71L._UF1000,1000_QL80_.jpg",
    },
  ]);

  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-blue-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          {cart.length === 0 ? (
            <p className="text-gray-300">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white/5 p-4 rounded-xl shadow"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={60}
                      height={90}
                      className="rounded-lg shadow-md"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-sm text-gray-300">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, "decrease")}
                      className="px-2 py-1 rounded bg-purple-700 hover:bg-purple-600"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, "increase")}
                      className="px-2 py-1 rounded bg-blue-700 hover:bg-blue-600"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-gray-200">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-600 pt-2 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition font-semibold">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
