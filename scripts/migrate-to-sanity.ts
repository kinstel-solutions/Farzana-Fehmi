import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';
import { products } from '../lib/products-data';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'o4igymxx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const assetCache = new Map<string, string>();

async function uploadImageToSanity(relPath: string, alt: string, focalPoint?: { x: number; y: number }) {
  if (!relPath) return null;

  // Clean path
  const normalizedRel = relPath.startsWith('/') ? relPath.slice(1) : relPath;
  const fullPath = path.join(process.cwd(), 'public', normalizedRel);

  if (!fs.existsSync(fullPath)) {
    console.warn(`[WARN] Image file not found: ${fullPath}`);
    return null;
  }

  let assetId = assetCache.get(fullPath);
  if (!assetId) {
    console.log(`  -> Uploading image asset: ${path.basename(fullPath)}`);
    try {
      const stream = fs.createReadStream(fullPath);
      const asset = await client.assets.upload('image', stream, {
        filename: path.basename(fullPath),
      });
      assetId = asset._id;
      assetCache.set(fullPath, assetId);
    } catch (err) {
      console.error(`  [ERR] Failed to upload ${fullPath}:`, err);
      return null;
    }
  }

  const result: any = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
    alt: alt,
  };

  if (focalPoint && typeof focalPoint.x === 'number' && typeof focalPoint.y === 'number') {
    result.hotspot = {
      _type: 'sanity.imageHotspot',
      x: Math.max(0, Math.min(1, focalPoint.x / 100)),
      y: Math.max(0, Math.min(1, focalPoint.y / 100)),
      height: 1,
      width: 1,
    };
  }

  return result;
}

async function migrateCollections() {
  console.log('\n--- Migrating Collections ---');
  const collectionsData = [
    {
      title: 'Everyday Wear',
      slug: 'everyday-wear',
      image: '/photos/cards/casual-wear.webp',
      size: 'large',
      description: 'Effortless everyday ethnic silhouettes',
    },
    {
      title: 'Festive',
      slug: 'festive',
      image: '/photos/cards/festive-wear.webp',
      size: 'small',
      description: 'Luxe celebratory ensembles',
    },
    {
      title: 'Party',
      slug: 'party',
      image: '/photos/cards/party-wear.webp',
      size: 'small',
      description: 'Glamorous evening and occasion wear',
    },
  ];

  for (const col of collectionsData) {
    const existing = await client.fetch(`*[_type == "collection" && slug.current == $slug][0]`, {
      slug: col.slug,
    });

    if (existing) {
      console.log(`[SKIP] Collection "${col.title}" already exists.`);
      continue;
    }

    console.log(`[CREATE] Collection "${col.title}"...`);
    const imageDoc = await uploadImageToSanity(col.image, col.title);

    await client.create({
      _type: 'collection',
      title: col.title,
      slug: { _type: 'slug', current: col.slug },
      image: imageDoc,
      size: col.size,
      description: col.description,
    });
    console.log(`  -> Successfully created collection "${col.title}"`);
  }
}

async function migrateProducts() {
  console.log(`\n--- Migrating ${products.length} Products ---`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    console.log(`\n[${i + 1}/${products.length}] Processing "${p.name}" (${p.slug})...`);

    // Check if already in Sanity
    const existing = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, {
      slug: p.slug,
    });

    if (existing) {
      console.log(`  -> Already exists in Sanity (ID: ${existing._id}). Skipping.`);
      continue;
    }

    // Best resolution image is hero or detail
    const mainImgPath = p.mainImage?.hero || p.mainImage?.detail || p.mainImage?.grid || '';
    const mainImageDoc = await uploadImageToSanity(mainImgPath, p.name, p.mainImage?.focalPoint);

    // Additional images
    const additionalImageDocs = [];
    if (p.additionalImages && p.additionalImages.length > 0) {
      for (let j = 0; j < p.additionalImages.length; j++) {
        const addImg = p.additionalImages[j];
        const addPath = addImg.hero || addImg.detail || addImg.grid || '';
        const doc = await uploadImageToSanity(addPath, `${p.name} view ${j + 2}`, addImg.focalPoint);
        if (doc) {
          additionalImageDocs.push(doc);
        }
      }
    }

    const newDoc = {
      _type: 'product',
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      price: p.price,
      priceNumeric: p.priceNumeric,
      featured: Boolean(p.featured),
      collections: p.collections,
      mainImage: mainImageDoc,
      additionalImages: additionalImageDocs,
      description: p.description,
      material: p.material,
      occasion: p.occasion,
      fit: p.fit,
      tags: p.tags,
      bgColor: (p as any).bgColor || '',
    };

    const created = await client.create(newDoc);
    console.log(`  -> Created product in Sanity with ID: ${created._id}`);
  }
}

async function run() {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN is required. Check your .env.local file.');
    }
    console.log('Sanity Migration Started...');
    console.log(`Target Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'o4igymxx'}`);
    console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`);

    await migrateCollections();
    await migrateProducts();

    console.log('\nAll done! All products and collections migrated successfully to Sanity!');
  } catch (err) {
    console.error('\n[FATAL] Migration failed:', err);
    process.exit(1);
  }
}

run();
