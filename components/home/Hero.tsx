'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Hero({ data }: { data: any }) {
  const [currentMobileImage, setCurrentMobileImage] = useState(0);

  useEffect(() => {
    if (!data?.images?.length) return;
    const interval = setInterval(() => {
      setCurrentMobileImage((prev) => (prev + 1) % data.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data?.images?.length]);

  if (!data) return null;

  // Duplicate images for infinite marquee on desktop
  const desktopImages = [...data.images, ...data.images, ...data.images];

  return (
    <section className="relative h-[100dvh] w-full bg-black overflow-hidden">
      
      {/* --- Mobile View: Full Screen Slideshow --- */}
      <div className="absolute inset-0 md:hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentMobileImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }} // Smooth crossfade
            className="absolute inset-0"
          >
             <Image
              src={data.images[currentMobileImage]}
              alt={`Hero image ${currentMobileImage + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
         <div className="absolute inset-0 bg-black/30" /> {/* Subtle overlay for text readability */}
      </div>

      {/* --- Desktop View: Straight Marquee --- */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-70">
         {/* Container for the sliding track */}
         <div className="relative w-full h-[110%] flex overflow-hidden">
            <motion.div 
                className="flex gap-6 min-w-max items-center"
                animate={{ x: ["0%", "-33.33%"] }}
                transition={{ 
                    duration: 40, 
                    ease: "linear", 
                    repeat: Infinity 
                }}
            >
                {desktopImages.map((src: string, index: number) => (
                    // 1:2 Aspect Ratio containment
                    // h-[90vh] ensures it fits nicely. Width will be approx 45vh.
                    <div key={index} className="relative h-[90vh] aspect-[1/2] shrink-0 rounded-lg overflow-hidden shadow-2xl">
                        <Image
                            src={src}
                            alt={`Hero image ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index < 4}
                            sizes="30vw"
                        />
                    </div>
                ))}
            </motion.div>
         </div>
      </div>

       {/* Overlay Gradient (Shared) */}
       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white space-y-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 drop-shadow-lg">
            {data.subtitle}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8 drop-shadow-2xl">
            {data.title}
          </h1>
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
