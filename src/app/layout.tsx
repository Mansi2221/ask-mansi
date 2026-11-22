import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ask Mansi — Interactive AI Portfolio",
  description:
    "Ask anything about Mansi Patil's engineering work, projects, and skills. AI-powered portfolio grounded in real code and contributions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="min-h-full flex flex-col" style={{ background: "#FFF8F5", color: "#2D2235" }}>{children}</body>
    </html>
  );
}
