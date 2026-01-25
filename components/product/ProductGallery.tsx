'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  mainImage: string | null;
  additionalImages: string[];
  productName: string;
}

export function ProductGallery({ mainImage, additionalImages, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const allImages = [mainImage, ...additionalImages].filter(Boolean) as string[];

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    // eslint-disable-next-line
  }, [emblaApi, onSelect]); // intended dependency check skip

  if (allImages.length === 0) {
      return (
        <div className="relative aspect-[3/4] bg-gray-50 flex items-center justify-center text-gray-400">
            No Image Available
        </div>
      );
  }

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <div className="relative group">
        <div className="overflow-hidden bg-gray-50 aspect-[3/4]" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {allImages.map((img, index) => (
              <div className="flex-[0_0_100%] min-w-0 relative aspect-[3/4]" key={index}>
                <Image
                  src={img}
                  alt={`${productName} view ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrow Navigation */}
        {allImages.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
              onClick={scrollPrev}
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
              onClick={scrollNext}
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
            {allImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                  className={`relative aspect-[3/4] overflow-hidden transition-all duration-300 ${
                      selectedIndex === idx ? 'ring-1 ring-black opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                    <Image
                        src={img}
                        alt={`${productName} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="20vw"
                    />
                </button>
            ))}
        </div>
      )}
    </div>
  );
}
