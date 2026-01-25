import { Hero } from '@/components/home/Hero';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { getCMSProvider } from '@/lib/cms/cms-provider';

export default async function Home() {
  const provider = getCMSProvider();
  const heroData = await provider.getHeroData();
  const collections = await provider.getAllCollections();

  return (
    <div className="flex flex-col w-full">
      <Hero data={heroData} />
      <FeaturedCollections collections={collections} />
    </div>
  );
}
