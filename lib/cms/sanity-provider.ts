import { CMSProvider } from './cms-provider';
import { Product, Collection, HeroData, StoryData, GlobalData, ImageVariant } from './types';
import { client } from '@/sanity/lib/client';
import { formatSanityImage } from '@/sanity/lib/image';
import { MockCMSProvider } from './mock-provider';

// Helper to interleave products by color (same as mock provider)
const sortProductsByColor = (items: Product[]): Product[] => {
  if (!items.length) return [];

  const groups: { [key: string]: Product[] } = {};
  items.forEach((p) => {
    const color = p.bgColor || 'unknown';
    if (!groups[color]) groups[color] = [];
    groups[color].push(p);
  });

  const sorted: Product[] = [];
  const keys = Object.keys(groups);
  let maxLen = 0;
  keys.forEach((k) => (maxLen = Math.max(maxLen, groups[k].length)));

  for (let i = 0; i < maxLen; i++) {
    keys.forEach((k) => {
      if (groups[k][i]) {
        sorted.push(groups[k][i]);
      }
    });
  }
  return sorted;
};

// Map raw Sanity document to our Product interface
function mapSanityProduct(doc: any): Product {
  const mainImage = formatSanityImage(doc.mainImage);
  const additionalImages: ImageVariant[] = (doc.additionalImages || [])
    .map(formatSanityImage)
    .filter(Boolean) as ImageVariant[];

  // Calculate numeric price
  let priceNumeric = 0;
  if (typeof doc.price === 'number') {
    priceNumeric = doc.price;
  } else if (typeof doc.priceNumeric === 'number') {
    priceNumeric = doc.priceNumeric;
  } else if (typeof doc.price === 'string') {
    const parsed = parseInt(doc.price.replace(/[^0-9]/g, ''), 10);
    priceNumeric = isNaN(parsed) ? 0 : parsed;
  }

  // Format display price
  let displayPrice = '';
  if (doc.priceOnRequest || priceNumeric === 0) {
    displayPrice = 'Price on Request';
  } else {
    displayPrice = `$${priceNumeric} AUD`;
  }

  return {
    id: doc._id,
    slug: typeof doc.slug === 'string' ? doc.slug : doc.slug?.current || '',
    name: doc.name || '',
    collections: doc.collections || [],
    price: displayPrice,
    priceNumeric,
    featured: Boolean(doc.featured),
    mainImage,
    additionalImages,
    description: doc.description || '',
    material: doc.material || '',
    occasion: doc.occasion || [],
    fit: doc.fit || '',
    tags: doc.tags || [],
    bgColor: doc.bgColor || '',
  };
}

export class SanityCMSProvider implements CMSProvider {
  private fallbackProvider = new MockCMSProvider();

  async getAllProducts(): Promise<Product[]> {
    try {
      const query = `*[_type == "product"] | order(_createdAt desc) {
        _id,
        name,
        slug,
        price,
        priceOnRequest,
        featured,
        collections,
        mainImage,
        additionalImages,
        description,
        material,
        occasion,
        fit,
        tags,
        bgColor
      }`;

      const rawProducts = await client.fetch<any[]>(query, {}, {
        next: { revalidate: 60, tags: ['products'] },
      });

      if (!rawProducts || rawProducts.length === 0) {
        console.warn('No products found in Sanity, falling back to mock provider');
        return this.fallbackProvider.getAllProducts();
      }

      const products = rawProducts.map(mapSanityProduct);
      return sortProductsByColor(products);
    } catch (error) {
      console.error('Failed to fetch products from Sanity:', error);
      return this.fallbackProvider.getAllProducts();
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const query = `*[_type == "product" && featured == true] | order(_createdAt desc) [0...4] {
        _id,
        name,
        slug,
        price,
        priceOnRequest,
        featured,
        collections,
        mainImage,
        additionalImages,
        description,
        material,
        occasion,
        fit,
        tags,
        bgColor
      }`;

      const rawProducts = await client.fetch<any[]>(query, {}, {
        next: { revalidate: 60, tags: ['products', 'featured-products'] },
      });

      if (!rawProducts || rawProducts.length === 0) {
        return this.fallbackProvider.getFeaturedProducts();
      }

      const products = rawProducts.map(mapSanityProduct);
      return sortProductsByColor(products);
    } catch (error) {
      console.error('Failed to fetch featured products from Sanity:', error);
      return this.fallbackProvider.getFeaturedProducts();
    }
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const query = `*[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        price,
        priceOnRequest,
        featured,
        collections,
        mainImage,
        additionalImages,
        description,
        material,
        occasion,
        fit,
        tags,
        bgColor
      }`;

      const rawProduct = await client.fetch<any>(query, { slug }, {
        next: { revalidate: 60, tags: [`product:${slug}`] },
      });

      if (!rawProduct) {
        return this.fallbackProvider.getProductBySlug(slug);
      }

      return mapSanityProduct(rawProduct);
    } catch (error) {
      console.error(`Failed to fetch product with slug ${slug} from Sanity:`, error);
      return this.fallbackProvider.getProductBySlug(slug);
    }
  }

  async getAllCollections(): Promise<Collection[]> {
    try {
      const query = `*[_type == "collection"] {
        _id,
        title,
        slug,
        image,
        size,
        description
      }`;

      const rawCollections = await client.fetch<any[]>(query, {}, {
        next: { revalidate: 3600, tags: ['collections'] },
      });

      if (!rawCollections || rawCollections.length === 0) {
        return this.fallbackProvider.getAllCollections();
      }

      return rawCollections.map((c) => {
        const imgVariant = formatSanityImage(c.image);
        return {
          id: c._id,
          title: c.title,
          image: imgVariant?.hero || imgVariant?.grid || '/logo.png',
          link: `/shop?category=${encodeURIComponent(c.title)}`,
          size: c.size || 'small',
        };
      });
    } catch (error) {
      console.error('Failed to fetch collections from Sanity:', error);
      return this.fallbackProvider.getAllCollections();
    }
  }

  async getHeroData(): Promise<HeroData> {
    return this.fallbackProvider.getHeroData();
  }

  async getStoryData(): Promise<StoryData> {
    return this.fallbackProvider.getStoryData();
  }

  async getGlobalData(): Promise<GlobalData> {
    return this.fallbackProvider.getGlobalData();
  }
}
