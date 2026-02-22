"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8">
          <h1 className="font-sans text-3xl md:text-4xl mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-gray max-w-none font-light text-gray-600 space-y-10">
            <p className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            {/* OVERVIEW */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-widest uppercase text-gray-900">
                Overview
              </h2>
              <p>
                Farzana Fehmi Designs offers this website, including all
                information, tools, and services available from this site to
                you, the user, conditioned upon your acceptance of all terms,
                conditions, policies, and notices stated here.
              </p>
              <p>
                By visiting our site and/or purchasing something from us, you
                engage in our &ldquo;Service&rdquo; and agree to be bound by the
                following terms and conditions. These Terms of Service apply to
                all users of the site, including without limitation users who
                are browsers, vendors, customers, merchants, and/or contributors
                of content.
              </p>
              <p>
                Please read these Terms of Service carefully before accessing or
                using our website. By accessing or using any part of the site,
                you agree to be bound by these Terms of Service. If you do not
                agree to all the terms and conditions of this agreement, then
                you may not access the website or use any services. If these
                Terms of Service are considered an offer, acceptance is
                expressly limited to these Terms of Service.
              </p>
              <p>
                Any new features or tools which are added to the current store
                shall also be subject to the Terms of Service. You can review
                the most current version of the Terms of Service at any time on
                this page. We reserve the right to update, change, or replace
                any part of these Terms of Service by posting updates and/or
                changes to our website. It is your responsibility to check this
                page periodically for changes. Your continued use of or access
                to the website following the posting of any changes constitutes
                acceptance of those changes.
              </p>
            </section>

            {/* ONLINE STORE TERMS */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-widest uppercase text-gray-900">
                Online Store Terms
              </h2>
              <p>
                By agreeing to these Terms of Service, you represent that you
                are at least the age of majority in your state or province of
                residence, or that you are the age of majority in your state or
                province of residence and you have given us your consent to
                allow any of your minor dependents to use this site.
              </p>
              <p>
                You may not use our products for any illegal or unauthorized
                purpose, nor may you, in the use of the Service, violate any
                laws in your jurisdiction (including but not limited to
                copyright laws).
              </p>
              <p>
                You must not transmit any worms, viruses, or any code of a
                destructive nature.
              </p>
              <p>
                A breach or violation of any of the Terms will result in an
                immediate termination of your Services.
              </p>
              <p>
                We reserve the right to refuse service to anyone for any reason
                at any time.
              </p>
            </section>

            {/* MODIFICATIONS TO THE SERVICE AND PRICING */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-widest uppercase text-gray-900">
                Modifications to the Service and Pricing
              </h2>
              <p>
                Prices for our products are subject to change without notice.
              </p>
              <p>
                We reserve the right at any time to modify or discontinue the
                Service (or any part or content thereof) without notice.
              </p>
              <p>
                We shall not be liable to you or to any third party for any
                modification, price change, suspension, or discontinuance of the
                Service.
              </p>
            </section>

            {/* PRODUCTS OR SERVICES */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-widest uppercase text-gray-900">
                Products or Services
              </h2>
              <p>
                We have made every effort to display as accurately as possible
                the colours and images of our products that appear on the
                website. We cannot guarantee that your computer monitor&rsquo;s
                display of any colour will be accurate.
              </p>
              <p>
                All descriptions of products or product pricing are subject to
                change at any time without notice, at the sole discretion of us.
                We reserve the right to discontinue any product at any time. Any
                offer for any product or service made on this site is void where
                prohibited.
              </p>
              <p>
                We do not warrant that the quality of any products, services, or
                information purchased or obtained by you will meet your
                expectations, or that any errors in the Service will be
                corrected.
              </p>
            </section>

            {/* PAYMENT TERMS */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-widest uppercase text-gray-900">
                Payment Terms
              </h2>
              <p>
                Full payment (100% advance) is required at the time of placing
                an order, irrespective of the mode of payment. All orders are
                processed only once the complete advance amount has been
                received. Delivery will be made once complete payment is
                confirmed.
              </p>
              <p>
                We charge 10% extra on the selling price for all international
                orders.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
