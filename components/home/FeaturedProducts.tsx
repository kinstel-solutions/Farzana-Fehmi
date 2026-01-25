'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/lib/cms/types';
import Link from 'next/link';

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Heirlooms of Tomorrow</h2>
            <p className="text-muted-foreground uppercase tracking-widest text-xs md:text-sm max-w-md">
              Hand-selected pieces that embody our commitment to craft and heritage.
            </p>
          </div>
          <Link href="/shop" className="text-sm font-medium border-b border-black pb-1 hover:opacity-60 transition-opacity">
            VIEW ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, idx) => (
             <motion.div
               key={product.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
             >
               <ProductCard {...product} />
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
