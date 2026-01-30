import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getCMSProvider } from '@/lib/cms/cms-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const tangerine = localFont({
  src: '../public/fonts/Tangerine-Bold.ttf',
  variable: '--font-tangerine',
});

export const metadata: Metadata = {
  title: 'Farzana Fehmi | Designer Garments',
  description: 'Discover the latest collection of designer garments by Farzana Fehmi.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const provider = getCMSProvider();
  const globalData = await provider.getGlobalData();

  return (
    <html lang="en" className={cn(inter.variable, playfair.variable, tangerine.variable)}>
      <body className="font-sans antialiased text-foreground bg-background selection:bg-black selection:text-white">
        <Header siteName={globalData.siteName} navigation={globalData.navigation} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
