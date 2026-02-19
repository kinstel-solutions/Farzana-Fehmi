'use client';

import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="font-sans text-3xl md:text-4xl mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none font-light text-gray-600 space-y-6">
            <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">1. Overview</h2>
              <p>
                This website is operated by Farzana Fehmi. Throughout the site, the terms “we”, “us” and “our” refer to Farzana Fehmi. 
                By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">2. Online Store Terms</h2>
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence.
                You may not use our products for any illegal or unauthorized purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">3. Products and Services</h2>
              <p>
                We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. 
                We cannot guarantee that your computer monitor's display of any color will be accurate.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
