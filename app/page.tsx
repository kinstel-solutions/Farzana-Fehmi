import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { getCMSProvider } from "@/lib/cms/cms-provider";

export default async function Home() {
  const provider = getCMSProvider();
  const heroData = await provider.getHeroData();
  const collections = await provider.getAllCollections();
  const featuredProducts = await provider.getFeaturedProducts();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fehmi Farzana Designs",
    url: "https://www.fehmifarz.com",
    publisher: {
      "@type": "Organization",
      name: "Fehmi Farzana Designs",
      logo: "https://www.fehmifarz.com/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+61 416 966 865",
        contactType: "customer service",
      },
      sameAs: [
        "https://instagram.com/fehmifarzanadesigns",
        "https://www.facebook.com/share/18VpgC1fMH/?mibextid=wwXIfr",
      ],
    },
  };

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Hero data={heroData} />
      <FeaturedCollections collections={collections} />
      <FeaturedProducts products={featuredProducts} />
    </div>
  );
}
