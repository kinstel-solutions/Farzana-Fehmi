import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import { getCMSProvider } from '@/lib/cms/cms-provider';

export async function Footer() {
  const provider = getCMSProvider();
  const { footer, siteName, description } = await provider.getGlobalData();

  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
{/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <div className="relative h-36 w-48">
                <Image 
                  src="/logo-white-Nobg.svg" 
                  alt={siteName} 
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Link>
          </div>

          {/* Links */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold mb-6 text-gray-400">Explore</h3>
            <ul className="space-y-4 text-sm font-light">
              {footer.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-gray-300 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold mb-6 text-gray-400">Customer Care</h3>
            <ul className="space-y-4 text-sm font-light">
               {footer.customerCare.map((link) => (
                 <li key={link.label}>
                   <Link href={link.href} className="hover:text-gray-300 transition-colors">{link.label}</Link>
                 </li>
               ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-light">
            © {new Date().getFullYear()} {footer.copyRight}
          </p>
          <div className="flex gap-6 text-gray-400">
            <a href={footer.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href={footer.socials.facebook} className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
