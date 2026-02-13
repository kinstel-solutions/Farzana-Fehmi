const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'assets', 'originals', 'hero-and-cards', 'hero-new-v3', 'blurred');
const outputDir = path.join(__dirname, 'public', 'photos', 'hero-v3');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading input directory:', err);
        return;
    }

    files.forEach((file, index) => {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(inputDir, file);
            const outputFilename = `hero-v3-${index + 1}.webp`;
            const outputPath = path.join(outputDir, outputFilename);

            sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath, (err, info) => {
                    if (err) {
                        console.error(`Error processing ${file}:`, err);
                    } else {
                        console.log(`Processed ${file} to ${outputFilename}`);
                    }
                });
        }
    });
});
