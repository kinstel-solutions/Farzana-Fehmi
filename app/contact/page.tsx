// Split into a server component for data fetching and a client component for the form
import { getCMSProvider } from '@/lib/cms/cms-provider';
import ContactForm from '@/components/contact/ContactForm';
import { Mail, Phone, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

export default async function ContactPage() {
  const provider = getCMSProvider();
  const { contact, footer } = await provider.getGlobalData();

  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        <div className="text-center mb-16 space-y-4">
           {/* Note: I'm keeping motion.h1 but it might flicker on server, but it's fine for now or I can move it to a client wrapper */}
           <h1 className="font-sans text-4xl md:text-5xl">Contact Us</h1>
           <p className="text-gray-500 font-light">
             For enquiries, appointments, and custom orders.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Contact Info */}
            <div className="space-y-8">
               <div className="space-y-6">
                 <div>
                   <h3 className="uppercase tracking-widest text-xs font-semibold mb-4 text-gray-900">Get in Touch</h3>
                   <div className="space-y-4 text-sm font-light">
                     <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors">
                       <Mail className="w-4 h-4 text-red-500" />
                       <span>{contact.email}</span>
                     </a>
                     <a href={`tel:${contact.phoneFull}`} className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors">
                       <Phone className="w-4 h-4 text-blue-400" />
                       <span>{contact.phone}</span>
                     </a>
                     <a href={`https://wa.me/${contact.whatsappFull}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors">
                       <MessageCircle className="w-4 h-4 text-green-500" />
                       <span>{contact.whatsapp}</span>
                     </a>
                   </div>
                 </div>
 
                 <div>
                   <h3 className="uppercase tracking-widest text-xs font-semibold mb-4 text-gray-900">Follow Us</h3>
                   <div className="space-y-4 text-sm font-light">
                     <a href={footer.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors">
                       <Instagram className="w-4 h-4 text-pink-500" />
                       <span>Instagram</span>
                     </a>
                     <a href={footer.socials.facebook} className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors">
                       <Facebook className="w-4 h-4 text-blue-500" />
                       <span>Facebook</span>
                     </a>
                   </div>
                 </div>
               </div>
            </div>

           {/* Form - Separate Client Component */}
           <ContactForm />
        </div>
      </div>
    </div>
  );
}
