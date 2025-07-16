// app/layout.tsx
"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs"; // Only if you were using Clerk
import { ThemeProvider } from "@/components/ThemeContext";

export default function Layout({ children }: { children: ReactNode }) {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      toast.success("🎉 Welcome to LearnLive!");
      localStorage.setItem("hasVisited", "true");
      setIsFirstVisit(true);
    }
  }, []);

  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <ThemeProvider>
            <Navbar />
            <Toaster />
            <main className="min-h-screen py-16">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
