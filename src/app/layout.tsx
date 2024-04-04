import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

import "react-loading-skeleton/dist/skeleton.css";
import {CSPostHogProvider} from "@/components/PostHogProvider";
import { Toaster } from "@/components/ui/toaster";
import 'simplebar-react/dist/simplebar.min.css'
import CrispProvider from "@/components/CrispProvider";
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
        <CrispProvider/>
        <CSPostHogProvider>
      <body className={cn(
        'min-h-screen font-sans autialiased grainy',
        inter.className
      )}>
        <Toaster/>
        <Navbar />
        {children}
      </body>
      </CSPostHogProvider>
      </Providers>
    </html>
  );
}
