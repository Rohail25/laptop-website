import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MR Laptops — Power, beautifully engineered.",
  description:
    "MR builds premium laptops and stocks HP, Dell, Lenovo and MacBook. Explore the MR X1 in interactive 3D.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
