import type { Metadata } from "next";
import { Geist, Geist_Mono, Codystar } from "next/font/google";
import Header from "@/components/Header/Header";
import "./globals.css";
import { GuestSessionProvider } from "@/providers/GetSessionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const codystar = Codystar({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-codystar',
});

export const metadata: Metadata = {
  title: "Kuin's Movie Database",
  description: "Created by Iñaki Odriozola García",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${codystar.variable} antialiased`}
      >
        <GuestSessionProvider>
          <Header/>
          {children}
        </GuestSessionProvider>
      </body>
    </html>
  );
}
