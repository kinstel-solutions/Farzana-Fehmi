"use client";

import { motion } from "framer-motion";
import { allSizeTables, sizeGuideNote } from "@/data/size-guide";

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
            {allSizeTables.map((table) => (
              <div
                key={table.title}
                className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900 font-sans border-b border-gray-200 pb-2">
                  {table.title}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                      <tr>
                        {table.columns.map((col) => (
                          <th
                            key={col}
                            scope="col"
                            className="px-6 py-3">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {table.rows.map((row) => (
                        <tr
                          key={row.size}
                          className="bg-white">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {row.size}
                          </td>
                          {table.columns.slice(1).map((col) => (
                            <td
                              key={col}
                              className="px-6 py-4">
                              {row[col.toLowerCase()]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <div className="bg-gray-50 p-6 text-center space-y-2 text-sm text-gray-600 font-light rounded-sm">
              <p className="font-medium">{sizeGuideNote.setDescription}</p>
              <p>{sizeGuideNote.lining}</p>
              <p className="text-xs text-gray-400 pt-2 italic">
                {sizeGuideNote.disclaimer}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
