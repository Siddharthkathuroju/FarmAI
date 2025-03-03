import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FarmAI - Smart Assistant for Farmers",
  description: "AI-powered assistant custom trained for all your farming needs",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <nav className="sticky top-0 z-50">
          <Navbar />
        </nav>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <footer className="w-full border-t py-6">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is done by technovich
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 FarmAI. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

import "./globals.css";
