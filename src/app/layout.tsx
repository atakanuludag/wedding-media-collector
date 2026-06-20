import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { appConfig } from "@/lib/config";
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
  metadataBase: new URL(appConfig.siteUrl),
  title: appConfig.title,
  description: appConfig.description,
  openGraph: {
    title: appConfig.title,
    description: appConfig.description,
    url: appConfig.siteUrl,
    siteName: appConfig.title,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.title,
    description: appConfig.description,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: appConfig.title,
  },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 text-stone-900">
        {children}
      </body>
    </html>
  );
}
