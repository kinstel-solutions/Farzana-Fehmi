import { MetadataRoute } from 'next';
import { getCMSProvider } from '@/lib/cms/cms-provider';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const provider = getCMSProvider();
  const products = await provider.getAllProducts();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fehmifarz.com';

  const staticRoutes = ['', '/shop', '/story', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
