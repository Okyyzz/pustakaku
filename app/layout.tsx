import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "PustakaKu",
  description: "Aplikasi pencatatan buku perpustakaan prasmul",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10">{children}</main>
      </body>
    </html>
  );
}