'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Farzana Fehmi Latest Collection - Ethnic Luxury"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Mood overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white space-y-6 max-w-4xl px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4">
            Spring / Summer 2026
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8">
            ETHEREAL ELEGANCE
          </h1>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.8 }}
        >
           <Link 
             href="/shop" 
             className="inline-block border-b-2 border-white pb-2 text-base md:text-lg font-medium tracking-[0.15em] hover:text-white/80 hover:border-white/80 transition-all uppercase"
           >
             Discover The Collection
           </Link>
        </motion.div>
      </div>
    </section>
  );
}
