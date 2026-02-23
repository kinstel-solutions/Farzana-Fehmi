"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ImageVariant {
  grid: string;
  detail: string;
  hero: string;
  focalPoint?: { x: number; y: number };
}

interface ImageLightboxProps {
  images: ImageVariant[];
  currentIndex: number;
  productName: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export function ImageLightbox({
  images,
  currentIndex,
  productName,
  onClose,
  onNext,
  onPrev,
}: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{
    x: number;
    y: number;
    px: number;
    py: number;
  } | null>(null);
  const lastTouchDist = useRef<number | null>(null);

  // Reset zoom when navigating images
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  const isZoomed = scale > 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          setScale(1);
          setPosition({ x: 0, y: 0 });
        } else onClose();
      }
      if (!isZoomed) {
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
      }
    },
    [onClose, onNext, onPrev, isZoomed],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // ── Mouse wheel zoom ──
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    setScale((s) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * factor));
      if (next <= MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // ── Click to toggle 1× ↔ 2× ──
  const handleImageClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDragging) return;
      setScale((s) => {
        if (s > 1) {
          setPosition({ x: 0, y: 0 });
          return 1;
        }
        return 2;
      });
    },
    [isDragging],
  );

  // ── Mouse drag pan ──
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isZoomed) return;
      e.preventDefault();
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        px: position.x,
        py: position.y,
      };
    },
    [isZoomed, position],
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) setIsDragging(true);
    setPosition({ x: dragStart.current.px + dx, y: dragStart.current.py + dy });
  }, []);

  const handleMouseUp = useCallback(() => {
    dragStart.current = null;
    setTimeout(() => setIsDragging(false), 0);
  }, []);

  // ── Touch: pinch-to-zoom + single-finger pan ──
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouchDist.current = Math.sqrt(dx * dx + dy * dy);
      } else if (e.touches.length === 1 && isZoomed) {
        dragStart.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          px: position.x,
          py: position.y,
        };
      }
    },
    [isZoomed, position],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && lastTouchDist.current !== null) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ratio = dist / lastTouchDist.current;
        lastTouchDist.current = dist;
        setScale((s) => {
          const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * ratio));
          if (next <= MIN_SCALE) setPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (e.touches.length === 1 && dragStart.current && isZoomed) {
        const dx = e.touches[0].clientX - dragStart.current.x;
        const dy = e.touches[0].clientY - dragStart.current.y;
        setPosition({
          x: dragStart.current.px + dx,
          y: dragStart.current.py + dy,
        });
      }
    },
    [isZoomed],
  );

  const handleTouchEnd = useCallback(() => {
    lastTouchDist.current = null;
    dragStart.current = null;
  }, []);

  const current = images[currentIndex];
  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center select-none"
        onClick={!isZoomed ? onClose : undefined}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        {/* Close */}
        <button
          className="absolute top-5 right-5 z-10 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          onClick={onClose}
          aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest pointer-events-none">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Prev/Next — hidden while zoomed to avoid accidental nav */}
        {images.length > 1 && !isZoomed && (
          <>
            <button
              className="absolute left-4 md:left-8 z-10 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous image">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 md:right-8 z-10 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next image">
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image */}
        <div
          className="relative w-full h-full max-w-4xl max-h-[90vh] mx-4 md:mx-24"
          style={{
            cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          }}
          onClick={handleImageClick}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <div
            className="w-full h-full"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.15s ease",
            }}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full">
              <Image
                src={current.hero}
                alt={`${productName} view ${currentIndex + 1}`}
                fill
                className="object-contain pointer-events-none"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
                draggable={false}
              />
            </motion.div>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-6 right-6 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setScale((s) => {
                const next = Math.max(
                  MIN_SCALE,
                  parseFloat((s - 0.5).toFixed(1)),
                );
                if (next <= MIN_SCALE) setPosition({ x: 0, y: 0 });
                return next;
              });
            }}
            disabled={!isZoomed}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-2 transition-colors"
            aria-label="Zoom out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setScale((s) =>
                Math.min(MAX_SCALE, parseFloat((s + 0.5).toFixed(1))),
              );
            }}
            disabled={scale >= MAX_SCALE}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-2 transition-colors"
            aria-label="Zoom in">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Dot indicators */}
        {images.length > 1 && !isZoomed && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === currentIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Hint */}
        {!isZoomed && (
          <p className="absolute bottom-7 left-6 text-white/35 text-xs pointer-events-none hidden md:block">
            Click or scroll to zoom · Drag to pan when zoomed
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
