import { CMSProvider } from './cms-provider';
import { Product, Collection, HeroData, StoryData, GlobalData } from './types';
import { products, allCollections } from '@/lib/products-data';

// Helper to get image for a collection
const getCollectionImage = (colName: string) => {
  const p = products.find(p => p.collections.includes(colName) && p.mainImage);
  return p?.mainImage?.hero || p?.mainImage?.detail || '/hero.png';
};

// Map allCollections to Collection interface
const collections: Collection[] = allCollections.map((col, idx) => ({
  id: idx + 1,
  title: col,
  image: getCollectionImage(col),
  link: `/shop?category=${encodeURIComponent(col)}`,
  size: (idx === 0 ? 'large' : 'small') as 'large' | 'small' // 1st is large, rest small for grid layout
})).slice(0, 3); // Limit to 3 for the home layout

// Dynamic Hero Data from a Featured Product
const featuredHeroProduct = products.find(p => p.featured && p.mainImage) || products[0];

const heroData: HeroData = {
  title: 'ETHEREAL ELEGANCE',
  subtitle: 'Spring / Summer 2026',
  image: featuredHeroProduct?.mainImage?.hero || '/hero.png',
  buttonText: 'Discover The Collection',
  buttonLink: '/shop'
};

const storyData: StoryData = {
  hero: {
    title: "The Artisan's Tale",
    subtitle: "Where heritage meets contemporary elegance.",
    image: "/images/designer-studio.png"
  },
  narrative: [
    {
      title: "A Vision of Timelessness",
      content: [
        "Farzana Fehmi established her eponymous label with a singular vision: to create garments that transcend seasons. Drawing inspiration from the rich tapestry of ethnic craftsmanship and blending it with modern silhouettes, the brand stands as a testament to the enduring allure of quiet luxury.",
        "Every piece is a dialogue between the past and the present, designed for the woman who moves through the world with grace and purpose."
      ]
    }
  ],
  philosophy: {
    title: "Philosophy",
    quote: "Fashion is not just about what you wear, but how it makes you feel. It is an armor of elegance.",
    author: "Farzana Fehmi"
  },
  footer: {
    title: "Experience the Collection",
    buttonText: "View All Products",
    buttonLink: "/shop"
  }
};

export class MockCMSProvider implements CMSProvider {
  async getAllProducts(): Promise<Product[]> {
    return products;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return products.filter(p => p.featured).slice(0, 4);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return products.find(p => p.slug === slug) || null;
  }

  async getAllCollections(): Promise<Collection[]> {
    return collections;
  }

  async getHeroData(): Promise<HeroData> {
    return heroData;
  }

  async getStoryData(): Promise<StoryData> {
    return storyData;
  }

  async getGlobalData(): Promise<GlobalData> {
    return {
      siteName: 'Fehmi Farzana',
      description: 'Defining contemporary luxury through heritage craftsmanship.',
      navigation: [
        { label: 'SHOP', href: '/shop' },
        { label: 'COLLECTIONS', href: '/shop' },
        { label: 'STORY', href: '/story' },
        { label: 'CONTACT', href: '/contact' }
      ],
      footer: {
        explore: [
          { label: 'Shop All', href: '/shop' },
          { label: 'Our Story', href: '/story' },
          { label: 'Contact', href: '/contact' },
          { label: 'Press', href: '#' },
        ],
        customerCare: [
          { label: 'Shipping & Returns', href: '#' },
          { label: 'Size Guide', href: '#' },
          { label: 'Terms of Service', href: '#' },
          { label: 'Privacy Policy', href: '#' },
        ],
        copyRight: `Farzana Fehmi. All rights reserved.`,
        socials: {
            instagram: '#',
            facebook: '#',
            twitter: '#'
        }
      }
    };
  }
}
