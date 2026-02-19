const fs = require('fs');
const path = require('path');
const smartcrop = require('smartcrop-sharp');

const PRODUCTS_TXT = path.join(process.cwd(), 'data', 'products.txt');
const IMAGES_ROOT = path.join(process.cwd(), 'public', 'Product-images');
const OUTPUT_TS = path.join(process.cwd(), 'lib', 'products-data.ts');

function parseProducts() {
    const content = fs.readFileSync(PRODUCTS_TXT, 'utf8');
    const productBlocks = content.split(/\* \*\*sr\. No\.:/).slice(1);
    
    return productBlocks.map(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l);
        const idMatch = block.match(/^\s*(P\d+)/);
        const id = idMatch ? idMatch[1] : '';
        
        const data = {
            id,
            name: '',
            collections: [],
            price: '',
            priceNumeric: 0,
            featured: false,
            mainImageRaw: '',
            additionalImagesRaw: '',
            description: '',
            material: '',
            occasion: [],
            fit: '',
            tags: []
        };

        lines.forEach(line => {
            if (line.includes('**Product Name:**')) data.name = line.split('**Product Name:**')[1].trim();
            
            if (line.includes('**Collection(s):**')) {
                const raw = line.split('**Collection(s):**')[1].trim();
                data.collections = raw.split(/[,\/]+/)
                    .map(s => s.trim())
                    .filter(s => s && s.toLowerCase() !== 'occasion');
            }
            
            if (line.includes('**Price:**')) {
                const rawPrice = line.split('**Price:**')[1].trim();
                const numeric = parseInt(rawPrice.replace(/[^0-9]/g, ''), 10);
                data.priceNumeric = isNaN(numeric) ? 0 : numeric;
                
                if (data.priceNumeric > 0) {
                    data.price = new Intl.NumberFormat('en-AU', { 
                        style: 'currency', 
                        currency: 'AUD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(data.priceNumeric);
                } else {
                    data.price = "Price on Request";
                }
            }
            
            if (line.includes('**Featured on Homepage?:**')) data.featured = line.split('**Featured on Homepage?:**')[1].trim().toLowerCase() === 'yes';
            
            if (line.includes('**Cover / Main Image Filename:**')) data.mainImageRaw = line.split('**Cover / Main Image Filename:**')[1].trim();
            if (line.includes('**Additional Image Filenames:**')) data.additionalImagesRaw = line.split('**Additional Image Filenames:**')[1].trim();
            
            if (line.includes('**Short Product Description:**')) data.description = line.split('**Short Product Description:**')[1].trim();
            if (line.includes('**Fabric / Material:**')) data.material = line.split('**Fabric / Material:**')[1].trim();
            
            if (line.includes('**Occasion / Use:**')) {
                 const raw = line.split('**Occasion / Use:**')[1].trim();
                 data.occasion = raw.split(/[,\/]+/).map(s => s.trim()).filter(s => s);
            }

            if (line.includes('**Fit / Style (Optional):**')) {
                let fit = line.split('**Fit / Style (Optional):**')[1].trim();
                if (fit.toLowerCase() === 'laarge') fit = 'Large';
                data.fit = fit;
            }
            
            if (line.includes('**Tags:**')) {
                data.tags = line.split('**Tags:**')[1].trim().split(',').map(t => {
                   let tag = t.trim();
                   return tag.charAt(0).toUpperCase() + tag.slice(1);
                }).filter(t => t);
            }
        });

        data.description = data.description.replace(/\bnad\b/g, 'and');
        data.description = data.description.replace(/\bhis\b/g, 'this');

        const slug = data.name ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : id.toLowerCase();
        
        return {
            slug,
            ...data
        };
    });
}

// Helper to analyze image using smartcrop
async function analyzeImage(imagePath) {
    try {
        if (!fs.existsSync(imagePath)) return undefined;
        
        // We crop to 3:4 aspect ratio (300x400) which our UI uses
        const result = await smartcrop.crop(imagePath, { width: 300, height: 400 });
        const crop = result.topCrop;
        
        // Calculate center point percentage
        const centerX = crop.x + (crop.width / 2);
        const centerY = crop.y + (crop.height / 2);
        
        // Get original dimensions to calculate percentage
        // Since smartcrop handles this internally, we can infer percentages from logic:
        // topCrop gives x, y, width, height relative to original image
        // but we need the % relative to the original image dimensions.
        // Wait, startcrop result doesn't give total width/height directly in topCrop?
        // Actually we might need sharp to get metadata if we need exact percentages
        // But smartcrop returns score and crop region.
        
        // Let's use sharp to get dimensions first
        const sharp = require('sharp');
        const metadata = await sharp(imagePath).metadata();
        
        const xPercent = Math.round((centerX / metadata.width) * 100);
        const yPercent = Math.round((centerY / metadata.height) * 100);
        
        return { x: xPercent, y: yPercent };
    } catch (err) {
        console.error(`Error analyzing image ${imagePath}:`, err.message);
        return undefined;
    }
}

