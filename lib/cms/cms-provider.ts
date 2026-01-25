
import { MockCMSProvider } from './mock-provider';
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

  const mode = process.env.CMS_MODE || 'mock';

  if (mode === 'wordpress') {
    // Return WordPress Provider (to be implemented)
     // return new WordPressCMSProvider();
     console.warn('WordPress mode not implemented yet, falling back to mock');
     cmsProvider = new MockCMSProvider();
  } else {
    cmsProvider = new MockCMSProvider();
  }
  
  return cmsProvider!;
}
