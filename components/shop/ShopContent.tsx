'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { motion } from 'framer-motion';
import { Product } from '@/lib/cms/types';
import { allCollections } from '@/lib/products-data';

export function ShopContent({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...allCollections];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.collections.includes(activeCategory));

  return (
    <div className="bg-white min-h-screen pt-[100px] pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl">The Collection</h1>
          <p className="text-gray-500 font-light">Spring / Summer 2026</p>
        </div>

        {/* Filter */}
        {/* Sticky Filter */}
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md py-4 mb-16 border-b border-gray-100">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                      setActiveCategory(cat);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-300 pb-1 border-b-2 ${
                    activeCategory === cat 
                      ? 'border-black text-black font-medium' 
                      : 'border-transparent text-gray-400 hover:text-black hover:border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
