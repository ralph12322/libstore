"use "

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import TransitionProvider from "@/components/transition-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Read and Roam",
  description: "An aesthetic online bookstore built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Toast container */}
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: { fontFamily: "var(--font-geist-sans)" },
          }}
        />

        <PageLoader />
        <Navbar />

        <TransitionProvider>
          {children}
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  );
}
