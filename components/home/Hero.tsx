'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Hero({ data }: { data: any }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!data?.images?.length) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % data.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data?.images?.length]);

  if (!data) return null;

  return (
    <section className="relative h-[100dvh] w-full bg-black overflow-hidden flex flex-col md:flex-row">
      
      {/* --- Mobile View: Full Screen Slideshow --- */}
      <div className="absolute inset-0 md:hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
             <Image
              src={data.images[currentImage]}
              alt={`Hero image ${currentImage + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
         <div className="absolute inset-0 bg-black/30" />
      </div>

       {/* --- Desktop View: Split Layout --- */}
       
       {/* Left Column: Text (Editorial Style) */}
       <div className="relative z-10 w-1/2 h-full flex flex-col items-start justify-center px-6 md:pl-20 md:pr-10 text-white pointer-events-none md:pointer-events-auto overflow-hidden">
          
          {/* Watermark Logo */}
          <div className="absolute left-0 top-0 h-full w-auto z-0 hidden md:flex items-center opacity-30 pointer-events-none select-none">
             {/* Using img to allow height-based auto-width easily without knowing aspect ratio */}
             <img
                src="/logo-white-noBg.svg"
                alt=""
                className="h-full w-auto object-contain"
             />
          </div>

          <div className="relative z-10 max-w-xl space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 text-white/80 md:text-white/60">
                {data.subtitle}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
                {data.title}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link 
                href={data.buttonLink} 
                className="inline-block border-b border-white pb-2 text-base md:text-lg font-medium tracking-[0.1em] hover:text-white/70 hover:border-white/70 transition-all uppercase"
              >
                {data.buttonText}
              </Link>
            </motion.div>
          </div>
       </div>

       {/* Right Column: Image Slideshow (Desktop Only) */}
       {/* 50% width, full height, centered content */}
       <div className="hidden md:flex w-1/2 h-full relative bg-zinc-900 items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 flex items-center justify-center" 
            >
               {/* 100% height image, width auto */}
               <img
                 src={data.images[currentImage]}
                 alt={`Hero image ${currentImage + 1}`}
                 className="h-full w-auto object-contain max-w-none"
               />
            </motion.div>
          </AnimatePresence>
       </div>

    </section>
  );
}
