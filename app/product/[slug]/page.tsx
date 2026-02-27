import { getCMSProvider } from "@/lib/cms/cms-provider";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SizeGuide } from "@/components/product/SizeGuide";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/product/EnquiryModal";
import { ProductShare } from "@/components/product/ProductShare";
import Link from "next/link";
import { ArrowLeft, Truck, Clock, RotateCcw } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const provider = getCMSProvider();
  const products = await provider.getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const provider = getCMSProvider();
  const product = await provider.getProductBySlug(slug);

  if (!product) return {};

  const ogImage = product.mainImage?.hero || product.mainImage?.detail || "/logo.png";

  return {
    title: `${product.name} | Fehmi Farzana Designs`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Fehmi Farzana Designs`,
      description: product.description,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Fehmi Farzana Designs`,
      description: product.description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const provider = getCMSProvider();
  const product = await provider.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery Section */}
          <div className="md:sticky md:top-32 self-start">
            <ProductGallery
              mainImage={product.mainImage}
              additionalImages={product.additionalImages}
              productName={product.name}
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">
                {product.collections.join(", ")}
              </p>
              <h1 className="font-sans text-3xl md:text-5xl mb-4">
                {product.name}
              </h1>
              <p className="text-xl font-medium">{product.price}</p>
            </div>

            <div className="prose prose-sm text-gray-600 font-light leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="border-t border-b border-gray-100 py-6">
              <h3 className="uppercase tracking-widest text-xs font-semibold mb-6 text-gray-900">
                Product Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-600 font-light">
                {product.material && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-xs uppercase tracking-wide">
                      Material
                    </span>
                    <span>{product.material}</span>
                  </div>
                )}
                {product.fit && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-xs uppercase tracking-wide">
                      Fit
                    </span>
                    <span>{product.fit}</span>
                  </div>
                )}
                {product.occasion && product.occasion.length > 0 && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-xs uppercase tracking-wide">
                      Occasion
                    </span>
                    <span>{product.occasion.join(", ")}</span>
                  </div>
                )}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-xs uppercase tracking-wide">
                      Tags
                    </span>
                    <span>{product.tags.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex justify-start">
                <SizeGuide />
              </div>

              <EnquiryModal product={product} />
              <p className="text-xs text-gray-400 text-center md:text-left">
                * Our team will contact you for sizing and customization.
              </p>
            </div>

            {/* Shipping & Returns Info */}
            <div className="border-t border-gray-100 pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>Free shipping within Australia</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>
                  Made-to-order: 7–8 weeks for production &amp; dispatch
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <RotateCcw className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>
                  7-day returns on unused items ·{" "}
                  <Link
                    href="/shipping-returns"
                    className="underline underline-offset-4 hover:text-gray-900 transition-colors">
                    View full policy
                  </Link>
                </span>
              </div>
            </div>

            {/* Share Section */}
            <ProductShare productName={product.name} slug={product.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
