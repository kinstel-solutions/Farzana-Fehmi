'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { motion } from 'framer-motion';
import { products } from '@/lib/data';

const categories = ['All', 'Gowns', 'Dresses', 'Separates', 'Tunics', 'Capes'];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pt-[100px] pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl">The Collection</h1>
          <p className="text-gray-500 font-light">Spring / Summer 2026</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm tracking-widest uppercase transition-colors pb-1 border-b ${
                activeCategory === cat 
                  ? 'border-black text-black font-medium' 
                  : 'border-transparent text-gray-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
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
