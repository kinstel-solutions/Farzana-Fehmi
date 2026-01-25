'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  mainImage: string | null;
  collections: string[];
  slug: string;
}

export function ProductCard({ id, name, price, mainImage, collections, slug }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 transition-all duration-500 ease-out">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
             <span className="bg-white/90 px-6 py-2 text-xs uppercase tracking-widest text-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               View
             </span>
        </div>
      </div>
      
      <div className="space-y-1 text-center">
        <h3 className="font-serif text-lg text-gray-900 group-hover:text-black transition-colors">{name}</h3>
        <p className="text-sm font-light text-gray-500 tracking-wider text-xs uppercase">{collections[0]}</p>
        <p className="text-sm font-medium tracking-wide text-gray-900">{price}</p>
      </div>
    </Link>
  );
}
