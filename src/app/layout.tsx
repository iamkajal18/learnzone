"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeContext";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout({ children }: { children: ReactNode }) {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const pathname = usePathname();

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
        <body className="bg-white dark:bg-[#0f172a] text-gray-800 dark:text-white transition-colors duration-500">
          <ThemeProvider>
            <Navbar />
            <Toaster position="top-center" />
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                className="min-h-screen py-16"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
