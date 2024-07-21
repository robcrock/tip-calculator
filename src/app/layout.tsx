import type { Metadata } from "next";
import { Space_Mono as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700"], // Available weights for Space Mono
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Frontend Mentor | Tip calculator app",
  description:
    "My solution to the Frontend Mentor Tip Calculator App challenge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-custom min-h-screen bg-background antialiased",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
