
export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  details: string[];
  slug: string;
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
  image: string;
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
  philosophy: {
    title: string;
    quote: string;
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
  description: string;
  navigation: NavigationLink[];
  footer: {
    explore: NavigationLink[];
    customerCare: NavigationLink[];
    copyRight: string;
    socials: {
        instagram: string;
        facebook: string;
        twitter: string;
    };
  };
}
