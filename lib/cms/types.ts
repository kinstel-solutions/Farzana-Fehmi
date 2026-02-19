
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
  bgColor?: string;
}

export interface Collection {
  id: number | string;
  title: string;
  image: string;
  link: string;
  size?: 'small' | 'large';
}

export interface HeroData {
  title: string;
  subtitle: string;
  images: string[];
  desktopImages?: string[];
  buttonText: string;
  buttonLink: string;
}

export interface StorySection {
  title: string;
  content: string[];
}

export interface StoryData {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  narrative: StorySection[];
  mission?: {
    title: string;
    quote: string;
    description: string;
  };
  philosophy: {
    title: string;
    quote: string;
    description?: string;
    author: string;
  };
  footer: {
    title: string;
    buttonText: string;
    buttonLink: string;
  };
}

export interface NavigationLink {
  label: string;
  href: string;
}

export interface GlobalData {
  siteName: string;
  description?: string;
  contact: {
    email: string;
    phone: string;
    phoneFull: string;
    whatsapp: string;
    whatsappFull: string;
  };
  navigation: NavigationLink[];
  footer: {
    explore: NavigationLink[];
    customerCare: NavigationLink[];
    copyRight: string;
    socials: {
        instagram: string;
        facebook: string;
    };
  };
}
