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
    }, 4000); // 4 seconds interval for changing images
    return () => clearInterval(interval);
  }, [data?.images?.length]);

  if (!data) return null;

  return (
    <section className="relative h-[100dvh] w-full bg-black overflow-hidden flex items-center justify-center">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }} // Smooth crossfade
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
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white space-y-6 max-w-2xl px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <Image
            src="/logo-white-Nobg.svg"
            alt="Farzana Fehmi"
            width={1200}
            height={400}
            className="w-[35vw] md:w-[35vw] lg:w-[20vw] max-w-xl h-auto drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.8 }}
        >
           <Link 
             href={data.buttonLink} 
             className="inline-block border-b-2 border-white pb-2 text-base md:text-lg font-medium tracking-[0.15em] hover:text-white/80 hover:border-white/80 transition-all uppercase drop-shadow-md"
           >
             {data.buttonText}
           </Link>
        </motion.div>
      </div>
    </section>
  );
}
