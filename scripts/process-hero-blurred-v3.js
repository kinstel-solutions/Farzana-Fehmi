const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve('assets/originals/hero-and-cards/hero-new-v3/blurred');
const destDir = path.resolve('public/photos/hero-v3');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

const processImages = async () => {
    try {
        const files = fs.readdirSync(sourceDir).filter(file => /\.(jpg|jpeg|png)$/i.test(file));
        files.sort(); // Ensure consistent order

        console.log(`Found ${files.length} blurred hero images to process.`);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const inputPath = path.join(sourceDir, file);
            // Using sequential naming for consistency
            const outputFilename = `hero-v3-${i + 1}.webp`;
            const outputPath = path.join(destDir, outputFilename);

            console.log(`Processing ${file} -> ${outputFilename}...`);
            
            await sharp(inputPath)
                .webp({ quality: 85 }) 
                .toFile(outputPath);
            
            console.log(`Saved to ${outputPath}`);
        }
        
        console.log('\nAll images processed successfully!');
    } catch (error) {
        console.error("Error processing images:", error);
    }
};

processImages();
