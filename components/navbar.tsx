"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Cart", href: "/cart" },
  ];

  return (
    <header className="bg-gradient-to-r from-purple-900 via-purple-700 to-blue-700 sticky top-0 z-50 shadow-lg shadow-purple-900/30">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        
          <Image
            src="https://img.freepik.com/premium-vector/rr-logo-design_566521-43.jpg"
            alt="Bookstore Logo"
            width={50}
            height={50}
            className="object-contain drop-shadow-md"
          />
    

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-white font-medium transition ${
                pathname === link.href
                  ? "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white"
                  : "hover:opacity-80"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col space-y-1.5"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-purple-900 to-blue-700 shadow-inner border-t border-purple-600">
          <nav className="flex flex-col p-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-white font-medium transition ${
                  pathname === link.href ? "underline" : "hover:opacity-80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
