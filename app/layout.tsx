import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCMSProvider } from "@/lib/cms/cms-provider";
import { ToastProvider } from "@/components/ui/Toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const tangerine = localFont({
  src: "../public/fonts/Tangerine-Bold.ttf",
  variable: "--font-tangerine",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fehmifarz.com'),
  title: "Fehmi Farzana Designs",
  description:
    "Discover the latest collection of designer garments by Fehmi Farzana Designs. Unique, sustainable, and ethically made clothing.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://www.fehmifarz.com",
    siteName: "Fehmi Farzana Designs",
    title: "Fehmi Farzana Designs",
    description: "Discover the latest collection of designer garments by Fehmi Farzana Designs. Unique, sustainable, and ethically made clothing.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Fehmi Farzana Designs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fehmi Farzana Designs",
    description: "Discover the latest collection of designer garments by Fehmi Farzana Designs.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: '/icon.svg', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const provider = getCMSProvider();
  const globalData = await provider.getGlobalData();

  return (
    <html
      lang="en"
      className={cn(inter.variable, playfair.variable, tangerine.variable)}>
      <body className="font-sans antialiased text-foreground bg-background selection:bg-black selection:text-white">
        <ToastProvider>
          <Header
            siteName={globalData.siteName}
            navigation={globalData.navigation}
          />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
