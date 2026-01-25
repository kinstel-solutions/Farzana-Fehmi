'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';


import { Collection } from '@/lib/cms/types';

export function FeaturedCollections({ collections }: { collections: Collection[] }) {
  if (!collections || collections.length < 3) return null;

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold">The Collections</h2>
          <p className="text-muted-foreground uppercase tracking-widest text-xs md:text-sm">Curated for the modern muse</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 min-h-[800px]">
           {/* Left Column: Large Image */}
           <div className="relative h-[500px] md:h-full group overflow-hidden bg-gray-100">
              <Image 
                src={collections[0].image}
                alt={collections[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-8 left-8 z-10 text-white">
                 <h3 className="text-3xl font-serif mb-2">{collections[0].title}</h3>
                 <Link href={collections[0].link} className="text-sm border-b border-white pb-1 inline-block hover:opacity-80 transition-opacity">SHOP NOW</Link>
              </div>
           </div>

           {/* Right Column: Two stacked images */}
           <div className="grid grid-rows-2 gap-4 md:gap-8 h-[800px] md:h-full">
               <div className="relative group overflow-hidden bg-gray-100">
                  <Image 
                    src={collections[1].image}
                    alt={collections[1].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-6 left-6 z-10 text-white">
                     <h3 className="text-2xl font-serif mb-2">{collections[1].title}</h3>
                     <Link href={collections[1].link} className="text-sm border-b border-white pb-1 inline-block hover:opacity-80 transition-opacity">SHOP NOW</Link>
                  </div>
               </div>
               <div className="relative group overflow-hidden bg-gray-100">
                  <Image 
                    src={collections[2].image}
                    alt={collections[2].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-6 left-6 z-10 text-white">
                     <h3 className="text-2xl font-serif mb-2">{collections[2].title}</h3>
                     <Link href={collections[2].link} className="text-sm border-b border-white pb-1 inline-block hover:opacity-80 transition-opacity">SHOP NOW</Link>
                  </div>
               </div>
           </div>
        </div>
      </div>
    </section>
  );
}
