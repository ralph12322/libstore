"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PageLoader from "@/components/PageLoader";
import TransitionProvider from "@/components/transition-provider";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
     
      if (pathname === "/auth/login" || pathname === "/auth/signup") {
        return;
      }

      try {
        const res = await fetch("/api/auth/me", { method: "GET" });

        if (!res.ok) {
          router.replace("/unauthorized");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.replace("/unauthorized");
      }
    };

    checkAuth();
  }, [pathname, router]);

  return (
    <>
      <Toaster position="bottom-left" toastOptions={{ duration: 3000 }} />
      <PageLoader />
      <Navbar />
      <TransitionProvider>
        {children}
        <Footer />
      </TransitionProvider>
    </>
  );
}
