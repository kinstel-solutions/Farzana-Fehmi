'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimatedLogo } from './AnimatedLogo';

export function Hero({ data }: { data: any }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [logoTransitioned, setLogoTransitioned] = useState(false);

  useEffect(() => {
    if (!data?.images?.length) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % data.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data?.images?.length]);

  if (!data) return null;

  return (
    <>
      {/* Splash screen overlay */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-auto"
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <AnimatedLogo
              layoutId="hero-logo"
              className="w-[60vw] md:w-[50vw] lg:w-[40vw] max-w-4xl h-auto"
              onAnimationComplete={() => {
                setTimeout(() => {
                  setShowSplash(false);
                  setTimeout(() => setLogoTransitioned(true), 100);
                }, 30);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section - always mounted */}
      <section className="relative h-[100dvh] w-full bg-black overflow-hidden flex items-center justify-center">
        
        {/* Background Slideshow */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              {/* Mobile Image */}
              <div className={data.desktopImages ? 'md:hidden' : ''}>
                <Image
                  src={data.images[currentImage]}
                  alt={`Hero image ${currentImage + 1}`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="100vw"
                />
              </div>

              {/* Desktop Image */}
              {data.desktopImages && (
                <div className="hidden md:block">
                  <Image
                    src={data.desktopImages[currentImage]}
                    alt={`Hero image ${currentImage + 1}`}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="100vw"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          {/* Helper overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center text-white space-y-6 max-w-2xl px-4 mt-20">
          <div className="flex justify-center mb-8">
            <AnimatedLogo
              layoutId="hero-logo"
              skipAnimation={true}
              className="w-[35vw] md:w-[35vw] lg:w-[20vw] max-w-xl h-auto drop-shadow-2xl"
            />
          </div>

          {logoTransitioned && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                href={data.buttonLink} 
                className="inline-block border-b-2 border-white pb-2 text-base md:text-lg font-medium tracking-[0.15em] hover:text-white/80 hover:border-white/80 transition-all uppercase drop-shadow-md"
              >
                {data.buttonText}
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
