'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function StoryPage() {
  return (
    <div className="bg-white pt-[80px]"> {/* Offset for fixed header */}
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-gray-50 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/designer-studio.png"
            alt="Farzana Fehmi Studio"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-4"
          >
            The Artisan's Tale
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl tracking-wide font-light max-w-2xl mx-auto"
          >
            Where heritage meets contemporary elegance.
          </motion.p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="space-y-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-black">A Vision of Timelessness</h2>
            <div className="w-20 h-[1px] bg-black/30" />
            <p className="text-gray-600 leading-relaxed font-light">
              Farzana Fehmi established her eponymous label with a singular vision: to create garments that transcend seasons. 
              Drawing inspiration from the rich tapestry of ethnic craftsmanship and blending it with modern silhouettes, 
              the brand stands as a testament to the enduring allure of quiet luxury.
            </p>
            <p className="text-gray-600 leading-relaxed font-light">
              Every piece is a dialogue between the past and the present, designed for the woman who moves through the world 
              with grace and purpose.
            </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="bg-gray-100 p-12 md:p-16 flex flex-col justify-center items-center text-center space-y-6"
          >
            <h3 className="uppercase tracking-[0.2em] text-sm text-gray-500">Philosophy</h3>
            <blockquote className="font-serif text-2xl md:text-3xl italic text-gray-800">
              "Fashion is not just about what you wear, but how it makes you feel. It is an armor of elegance."
            </blockquote>
            <cite className="not-italic text-sm font-medium mt-4 block">— Farzana Fehmi</cite>
          </motion.div>
        </div>
      </section>
      
      {/* Footer Quote or Transition */}
      <section className="py-20 bg-black text-white text-center">
         <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Experience the Collection</h2>
            <a href="/shop" className="inline-block border text-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
              View All Products
            </a>
         </div>
      </section>
    </div>
  );
}
