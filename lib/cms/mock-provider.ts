import { CMSProvider } from './cms-provider';
import { Product, Collection, HeroData, StoryData, GlobalData } from './types';

const products: Product[] = [
  {
    id: 'embellished-gown-gold',
    slug: 'embellished-gown-gold',
    name: 'The Ivory Gold Gown',
    price: '$2,400',
    image: '/hero.png',
    category: 'Gowns',
    description: 'A masterpiece of craftsmanship, this ivory gown features intricate gold thread embroidery inspired by ancient royal courts. Structured bodice meets a flowing silhouette.',
    details: [
      'Hand-embroidered gold threadwork',
      'Premium silk blend fabric',
      'Concealed back zipper',
      'Made to order'
    ]
  },
  {
    id: 'emerald-silk-set',
    slug: 'emerald-silk-set',
    name: 'Emerald Silk Anarkali',
    price: '$1,850',
    image: '/images/collection-dresses.png',
    category: 'Dresses',
    description: 'Rich emerald silk woven with subtle motifs. This Anarkali set bridges the gap between traditional grandeur and modern minimalism.',
    details: [
      'Pure Emerald Silk',
      'Includes matching dupatta',
      'Hand-finished hems',
      'Dry clean only'
    ]
  },
  {
    id: 'silk-blouse-skirt',
    slug: 'silk-blouse-skirt',
    name: 'Silk Shirt & Skirt Set',
    price: '$1,200',
    image: '/images/collection-separates.png',
    category: 'Separates',
    description: 'Contemporary elegance. A fluid silk shirt paired with a structured embroidered skirt for the modern woman who values versatility.',
    details: [
      '100% Silk Crepe shirt',
      'Linen-blend embroidered skirt',
      'Versatile separates',
      'Relaxed fit'
    ]
  },
  {
    id: 'ivory-tunic',
    slug: 'ivory-tunic',
    name: 'Pearl Embroidered Tunic',
    price: '$950',
    image: '/images/product-tunic.png',
    category: 'Tunics',
    description: 'Understate luxury. This tunic features delicate pearl work on an ivory base, perfect for daytime events or intimate gatherings.',
    details: [
      'Hand-embellished beads',
      'Cotton-silk blend',
      'Side slits for movement',
      'Breathable fabric'
    ]
  },
  {
    id: 'burgundy-cape',
    slug: 'burgundy-cape',
    name: 'Velvet Draped Cape',
    price: '$1,450',
    image: '/images/product-cape.png',
    category: 'Capes',
    description: 'Dramatic and sophisticated. The velvet cape drapes effortlessly, adding a layer of warmth and regal style to any evening ensemble.',
    details: [
      'Premium deep burgundy velvet',
      'Asymmetrical drape',
      'Silk lining',
      'One size fits most'
    ]
  }
];

const collections: Collection[] = [
  {
    id: 1,
    title: 'New Arrivals',
    image: '/hero.png',
    link: '/shop?category=new',
    size: 'large'
  },
  {
    id: 2,
    title: 'Dresses',
    image: '/images/collection-dresses.png',
    link: '/shop?category=dresses',
    size: 'small'
  },
  {
    id: 3,
    title: 'Separates',
    image: '/images/collection-separates.png',
    link: '/shop?category=separates',
    size: 'small'
  }
];

const heroData: HeroData = {
  title: 'ETHEREAL ELEGANCE',
  subtitle: 'Spring / Summer 2026',
  image: '/hero.png',
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
      siteName: 'Farzana Fehmi',
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
