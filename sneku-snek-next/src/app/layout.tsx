import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Layout/Header";
import { AuthProvider } from "@/services/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sneku Snek",
  description: "Your App Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header /> {/* Header appears on all pages */}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
