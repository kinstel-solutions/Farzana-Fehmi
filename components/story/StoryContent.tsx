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
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-sans text-5xl md:text-7xl font-bold mb-4"
            style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            {data.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl tracking-wide font-light max-w-2xl mx-auto"
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)' }}
          >
            {data.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="space-y-10"
          >
            {data.narrative.map((section, index) => (
              <div key={index} className="space-y-6">
                {/* Title with decorative underline */}
                <div className="space-y-3">
                  <h2 className="font-sans text-4xl md:text-5xl font-bold text-black tracking-tight">
                    {section.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-[2px] bg-black"></div>
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                  </div>
                </div>
                
                {/* Content with enhanced typography and decorative elements */}
                <div className="relative bg-gradient-to-br from-white to-gray-50 p-8 md:p-10 rounded-sm border border-gray-100">
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gray-300 opacity-50"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gray-300 opacity-50"></div>
                  
                  {/* Decorative quote mark */}
                  <div className="absolute -top-4 -left-4 text-6xl text-black/5 font-serif leading-none">"</div>
                  
                  <div className="relative space-y-5">
                    {section.content.map((paragraph, pIndex) => (
                      <p 
                        key={pIndex} 
                        className="text-gray-700 text-lg leading-relaxed font-light first-letter:text-2xl first-letter:font-medium first-letter:text-black"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* Decorative bottom accent */}
                  <div className="flex justify-center mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-16 md:p-24 flex flex-col justify-center items-center text-center overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-black/10"></div>
              <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-black/10"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-black/10"></div>
              <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-black/10"></div>
              
              <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                {/* Title with decorative line */}
                <div className="flex items-center justify-center gap-4">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-black/30"></div>
                  <h3 className="uppercase tracking-[0.3em] text-xs font-medium text-gray-500 whitespace-nowrap">
                    {data.philosophy.title}
                  </h3>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-black/30"></div>
                </div>

                {/* Main quote - large and bold */}
                <blockquote className="relative">
                  <div className="absolute -top-6 -left-4 text-6xl md:text-8xl text-black/5 font-serif">"</div>
                  <h2 className="font-sans text-4xl md:text-6xl font-bold text-black leading-tight tracking-tight">
                    {data.philosophy.quote}
                  </h2>
                  <div className="absolute -bottom-6 -right-4 text-6xl md:text-8xl text-black/5 font-serif">"</div>
                </blockquote>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-3 py-4">
                  <div className="w-2 h-2 rounded-full bg-black/20"></div>
                  <div className="h-[1px] w-16 bg-black/20"></div>
                  <div className="w-2 h-2 rounded-full bg-black/20"></div>
                </div>

                {/* Description */}
                {data.philosophy.description && (
                  <p className="text-gray-700 text-xl md:text-2xl leading-relaxed font-light max-w-3xl mx-auto">
                    {data.philosophy.description}
                  </p>
                )}

                {/* Author attribution */}
                <div className="pt-6">
                  <cite className="not-italic text-sm font-medium tracking-wider uppercase text-gray-600">
                    — {data.philosophy.author}
                  </cite>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
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
