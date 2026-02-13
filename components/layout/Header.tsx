'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

export function Header({ 
  siteName, 
  navigation
}: { 
  siteName: string;
  navigation: Array<{ label: string; href: string }>;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Pages with hero sections that should have transparent navbar
  const heroPages = ['/', '/story'];
  const hasHero = heroPages.includes(pathname);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Determine if we should show transparent mode (only on hero pages when not scrolled)
  const isTransparent = hasHero && !isScrolled && !isMobileMenuOpen;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isTransparent
            ? 'bg-transparent py-6 text-white'
            : 'bg-white/95 backdrop-blur-md py-2 shadow-sm text-black'
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative">
          
          {/* Left: F-Logo */}
          <Link 
            href="/" 
            className={cn(
              "relative z-20 shrink-0 transition-all duration-300",
              isTransparent ? "h-14 w-14" : "h-10 w-10"
            )} 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src={isTransparent
                ? "/logos/Fahemi_Logo-F_(forDark-BG).svg" 
                : "/logos/Fahemi_Logo-F_(forLight-BG).svg"
              }
              alt="F Logo"
              fill
              className="object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* Center: Text Logo */}
          <Link 
            href="/" 
            className={cn(
              "absolute left-1/2 -translate-x-1/2 z-20 hidden md:block transition-all duration-300",
              isTransparent ? "h-12 w-56" : "h-8 w-40"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src={isTransparent
                ? "/logos/Fahemi_Logo-text_(forDark-BG).svg" 
                : "/logos/Fahemi_Logo-text_(forLight-BG).svg"
              }
              alt={siteName}
              fill
              className="object-contain transition-all duration-300"
              priority
            />
          </Link>
          {/* Mobile Center Text Logo */}
           <Link 
             href="/" 
             className={cn(
               "absolute left-1/2 -translate-x-1/2 z-20 md:hidden transition-all duration-300",
               isTransparent ? "h-8 w-40" : "h-6 w-32"
             )}
             onClick={() => setIsMobileMenuOpen(false)}
           >
            <Image
              src={isTransparent
                ? "/logos/Fahemi_Logo-text_(forDark-BG).svg" 
                : "/logos/Fahemi_Logo-text_(forLight-BG).svg"
              }
              alt={siteName}
              fill
              className="object-contain transition-all duration-300"
              priority
            />
          </Link>


          {/* Right: Navigation & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
             {/* Desktop Nav */}
            <nav className={cn(
              "hidden lg:flex items-center gap-8 font-medium tracking-wide transition-all duration-300",
               isTransparent ? "text-white/90 hover:text-white text-base" : "text-primary/80 hover:text-primary text-sm"
            )}>
              {navigation.map((link) => (
                <Link key={link.label} href={link.href} className="hover:opacity-70 transition-opacity">{link.label}</Link>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("lg:hidden relative z-30", isTransparent && "hover:bg-white/10 hover:text-white")}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 overflow-y-auto"
          >
            <nav className="flex flex-col items-center space-y-8 mt-12">
              {navigation.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="text-2xl font-sans font-medium tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="w-12 h-[1px] bg-gray-200 my-8" />
              
              <div className="flex gap-8 text-gray-500">
                 <Link href="/account" className="text-sm uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Account</Link>
                 <Link href="/search" className="text-sm uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Search</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
