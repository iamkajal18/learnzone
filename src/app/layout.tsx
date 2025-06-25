// app/layout.tsx
"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import "react-markdown-editor-lite/lib/index.css";
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
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider>
            <Navbar />
            <Toaster />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
