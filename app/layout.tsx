// app/layout.tsx (SERVER)
import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import AuthProvider from "./authProvider/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"], // optional
  variable: "--font-cinzel",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Read and Roam",
  description: "An aesthetic online bookstore built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>

    </html>
  );
}
