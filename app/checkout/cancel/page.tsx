"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-red-700 mb-2">Payment Canceled</h1>
        <p className="text-gray-600 mb-6">
          It seems your payment didn’t go through or was canceled.
        </p>
        <Link
          href="/checkout"
          className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </Link>
      </div>
    </main>
  );
}
