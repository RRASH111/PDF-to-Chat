import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

import "react-loading-skeleton/dist/skeleton.css";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import 'simplebar-react/dist/simplebar.min.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <Providers>
      <body className={cn(
        'min-h-screen font-sans autialiased grainy',
        inter.className
      )}>
        <Toaster/>
        <Navbar />
        {children}
      </body>
      </Providers>
    </html>
  );
}
