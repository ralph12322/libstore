// pages/checkout/index.tsx
import { useState } from "react";
import CheckoutButton from "@/components/CheckoutButton";

export default function CheckoutPage() {
  const [amount, setAmount] = useState(10000); // default ₱100.00 (amount is in centavos)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-600 mb-6">
          You are about to pay <span className="font-semibold">₱{(amount / 100).toFixed(2)}</span> using GCash.
        </p>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Enter amount (₱)
          </label>
          <input
            id="amount"
            type="number"
            value={amount / 100}
            onChange={(e) => setAmount(Number(e.target.value) * 100)}
            className="border rounded-lg px-3 py-2 w-full text-center"
            min="1"
          />
        </div>

        {/* The Pay with GCash button */}
        <CheckoutButton amount={amount} />

        <p className="text-xs text-gray-500 mt-6">
          This will redirect you to a secure PayMongo GCash checkout page.
        </p>
      </div>
    </main>
  );
}
