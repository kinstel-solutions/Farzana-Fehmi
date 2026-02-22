"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { allSizeTables, sizeGuideNote } from "@/data/size-guide";

type Unit = "in" | "cm";

function formatMeasurement(value: string | number, unit: Unit): string {
  if (typeof value === "string") return value;
  if (unit === "in") return `${value}"`;
  return `${Math.round(value * 2.54)} cm`;
}

export default function SizeGuidePage() {
  const [unit, setUnit] = useState<Unit>("in");

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
              Select your preferred unit of measurement.
            </p>

            {/* Unit toggle */}
            <div className="flex justify-center pt-1">
              <div className="inline-flex rounded-md border border-gray-200 overflow-hidden text-sm">
                <button
                  onClick={() => setUnit("in")}
                  className={`px-5 py-2 transition-colors ${
                    unit === "in"
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}>
                  Inches
                </button>
                <button
                  onClick={() => setUnit("cm")}
                  className={`px-5 py-2 transition-colors border-l border-gray-200 ${
                    unit === "cm"
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}>
                  Centimetres
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {allSizeTables.map((table) => (
              <div
                key={table.title}
                className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900 font-sans border-b border-gray-200 pb-2">
                  {table.title}
                </h2>

                {/* ── Desktop table ── */}
                <div className="hidden sm:block overflow-x-auto">
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
                              {formatMeasurement(row[col.toLowerCase()], unit)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Mobile cards ── */}
                <div className="sm:hidden grid grid-cols-2 gap-3">
                  {table.rows.map((row) => (
                    <div
                      key={row.size}
                      className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                        Size {row.size}
                      </p>
                      {table.columns.slice(1).map((col) => (
                        <div
                          key={col}
                          className="flex justify-between items-center py-0.5">
                          <span className="text-xs text-gray-500">{col}</span>
                          <span className="text-xs font-medium text-gray-800">
                            {formatMeasurement(row[col.toLowerCase()], unit)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
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
