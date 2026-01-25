'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { StoryData } from '@/lib/cms/types';

export function StoryContent({ data }: { data: StoryData }) {
  return (
    <div className="bg-white pt-[80px]"> {/* Offset for fixed header */}
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-gray-50 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.hero.image}
            alt={data.hero.title}
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
            {data.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl tracking-wide font-light max-w-2xl mx-auto"
          >
            {data.hero.subtitle}
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
            {data.narrative.map((section, index) => (
              <div key={index}>
                <h2 className="font-serif text-3xl md:text-4xl text-black">{section.title}</h2>
                <div className="w-20 h-[1px] bg-black/30 my-4" />
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-600 leading-relaxed font-light mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="bg-gray-100 p-12 md:p-16 flex flex-col justify-center items-center text-center space-y-6"
          >
            <h3 className="uppercase tracking-[0.2em] text-sm text-gray-500">{data.philosophy.title}</h3>
            <blockquote className="font-serif text-2xl md:text-3xl italic text-gray-800">
              "{data.philosophy.quote}"
            </blockquote>
            <cite className="not-italic text-sm font-medium mt-4 block">— {data.philosophy.author}</cite>
          </motion.div>
        </div>
      </section>
      
      {/* Footer Quote or Transition */}
      <section className="py-20 bg-black text-white text-center">
         <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">{data.footer.title}</h2>
            <a href={data.footer.buttonLink} className="inline-block border text-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
              {data.footer.buttonText}
            </a>
         </div>
      </section>
    </div>
  );
}
