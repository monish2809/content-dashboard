"use client";
import { Providers } from "@/store/provider";
import "./globals.css";
import FavoritesInitializer from "@/components/FavoritesInitializer";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const theme = window.localStorage.getItem("theme") || "light";
    document.body.className = theme;
  });
  return (
    <html lang="en">
      <body>
        <Providers>
          <FavoritesInitializer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
