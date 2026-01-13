'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        <div className="text-center mb-16 space-y-4">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="font-serif text-4xl md:text-5xl"
           >
             Contact Us
           </motion.h1>
           <p className="text-gray-500 font-light">
             For enquiries, appointments, and custom orders.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
           {/* Contact Info */}
           <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
           >
              <div>
                <h3 className="uppercase tracking-widest text-xs font-semibold mb-2 text-gray-900">Studio & Boutique</h3>
                <p className="text-gray-600 font-light">
                  123 Fashion Avenue, <br />
                  Design District, <br />
                  Lucknow, India - 226001
                </p>
              </div>

              <div>
                <h3 className="uppercase tracking-widest text-xs font-semibold mb-2 text-gray-900">Get in Touch</h3>
                <p className="text-gray-600 font-light">
                  <a href="mailto:contact@farzanafehmi.com" className="hover:text-black transition-colors">contact@farzanafehmi.com</a> <br />
                  <a href="tel:+919876543210" className="hover:text-black transition-colors">+91 987 654 3210</a>
                </p>
              </div>

              <div>
                <h3 className="uppercase tracking-widest text-xs font-semibold mb-2 text-gray-900">Opening Hours</h3>
                <p className="text-gray-600 font-light">
                  Monday - Saturday <br />
                  11:00 AM - 8:00 PM <br />
                  By Appointment Only
                </p>
              </div>
           </motion.div>

           {/* Form */}
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
        </div>
      </div>
    </div>
  );
}
