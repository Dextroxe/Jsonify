import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jsonify - JSON Creator & Enhancer",
  description: "Create, complete, and format JSON data with ease",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
      >
       <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
           <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
