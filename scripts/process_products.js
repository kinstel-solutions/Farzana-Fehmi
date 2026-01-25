const fs = require('fs');
const path = require('path');

const PRODUCTS_TXT = path.join(process.cwd(), 'data', 'products.txt');
// Source of truth for optimized images is now public/Product-images
const IMAGES_ROOT = path.join(process.cwd(), 'public', 'Product-images');
const OUTPUT_TS = path.join(process.cwd(), 'lib', 'products-data.ts');

// We no longer need to rename recursive in public since optimization script handles names,
// but let's keep it safe or just rely on the optimization script's output. 
// Actually, optimized images already have clean names from the script.

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
            mainImage: null, // Will be object
            additionalImages: [], // Will be array of objects
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
            // We store the raw filename to match later
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

function linkImages(products) {
    const allFiles = []; // will store paths to -detail.webp as the "canonical" reference
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

    // Helpers to construct variants from a detail path
    const getVariants = (detailPath) => {
        if (!detailPath) return null;
        const basePath = detailPath.replace('-detail.webp', '');
        const relativeBase = basePath.split('public')[1].replace(/\\/g, '/');
        return {
            grid: `${relativeBase}-grid.webp`,
            detail: `${relativeBase}-detail.webp`,
            hero: `${relativeBase}-hero.webp`
        };
    };

    return products.map(p => {
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
        const findImageVariant = (filenameRaw, folder = null) => {
            if (!filenameRaw) return null;
            // Remove extension and spaces
            const targetBase = filenameRaw.split('.')[0].replace(/\s+/g, '').toLowerCase();
            
            // Search in folder first
            if (folder) {
                const files = fs.readdirSync(folder).filter(f => f.endsWith('-detail.webp'));
                const match = files.find(f => {
                    const fBase = f.replace('-detail.webp', '').toLowerCase();
                    return fBase.includes(targetBase) || targetBase.includes(fBase);
                });
                if (match) return getVariants(path.join(folder, match));
            }

            // Global search
            const globalMatch = allFiles.find(f => {
                const fBase = path.basename(f).replace('-detail.webp', '').toLowerCase();
                return fBase.includes(targetBase) || targetBase.includes(fBase);
            });
            return globalMatch ? getVariants(globalMatch) : null;
        };

        let mainImage = findImageVariant(p.mainImageRaw, productFolder);
        
        // Auto-select if not found
        if (!mainImage && productFolder) {
            const files = fs.readdirSync(productFolder).filter(f => f.endsWith('-detail.webp'));
            if (files.length > 0) {
                mainImage = getVariants(path.join(productFolder, files[0]));
            }
        }

        // 3. Find Additional Images (All in folder except main)
        let additionalImages = [];
        if (productFolder) {
            const files = fs.readdirSync(productFolder)
                .filter(f => f.endsWith('-detail.webp'))
                .map(f => path.join(productFolder, f));
            
            // Exclude main image if present
            const mainDetailPath = mainImage ? path.join(process.cwd(), 'public', mainImage.detail) : '';
            
            additionalImages = files
                .filter(f => path.normalize(f) !== path.normalize(mainDetailPath))
                .map(f => getVariants(f));
        }

        return {
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
        };
    });
}

function run() {
    let products = parseProducts();
    products = linkImages(products);

    const allCollections = [...new Set(products.flatMap(p => p.collections))].sort();
    const allOccasions = [...new Set(products.flatMap(p => p.occasion))].sort();
    const allTags = [...new Set(products.flatMap(p => p.tags))].sort();

    const output = `
export interface ImageVariant {
    grid: string;
    detail: string;
    hero: string;
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
    console.log('Done! Generated optimized data with variants.');
}

run();
