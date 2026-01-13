import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <Link 
          href="/shop" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
             <Image
               src={product.image}
               alt={product.name}
               fill
               className="object-cover"
               priority
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">{product.category}</p>
              <h1 className="font-serif text-3xl md:text-5xl mb-4">{product.name}</h1>
              <p className="text-xl font-medium">{product.price}</p>
            </div>

            <div className="prose prose-sm text-gray-600 font-light leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="border-t border-b border-gray-100 py-6">
              <h3 className="uppercase tracking-widest text-xs font-semibold mb-4 text-gray-900">Product Details</h3>
              <ul className="space-y-2 text-sm text-gray-600 font-light">
                 {product.details?.map((detail, index) => (
                   <li key={index} className="flex items-start">
                     <span className="mr-2">•</span> {detail}
                   </li>
                 ))}
              </ul>
            </div>

            <div className="space-y-4 pt-4">
              <Link href={`/contact?subject=Enquiry: ${product.name}`}>
                <Button size="lg" className="w-full md:w-auto min-w-[200px] uppercase tracking-wider text-xs">
                  Enquire Now
                </Button>
              </Link>
              <p className="text-xs text-gray-400 text-center md:text-left">
                * Our team will contact you for sizing and customization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
