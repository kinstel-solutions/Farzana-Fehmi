const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_ROOT = path.join(process.cwd(), 'assets', 'originals', 'Product-images');
const DEST_ROOT = path.join(process.cwd(), 'public', 'Product-images');

const VARIANTS = [
    { name: 'grid', width: 600, quality: 80 },
    { name: 'detail', width: 1200, quality: 85 },
    { name: 'hero', width: 2500, quality: 85 }
];

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

async function processFile(filePath) {
    const relativePath = path.relative(SOURCE_ROOT, filePath);
    const destDir = path.join(DEST_ROOT, path.dirname(relativePath));
    const filename = path.basename(filePath, path.extname(filePath));
    
    ensureDir(destDir);

    for (const variant of VARIANTS) {
        const destFile = path.join(destDir, `${filename}-${variant.name}.webp`);
        
        // Skip if exists and source hasn't changed (basic check)
        if (fs.existsSync(destFile)) {
             // In a real build system we'd check mtimes, but for now we'll overwrite 
             // or skip. Let's overwrite to ensure new sizes are applied.
        }

        try {
            await sharp(filePath)
                .resize({ width: variant.width, withoutEnlargement: true })
                .webp({ quality: variant.quality })
                .toFile(destFile);
            
            console.log(`Generated ${variant.name}: ${path.relative(process.cwd(), destFile)}`);
        } catch (err) {
            console.error(`Error processing ${filePath} for ${variant.name}:`, err);
        }
    }
}

async function walkAndProcess(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            await walkAndProcess(fullPath);
        } else if (/\.(jpg|jpeg|png|webp|gif|tiff)$/i.test(item.name)) {
            await processFile(fullPath);
        }
    }
}

async function run() {
    console.log('Starting image optimization...');
    await walkAndProcess(SOURCE_ROOT);
    console.log('Image optimization complete!');
}

run();
