'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ContactForm() {
  return (
    <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
    >
       <form className="space-y-6">
         <div className="space-y-2">
           <label htmlFor="name" className="text-xs uppercase tracking-wider text-gray-500">Name</label>
           <input 
             type="text" 
             id="name"
             className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors bg-transparent"
             placeholder="Your Name"
           />
         </div>

         <div className="space-y-2">
           <label htmlFor="email" className="text-xs uppercase tracking-wider text-gray-500">Email</label>
           <input 
             type="email" 
             id="email"
             className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors bg-transparent"
             placeholder="your@email.com"
           />
         </div>

         <div className="space-y-2">
           <label htmlFor="subject" className="text-xs uppercase tracking-wider text-gray-500">Subject</label>
           <select 
             id="subject" 
             className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors bg-transparent"
           >
              <option>General Enquiry</option>
              <option>Appointment Request</option>
              <option>Custom Order</option>
              <option>Press & Media</option>
           </select>
         </div>

         <div className="space-y-2">
           <label htmlFor="message" className="text-xs uppercase tracking-wider text-gray-500">Message</label>
           <textarea 
             id="message" 
             rows={4}
             className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors bg-transparent resize-none"
             placeholder="How can we assist you?"
           ></textarea>
         </div>

         <Button className="w-full uppercase tracking-widest">Send Message</Button>
       </form>
    </motion.div>
  );
}
