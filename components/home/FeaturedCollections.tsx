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
          <h2 className="font-sans text-3xl md:text-5xl font-bold">The Collections</h2>
          <p className="text-muted-foreground uppercase tracking-widest text-xs md:text-sm">Curated for the modern muse</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {collections.slice(0, 3).map((collection) => (
            <div key={collection.id} className="relative h-[600px] group overflow-hidden bg-gray-100">
              <Image 
                src={collection.image}
                alt={collection.title}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-8 left-8 z-10 text-white">
                 <h3 className="text-2xl font-sans mb-2">{collection.title}</h3>
                 <Link href={collection.link} className="text-sm border-b border-white pb-1 inline-block hover:opacity-80 transition-opacity">SHOP NOW</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
