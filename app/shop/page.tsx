
import { getCMSProvider } from '@/lib/cms/cms-provider';
import { ShopContent } from '@/components/shop/ShopContent';

export default async function ShopPage() {
  const provider = getCMSProvider();
  const products = await provider.getAllProducts();

  return <ShopContent products={products} />;
}
