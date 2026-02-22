"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { ImageLightbox } from "./ImageLightbox";

interface ImageVariant {
  grid: string;
  detail: string;
  hero: string;
  focalPoint?: { x: number; y: number };
}

interface ProductGalleryProps {
  mainImage: ImageVariant | null;
  additionalImages: ImageVariant[];
  productName: string;
}

export function ProductGallery({
  mainImage,
  additionalImages,
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const allVariants = [mainImage, ...additionalImages].filter(
    Boolean,
  ) as ImageVariant[];

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    // eslint-disable-next-line
  }, [emblaApi, onSelect]);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const lightboxNext = useCallback(() => {
    setSelectedIndex((i) => (i + 1) % allVariants.length);
  }, [allVariants.length]);

  const lightboxPrev = useCallback(() => {
    setSelectedIndex((i) => (i - 1 + allVariants.length) % allVariants.length);
  }, [allVariants.length]);

  if (allVariants.length === 0) {
    return (
      <div className="relative aspect-[3/4] bg-gray-50 flex items-center justify-center text-gray-400">
        No Image Available
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Carousel */}
        <div className="relative group">
          <div
            className="overflow-hidden bg-gray-50 aspect-[3/4]"
            ref={emblaRef}>
            <div className="flex touch-pan-y">
              {allVariants.map((variant, index) => (
                <div
                  className="flex-[0_0_100%] min-w-0 relative aspect-[3/4]"
                  key={index}>
                  <Image
                    src={variant.detail}
                    alt={`${productName} view ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Click-to-zoom overlay */}
          <button
            onClick={openLightbox}
            className="absolute inset-0 w-full h-full cursor-zoom-in flex items-end justify-end p-3"
            aria-label="View full screen">
            <span className="bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <ZoomIn className="w-4 h-4" />
            </span>
          </button>

          {/* Arrow Navigation */}
          {allVariants.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollPrev();
                }}>
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollNext();
                }}>
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {allVariants.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {allVariants.map((variant, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                className={`relative aspect-[3/4] overflow-hidden transition-all duration-300 ${
                  selectedIndex === idx
                    ? "ring-1 ring-black opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}>
                <Image
                  src={variant.grid}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="20vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={allVariants}
          currentIndex={selectedIndex}
          productName={productName}
          onClose={closeLightbox}
          onNext={lightboxNext}
          onPrev={lightboxPrev}
        />
      )}
    </>
  );
}
