'use client';

import { motion } from 'framer-motion';

export default function ShippingReturnsPage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="font-sans text-3xl md:text-4xl mb-8">Shipping & Returns</h1>
          
          <div className="prose prose-gray max-w-none font-light text-gray-600 space-y-6">
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">Shipping Policy</h2>
              <p>
                We offer worldwide shipping. All orders are processed within 1-3 business days. 
                Shipping times vary depending on your location.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">Returns & Exchanges</h2>
              <p>
                We accept returns within 14 days of delivery. Items must be unworn, unwashed, 
                and with all original tags attached.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">Custom Duties</h2>
              <p>
                For international orders, custom duties and taxes are the responsibility of the customer.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
