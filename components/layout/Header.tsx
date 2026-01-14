'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent',
          isScrolled || isMobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md border-border py-2 shadow-sm text-black'
            : 'bg-gradient-to-b from-black/50 to-transparent py-6 text-white'
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("lg:hidden relative z-10", !isScrolled && !isMobileMenuOpen && "hover:bg-white/10 hover:text-white")}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
            
            {/* Desktop Nav */}
            <nav className={cn(
              "hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide transition-colors duration-300",
               isScrolled ? "text-primary" : "text-white"
            )}>
              <Link href="/shop" className="hover:opacity-70 transition-opacity">SHOP</Link>
              <Link href="/shop" className="hover:opacity-70 transition-opacity">COLLECTIONS</Link>
              <Link href="/story" className="hover:opacity-70 transition-opacity">STORY</Link>
              <Link href="/contact" className="hover:opacity-70 transition-opacity">CONTACT</Link>
            </nav>
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group" onClick={() => setIsMobileMenuOpen(false)}>
            <h1 className={cn(
              "font-serif font-bold tracking-tighter uppercase transition-all duration-300",
              isScrolled || isMobileMenuOpen ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
            )}>
              Farzana Fehmi
            </h1>
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className={cn("transition-colors", !isScrolled && !isMobileMenuOpen && "hover:bg-white/10 hover:text-white")}>
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className={cn("hidden md:inline-flex transition-colors", !isScrolled && !isMobileMenuOpen && "hover:bg-white/10 hover:text-white")}>
              <User className="w-5 h-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button variant="ghost" size="icon" className={cn("transition-colors relative", !isScrolled && !isMobileMenuOpen && "hover:bg-white/10 hover:text-white")}>
              <ShoppingBag className="w-5 h-5" />
              <div className={cn("absolute top-2 right-2 w-2 h-2 rounded-full", isScrolled || isMobileMenuOpen ? "bg-black" : "bg-white")}></div>
              <span className="sr-only">Cart</span>
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
              <Link 
                href="/shop" 
                className="text-2xl font-serif font-medium tracking-wide hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link 
                href="/shop" 
                className="text-2xl font-serif font-medium tracking-wide hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                COLLECTIONS
              </Link>
              <Link 
                href="/story" 
                className="text-2xl font-serif font-medium tracking-wide hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                STORY
              </Link>
              <Link 
                href="/contact" 
                className="text-2xl font-serif font-medium tracking-wide hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </Link>
              
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