async function linkImages(products) {
    const allFiles = []; 
    const allFolders = [];
    
    function walkSync(dir) {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const res = path.join(dir, item.name);
            if (item.isDirectory()) { 
                allFolders.push(res); 
                walkSync(res); 
            } else { 
                if (res.endsWith('-detail.webp')) {
                    allFiles.push(res); 
                }
            }
        }
    }
    walkSync(IMAGES_ROOT);

    const getVariants = async (detailPath) => {
        if (!detailPath) return null;
        const basePath = detailPath.replace('-detail.webp', '');
        const relativeBase = basePath.split('public')[1].replace(/\\/g, '/');
        
        // Analyze the detail image for focal point
        const focalPoint = await analyzeImage(detailPath);
        
        return {
            grid: `${relativeBase}-grid.webp`,
            detail: `${relativeBase}-detail.webp`,
            hero: `${relativeBase}-hero.webp`,
            focalPoint
        };
    };

    // Use loop instead of map for async operations
    const resultProducts = [];

    for (const p of products) {
        // 1. Find the best folder for this product
        const nameWords = p.name.toLowerCase().replace(/[()]/g, '').split(/\s+/).filter(w => w.length > 2);
        const noise = ['suit', 'set', 'wear', 'light', 'party', 'casual', 'festive'];
        const cleanWords = nameWords.filter(w => !noise.includes(w));

        let bestFolder = null;
        let maxIntersection = 0;
        allFolders.forEach(f => {
            const bname = path.basename(f).toLowerCase();
            const matches = cleanWords.filter(w => bname.includes(w));
            if (matches.length > maxIntersection) {
                maxIntersection = matches.length;
                bestFolder = f;
            }
        });
        
        const productFolder = maxIntersection >= 1 ? bestFolder : null;

        // 2. Find Main Image
        const findImageVariant = async (filenameRaw, folder = null) => {
            if (!filenameRaw) return null;
            const targetBase = filenameRaw.split('.')[0].replace(/\s+/g, '').toLowerCase();
            
            // Search in folder first
            if (folder) {
                const files = fs.readdirSync(folder).filter(f => f.endsWith('-detail.webp'));
                const match = files.find(f => {
                    const fBase = f.replace('-detail.webp', '').toLowerCase();
                    return fBase.includes(targetBase) || targetBase.includes(fBase);
                });
                if (match) return await getVariants(path.join(folder, match));
            }

            // Global search
            const globalMatch = allFiles.find(f => {
                const fBase = path.basename(f).replace('-detail.webp', '').toLowerCase();
                return fBase.includes(targetBase) || targetBase.includes(fBase);
            });
            return globalMatch ? await getVariants(globalMatch) : null;
        };

        let mainImage = await findImageVariant(p.mainImageRaw, productFolder);
        
        // Auto-select if not found
        if (!mainImage && productFolder) {
            const files = fs.readdirSync(productFolder).filter(f => f.endsWith('-detail.webp'));
            if (files.length > 0) {
                mainImage = await getVariants(path.join(productFolder, files[0]));
            }
        }

        // 3. Find Additional Images
        let additionalImages = [];
        if (productFolder) {
            const files = fs.readdirSync(productFolder)
                .filter(f => f.endsWith('-detail.webp'))
                .map(f => path.join(productFolder, f));
            
            const mainDetailPath = mainImage ? path.join(process.cwd(), 'public', mainImage.detail) : '';
            
            const variantPromises = files
                .filter(f => path.normalize(f) !== path.normalize(mainDetailPath))
                .map(f => getVariants(f));
                
            additionalImages = await Promise.all(variantPromises);
        }

        resultProducts.push({
            id: p.id,
            slug: p.slug,
            name: p.name,
            collections: p.collections,
            price: p.price,
            priceNumeric: p.priceNumeric,
            featured: p.featured,
            description: p.description,
            material: p.material,
            occasion: p.occasion,
            fit: p.fit,
            tags: p.tags,
            mainImage,
            additionalImages
        });
    }
    
    return resultProducts;
}

async function run() {
    console.log('Parsing products...');
    let products = parseProducts();
    
    console.log('Analyzing images and linking (this may take a while)...');
    products = await linkImages(products);

    const allCollections = [...new Set(products.flatMap(p => p.collections))].sort();
    const allOccasions = [...new Set(products.flatMap(p => p.occasion))].sort();
    const allTags = [...new Set(products.flatMap(p => p.tags))].sort();

    const output = `
export interface ImageVariant {
    grid: string;
    detail: string;
    hero: string;
    focalPoint?: { x: number; y: number };
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    collections: string[];
    price: string;
    priceNumeric: number;
    featured: boolean;
    mainImage: ImageVariant | null;
    additionalImages: ImageVariant[];
    description: string;
    material: string;
    occasion: string[];
    fit?: string;
    tags: string[];
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export const allCollections = ${JSON.stringify(allCollections, null, 2)};
export const allOccasions = ${JSON.stringify(allOccasions, null, 2)};
export const allTags = ${JSON.stringify(allTags, null, 2)};

export function formatPrice(price: number): string {
    if (price === 0) return 'Price on Request';
    return price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
}

export function getProductsByCollection(collection: string): Product[] {
    return products.filter(p => p.collections.includes(collection));
}

export function getFeaturedProducts(): Product[] {
    return products.filter(p => p.featured).slice(0, 4);
}

export function getRelatedProducts(product: Product): Product[] {
    return products.filter(p => {
        if (p.id === product.id) return false;
        const sameCollection = p.collections.some(c => product.collections.includes(c));
        const sameTag = p.tags.some(t => product.tags.includes(t));
        return sameCollection || sameTag;
    }).slice(0, 4);
}
`;
    fs.writeFileSync(OUTPUT_TS, output);
    console.log('Done! Generated optimized data with variants and smart focal points.');
}

run();
