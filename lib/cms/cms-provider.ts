
import { MockCMSProvider } from './mock-provider';
import { SanityCMSProvider } from './sanity-provider';
import { Product, Collection, HeroData, StoryData, GlobalData } from './types';

export interface CMSProvider {
  getAllProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getAllCollections(): Promise<Collection[]>;
  getHeroData(): Promise<HeroData>;
  getStoryData(): Promise<StoryData>;
  getGlobalData(): Promise<GlobalData>;
}

// Singleton instance
let cmsProvider: CMSProvider | null = null;

export function getCMSProvider(): CMSProvider {
  if (cmsProvider) {
    return cmsProvider;
  }

  const mode = process.env.CMS_MODE || 'sanity';

  if (mode === 'sanity') {
    cmsProvider = new SanityCMSProvider();
  } else if (mode === 'wordpress') {
    console.warn('WordPress mode not implemented yet, falling back to mock');
    cmsProvider = new MockCMSProvider();
  } else {
    cmsProvider = new MockCMSProvider();
  }
  
  return cmsProvider!;
}
