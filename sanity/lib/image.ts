import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { projectId, dataset } from './client';
import { ImageVariant } from '@/lib/cms/types';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'o4igymxx',
  dataset: dataset || 'production',
});

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};

export function formatSanityImage(sanityImage: any): ImageVariant | null {
  if (!sanityImage || !sanityImage.asset) {
    return null;
  }

  // Calculate focal point if hotspot exists
  let focalPoint: { x: number; y: number } | undefined;
  if (sanityImage.hotspot) {
    focalPoint = {
      x: Math.round(sanityImage.hotspot.x * 100),
      y: Math.round(sanityImage.hotspot.y * 100),
    };
  }

  const baseBuilder = imageBuilder.image(sanityImage).auto('format');

  return {
    grid: baseBuilder.width(600).height(800).fit('crop').quality(85).url(),
    detail: baseBuilder.width(1200).fit('max').quality(90).url(),
    hero: baseBuilder.width(1600).fit('max').quality(90).url(),
    focalPoint,
  };
}
