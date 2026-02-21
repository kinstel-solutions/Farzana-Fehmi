"use client";

import { motion } from "framer-motion";

export default function ShippingReturnsPage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12">
          {/* Returns & Exchange Policy */}
          <div>
            <h1 className="font-sans text-3xl md:text-4xl mb-8">
              Returns &amp; Exchange Policy
            </h1>

            <div className="prose prose-gray max-w-none font-light text-gray-600 space-y-6">
              <p>
                At Fehmi Farzana Designs, we strive to make your shopping
                experience seamless. Please read our returns and exchanges
                policies carefully before making a purchase.
              </p>

              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-3">
                  Return Eligibility
                </h2>
                <p>
                  We accept returns of unused products in their original
                  condition (unwashed, undamaged, with tags intact) within 7
                  days of delivery for a refund. Refund requests must be raised
                  within 7 days of delivery. You must contact us at{" "}
                  <a
                    href="mailto:farzana@fehmifarz.com"
                    className="text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors">
                    farzana@fehmifarz.com
                  </a>{" "}
                  within 14 days of receiving your order.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-3">
                  Non-Refundable &amp; Non-Exchangeable Items
                </h2>
                <p className="mb-3">
                  We do not offer refunds or exchanges on the following:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-gray-600">
                  <li>Change of mind</li>
                  <li>Items that do not fit</li>
                  <li>Made-to-order garments</li>
                  <li>Altered products</li>
                  <li>Items that do not suit personal preference</li>
                  <li>Discounted or sale items</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-3">
                  Return Process
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-gray-600">
                  <li>
                    Customers are responsible for return and re-shipping costs
                    where applicable.
                  </li>
                  <li>
                    Once approved and received, a full refund will be issued for
                    the item only (shipping fees are not refundable).
                  </li>
                  <li>
                    Clear photos of the damaged product must be provided prior
                    to return approval.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-3">
                  Processing Time
                </h2>
                <p>
                  Please allow up to 15 days for return and exchange processing
                  from the date of request. Products must be returned in their
                  original condition, preferably with packaging and tags intact.
                </p>
              </section>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Shipping & Delivery */}
          <div>
            <h1 className="font-sans text-3xl md:text-4xl mb-8">
              Shipping &amp; Delivery
            </h1>

            <div className="prose prose-gray max-w-none font-light text-gray-600 space-y-6">
              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-3">
                  Free Shipping
                </h2>
                <p>
                  We offer <strong>free shipping</strong> for all orders within
                  Australia.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-3">
                  Estimated Delivery Times
                </h2>
                <p>
                  The estimated delivery time will differ with each order.
                  Typically, we take around 3 to 4 business days to dispatch
                  orders within Australia, and 11 to 12 business days to
                  dispatch international orders.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-3">
                  Made-to-Order Garments
                </h2>
                <p>
                  Our made-to-order garments take 7 to 8 weeks for production
                  and dispatch, depending on the garment&apos;s design and
                  style.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-3">
                  Delivery Delays
                </h2>
                <p>
                  Sometimes, delivery time is subject to factors beyond our
                  control, including but not limited to unexpected travel delays
                  due to weather conditions, political disruptions, or strikes.
                  We promise to keep you updated at every step.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
