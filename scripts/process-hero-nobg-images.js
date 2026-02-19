const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve('assets/originals/hero-and-cards/Hero-images-here/landscape-crop-collage/noBG');
const destDir = path.resolve('public/photos/hero-nobg');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

const processImages = async () => {
    try {
        const files = fs.readdirSync(sourceDir).filter(file => /\.(jpg|jpeg|png)$/i.test(file));
        files.sort(); // Ensure consistent order

        console.log(`Found ${files.length} images to process.`);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const inputPath = path.join(sourceDir, file);
            // Using sequential naming for consistency
            const outputFilename = `hero-nobg-${i + 1}.webp`;
            const outputPath = path.join(destDir, outputFilename);

            console.log(`Processing ${file} -> ${outputFilename}...`);
            
            await sharp(inputPath)
                .webp({ quality: 80, lossless: false }) // keeping defaults, lossless false is default
                .toFile(outputPath);
            
            console.log(`Saved to ${outputPath}`);
        }
    } catch (error) {
        console.error("Error processing images:", error);
    }
};

processImages();
