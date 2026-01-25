import { Hero } from '@/components/home/Hero';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { getCMSProvider } from '@/lib/cms/cms-provider';

export default async function Home() {
  const provider = getCMSProvider();
  const heroData = await provider.getHeroData();
  const collections = await provider.getAllCollections();
  const featuredProducts = await provider.getFeaturedProducts();

  return (
    <div className="flex flex-col w-full">
      <Hero data={heroData} />
      <FeaturedCollections collections={collections} />
      <FeaturedProducts products={featuredProducts} />
    </div>
  );
}
