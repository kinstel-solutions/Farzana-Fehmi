"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8">
          <h1 className="font-sans text-3xl md:text-4xl mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-gray max-w-none font-light text-gray-600 space-y-6">
            <p className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">
                Introduction
              </h2>
              <p>
                This Privacy Policy describes how Fehmi Farzana Designs
                collects, uses, and discloses your personal information when you
                visit, use our services, or make a purchase from Fehmi Farzana
                Designs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">
                Information We Collect Directly from You
              </h2>
              <p className="mb-3">
                Information that you directly submit to us through our services
                may include:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-gray-600">
                <li>
                  <strong>Contact details</strong> — including your name,
                  address, phone number, and email.
                </li>
                <li>
                  <strong>Order information</strong> — including your name,
                  billing address, shipping address, payment confirmation, email
                  address, and phone number.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">
                How We Use Your Personal Information
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Providing Products and Services
                  </h3>
                  <p>
                    We use your personal information to provide you with our
                    services in order to perform our contract with you,
                    including processing your payments, fulfilling your orders,
                    sending notifications related to your account, purchases,
                    returns, exchanges, or other transactions, creating and
                    managing your account, arranging for shipping, facilitating
                    returns and exchanges, and other features and
                    functionalities related to your account.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Marketing and Advertising
                  </h3>
                  <p>
                    We may use your personal information for marketing and
                    promotional purposes, such as sending marketing,
                    advertising, and promotional communications by email, text
                    message, or postal mail, and showing you advertisements for
                    products or services. This may include using your personal
                    information to better tailor the services and advertising on
                    our site and other websites.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
