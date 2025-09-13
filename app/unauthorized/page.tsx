// /pages/unauthorized.tsx
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-[84.5vh] bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          ⚠ You must be logged in first
        </h1>
        <p className="text-gray-700 mb-6">
          To access this page, please log in to your account.
        </p>
        <Link href="/auth/login">
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
}
