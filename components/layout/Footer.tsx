import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MessageCircle } from 'lucide-react';
import { getCMSProvider } from '@/lib/cms/cms-provider';

export async function Footer() {
  const provider = getCMSProvider();
  const { footer, siteName, description } = await provider.getGlobalData();

  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
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

          {/* Get In Touch */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold mb-6 text-gray-400">Get In Touch</h3>
            <div className="space-y-4 text-sm font-light">
              <a href="mailto:farzana@fehmifarz.com" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
                <Mail className="w-4 h-4 text-red-500" />
                <span>farzana@fehmifarz.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+91 987 654 3210</span>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span>WhatsApp</span>
              </a>
              <div className="pt-2 space-y-3">
                <a href={footer.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span>Instagram</span>
                </a>
                <a href={footer.socials.facebook} className="flex items-center gap-3 hover:text-gray-300 transition-colors">
                  <Facebook className="w-4 h-4 text-blue-500" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
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
