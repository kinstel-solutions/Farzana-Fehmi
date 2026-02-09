const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve('assets/originals/hero-and-cards/Hero-images-here/landscape-crop-collage');
const destDir = path.resolve('public/photos/hero-landscaped');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

// Map specific source files to destination names
// The user didn't specify mapping so I'll just iterate and name them sequentially or based on original name.
// Given the filenames are messy (IMG_..., _storage...), sequential might be cleaner: hero-landscape-1.webp, etc.
// But I need to be careful with ordering. I'll sort them alphabetically first.

const processImages = async () => {
    try {
        const files = fs.readdirSync(sourceDir).filter(file => /\.(jpg|jpeg|png)$/i.test(file));
        files.sort(); // Ensure consistent order

        console.log(`Found ${files.length} images to process.`);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const inputPath = path.join(sourceDir, file);
            const outputFilename = `hero-landscape-${i + 1}.webp`; // or maybe keep original name? User asked to "Process them... to public/photos/hero-landscaped". Sequential seems safer for "hero" usage.
            const outputPath = path.join(destDir, outputFilename);

            console.log(`Processing ${file} -> ${outputFilename}...`);
            
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            
            console.log(`Saved to ${outputPath}`);
        }
    } catch (error) {
        console.error("Error processing images:", error);
    }
};

processImages();
