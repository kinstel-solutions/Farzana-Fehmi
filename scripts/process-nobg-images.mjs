
import sharp from 'sharp';
import fs from 'fs/promises'; // Use fs/promises
import path from 'path';

const SRC_DIR = 'assets/originals/hero-and-cards/Hero-images-here/NoBG';
const HERO_OUT_DIR = 'public/photos/hero-nobg';
const CARDS_OUT_DIR = 'public/photos/cards-nobg';

const HERO_WIDTH = 1200; // Standard hero width for optimization
const CARD_WIDTH = 800;  // Standard card width

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function processImages() {
  await ensureDir(HERO_OUT_DIR);
  await ensureDir(CARDS_OUT_DIR);

  const files = await fs.readdir(SRC_DIR);

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

    const inputPath = path.join(SRC_DIR, file);
    let outputFilename;
    let outputDir;
    let width;

    // Determine output filename and directory based on input filename
    if (file.includes('Photo 1')) {
      outputFilename = 'hero-1-nobg.webp';
      outputDir = HERO_OUT_DIR;
      width = HERO_WIDTH;
    } else if (file.includes('Photo 2')) {
      outputFilename = 'hero-2-nobg.webp';
      outputDir = HERO_OUT_DIR;
      width = HERO_WIDTH;
    } else if (file.includes('Photo 3')) {
      outputFilename = 'hero-3-nobg.webp';
      outputDir = HERO_OUT_DIR;
      width = HERO_WIDTH;
    } else if (file.includes('Photo 4')) {
      outputFilename = 'hero-4-nobg.webp';
      outputDir = HERO_OUT_DIR;
      width = HERO_WIDTH;
    } else if (file.includes('Festive_Wear')) {
      outputFilename = 'festive-wear-nobg.webp';
      outputDir = CARDS_OUT_DIR;
      width = CARD_WIDTH;
    } else if (file.includes('Party_Wear')) {
      outputFilename = 'party-wear-nobg.webp';
      outputDir = CARDS_OUT_DIR;
      width = CARD_WIDTH;
    } else {
      console.log(`Skipping unknown file: ${file}`);
      continue;
    }

    const outputPath = path.join(outputDir, outputFilename);

    console.log(`Processing ${file} -> ${outputFilename} in ${outputDir}`);

    try {
      await sharp(inputPath)
        .resize(width) // Resize width, auto height to maintain aspect ratio
        .webp({ quality: 80 }) // Convert to WebP
        .toFile(outputPath);
      console.log(`Saved to ${outputPath}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  console.log('Finished processing NoBG images.');
}

processImages();
