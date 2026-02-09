const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve('assets/originals/hero-and-cards/Hero-images-here/croped');
const destDir = path.resolve('public/photos/hero');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

const images = [
    { src: 'hero-1.jpg', dest: 'hero-v2-1.webp' },
    { src: 'hero-2.jpg', dest: 'hero-v2-2.webp' },
    { src: 'hero-3.jpg', dest: 'hero-v2-3.webp' },
    { src: 'hero-4.jpg', dest: 'hero-v2-4.webp' }
];

async function processImages() {
    for (const image of images) {
        const inputPath = path.join(sourceDir, image.src);
        const outputPath = path.join(destDir, image.dest);

        try {
            if (fs.existsSync(inputPath)) {
                console.log(`Processing ${image.src}...`);
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`Saved to ${outputPath}`);
            } else {
                console.error(`Source file not found: ${inputPath}`);
            }
        } catch (error) {
            console.error(`Error processing ${image.src}:`, error);
        }
    }
}

processImages();
