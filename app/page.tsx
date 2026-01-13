import { Hero } from '@/components/home/Hero';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeaturedCollections />
    </div>
  );
}
