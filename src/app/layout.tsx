import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/app/Providers";
import { RootAppShell } from "@/app/RootAppShell";
import { LiveRegionProvider } from "@/app/components/LiveRegion";
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
  title: "tonypettigrew.dev",
  description: "tonypettigrew.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="system" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LiveRegionProvider>
            <RootAppShell>{children}</RootAppShell>
          </LiveRegionProvider>
        </Providers>
      </body>
    </html>
  );
}
