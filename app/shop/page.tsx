import { getCMSProvider } from "@/lib/cms/cms-provider";
import { ShopContent } from "@/components/shop/ShopContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop the Collection | Fehmi Farzana Designs",
  description:
    "Explore the latest designer garments by Fehmi Farzana Designs. Shop our exclusive collection of sustainable and ethically made festival, party, and everyday wear.",
  openGraph: {
    title: "Shop the Collection | Fehmi Farzana Designs",
    description:
      "Explore the latest designer garments by Fehmi Farzana Designs. Shop our exclusive collection of sustainable and ethically made festival, party, and everyday wear.",
  },
  twitter: {
    title: "Shop the Collection | Fehmi Farzana Designs",
    description:
      "Explore the latest designer garments by Fehmi Farzana Designs. Shop our exclusive collection of sustainable and ethically made festival, party, and everyday wear.",
  },
};

export default async function ShopPage() {
  const provider = getCMSProvider();
  const products = await provider.getAllProducts();

  return <ShopContent products={products} />;
}
