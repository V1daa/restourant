import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = FontSans({ weight: "500", subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><NavBar />{children}</body>
    </html>
  );
}
