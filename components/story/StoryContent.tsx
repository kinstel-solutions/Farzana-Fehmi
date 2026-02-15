'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { StoryData } from '@/lib/cms/types';

export function StoryContent({ data }: { data: StoryData }) {
  return (
    <div>
      
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center bg-gray-50 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.hero.image}
            alt={data.hero.title}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          {/* Mission and Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h3 className="uppercase tracking-[0.2em] text-sm md:text-base font-medium text-white/90">
              {data.philosophy.title}
            </h3>
            
            <h1 className="font-sans text-4xl md:text-5xl font-bold mb-3"
                style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}>
              {data.philosophy.quote}
            </h1>
            
            {data.philosophy.description && (
              <p className="text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto"
                 style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)' }}>
                {data.philosophy.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section - Full Width */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-5xl mx-auto bg-white">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="space-y-10"
        >
          {data.narrative.map((section, index) => (
            <div key={index} className="space-y-6">
              {/* Title - cleaner, no decorative line and dot */}
              <h2 className="font-sans text-3xl md:text-4xl font-bold text-black tracking-tight text-center">
                {section.title}
              </h2>
              
              {/* Content */}
              <div className="text-center">
                <p className="text-gray-700 text-lg leading-loose font-light tracking-wide">
                  {section.content.join(' ')}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
      
      {/* Footer Quote or Transition */}
      <section className="py-20 bg-black text-white text-center">
         <div className="container mx-auto px-4">
            <h2 className="font-sans text-3xl md:text-4xl mb-8">{data.footer.title}</h2>
            <a href={data.footer.buttonLink} className="inline-block border text-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
              {data.footer.buttonText}
            </a>
         </div>
      </section>
    </div>
  );
}
