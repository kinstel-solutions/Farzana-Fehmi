"use client";

import { motion } from "framer-motion";

export default function SizeGuidePage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="font-sans text-3xl md:text-4xl">Size Guide</h1>
            <p className="text-gray-500 font-light">
              All measurements are in inches.
            </p>
          </div>

          <div className="space-y-12">
            {/* Kurta Table */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-900 font-sans border-b border-gray-200 pb-2">
                Kurta
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3">
                        Size
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3">
                        Bust
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3">
                        Waist
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3">
                        Hip
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3">
                        Sleeve
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3">
                        Length
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900">S</td>
                      <td className="px-6 py-4">34"</td>
                      <td className="px-6 py-4">32"</td>
                      <td className="px-6 py-4">33"</td>
                      <td className="px-6 py-4">20"</td>
                      <td className="px-6 py-4">45"</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900">M</td>
                      <td className="px-6 py-4">40"</td>
                      <td className="px-6 py-4">36"</td>
                      <td className="px-6 py-4">43"</td>
                      <td className="px-6 py-4">22"</td>
                      <td className="px-6 py-4">46"</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900">L</td>
                      <td className="px-6 py-4">40"</td>
                      <td className="px-6 py-4">36"</td>
                      <td className="px-6 py-4">44"</td>
                      <td className="px-6 py-4">22"</td>
                      <td className="px-6 py-4">39.5"</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        XL
                      </td>
                      <td className="px-6 py-4">45"</td>
                      <td className="px-6 py-4">40"</td>
                      <td className="px-6 py-4">48"</td>
                      <td className="px-6 py-4">16.5"</td>
                      <td className="px-6 py-4">44"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom/Pant Table */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-900 font-sans border-b border-gray-200 pb-2">
                Bottom/Pant
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3">
                        Size
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3">
                        Length
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3">
                        Waist
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3">
                        Flair
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900">S</td>
                      <td className="px-6 py-4">39"</td>
                      <td className="px-6 py-4">37"</td>
                      <td className="px-6 py-4">14"</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900">M</td>
                      <td className="px-6 py-4">38"</td>
                      <td className="px-6 py-4">41.5"</td>
                      <td className="px-6 py-4">16"</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900">L</td>
                      <td className="px-6 py-4">39.5"</td>
                      <td className="px-6 py-4">45"</td>
                      <td className="px-6 py-4">14"</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        XL
                      </td>
                      <td className="px-6 py-4">40"</td>
                      <td className="px-6 py-4">50"</td>
                      <td className="px-6 py-4">21"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-6 text-center space-y-2 text-sm text-gray-600 font-light rounded-sm">
              <p className="font-medium">Kurta, Pant, and Dupatta set.</p>
              <p>100% viscose lining</p>
              <p className="text-xs text-gray-400 pt-2 italic">
                Fit may vary by style and personal preference.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
