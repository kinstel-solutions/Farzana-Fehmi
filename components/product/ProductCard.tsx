'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  slug: string;
}

export function ProductCard({ id, name, price, image, category, slug }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Quick Add / Wishlist Overlay could go here */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      
      <div className="space-y-1 text-center">
        <h3 className="font-serif text-lg text-gray-900 group-hover:text-black transition-colors">{name}</h3>
        <p className="text-sm font-light text-gray-500">{category}</p>
        <p className="text-sm font-medium tracking-wide text-gray-900">{price}</p>
      </div>
    </Link>
  );
}
