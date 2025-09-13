"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Edit, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/me', { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          console.log('User profile:', data);
          setEmail(data.email || 'UNKNOWN');
          setUsername(data.username || 'UNKNOWN');
          setLocation(data.location || 'PHILIPPINES');
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (res.ok) {
        toast.success('Logged out successfully');
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 2000);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="h-[80.5vh] bg-gradient-to-b from-purple-900 via-purple-800 to-blue-900 text-white flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full bg-black opacity-80 transition 
              hover:shadow-[0_8px_20px_rgba(120,81,169,0.6)]   /* Royal Purple glow */
              hover:-translate-y-1 py-12 text-center shadow-lg mb-10">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <p className="text-gray-200 mt-2">Manage your account & preferences</p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white text-black rounded-2xl shadow-2xl w-full max-w-lg  p-8"
      >
        {/* Avatar */}
        <div className="flex justify-center -mt-16">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-700 to-blue-600 flex items-center justify-center shadow-xl">
            <User className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-black">{username}</h2>
          <p className="text-gray-600">{email}</p>
          <p className="mt-2 text-gray-700">📍 {location}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 px-5 py-2 bg-purple-700 text-white rounded-xl shadow hover:bg-purple-800 transition"
          >
            <Edit className="w-4 h-4" /> {editing ? "Cancel" : "Edit"}
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition" onClick={handleLogout}>
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Edit Form */}
        {editing && (
          <form className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                defaultValue="johndoe@email.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-lg font-medium shadow-md hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
