"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, X, Menu } from "lucide-react";
import logo from "../public/logo.png";
import { useCartStore } from "@/lib/store/cartstore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-purple-900/80 shadow-lg border-b border-purple-700/50">
      <div className="container mx-auto flex justify-between items-center py-2 sm:py-3 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative">
            <Image
              src={logo}
              alt="Bookstore Logo"
              width={50}
              height={50}
              className="object-contain drop-shadow-lg rounded-2xl transition-transform group-hover:scale-105 sm:w-[60px] sm:h-[60px]"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 text-white font-medium rounded-lg transition-all hover:bg-white/10 ${
                pathname === link.href 
                  ? "bg-white/15 text-yellow-300" 
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            href="/cart" 
            className="p-2.5 text-white hover:bg-white/10 rounded-lg transition-all hover:text-yellow-300 relative group"
          >
            <ShoppingCart size={22} />
            {mounted && cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center group-hover:scale-110 transition">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link 
            href="/profile" 
            className="p-2.5 text-white hover:bg-white/10 rounded-lg transition-all hover:text-yellow-300"
          >
            <User size={22} />
          </Link>
        </div>

        {/* Mobile Icons + Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link 
            href="/cart" 
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-all relative"
          >
            <ShoppingCart size={20} />
            {mounted && cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-purple-900/95 backdrop-blur-lg border-t border-purple-700/50 animate-slideDown">
          <nav className="flex flex-col p-3">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2.5 text-white font-medium rounded-lg transition-all hover:bg-white/10 ${
                  pathname === link.href ? "bg-white/15 text-yellow-300" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Profile */}
            <div className="mt-3 pt-3 border-t border-purple-700/50">
              <Link 
                href="/profile" 
                className="flex items-center gap-2 px-3 py-2.5 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
            </div>
          </nav>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}