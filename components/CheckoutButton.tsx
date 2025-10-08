// components/CheckoutButton.tsx
import React from "react";

export default function CheckoutButton({ amount }: { amount: number }) {
  // amount: integer in centavos. Example: ₱150.00 => 15000
  const handleClick = async () => {
    try {
      const res = await fetch("/api/checkout/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, description: "Order #1234" }),
      });
      const data = await res.json();
      if (!res.ok) throw data;
      // Redirect to PayMongo hosted checkout
      window.location.href = data.checkout_url;
    } catch (e) {
      console.error("Checkout error", e);
      alert("Could not start checkout. See console for details.");
    }
  };

  return (
    <button onClick={handleClick} className="px-4 py-2 rounded bg-blue-600 text-white">
      Checkout
    </button>
  );
}
