import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MessageCircle } from 'lucide-react';
import { LogoWhiteNoBGwithDesigns } from '@/components/ui/LogoWhiteNoBGwithDesigns';
import { getCMSProvider } from '@/lib/cms/cms-provider';

export async function Footer() {
  const provider = getCMSProvider();
  const { footer, siteName, contact } = await provider.getGlobalData();

  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          
{/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <div className="relative w-48">
                 <LogoWhiteNoBGwithDesigns width={200} height={80} />
              </div>
            </Link>
            <p className="text-gray-200 mt-12 text-[16px] font-light tracking-wide leading-relaxed max-w-[200px]">
              Brisbane, Australia.
            </p>
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
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-gray-300 transition-colors">
                <Mail className="w-4 h-4 text-red-500" />
                <span>{contact.email}</span>
              </a>
              <a href={`tel:${contact.phoneFull}`} className="flex items-center gap-3 hover:text-gray-300 transition-colors">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{contact.phone}</span>
              </a>
              <a href={`https://wa.me/${contact.whatsappFull}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span>{contact.whatsapp}</span>
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

        <div className="border-t border-gray-900 pt-4 flex flex-col items-center gap-4 text-center">
          <div className="max-w-3xl space-y-4">
            <h3 className="uppercase tracking-[0.2em] text-[12px] font-semibold text-gray-100">Designed in Brisbane, Australia and manufactured in India</h3>
            <div className="space-y-4">
              <p className="text-gray-200 text-[12px] leading-relaxed font-light max-w-2xl mx-auto italic">
                We acknowledge the Traditional Owners of Country throughout Australia and pay our respect to Elders past, present and emerging.
              </p>
              <p className="text-gray-200 text-[12px] leading-relaxed font-light max-w-2xl mx-auto">
                We recognize our responsibility to tread lightly on our planet and are committed to minimize the impact of our business has on our environment and do our best to implement environmentally sustainable procedures wherever possible.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 pt-4 mt-4 border-t border-gray-900/50">
            <p className="text-gray-500 text-xs font-light">
              © {new Date().getFullYear()} {footer.copyRight}
            </p>
            <div className="flex gap-6 text-gray-400">
              <a href={footer.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href={footer.socials.facebook} className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
