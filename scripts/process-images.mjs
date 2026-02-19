import sharp from 'sharp';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

// Configurations
const CONFIG = {
  hero: {
    sourceDir: 'assets/originals/hero-and-cards/Hero-images-here',
    destDir: 'public/photos/hero',
    width: 1920, // Full width for hero
    quality: 80,
    prefix: 'hero-'
  },
  cards: {
    sourceDir: 'assets/originals/hero-and-cards/Collections-images-here',
    destDir: 'public/photos/cards',
    width: 600, // Card width
    quality: 80,
    prefix: '' 
  },
  collections: {
    sourceDir: 'assets/originals/hero-and-cards/Collections-images-here',
    destDir: 'public/photos/cards',
    width: 600, // Card width
    quality: 80,
    prefix: '' 
  },
  'hero-blurred': {
    sourceDir: 'assets/originals/hero-and-cards/hero-new-v3/blurred',
    destDir: 'public/photos/hero',
    width: 1920, // Full width for hero
    quality: 80,
    prefix: 'hero-'
  }
};

async function processImages(type) {
  const { sourceDir, destDir, width, quality, prefix } = CONFIG[type];

  // Ensure dest dir exists
  if (!existsSync(destDir)){
      mkdirSync(destDir, { recursive: true });
  }

  try {
    const files = await fs.readdir(sourceDir);
    
    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

      const sourcePath = path.join(sourceDir, file);
      
      // Generate clean filename
      let filename = file.toLowerCase()
        .replace(/\.(jpg|jpeg|png)$/i, '')
        .replace(/\s+\(display.*?\)_?/g, '') // Remove (Display first) etc
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/[^a-z0-9-]/g, ''); // Remove other chars
      
      // specific mapping for hero images based on known filenames if needed, 
      // but the cleaner regex above should handle "Photo 1 (Display first) _" -> "photo-1"

      // Handle the specific hero naming convention "Photo 1 (Display first)_.jpg" -> "hero-1.webp" mapping logic check
      if (type === 'hero') {
         if (file.includes('Photo 1')) filename = '1';
         else if (file.includes('Photo 2')) filename = '2';
         else if (file.includes('Photo 3')) filename = '3';
         else if (file.includes('Photo 4')) filename = '4';
      }

      const destFilename = `${prefix}${filename}.webp`;
      const destPath = path.join(destDir, destFilename);

      console.log(`Processing ${file} -> ${destFilename}`);

      await sharp(sourcePath)
        .resize(width, null, { withoutEnlargement: true }) // Width limited, height auto
        .webp({ quality })
        .toFile(destPath);
    }
    console.log(`Finished processing ${type} images.`);

  } catch (error) {
    console.error(`Error processing ${type} images:`, error);
  }
}

async function main() {
  await processImages('collections');
  await processImages('hero-blurred');
}

main();
