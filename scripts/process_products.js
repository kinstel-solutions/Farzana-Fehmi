const fs = require('fs');
const path = require('path');

const PRODUCTS_TXT = path.join(process.cwd(), 'data', 'products.txt');
const IMAGES_ROOT = path.join(process.cwd(), 'public', 'Product-images');
const OUTPUT_TS = path.join(process.cwd(), 'lib', 'products-data.ts');

function renameRecursive(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const items = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const item of items) {
        const oldName = item.name;
        const newName = oldName.replace(/\s+/g, '');
        const oldPath = path.join(currentDir, oldName);
        const newPath = path.join(currentDir, newName);
        if (oldName !== newName) { fs.renameSync(oldPath, newPath); }
        if (item.isDirectory()) { renameRecursive(newPath); }
    }
}

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
            mainImage: '',
            additionalImages: '',
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
                data.collections = raw.split(/[,\/]+/).map(s => s.trim()).filter(s => s);
            }
            
            if (line.includes('**Price:**')) {
                const rawPrice = line.split('**Price:**')[1].trim();
                data.price = rawPrice;
                const numeric = parseInt(rawPrice.replace(/[^0-9]/g, ''), 10);
                data.priceNumeric = isNaN(numeric) ? 0 : numeric;
            }
            
            if (line.includes('**Featured on Homepage?:**')) data.featured = line.split('**Featured on Homepage?:**')[1].trim().toLowerCase() === 'yes';
            if (line.includes('**Cover / Main Image Filename:**')) data.mainImage = line.split('**Cover / Main Image Filename:**')[1].trim();
            if (line.includes('**Additional Image Filenames:**')) data.additionalImages = line.split('**Additional Image Filenames:**')[1].trim();
            if (line.includes('**Short Product Description:**')) data.description = line.split('**Short Product Description:**')[1].trim();
            if (line.includes('**Fabric / Material:**')) data.material = line.split('**Fabric / Material:**')[1].trim();
            
            if (line.includes('**Occasion / Use:**')) {
                 const raw = line.split('**Occasion / Use:**')[1].trim();
                 data.occasion = raw.split(/[,\/]+/).map(s => s.trim()).filter(s => s);
            }

            if (line.includes('**Fit / Style (Optional):**')) {
                let fit = line.split('**Fit / Style (Optional):**')[1].trim();
                // Fix typos
                if (fit.toLowerCase() === 'laarge') fit = 'Large';
                data.fit = fit;
            }
            
            if (line.includes('**Tags:**')) {
                // Fix typos in tags if any, though standard cleanup is usually enough
                data.tags = line.split('**Tags:**')[1].trim().split(',').map(t => {
                   let tag = t.trim();
                   // Title Case
                   return tag.charAt(0).toUpperCase() + tag.slice(1);
                }).filter(t => t);
            }
        });

        // Typos in Description fixing
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
    const allFiles = [];
    const allFolders = [];
    function walkSync(dir) {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const res = path.join(dir, item.name);
            if (item.isDirectory()) { allFolders.push(res); walkSync(res); } else { allFiles.push(res); }
        }
    }
    walkSync(IMAGES_ROOT);

    return products.map(p => {
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

        const findImagePath = (filename, folder = null) => {
            if (!filename) return null;
            const target = filename.replace(/\s+/g, '').toLowerCase();
            
            if (folder) {
                const files = fs.readdirSync(folder);
                const match = files.find(f => {
                    const fname = f.replace(/\s+/g, '').toLowerCase();
                    return fname === target || fname.includes(target) || target.includes(fname.replace(/\.[^/.]+$/, ""));
                });
                if (match) return path.join(folder, match);
            }

            const globalMatch = allFiles.find(f => {
                const fname = path.basename(f).replace(/\s+/g, '').toLowerCase();
                return fname === target || fname.includes(target) || target.includes(fname.replace(/\.[^/.]+$/, ""));
            });
            return globalMatch || null;
        };

        let mainImagePath = findImagePath(p.mainImage, productFolder);
        if (!mainImagePath && productFolder) {
            const filesInFolder = fs.readdirSync(productFolder).filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
            if (filesInFolder.length > 0) mainImagePath = path.join(productFolder, filesInFolder[0]);
        }

        const normalizeToPublic = (p) => p ? p.split('public')[1].replace(/\\/g, '/') : null;
        let additionalPaths = [];
        if (p.additionalImages) {
            additionalPaths = p.additionalImages.split(',').map(img => findImagePath(img.trim(), productFolder)).filter(Boolean);
        }
        if (additionalPaths.length === 0 && productFolder) {
             const files = fs.readdirSync(productFolder).filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f)).map(f => path.join(productFolder, f));
             additionalPaths = files.filter(f => f !== mainImagePath);
        }

        return {
            ...p,
            mainImage: normalizeToPublic(mainImagePath),
            additionalImages: [...new Set(additionalPaths.map(normalizeToPublic))].filter(img => img && img !== normalizeToPublic(mainImagePath))
        };
    });
}

function run() {
    renameRecursive(IMAGES_ROOT);
    let products = parseProducts();
    products = linkImages(products);

    // Extract unique lists
    const allCollections = [...new Set(products.flatMap(p => p.collections))].sort();
    const allOccasions = [...new Set(products.flatMap(p => p.occasion))].sort();
    const allTags = [...new Set(products.flatMap(p => p.tags))].sort();

    const output = `
export interface Product {
    id: string;
    slug: string;
    name: string;
    collections: string[];
    price: string;
    priceNumeric: number;
    featured: boolean;
    mainImage: string | null;
    additionalImages: string[];
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
    return \`$\${price.toLocaleString()}\`;
}

export function getProductsByCollection(collection: string): Product[] {
    return products.filter(p => p.collections.includes(collection));
}

export function getRelatedProducts(product: Product): Product[] {
    // Determine related by overlapping collections or tags
    return products.filter(p => {
        if (p.id === product.id) return false;
        const sameCollection = p.collections.some(c => product.collections.includes(c));
        const sameTag = p.tags.some(t => product.tags.includes(t));
        return sameCollection || sameTag;
    }).slice(0, 4);
}
`;
    fs.writeFileSync(OUTPUT_TS, output);
    console.log('Done! Generated optimized data with extracted lists.');
}

run();
