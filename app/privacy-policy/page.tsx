'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="font-sans text-3xl md:text-4xl mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none font-light text-gray-600 space-y-6">
             <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">Introduction</h2>
              <p>
                Farzana Fehmi respects your privacy and is committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">Information We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                Identity Data, Contact Data, and Transaction Data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data 
                where we need to perform the contract we are about to enter into or have entered into with you.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
