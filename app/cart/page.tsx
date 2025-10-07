"use client";

import { useCartStore } from "@/lib/store/cartstore";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import CheckoutButton from "@/components/CheckoutButton";

export default function CartPage() {
  const { cart, removeFromCart } = useCartStore();

  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    useCartStore.setState((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      ),
    }));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 59 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-blue-900 text-white py-8 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white/10 p-4 sm:p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Cart</h1>
          {cart.length === 0 ? (
            <p className="text-gray-300">Your cart is empty.</p>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/5 p-3 sm:p-4 rounded-xl shadow"
                >
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={60}
                      height={90}
                      className="rounded-lg shadow-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-md sm:text-lg font-semibold truncate">
                        {item.title}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-300">
                        ₱{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                    <button
                      onClick={() => updateQuantity(item.id, "decrease")}
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded bg-purple-700 hover:bg-purple-600 transition"
                    >
                      -
                    </button>
                    <span className="px-2 sm:px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, "increase")}
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded bg-blue-700 hover:bg-blue-600 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 transition mt-2 sm:mt-0"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white/10 p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-gray-200">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₱{shipping.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-600 pt-2 flex justify-between text-lg sm:text-xl font-semibold">
              <span>Total</span>
              <span>₱{total.toFixed(2)}</span>
            </div>
          </div>

          {cart.length > 0 && (
            <div className="mt-4 sm:mt-6">
              <CheckoutButton amount={Math.round(total * 100)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
